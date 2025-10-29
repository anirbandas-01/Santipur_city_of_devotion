// backend/scripts/migrateUsers.js
// RUN THIS SCRIPT ONCE to migrate existing data to new schema
// Command: node backend/scripts/migrateUsers.js

import mongoose from 'mongoose';
import User from '../models/User.js';
import Club from '../models/clubModel.js';
import dotenv from 'dotenv';

dotenv.config();

const migrateData = async () => {
    try {
        console.log('🔄 Starting migration...\n');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // ============================================
        // STEP 1: Migrate existing users to club type
        // ============================================
        console.log('📝 Step 1: Updating users...');
        
        const usersWithoutType = await User.find({ 
            userType: { $exists: false } 
        });
        
        console.log(`Found ${usersWithoutType.length} users without userType`);

        for (const user of usersWithoutType) {
            user.userType = 'club'; // Set all existing users as club type
            await user.save();
            console.log(`  ✓ Updated ${user.name} (${user.email}) to club type`);
        }

        // Remove old isClubMember field if it exists
        const removeOldField = await User.updateMany(
            { isClubMember: { $exists: true } },
            { $unset: { isClubMember: "" } }
        );
        
        if (removeOldField.modifiedCount > 0) {
            console.log(`  ✓ Removed old isClubMember field from ${removeOldField.modifiedCount} users`);
        }

        console.log('✅ Step 1 completed\n');

        // ============================================
        // STEP 2: Link clubs to their owner users
        // ============================================
        console.log('📝 Step 2: Linking clubs to users...');
        
        const clubsWithoutUserId = await Club.find({ 
            userId: { $exists: false } 
        });
        
        console.log(`Found ${clubsWithoutUserId.length} clubs without userId`);

        let linkedCount = 0;
        let notFoundCount = 0;

        for (const club of clubsWithoutUserId) {
            // Find user by email
            const user = await User.findOne({ email: club.email });
            
            if (user) {
                club.userId = user._id;
                club.owner = {
                    name: user.name,
                    email: user.email
                };
                
                // Set default status if not exists
                if (!club.status) {
                    club.status = 'approved';
                }
                
                await club.save();
                linkedCount++;
                console.log(`  ✓ Linked "${club.clubName}" to user ${user.name}`);
            } else {
                notFoundCount++;
                console.log(`  ⚠️  No user found for club "${club.clubName}" with email ${club.email}`);
                console.log(`     You may need to create a user for this email or reassign this club.`);
            }
        }

        console.log(`✅ Step 2 completed: ${linkedCount} clubs linked, ${notFoundCount} clubs need manual review\n`);

        // ============================================
        // STEP 3: Summary and validation
        // ============================================
        console.log('📊 Migration Summary:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        const totalUsers = await User.countDocuments();
        const clubUsers = await User.countDocuments({ userType: 'club' });
        const personalUsers = await User.countDocuments({ userType: 'personal' });
        const totalClubs = await Club.countDocuments();
        const linkedClubs = await Club.countDocuments({ userId: { $exists: true } });
        const unlinkedClubs = totalClubs - linkedClubs;

        console.log(`Total Users: ${totalUsers}`);
        console.log(`  • Club Users: ${clubUsers}`);
        console.log(`  • Personal Users: ${personalUsers}`);
        console.log(`\nTotal Clubs: ${totalClubs}`);
        console.log(`  • Linked to users: ${linkedClubs}`);
        console.log(`  • Not linked: ${unlinkedClubs}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        if (unlinkedClubs > 0) {
            console.log('⚠️  WARNING: Some clubs are not linked to users.');
            console.log('   Please review and manually link them in the database.\n');
        }

        console.log('✅ Migration completed successfully!');
        console.log('\n🎉 You can now start the server with the updated schema.\n');

        process.exit(0);

    } catch (error) {
        console.error('❌ Migration failed:', error);
        console.error('\nError details:', error.message);
        console.error('\nPlease fix the error and run the migration again.');
        process.exit(1);
    }
};

// Run migration
migrateData();
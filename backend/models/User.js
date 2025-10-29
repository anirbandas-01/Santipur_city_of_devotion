import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ 
      type: String,
      required: [true, 'Name is required'],
      trim: true
     },
    email:
     {
      type: String,
      required: [true, 'Email is required' ],
      unique: true,
      lowercase: true,
      trim:true
     },
     password: 
     {
      type: String,
      required: [true, 'password is required'],
      minlength: 6
     },
    userType: 
    {
        type: String,
        enum: ['club', 'personal'],
        required: true,
        default: 'personal'
    },
    phone: {
        type: String,
        default: '',
        trim: true
    },
     clubType: {
        type: String,
        default: '',
        // Examples: 'durga-puja', 'kali-puja', 'cultural', 'sports', etc.
    },
    location: {
        type: String,
        default: '',
        trim: true
    },
    bio: {
        type: String,
        default: '',
        maxlength: 500
    },
    joinedClubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club'
    }],
     profilePicture: {
        type: String,
        default: ''
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
     lastLogin: {
        type: Date
    }
  
},{timestamps: true});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ userType: 1 });

// Virtual field to check if user is a club
userSchema.virtual('isClub').get(function() {
    return this.userType === 'club';
});

// Virtual field to check if user is personal
userSchema.virtual('isPersonal').get(function() {
    return this.userType === 'personal';
});

// Method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function() {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        userType: this.userType,
        phone: this.phone,
        clubType: this.clubType,
        location: this.location,
        bio: this.bio,
        profilePicture: this.profilePicture,
        createdAt: this.createdAt
    };
};

export default mongoose.model("User", userSchema);
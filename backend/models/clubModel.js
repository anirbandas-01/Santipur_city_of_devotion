import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    clubName:  
      {
         type: String, 
         required: [true, "Club name is required"],
         trim: true
      },
      festivalType:
      {
        type: String, 
        required: [true, "Festival type is required"]
      },
      description: 
      {
        type: String,
        default: '',
        maxlength: 2000
      }, 
      images: 
      {
        type : [String],
        default: [],
        validate: {
            validator: function(arr) {
                return arr.length <= 10;
            },
            message: 'Maximum 10 images allowed'
        }
      } ,
      email: 
      { 
        type: String,
        required: true,
        trim: true,
        lowercase: true
      },  
      /* status: 
      {
        type: String,
        default: "pending"
      },
      dateAdded: 
      {
        type: Date,
        default: Date.now
      } */
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        index: true // Index for faster queries
    },
     owner: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
     status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'approved' // Auto-approve for now, can be changed later
    },
    
    // Additional club details
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    establishedYear: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear()
    },
    
    // Social media links
    socialMedia: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        youtube: { type: String, default: '' },
        website: { type: String, default: '' }
    },
    
    // Stats
    views: {
        type: Number,
        default: 0
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    
    // Admin notes (not visible to club owners)
    adminNotes: {
        type: String,
        default: ''
    }

}, { timestamps: true});


// Indexes for better query performance
clubSchema.index({ festivalType: 1 });
clubSchema.index({ status: 1 });
clubSchema.index({ userId: 1 });
clubSchema.index({ createdAt: -1 });

// Compound index for common queries
clubSchema.index({ status: 1, festivalType: 1 });

// Virtual field to check if club is approved
clubSchema.virtual('isApproved').get(function() {
    return this.status === 'approved';
});

// Virtual field for follower count
clubSchema.virtual('followerCount').get(function() {
    return this.followers ? this.followers.length : 0;
});

// Method to check if a user owns this club
clubSchema.methods.isOwnedBy = function(userId) {
    return this.userId.toString() === userId.toString();
};

// Method to increment view count
clubSchema.methods.incrementViews = async function() {
    this.views += 1;
    return await this.save();
};

// Static method to get clubs by user
clubSchema.statics.getByUser = function(userId) {
    return this.find({ userId }).sort({ createdAt: -1 });
};

// Static method to get approved clubs
clubSchema.statics.getApproved = function(filter = {}) {
    return this.find({ ...filter, status: 'approved' }).sort({ createdAt: -1 });
};


export default mongoose.model("Club", clubSchema);
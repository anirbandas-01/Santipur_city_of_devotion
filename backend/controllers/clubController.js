// backend/controllers/clubController.js
import Club from "../models/clubModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
  
const uploadImagesToCloudinary = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "clubs",
      transformation: [
        { width: 1200, height: 1200, crop: "limit" },
        { quality: "auto" }
      ]
    });
    fs.unlinkSync(file.path);
    return result.secure_url;
  });
  return Promise.all(uploadPromises);
}; 

export const addClub = async (req, res) => {
  try {
    console.log("📩 POST /api/clubs/add - Adding new club");
    
    const { clubName, festivalType, description, email } = req.body;
    
    if (!clubName || !festivalType) {
      return res.status(400).json({ 
        message: "Club name and festival type are required" 
      });
    }

    // Check if user already has a club
    const existingClub = await Club.findOne({ userId: req.user.id });
    if (existingClub) {
      return res.status(400).json({ 
        message: "You already have a registered club. Please edit your existing club instead." 
      });
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      if (req.files.length > 10) {
        return res.status(400).json({ 
          message: "Maximum 10 images allowed" 
        });
      }
      imageUrls = await uploadImagesToCloudinary(req.files);
    }

    const newClub = await Club.create({
      clubName: clubName.trim(),
      festivalType,
      description: description || '',
      email: email || req.user.email,
      images: imageUrls,
      userId: req.user.id,
      owner: {
        name: req.user.name,
        email: req.user.email
      },
      status: 'approved'
    });

    console.log("✅ Club created successfully:", newClub.clubName);

    res.status(201).json({
      message: "Club created successfully!",
      club: newClub
    });

  } catch (error) {
    console.error('❌ Add club error:', error);
    res.status(500).json({ 
      message: "Failed to create club",
      error: error.message 
    });
  }
};

/**
 * Get all clubs (with filters)
 * GET /api/clubs
 * PUBLIC - Returns array directly for consistency
 */
export const getClubs = async (req, res) => {
  try {
    const { festivalType, userId, email, status } = req.query;
    let filter = {};

    console.log('📊 GET /api/clubs with filters:', { festivalType, userId, email, status });

    // Priority 1: Filter by userId (for user's own clubs)
    if (userId) {
      filter.userId = userId;
    } 
    // Priority 2: Filter by email (for backward compatibility)
    else if (email) {
      filter.email = email;
    } 
    // Priority 3: Public view - only approved clubs
    else {
      filter.status = 'approved';
    }

    // Add festival type filter if provided
    if (festivalType) {
      filter.festivalType = festivalType;
    }

    // Admin can override status filter
    if (status && req.user?.userType === 'admin') {
      filter.status = status;
    }

    const clubs = await Club.find(filter)
      .sort({ createdAt: -1 })
      .populate('userId', 'name email userType');

    console.log(`✅ Found ${clubs.length} clubs with filter:`, filter);

    // ALWAYS return clubs array directly for consistency
    res.json(clubs);

  } catch (error) {
    console.error('❌ Get clubs error:', error);
    res.status(500).json({ 
      message: "Failed to fetch clubs",
      error: error.message 
    });
  }
};

export const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate('userId', 'name email phone userType');

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    if (club.status === 'approved') {
      await club.incrementViews();
    }

    res.json(club);

  } catch (error) {
    console.error('Get club by ID error:', error);
    res.status(500).json({ 
      message: "Failed to fetch club",
      error: error.message 
    });
  }
};

export const updateClub = async (req, res) => {
  try {
    console.log("📝 PUT /api/clubs/:id - Updating club");
    
    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    if (!club.isOwnedBy(req.user.id)) {
      return res.status(403).json({ 
        message: 'Access denied. You can only update your own club.' 
      });
    }

    const { clubName, festivalType, description, email, existingImages } = req.body;
    
    if (!clubName || !festivalType) {
      return res.status(400).json({ 
        message: "Club name and festival type are required" 
      });
    }

    let keptImages = [];
    if (existingImages) {
      try {
        keptImages = JSON.parse(existingImages);
      } catch (e) {
        console.log("Error parsing existingImages:", e);
        keptImages = [];
      }
    }

    let newImageUrls = [];
    if (req.files && req.files.length > 0) {
      const totalImages = keptImages.length + req.files.length;
      if (totalImages > 10) {
        return res.status(400).json({ 
          message: `Maximum 10 images allowed. You have ${keptImages.length} existing images.` 
        });
      }
      newImageUrls = await uploadImagesToCloudinary(req.files);
    }

    club.clubName = clubName.trim();
    club.festivalType = festivalType;
    club.description = description || '';
    club.email = email || club.email;
    club.images = [...keptImages, ...newImageUrls];

    await club.save();

    console.log("✅ Club updated successfully:", club.clubName);

    res.json({
      message: "Club updated successfully!",
      club
    });

  } catch (error) {
    console.error("❌ Update club error:", error);
    res.status(500).json({ 
      message: "Failed to update club",
      error: error.message 
    });
  }
};

export const deleteClub = async (req, res) => {
  try {
    console.log("🗑️ DELETE /api/clubs/:id - Deleting club");
    
    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    if (!club.isOwnedBy(req.user.id)) {
      return res.status(403).json({ 
        message: 'Access denied. You can only delete your own club.' 
      });
    }

    await Club.findByIdAndDelete(req.params.id);

    console.log("✅ Club deleted successfully");

    res.json({ 
      message: "Club deleted successfully" 
    });

  } catch (error) {
    console.error("❌ Delete club error:", error);
    res.status(500).json({ 
      message: "Failed to delete club",
      error: error.message 
    });
  }
};

export const getMyClubs = async (req, res) => {
  try {
    const clubs = await Club.getByUser(req.user.id);

    // Return array directly for consistency
    res.json(clubs);

  } catch (error) {
    console.error('Get my clubs error:', error);
    res.status(500).json({ 
      message: "Failed to fetch your clubs",
      error: error.message 
    });
  }
};
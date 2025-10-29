// backend/controllers/clubController.js
import Club from "../models/clubModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
  
/**
 * Helper: Upload images to Cloudinary
 */
const uploadImagesToCloudinary = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "clubs",
      transformation: [
        { width: 1200, height: 1200, crop: "limit" },
        { quality: "auto" }
      ]
    });
    fs.unlinkSync(file.path); // Delete local temp file
    return result.secure_url;
  });
  return Promise.all(uploadPromises);
}; 

/**
 * Add new club
 * POST /api/clubs/add
 * PROTECTED - Club users only
 */
export const addClub = async (req, res) => {
  try {
    console.log("📩 POST /api/clubs/add - Adding new club");
    console.log("User:", req.user?.name, req.user?.userType);
    
    const { clubName, festivalType, description, email } = req.body;
    
    // Validation
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

    // Upload images if provided
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      if (req.files.length > 10) {
        return res.status(400).json({ 
          message: "Maximum 10 images allowed" 
        });
      }
      imageUrls = await uploadImagesToCloudinary(req.files);
    }

    // Create club with user reference
    const newClub = await Club.create({
      clubName: clubName.trim(),
      festivalType,
      description: description || '',
      email: email || req.user.email,
      images: imageUrls,
      userId: req.user.id, // Link to authenticated user
      owner: {
        name: req.user.name,
        email: req.user.email
      },
      status: 'approved' // Auto-approve for now
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
 * PUBLIC or filtered by userId
 */
export const getClubs = async (req, res) => {
  try {
    const { festivalType, userId, status } = req.query;
    let filter = {};

    // Filter by festival type
    if (festivalType) {
      filter.festivalType = festivalType;
    }
    
    // Filter by user (get specific user's clubs)
    if (userId) {
      filter.userId = userId;
    } else {
      // Public view: only show approved clubs
      filter.status = 'approved';
    }

    // Admin can filter by status
    if (status && req.user?.userType === 'admin') {
      filter.status = status;
    }

    const clubs = await Club.find(filter)
      .sort({ createdAt: -1 })
      .populate('userId', 'name email userType'); // Populate owner info

    res.json({
      count: clubs.length,
      clubs
    });

  } catch (error) {
    console.error('Get clubs error:', error);
    res.status(500).json({ 
      message: "Failed to fetch clubs",
      error: error.message 
    });
  }
};

/**
 * Get single club by ID
 * GET /api/clubs/:id
 * PUBLIC
 */
export const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate('userId', 'name email phone userType');

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Increment view count (only for approved clubs)
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

/**
 * Update club
 * PUT /api/clubs/:id
 * PROTECTED - Owner only
 */
export const updateClub = async (req, res) => {
  try {
    console.log("📝 PUT /api/clubs/:id - Updating club");
    
    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check ownership
    if (!club.isOwnedBy(req.user.id)) {
      return res.status(403).json({ 
        message: 'Access denied. You can only update your own club.' 
      });
    }

    const { clubName, festivalType, description, email, existingImages } = req.body;
    
    // Validate required fields
    if (!clubName || !festivalType) {
      return res.status(400).json({ 
        message: "Club name and festival type are required" 
      });
    }

    // Parse existing images that should be kept
    let keptImages = [];
    if (existingImages) {
      try {
        keptImages = JSON.parse(existingImages);
      } catch (e) {
        console.log("Error parsing existingImages:", e);
        keptImages = [];
      }
    }

    // Upload new images if provided
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

    // Update club data
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

/**
 * Delete club
 * DELETE /api/clubs/:id
 * PROTECTED - Owner only
 */
export const deleteClub = async (req, res) => {
  try {
    console.log("🗑️ DELETE /api/clubs/:id - Deleting club");
    
    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // Check ownership
    if (!club.isOwnedBy(req.user.id)) {
      return res.status(403).json({ 
        message: 'Access denied. You can only delete your own club.' 
      });
    }

    // Delete club images from Cloudinary (optional)
    // TODO: Implement cloudinary image deletion if needed
    
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

/**
 * Get clubs by authenticated user
 * GET /api/clubs/my-clubs
 * PROTECTED - Club users only
 */
export const getMyClubs = async (req, res) => {
  try {
    const clubs = await Club.getByUser(req.user.id);

    res.json({
      count: clubs.length,
      clubs
    });

  } catch (error) {
    console.error('Get my clubs error:', error);
    res.status(500).json({ 
      message: "Failed to fetch your clubs",
      error: error.message 
    });
  }
};
































/* // backend/controllers/clubController.js
import Club from "../models/clubModel.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
  
// Upload images to Cloudinary
const uploadImagesToCloudinary = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "clubs",
    });
    fs.unlinkSync(file.path); // delete local temp file
    return result.secure_url;
  });
  return Promise.all(uploadPromises);
}; 

// ➕ Add new club
export const addClub = async (req, res) => {
  try {
    console.log("📩 /api/clubs/add called");
    console.log("Body:", req.body);
    console.log("Files:", req.files);
    
    const { clubName, festivalType, description, email } = req.body;
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = await uploadImagesToCloudinary(req.files);
    }

    const newClub = await Club.create({
      clubName,
      festivalType,
      description,
      email,
      images: imageUrls,
    });

    res.status(201).json(newClub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};  

// 📖 Get all clubs (filtered)
export const getClubs = async (req, res) => {
  try {
    const { festivalType, email } = req.query;
    let filter = {};

    if (festivalType) filter.festivalType = festivalType;
    if (email) filter.email = email;

    const clubs = await Club.find(filter);
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Update a club
export const updateClub = async (req, res) => {
  try {
    const { clubName, festivalType, description, email, existingImages } = req.body;
    let updateData = { clubName, festivalType, description, email };

    // Parse existing images that should be kept
    let keptImages = [];
    if (existingImages) {
      try {
        keptImages = JSON.parse(existingImages);
      } catch (e) {
        console.log("Error parsing existingImages:", e);
        keptImages = [];
      }
    }

    // Upload new images if any
    let newImageUrls = [];
    if (req.files && req.files.length > 0) {
      newImageUrls = await uploadImagesToCloudinary(req.files);
    }

    // Combine kept existing images with new uploads
    updateData.images = [...keptImages, ...newImageUrls];

    const updated = await Club.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ❌ Delete a club
export const deleteClub = async (req, res) => {
  try {
    await Club.findByIdAndDelete(req.params.id);
    res.json({ message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; */
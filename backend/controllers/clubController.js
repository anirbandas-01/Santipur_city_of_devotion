// backend/controllers/clubController.js - UPDATED WITH isTemple FIELD
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
    
    const { 
      clubName, 
      festivalType, 
      description, 
      email,
      phone,
      address,
      location,
      establishedYear,
      memberCount,
      otherEvents,
      socialMedia,
      isTemple // NEW FIELD
    } = req.body;
    
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

    // Parse social media if it's a string
    let parsedSocialMedia = {};
    if (socialMedia) {
      try {
        parsedSocialMedia = typeof socialMedia === 'string' 
          ? JSON.parse(socialMedia) 
          : socialMedia;
      } catch (e) {
        console.log("Error parsing socialMedia:", e);
      }
    }
    
    // Parse location if it's a string
    let parsedLocation = { latitude: '', longitude: '' };
    if (location) {
      try {
        parsedLocation = typeof location === 'string' 
          ? JSON.parse(location) 
          : location;
      } catch (e) {
        console.log("Error parsing location:", e);
      }
    }

    const newClub = await Club.create({
      clubName: clubName.trim(),
      festivalType,
      description: description || '',
      email: email || req.user.email,
      phone: phone || '',
      address: address || '',
      establishedYear: establishedYear || null,
      memberCount: memberCount || null,
      otherEvents: otherEvents || '',
      isTemple: isTemple === 'true' || isTemple === true, // NEW FIELD
      socialMedia: {
        facebook: parsedSocialMedia.facebook || '',
        instagram: parsedSocialMedia.instagram || '',
        youtube: parsedSocialMedia.youtube || '',
        website: parsedSocialMedia.website || ''
      },
      images: imageUrls,
      userId: req.user.id,
      owner: {
        name: req.user.name,
        email: req.user.email
      },
      location: {
        latitude: parsedLocation.latitude || '',
        longitude: parsedLocation.longitude || ''
      },
      status: 'approved'
    });

    console.log("✅ Club created successfully:", newClub.clubName, "| isTemple:", newClub.isTemple);

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

export const getClubs = async (req, res) => {
  try {
    const { festivalType, userId, email, status, isTemple } = req.query;
    let filter = {};

    console.log('📊 GET /api/clubs with filters:', { festivalType, userId, email, status, isTemple });

    if (userId) {
      filter.userId = userId;
    } 
    else if (email) {
      filter.email = email;
    } 
    else {
      filter.status = 'approved';
    }

    if (festivalType) {
      filter.festivalType = festivalType;
    }

    if (status && req.user?.userType === 'admin') {
      filter.status = status;
    }

    // NEW: Filter for temples
    if (isTemple !== undefined) {
      filter.isTemple = isTemple === 'true' || isTemple === true;
    }

    const clubs = await Club.find(filter)
      .sort({ createdAt: -1 })
      .populate('userId', 'name email userType');

    console.log(`✅ Found ${clubs.length} clubs with filter:`, filter);

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

    const { 
      clubName, 
      festivalType, 
      description, 
      email, 
      phone,
      address,
      establishedYear,
      memberCount,
      otherEvents,
      socialMedia,
      existingImages,
      isTemple // NEW FIELD
    } = req.body;
    
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

    // Parse social media if it's a string
    let parsedSocialMedia = club.socialMedia || {};
    if (socialMedia) {
      try {
        parsedSocialMedia = typeof socialMedia === 'string' 
          ? JSON.parse(socialMedia) 
          : socialMedia;
      } catch (e) {
        console.log("Error parsing socialMedia:", e);
      }
    }

    // Update club fields
    club.clubName = clubName.trim();
    club.festivalType = festivalType;
    club.description = description || '';
    club.email = email || club.email;
    club.phone = phone || '';
    club.address = address || '';
    club.establishedYear = establishedYear || null;
    club.memberCount = memberCount || null;
    club.otherEvents = otherEvents || '';
    club.isTemple = isTemple === 'true' || isTemple === true; // NEW FIELD
    club.socialMedia = {
      facebook: parsedSocialMedia.facebook || '',
      instagram: parsedSocialMedia.instagram || '',
      youtube: parsedSocialMedia.youtube || '',
      website: parsedSocialMedia.website || ''
    };
    club.images = [...keptImages, ...newImageUrls];

    await club.save();

    console.log("✅ Club updated successfully:", club.clubName, "| isTemple:", club.isTemple);

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
    res.json(clubs);
  } catch (error) {
    console.error('Get my clubs error:', error);
    res.status(500).json({ 
      message: "Failed to fetch your clubs",
      error: error.message 
    });
  }
};
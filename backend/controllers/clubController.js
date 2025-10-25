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
    const { clubName, festivalType, description, email } = req.body;
    let updateData = { clubName, festivalType, description, email };

    if (req.files && req.files.length > 0) {
      const imageUrls = await uploadImagesToCloudinary(req.files);
      updateData.images = imageUrls;
    }

    const updated = await Club.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
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
};

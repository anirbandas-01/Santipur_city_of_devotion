import Club from '../models/Club.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname) 
});

export const upload = multer({ storage });

export const  addClub = async (req, res) => {
    try {
        const { clubName, festivalType, description, email } = req.body;
        const images = req.files.map(f => f.path);
        const newClub = await Club.create({ clubName, festivalType, description, email, images });
        res.status(201).json(newClub);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getClubs = async (req, res) => {
    try {
        const { festivalType } = req.query;
        const clubs = festivalType
          ? await Club.find({ festivalType, status: "approved" })
          : await Club.find();
        res.json(clubs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

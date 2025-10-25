import express from "express";
import { addClub, getClubs, updateClub, deleteClub } from "../controllers/clubController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.array("images",10), addClub);
router.get("/", getClubs);
router.put("/:id", upload.array("images", 10), updateClub);
router.delete("/:id", deleteClub);

export default router;
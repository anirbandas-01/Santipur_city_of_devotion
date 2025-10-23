import express from "express";
import { addClub, getClubs, upload } from "../controllers/clubController.js";

const router = express.Router();

router.post("/add", upload.array("images",5), addClub);
router.get("/", getClubs);

export default router;
/* import express from "express";
import { addClub, getClubs, updateClub, deleteClub } from "../controllers/clubController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.array("images",10), addClub);
router.get("/", getClubs);
router.put("/:id", upload.array("images", 10), updateClub);
router.delete("/:id", deleteClub);

export default router; */


// backend/routes/clubRoutes.js
import express from "express";
import { 
    addClub, 
    getClubs, 
    getClubById,
    updateClub, 
    deleteClub,
    getMyClubs 
} from "../controllers/clubController.js";
import { upload } from "../middleware/upload.js";
import { authenticate, isClubUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

/**
 * Get all approved clubs (with optional filters)
 * GET /api/clubs
 * Query params: ?festivalType=durga-puja&status=approved
 */
router.get("/", getClubs);

/**
 * Get single club by ID
 * GET /api/clubs/:id
 */
router.get("/:id", getClubById);


// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

/**
 * Get clubs created by authenticated user
 * GET /api/clubs/my-clubs
 * Headers: Authorization: Bearer <token>
 * Note: This route must come BEFORE /:id to avoid conflict
 */
router.get("/user/my-clubs", authenticate, isClubUser, getMyClubs);

/**
 * Create new club
 * POST /api/clubs/add
 * Headers: Authorization: Bearer <token>
 * Body: FormData with images and club details
 * Requires: Club user type
 */
router.post("/add", authenticate, isClubUser, upload.array("images", 10), addClub);

/**
 * Update existing club
 * PUT /api/clubs/:id
 * Headers: Authorization: Bearer <token>
 * Body: FormData with images and club details
 * Requires: Club user type + ownership
 */
router.put("/:id", authenticate, isClubUser, upload.array("images", 10), updateClub);

/**
 * Delete club
 * DELETE /api/clubs/:id
 * Headers: Authorization: Bearer <token>
 * Requires: Club user type + ownership
 */
router.delete("/:id", authenticate, isClubUser, deleteClub);


export default router;
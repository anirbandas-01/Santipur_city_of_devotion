/* import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router; */


// backend/routes/userRoutes.js
import express from "express";
import { 
    registerUser, 
    loginUser, 
    getProfile, 
    updateProfile,
    changePassword,
    deleteAccount
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

/**
 * Register new user (Club or Personal)
 * POST /api/users/register
 * Body: { name, email, password, userType, phone?, clubType?, location?, bio? }
 */
router.post("/register", registerUser);

/**
 * Login user
 * POST /api/users/login
 * Body: { email, password }
 * Returns: { token, user }
 */
router.post("/login", loginUser);


// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

/**
 * Get current user profile
 * GET /api/users/profile
 * Headers: Authorization: Bearer <token>
 */
router.get("/profile", authenticate, getProfile);

/**
 * Update user profile
 * PUT /api/users/profile
 * Headers: Authorization: Bearer <token>
 * Body: { name?, phone?, bio?, location?, profilePicture? }
 */
router.put("/profile", authenticate, updateProfile);

/**
 * Change password
 * PUT /api/users/change-password
 * Headers: Authorization: Bearer <token>
 * Body: { currentPassword, newPassword }
 */
router.put("/change-password", authenticate, changePassword);

/**
 * Delete/Deactivate account
 * DELETE /api/users/account
 * Headers: Authorization: Bearer <token>
 * Body: { password }
 */
router.delete("/account", authenticate, deleteAccount);


export default router;
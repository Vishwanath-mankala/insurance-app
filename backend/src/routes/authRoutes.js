import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Example protected route
// router.get("/me", authMiddleware, getUser);

export default router;

import express from "express";
import {
  getAuditLogsController,
  getAdminSummaryController,
} from "../controllers/adminController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only admin should access
router.use(authMiddleware, (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
});

router.get("/audit", getAuditLogsController);
router.get("/summary", getAdminSummaryController);

export default router;

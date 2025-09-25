import express from "express";
import {
  submitClaimController,
  listClaimsController,
  claimDetailController,
  updateClaimStatusController,
} from "../controllers/claimController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authRoles } from "../middlewares/authRolesMiddleWare.js";

const router = express.Router();

// Customer submits claim
router.post("/", authMiddleware, authRoles("customer"), submitClaimController);

// List claims
router.get("/", authMiddleware, listClaimsController);

// Claim detail
router.get("/:id", authMiddleware, claimDetailController);

// Update status (only agent/admin)
router.put(
  "/:id/status",
  authMiddleware,
  authRoles("agent", "admin"),
  updateClaimStatusController
);

export default router;

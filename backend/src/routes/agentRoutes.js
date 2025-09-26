import express from "express";
import {
  getAgents,
  createAgent,
  assignAgent,
} from "../controllers/agentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authRoles } from "../middlewares/authRolesMiddleWare.js";

const router = express.Router();

// GET /api/v1/agents — list agents (admin only)
router.get("/", authMiddleware, authRoles("admin"), getAgents);

// POST /api/v1/agents — create new agent (admin only)
router.post("/", authMiddleware, authRoles("admin"), createAgent);

// PUT /api/v1/agents/:id/assign — assign agent to a policy (admin only)
router.put("/:id/assign", authMiddleware, authRoles("admin"), assignAgent);

export default router;

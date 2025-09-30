import express from "express";
import { getUserPolicies, cancelPolicy } from "../controllers/policyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authRoles } from "../middlewares/authRolesMiddleWare.js";

const router = express.Router();

router.get("/",authMiddleware,authRoles('customer','admin'), getUserPolicies);
router.put("/:id/cancel",authMiddleware,authRoles('customer'), cancelPolicy);

export default router;

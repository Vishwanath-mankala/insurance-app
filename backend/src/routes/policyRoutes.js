import express from "express";
import {getAllPolicies,getPolicyDetails,purchasePolicy,createPolicyController,deletePolicyController} from "../controllers/policyController.js";
import { authMiddleware}  from "../middlewares/authMiddleware.js";
import { authRoles } from "../middlewares/authRolesMiddleWare.js";


const router = express.Router();

// Public routes
router.get("/",getAllPolicies );
router.get("/:id", getPolicyDetails);
router.post("/:id/purchase", authMiddleware, authRoles('customer'), purchasePolicy);

router.post("/create", authMiddleware, authRoles("admin"), createPolicyController);
router.delete("/delete/:id", authMiddleware, authRoles("admin"), deletePolicyController);

// Example protected route
// router.get("/me", authMiddleware, getUser);/delete

export default router;

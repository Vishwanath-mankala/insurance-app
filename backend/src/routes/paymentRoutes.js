import express from "express";
import { recordPaymentController, getUserPaymentsController } from "../controllers/paymentsController.js";
import { authMiddleware  }from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, recordPaymentController);
router.get("/user", authMiddleware, getUserPaymentsController);

export default router;

import { recordPayment, getUserPayments } from "../services/paymentService.js";

// POST /api/v1/payments
export const recordPaymentController = async (req, res) => {
  try {
    const { userPolicyId, amount, method } = req.body;
    const payment = await recordPayment({
      userId: req.user.userId,
      userPolicyId,
      amount,
      method,
    });
    res.status(201).json({ message: "Payment recorded successfully", payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /api/v1/payments/user
export const getUserPaymentsController = async (req, res) => {
  try {
    const payments = await getUserPayments(req.user.userId);
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

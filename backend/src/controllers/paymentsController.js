import { recordPayment, getUserPayments } from "../services/paymentService.js";
import { logAction } from "../utils/auditLogger.js";

// POST /api/v1/payments
export const recordPaymentController = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const { userPolicyId, amount, method, reference } = req.body;
    const payment = await recordPayment({
      userId: actorId,
      userPolicyId,
      amount,
      method,
      reference,
    });

    await logAction({
      action: "RECORD_PAYMENT_SUCCESS",
      actorId,
      details: { paymentId: payment._id, amount, method },
      ip: req.ip,
    });

    res.status(201).json({ message: "Payment recorded successfully", payment });
  } catch (error) {
    await logAction({
      action: "RECORD_PAYMENT_FAILED",
      actorId,
      details: { error: error.message, body: req.body },
      ip: req.ip,
    });
    res.status(400).json({ message: error.message });
  }
};

// GET /api/v1/payments/user
export const getUserPaymentsController = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const payments = await getUserPayments(actorId);

    await logAction({
      action: "GET_USER_PAYMENTS_SUCCESS",
      actorId,
      details: { count: payments.length },
      ip: req.ip,
    });

    res.status(200).json(payments);
  } catch (error) {
    await logAction({
      action: "GET_USER_PAYMENTS_FAILED",
      actorId,
      details: { error: error.message },
      ip: req.ip,
    });
    res.status(500).json({ message: error.message });
  }
};

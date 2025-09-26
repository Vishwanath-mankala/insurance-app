import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import UserPolicy from "../models/UserPolicy.js";
import { v4 as uuidv4 } from "uuid";

// Record a payment
export const recordPayment = async ({
  userId,
  userPolicyId,
  amount,
  method,
}) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Ensure userPolicy exists & belongs to user
    const userPolicy = await UserPolicy.findOne({ _id: userPolicyId, userId });
    if (!userPolicy) {
      throw new Error("Policy not found or not owned by user");
    }
     if (userPolicy.status !== "active") {
      throw new Error(`Payment not allowed. Policy status is '${userPolicy.status}'`);
    }
    const now = new Date();
    if (userPolicy.endDate && new Date(userPolicy.endDate) < now) {
      throw new Error("Payment not allowed. Policy has expired");
    }
    const reference = `PAY-${uuidv4()}`;

    // Create payment record
    const payment = new Payment({
      userId,
      userPolicyId,
      amount,
      method,
      reference,
    });

    await payment.save();
    return payment;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Payment failed: " + error.message);
  }
};

// List all payments for a user
export const getUserPayments = async (userId) => {
  return Payment.find({ userId }).populate("userPolicyId").exec();
};

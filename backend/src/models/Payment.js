import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userPolicyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserPolicy",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ["CARD", "NETBANKING", "OFFLINE", "SIMULATED"], // restrict to valid payment methods
    required: true,
  },
  reference: {
    type: String, // e.g., transaction ID, receipt number, etc.
    required: true,
    unique: true, // optional, ensures no duplicate references
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;

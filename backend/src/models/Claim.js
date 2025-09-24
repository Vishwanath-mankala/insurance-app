import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
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
  incidentDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amountClaimed: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"], // only allow these values
    default: "PENDING",
  },
  decisionNotes: {
    type: String,
  },
  decidedByAgentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent", // or "User" if agents are stored in the same collection
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Claim = mongoose.model("Claim", claimSchema);

export default Claim;

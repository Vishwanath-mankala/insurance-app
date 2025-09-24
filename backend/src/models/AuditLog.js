import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  actorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // or "Agent" depending on who performs actions
    required: true,
  },
  details: {
    type: Object, // flexible field to store extra metadata (policyId, claimId, etc.)
    default: {},
  },
  ip: {
    type: String, // store client IP address if available
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;

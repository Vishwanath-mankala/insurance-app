import AuditLog from "../models/AuditLog.js";
import User from "../models/User.js";
import UserPolicy from "../models/UserPolicy.js";
import Claim from "../models/Claim.js";
import Payment from "../models/Payment.js";

/**
 * Get last N audit logs
 */
export const getAuditLogs = async (limit = 50) => {
  const logs = await AuditLog.find()
    .sort({ timestamp: -1 })
    .limit(limit)
    .populate("actorId", "name email role"); // optional, get user details
  return logs;
};

/**
 * Get minimal admin summary KPIs
 */
export const getAdminSummary = async () => {
  const [userCount, policyCount, pendingClaimsCount, totalPayments] = await Promise.all([
    User.countDocuments(),
    UserPolicy.countDocuments({ status: "active" }),
    Claim.countDocuments({ status: "PENDING" }),
    Payment.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]),
  ]);

  return {
    userCount,
    policiesSold: policyCount,
    claimsPending: pendingClaimsCount,
    totalPayments: totalPayments[0]?.total || 0,
  };
};

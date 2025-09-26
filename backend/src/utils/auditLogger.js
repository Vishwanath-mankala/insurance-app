// utils/auditLogger.js
import AuditLog from "../models/AuditLog.js";

export const logAction = async ({ action, actorId, details = {}, ip }) => {
  try {
    const log = new AuditLog({
      action,
      actorId,
      details,
      ip,
    });
    await log.save();
  } catch (err) {
    console.error("Audit log failed:", err.message);
  }
};

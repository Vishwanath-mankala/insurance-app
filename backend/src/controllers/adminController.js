import * as adminService from "../services/adminService.js";
import { logAction } from "../utils/auditLogger.js";

/**
 * GET /api/v1/admin/audit
 */
export const getAuditLogsController = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const logs = await adminService.getAuditLogs(limit);

    await logAction({
      action: "GET_AUDIT_LOGS_SUCCESS",
      actorId: req.user?.userId,
      details: { query: req.query },
      ip: req.ip,
    });

    res.status(200).json(logs);
  } catch (err) {
    await logAction({
      action: "GET_AUDIT_LOGS_FAILED",
      actorId: req.user?.userId,
      details: { query: req.query, error: err.message },
      ip: req.ip,
    });
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/v1/admin/summary
 */
export const getAdminSummaryController = async (req, res) => {
  try {
    const summary = await adminService.getAdminSummary();

    await logAction({
      action: "GET_ADMIN_SUMMARY_SUCCESS",
      actorId: req.user?.userId,
      ip: req.ip,
    });

    res.status(200).json(summary);
  } catch (err) {
    await logAction({
      action: "GET_ADMIN_SUMMARY_FAILED",
      actorId: req.user?.userId,
      details: { error: err.message },
      ip: req.ip,
    });
    res.status(500).json({ message: err.message });
  }
};

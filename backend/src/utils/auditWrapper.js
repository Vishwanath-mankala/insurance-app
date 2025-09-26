import { logAction } from "./auditLogger.js";

export const withAudit = (actionName, fn) => {
  return async (req, res, next) => {
    const actorId = req.user?._id || null;
    const ip = req.ip;

    try {
      const result = await fn(req, res, next);

      // Log success
      await logAction({
        action: `${actionName}_SUCCESS`,
        actorId,
        details: {
          method: req.method,
          url: req.originalUrl,
          body: req.body,
          params: req.params,
          result,
        },
        ip,
      });

      return result;
    } catch (error) {
      // Log failure
      await logAction({
        action: `${actionName}_FAILED`,
        actorId,
        details: {
          method: req.method,
          url: req.originalUrl,
          body: req.body,
          params: req.params,
          error: error.message,
        },
        ip,
      });

  res.status(400).json({ message: error.message });    }
  };
};

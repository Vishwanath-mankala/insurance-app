import {
  submitClaim,
  getClaims,
  getClaimById,
  updateClaimStatus,
} from "../services/claimService.js";
import { logAction } from "../utils/auditLogger.js";

// POST /api/v1/claims
export const submitClaimController = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const { userPolicyId, incidentDate, description, amountClaimed } = req.body;

    const claim = await submitClaim({
      userId: actorId,
      userPolicyId,
      incidentDate,
      description,
      amountClaimed,
    });

    await logAction({
      action: "SUBMIT_CLAIM_SUCCESS",
      actorId,
      details: { claimId: claim._id, userPolicyId },
      ip: req.ip,
    });

    res.status(201).json({ message: "Claim submitted successfully", claim });
  } catch (error) {
    await logAction({
      action: "SUBMIT_CLAIM_FAILED",
      actorId,
      details: { error: error.message, body: req.body },
      ip: req.ip,
    });
    res.status(500).json({ message: error.message });
  }
};

// GET /api/v1/claims
export const listClaimsController = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const claims = await getClaims(req.user);

    await logAction({
      action: "LIST_CLAIMS_SUCCESS",
      actorId,
      details: { count: claims.length },
      ip: req.ip,
    });

    res.status(200).json(claims);
  } catch (error) {
    await logAction({
      action: "LIST_CLAIMS_FAILED",
      actorId,
      details: { error: error.message },
      ip: req.ip,
    });
    res.status(500).json({ message: error.message });
  }
};

// GET /api/v1/claims/:id
export const claimDetailController = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const claim = await getClaimById(req.params.id);
    if (!claim) {
      await logAction({
        action: "CLAIM_DETAIL_FAILED",
        actorId,
        details: { error: "Not found", claimId: req.params.id },
        ip: req.ip,
      });
      return res.status(404).json({ message: "Claim not found" });
    }

    if (
      req.user.role === "customer" &&
      claim.userId._id.toString() !== req.user.userId.toString()
    ) {
      await logAction({
        action: "CLAIM_DETAIL_FORBIDDEN",
        actorId,
        details: { claimId: req.params.id },
        ip: req.ip,
      });
      return res.status(403).json({ message: "Access denied" });
    }

    await logAction({
      action: "CLAIM_DETAIL_SUCCESS",
      actorId,
      details: { claimId: claim._id },
      ip: req.ip,
    });

    res.status(200).json(claim);
  } catch (error) {
    await logAction({
      action: "CLAIM_DETAIL_FAILED",
      actorId,
      details: { error: error.message },
      ip: req.ip,
    });
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/v1/claims/:id/status
export const updateClaimStatusController = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const { status, decisionNotes } = req.body;

    const claim = await updateClaimStatus(req.params.id, {
      status,
      decisionNotes,
      agentId: actorId,
    });

    if (!claim) {
      await logAction({
        action: "UPDATE_CLAIM_STATUS_FAILED",
        actorId,
        details: { error: "Not found", claimId: req.params.id },
        ip: req.ip,
      });
      return res.status(404).json({ message: "Claim not found" });
    }

    await logAction({
      action: "UPDATE_CLAIM_STATUS_SUCCESS",
      actorId,
      details: { claimId: claim._id, status },
      ip: req.ip,
    });

    res.status(200).json({ message: "Claim status updated", claim });
  } catch (error) {
    await logAction({
      action: "UPDATE_CLAIM_STATUS_FAILED",
      actorId,
      details: { error: error.message, body: req.body },
      ip: req.ip,
    });
    res.status(500).json({ message: error.message });
  }
};

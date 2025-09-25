import {
  submitClaim,
  getClaims,
  getClaimById,
  updateClaimStatus,
} from "../services/claimService.js";

// POST /api/v1/claims
export const submitClaimController = async (req, res) => {
  try {
    const { userPolicyId, incidentDate, description, amountClaimed } = req.body;

    const claim = await submitClaim({
      userId: req.user._id, // customer making the claim
      userPolicyId,
      incidentDate,
      description,
      amountClaimed,
    });

    res.status(201).json({ message: "Claim submitted successfully", claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/v1/claims
export const listClaimsController = async (req, res) => {
  try {
    const claims = await getClaims(req.user);
    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/v1/claims/:id
export const claimDetailController = async (req, res) => {
  try {
    const claim = await getClaimById(req.params.id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    // Only admin/agent OR claim owner can view
    if (
      req.user.role === "customer" &&
      claim.userId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/v1/claims/:id/status
export const updateClaimStatusController = async (req, res) => {
  try {
    const { status, decisionNotes } = req.body;

    const claim = await updateClaimStatus(req.params.id, {
      status,
      decisionNotes,
      agentId: req.user._id,
    });

    if (!claim) return res.status(404).json({ message: "Claim not found" });

    res.status(200).json({ message: "Claim status updated", claim });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

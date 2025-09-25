import Claim from "../models/Claim.js";

// Submit a new claim
export const submitClaim = async (data) => {
  const claim = new Claim(data);
  await claim.save();
  return claim;
};

// List claims (admin/agent -> all, customer -> own)
export const getClaims = async (user) => {
  if (user.role === "admin" || user.role === "agent") {
    return Claim.find()
      .populate("userId", "name email")
      .populate("userPolicyId");
  }

  // Customer sees only their claims
  return Claim.find({ userId: user._id }).populate("userPolicyId");
};

// Claim detail (role-based access handled in controller)
export const getClaimById = async (id) => {
  return Claim.findById(id)
    .populate("userId", "name email")
    .populate("userPolicyId");
};

// Update status (agent/admin only)
export const updateClaimStatus = async (id, { status, decisionNotes, agentId }) => {
  return Claim.findByIdAndUpdate(
    id,
    {
      status,
      decisionNotes,
      decidedByAgentId: agentId,
    },
    { new: true }
  );
};

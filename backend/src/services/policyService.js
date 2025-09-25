import PolicyProduct from "../models/PolicyProduct.js";
import UserPolicy from "../models/UserPolicy.js";
import Claim from "../models/Claim.js";

// --- PolicyProduct Services ---

export const getAllPolicies = async () => {
  return await PolicyProduct.find();
};

export const getPolicyDetails = async (id) => {
  const policy = await PolicyProduct.findById(id);
  if (!policy) throw new Error("Policy not found");
  return policy;
};

export const createPolicy = async (policyData) => {
  if (!policyData.code || !policyData.title) throw new Error("Code and Title are required");
  return await PolicyProduct.create(policyData);
};

export const deletePolicy = async (id) => {
  const policy = await PolicyProduct.findByIdAndDelete(id);
  if (!policy) throw new Error("Policy not found");
  return policy;
};

// --- UserPolicy Services ---

export const purchasePolicy = async (userId, policyProductId, { termMonths, nominee, assignedAgentId }) => {
  const policyProduct = await PolicyProduct.findById(policyProductId);
  if (!policyProduct) throw new Error("Policy Product not found");

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + termMonths);

  return await UserPolicy.create({
    userId,
    policyProductId,
    startDate,
    endDate,
    assignedAgentId,
    premiumPaid: policyProduct.premium,
    status: "active",
    nominee,
    createdAt: Date.now(),
  });
};

export const getUserPolicies = async (userId) => {
  return await UserPolicy.find({ userId })
    .populate("policyProductId") // fetch full product details
    .exec();
};

export const cancelPolicy = async (userId, policyId) => {
  // Optional: prevent cancellation if pending claims exist
  const pendingClaims = await Claim.find({ userPolicyId: policyId, status: "PENDING" });
  if (pendingClaims.length > 0) {
    throw new Error("Cannot cancel policy with pending claims");
  }

  const cancelledPolicy = await UserPolicy.findOneAndUpdate(
    { _id: policyId, userId, status: "active" },
    { status: "cancelled" },
    { new: true }
  );

  if (!cancelledPolicy) throw new Error("Policy not found, not active, or not owned by user");

  return cancelledPolicy;
};

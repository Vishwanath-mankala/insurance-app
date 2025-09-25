import * as policyService from "../services/policyService.js";

// Get all available policy products
export const getAllPolicies = async (req, res) => {
  try {
    const policies = await policyService.getAll();
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get details of a specific policy product
export const getPolicyDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const policy = await policyService.getPolicyDetails(id);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }
    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Purchase a new policy
export const purchasePolicy = async (req, res) => {
  try {
    const { userId, policyProductId, startDate, termMonths, nominee } = req.body;

    const newPolicy = await policyService.purchasePolicy(
      userId,
      policyProductId,
      { startDate, termMonths, nominee }
    );

    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List all policies owned by a user
export const getUserPolicies = async (req, res) => {
  try {
    const { userId } = req.params;
    const policies = await policyService.getUserPolicies(userId);
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a user’s active policy
export const cancelPolicy = async (req, res) => {
  try {
    const { userId, policyId } = req.body;

    const cancelledPolicy = await policyService.cancelPolicy(userId, policyId);

    res.status(200).json({
      message: "Policy cancelled successfully",
      policy: cancelledPolicy,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

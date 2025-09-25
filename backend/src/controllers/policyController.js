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
    if (!req.user && req.user.role !== "customer") {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const userId = req.user.userId; // ✅ from auth middleware
    const { termMonths, nominee, assignedAgentId } = req.body;
    const { id: policyProductId } = req.params;

    const newPolicy = await policyService.purchasePolicy(
      userId,
      policyProductId,
      { termMonths, nominee, assignedAgentId }
    );

    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List all policies owned by current user
export const getUserPolicies = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from auth
    const policies = await policyService.getUserPolicies(userId);
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel a user’s active policy
export const cancelPolicy = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from auth
    const { id: policyId } = req.params;

    const cancelledPolicy = await policyService.cancelPolicy(userId, policyId);

    res.status(200).json({
      message: "Policy cancelled successfully",
      policy: cancelledPolicy,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPolicyController = async (req, res) => {
  try {
    const policyData = req.body;

    // Validate basic input (optional, can add Joi or Yup later)
    if (!policyData.code || !policyData.title) {
      return res.status(400).json({ message: "Code and Title are required" });
    }

    const policy = await policyService.createPolicy(policyData);

    res.status(201).json({
      message: "Policy created successfully",
      policy,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePolicyController = async (req, res) => {
  try {
    const { id } = req.params;

    const policy = await policyService.deletePolicy(id);

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.status(200).json({
      message: "Policy deleted successfully",
      deletedPolicy: policy,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

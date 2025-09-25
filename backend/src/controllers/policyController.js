import * as policyService from "../services/policyService.js";

// --- PolicyProduct Controllers ---

export const getAllPolicies = async (req, res) => {
  try {
    const policies = await policyService.getAllPolicies();
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPolicyDetails = async (req, res) => {
  try {
    const policy = await policyService.getPolicyDetails(req.params.id);
    res.status(200).json(policy);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPolicy = async (req, res) => {
  try {
    const policy = await policyService.createPolicy(req.body);
    res.status(201).json({ message: "Policy created successfully", policy });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePolicy = async (req, res) => {
  try {
    const policy = await policyService.deletePolicy(req.params.id);
    res.status(200).json({ message: "Policy deleted successfully", deletedPolicy: policy });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// --- UserPolicy Controllers ---

export const purchasePolicy = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "customer")
      return res.status(401).json({ message: "Unauthorized access" });

    const userId = req.user.userId;
    const policyProductId = req.params.id;
    const { termMonths, nominee, assignedAgentId } = req.body;

    const newPolicy = await policyService.purchasePolicy(userId, policyProductId, { termMonths, nominee, assignedAgentId });
    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserPolicies = async (req, res) => {
  try {
    const userId = req.user.userId;
    const policies = await policyService.getUserPolicies(userId);
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelPolicy = async (req, res) => {
  try {
    const userId = req.user.userId;
    const policyId = req.params.id;

    const cancelledPolicy = await policyService.cancelPolicy(userId, policyId);
    res.status(200).json({ message: "Policy cancelled successfully", policy: cancelledPolicy });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

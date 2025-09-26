import * as policyService from "../services/policyService.js";
import { logAction } from "../utils/auditLogger.js";

// --- PolicyProduct Controllers ---

export const getAllPolicies = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const policies = await policyService.getAllPolicies();

    await logAction({
      action: "GET_ALL_POLICIES_SUCCESS",
      actorId,
      details: { count: policies.length },
      ip: req.ip,
    });

    res.status(200).json(policies);
  } catch (error) {
    await logAction({
      action: "GET_ALL_POLICIES_FAILED",
      actorId,
      details: { error: error.message },
      ip: req.ip,
    });
    res.status(500).json({ message: error.message });
  }
};

export const getPolicyDetails = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const policy = await policyService.getPolicyDetails(req.params.id);

    await logAction({
      action: "GET_POLICY_DETAILS_SUCCESS",
      actorId,
      details: { policyId: req.params.id },
      ip: req.ip,
    });

    res.status(200).json(policy);
  } catch (error) {
    await logAction({
      action: "GET_POLICY_DETAILS_FAILED",
      actorId,
      details: { error: error.message, policyId: req.params.id },
      ip: req.ip,
    });
    res.status(404).json({ message: error.message });
  }
};

export const createPolicy = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const policy = await policyService.createPolicy(req.body);

    await logAction({
      action: "CREATE_POLICY_SUCCESS",
      actorId,
      details: { policyId: policy._id },
      ip: req.ip,
    });

    res.status(201).json({ message: "Policy created successfully", policy });
  } catch (error) {
    await logAction({
      action: "CREATE_POLICY_FAILED",
      actorId,
      details: { error: error.message, body: req.body },
      ip: req.ip,
    });
    res.status(400).json({ message: error.message });
  }
};

export const deletePolicy = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const policy = await policyService.deletePolicy(req.params.id);

    await logAction({
      action: "DELETE_POLICY_SUCCESS",
      actorId,
      details: { policyId: req.params.id },
      ip: req.ip,
    });

    res.status(200).json({ message: "Policy deleted successfully", deletedPolicy: policy });
  } catch (error) {
    await logAction({
      action: "DELETE_POLICY_FAILED",
      actorId,
      details: { error: error.message, policyId: req.params.id },
      ip: req.ip,
    });
    res.status(404).json({ message: error.message });
  }
};

// --- UserPolicy Controllers ---

export const purchasePolicy = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    if (!req.user || req.user.role !== "customer")
      return res.status(401).json({ message: "Unauthorized access" });

    const policyProductId = req.params.id;
    const { termMonths, nominee, assignedAgentId } = req.body;

    const newPolicy = await policyService.purchasePolicy(actorId, policyProductId, { termMonths, nominee, assignedAgentId });

    await logAction({
      action: "PURCHASE_POLICY_SUCCESS",
      actorId,
      details: { policyId: newPolicy._id, productId: policyProductId },
      ip: req.ip,
    });

    res.status(201).json(newPolicy);
  } catch (error) {
    await logAction({
      action: "PURCHASE_POLICY_FAILED",
      actorId,
      details: { error: error.message, body: req.body },
      ip: req.ip,
    });
    res.status(400).json({ message: error.message });
  }
};

export const getUserPolicies = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const policies = await policyService.getUserPolicies(actorId);

    await logAction({
      action: "GET_USER_POLICIES_SUCCESS",
      actorId,
      details: { count: policies.length },
      ip: req.ip,
    });

    res.status(200).json(policies);
  } catch (error) {
    await logAction({
      action: "GET_USER_POLICIES_FAILED",
      actorId,
      details: { error: error.message },
      ip: req.ip,
    });
    res.status(500).json({ message: error.message });
  }
};

export const cancelPolicy = async (req, res) => {
  const actorId = req.user?.userId;
  try {
    const policyId = req.params.id;
    const cancelledPolicy = await policyService.cancelPolicy(actorId, policyId);

    await logAction({
      action: "CANCEL_POLICY_SUCCESS",
      actorId,
      details: { policyId },
      ip: req.ip,
    });

    res.status(200).json({ message: "Policy cancelled successfully", policy: cancelledPolicy });
  } catch (error) {
    await logAction({
      action: "CANCEL_POLICY_FAILED",
      actorId,
      details: { error: error.message, policyId: req.params.id },
      ip: req.ip,
    });
    res.status(400).json({ message: error.message });
  }
};

import * as agentService from "../services/agentService.js";
import { logAction } from "../utils/auditLogger.js";

// GET /api/v1/agents
export const getAgents = async (req, res) => {
  try {
    const agents = await agentService.getAgents();

    await logAction({
      action: "GET_AGENTS_SUCCESS",
      actorId: req.user?._id,
      ip: req.ip,
    });

    res.status(200).json(agents);
  } catch (error) {
    await logAction({
      action: "GET_AGENTS_FAILED",
      actorId: req.user?._id,
      details: { error: error.message },
      ip: req.ip,
    });
    res.status(500).json({ message: error.message });
  }
};

// POST /api/v1/agents
export const createAgent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const agent = await agentService.createAgent({ name, email, password });

    await logAction({
      action: "CREATE_AGENT_SUCCESS",
      actorId: req.user?._id,
      details: { email },
      ip: req.ip,
    });

    res.status(201).json({ message: "Agent created successfully", agent });
  } catch (error) {
    await logAction({
      action: "CREATE_AGENT_FAILED",
      actorId: req.user?._id,
      details: { body: req.body, error: error.message },
      ip: req.ip,
    });
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/v1/agents/:id/assign
export const assignAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userPolicyId } = req.body;

    const updatedPolicy = await agentService.assignAgent(id, userPolicyId);

    await logAction({
      action: "ASSIGN_AGENT_SUCCESS",
      actorId: req.user?._id,
      details: { id, userPolicyId },
      ip: req.ip,
    });

    res.status(200).json({ message: "Agent assigned successfully", policy: updatedPolicy });
  } catch (error) {
    await logAction({
      action: "ASSIGN_AGENT_FAILED",
      actorId: req.user?._id,
      details: { body: req.body, error: error.message },
      ip: req.ip,
    });
    res.status(400).json({ message: error.message });
  }
};

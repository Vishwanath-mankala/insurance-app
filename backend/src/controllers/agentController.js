import * as agentService from "../services/agentService.js";

// GET /api/v1/agents
export const getAgents = async (req, res) => {
  try {
    const agents = await agentService.getAgents();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/v1/agents
export const createAgent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const agent = await agentService.createAgent({ name, email, password });
    res.status(201).json({
      message: "Agent created successfully",
      agent,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/v1/agents/:id/assign
export const assignAgent = async (req, res) => {
  try {
    const { id } = req.params; // agentId
    const { userPolicyId } = req.body;

    const updatedPolicy = await agentService.assignAgent(id, userPolicyId);

    res.status(200).json({
      message: "Agent assigned successfully",
      policy: updatedPolicy,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

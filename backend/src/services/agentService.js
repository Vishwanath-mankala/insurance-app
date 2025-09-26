import User from "../models/User.js";
import UserPolicy from "../models/UserPolicy.js"; // to assign agents to policies

// Get all agents (admin only)
export const getAgents = async () => {
  return await User.find({ role: "agent" }).select("-passwordHash");
};

// Create new agent
export const createAgent = async ({ name, email, password }) => {
  // Check if email already exists
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Agent with this email already exists");
  }

  const agent = new User({
    name,
    email,
    passwordHash: password, // hashed via pre-save hook
    role: "agent",
  });

  await agent.save();
  return agent;
};

// Assign agent to a policy (or claim later)
export const assignAgent = async (agentId, userPolicyId) => {
  const agent = await User.findOne({ _id: agentId, role: "agent" });
  if (!agent) {
    throw new Error("Agent not found");
  }

  const updatedPolicy = await UserPolicy.findByIdAndUpdate(
    userPolicyId,
    { assignedAgentId: agentId },
    { new: true }
  ).populate("assignedAgentId", "name email");

  if (!updatedPolicy) {
    throw new Error("Policy not found");
  }

  return updatedPolicy;
};

import PolicyProduct from "../models/PolicyProduct.js";
import userPolicy from "../models/UserPolicy.js";

export const getAll = async () => {
  try {
    const allPolicies = await PolicyProduct.find();
    return allPolicies;
  } catch (error) {
    throw new Error("Error fetching policies: " + error.message);
  }
};

export const getPolicyDetails = async (id) => {
  try {
    const policyDetails = await PolicyProduct.findOne({ _id: id });
    return policyDetails;
  } catch (error) {
    throw new Error("Error fetching policies: " + error.message);
  }
};
export const createPolicy = async (policyData) => {
  try {
    const policy = new PolicyProduct(policyData);
    await policy.save();
    return policy;
  } catch (error) {
    throw new Error(error.message || "Error creating policy");
  }
};

export const deletePolicy = async (id) => {
  try {
    const policy = await PolicyProduct.findByIdAndDelete(id);
    return policy; // null if not found
  } catch (error) {
    throw new Error(error.message || "Error deleting policy");
  }
};

export const purchasePolicy = async (userId, policyProductId, policyData) => {
  try {
    const { termMonths, nominee, assignedAgentId } = policyData;
    const policyProduct = await PolicyProduct.findOne({ _id: policyProductId });
    if (!policyProduct) throw new Error("Policy Product not found");
    const startDate = new Date();
    // Logic to save the purchased policy to the database
    const userPurchasedPolicy = await userPolicy.create({
      userId: userId,
      policyProductId: policyProductId,
      startDate: startDate,
      endDate: new Date(
        new Date(startDate).setMonth(
          new Date(startDate).getMonth() + termMonths
        )
      ),
      assignedAgentId: assignedAgentId,
      premiumPaid: policyProduct.premium,
      status: "active",
      nominee: nominee,
      createdAt: Date.now(),
    });
    userPurchasedPolicy.save();

    return userPurchasedPolicy;
  } catch (error) {
    throw new Error("Error purchasing policy:" + error.message);
  }
};
export const getUserPolicies = async (userId) => {
  try {
    const policies = await userPolicy
      .find({ userId })
      .populate("policyProductId") // fetch full details of the product
      .exec();

    return policies;
  } catch (error) {
    throw new Error("Error fetching user policies: " + error.message);
  }
};

export const cancelPolicy = async (userId, policyId) => {
  try {
    const cancelledPolicy = await userPolicy.findOneAndUpdate(
      { _id: policyId, userId, status: "active" },
      { status: "cancelled" },
      { new: true } // return the updated document
    );

    if (!cancelledPolicy) {
      throw new Error("Policy not found or not owned by user");
    }

    return cancelledPolicy;
  } catch (error) {
    throw new Error("Error cancelling policy: " + error.message);
  }
};

import Joi from "joi";
import { register_, login_ } from "../services/authService.js";
import { logAction } from "../utils/auditLogger.js";

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("customer", "agent", "admin").default("customer"),
});
const credentialSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const register = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, password, role } = req.body;
    const response = await register_({ userData: { name, email, password, role } });

    await logAction({
      action: "REGISTER_SUCCESS",
      actorId: response.userId,
      details: { email, role },
      ip: req.ip,
    });

    res.status(201).json(response);
  } catch (err) {
    await logAction({
      action: "REGISTER_FAILED",
      details: { body: req.body, error: err.message },
      ip: req.ip,
    });
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = credentialSchema.validate({ email, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const response = await login_({ email, password });

    await logAction({
      action: "LOGIN_SUCCESS",
      actorId: response.userData.userId,
      details: { email },
      ip: req.ip,
    });

    res.status(200).json({ message: "Logged In successfully", ...response });
  } catch (err) {
    await logAction({
      action: "LOGIN_FAILED",
      details: { body: req.body, error: err.message },
      ip: req.ip,
    });
    res.status(500).json({ message: err.message });
  }
};

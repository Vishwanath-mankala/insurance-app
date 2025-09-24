import User from "../models/User.js";
import Joi from "joi";
import { register_, login_ } from "../services/authService.js";

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
    const response = await register_({
      userData: { name, email, password, role },
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = credentialSchema.validate({email, password});
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const response = await login_({ email, password });
    res
      .status(200)
      .json({ message: "Logged In successfully", ...response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

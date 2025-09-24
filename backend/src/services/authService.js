import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register_ = async ({ userData }) => {
  const { name, email, password, role } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const newUser = new User({ name, email, passwordHash:password, role });
  await newUser.save();
  return { message: "User registered successfully", userId: newUser._id };
};

export const login_ = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email not found");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.SECRET,
    { expiresIn: "1d" }
  );
  return {
    token,
    userData: { userId: user._id, name: user.name, role: user.role },
  };
};

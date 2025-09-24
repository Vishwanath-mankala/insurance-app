import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "admin","agent"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt:{
    type:Date,
    default:Date.now
  }
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.passwordHash = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model("User", userSchema);

export default User;
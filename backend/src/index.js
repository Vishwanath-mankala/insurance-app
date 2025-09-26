import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js"
import policyRoutes from "./routes/policyRoutes.js"
import userPolicyRoutes from "./routes/userPolicyRoutes.js"
import claimRoutes from "./routes/claimRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import agentRoutes from "./routes/agentRoutes.js"

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const startServer = async () => {
    app.use("/api/v1/claims", claimRoutes);
    app.use("/api/v1/policies", policyRoutes);
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/user", userPolicyRoutes);
    app.use("/api/v1/payments", paymentRoutes);
    app.use("/api/v1/agents", agentRoutes);
  //   app.use("/api/v1/admin", adminRoutes);
  
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Mongo DB connected successfully`);
      const PORT = process.env.PORT;
      app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}/`);
      });
    })
    .catch((err) => console.log(err));
};
startServer();

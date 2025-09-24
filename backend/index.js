const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const startServer = async () => {
  app.use("/api/v1/claims", claimRoutes);
  app.use("/api/v1/policies", policyRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/payments", paymentRoutes);
  app.use("/api/v1/agents", agentRoutes);
  app.use("/api/v1/admin", adminRoutes);

  app.use(
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        authMiddleware(req, res, () => {});
        return { user: req.user };
      },
    })
  );
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Mongo DB connected successfully`);
      const PORT = process.env.PORT
      app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}/`);
      });
    })
    .catch((err) => console.log(err));
};
startServer();

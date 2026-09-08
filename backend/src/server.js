const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const auditRoutes = require("./routes/auditRoutes");

const connectDB = require("./config/db");
const {
    initializeClamAV
} = require("./services/clamavService");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/audit", auditRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "SecureOps API",
    status: "running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "secureops-api",
  });
});

app.get("/api", (req, res) => {
  res.json({
    name: "SecureOps API",
    version: "1.0.0",
    status: "running",
  });
});

const startServer = async () => {
    await connectDB();

    await initializeClamAV();

    app.listen(PORT, () => {
        console.log(`SecureOps API running on port ${PORT}`);
    });
};

startServer();
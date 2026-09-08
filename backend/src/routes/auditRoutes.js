const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getAuditLogs } = require("../controllers/auditController");

const router = express.Router();

router.get("/", authMiddleware, getAuditLogs);

module.exports = router;

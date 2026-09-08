const AuditLog = require("../models/AuditLog");

const getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            logs
        });
    } catch (error) {
        console.error("Get audit logs error:", error);

        res.status(500).json({
            message: "Failed to retrieve audit logs"
        });
    }
};

module.exports = {
    getAuditLogs
};

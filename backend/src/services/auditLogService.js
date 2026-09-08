const AuditLog = require("../models/AuditLog");

const createAuditLog = async ({
    user = null,
    action,
    resource = null,
    details = null,
    ipAddress = null
}) => {
    try {
        await AuditLog.create({
            user,
            action,
            resource,
            details,
            ipAddress
        });
    } catch (error) {
        console.error("Audit log error:", error);
    }
};

module.exports = {
    createAuditLog
};
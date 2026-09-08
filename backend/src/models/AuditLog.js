const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },

        action: {
            type: String,
            required: true,
            enum: [
                "LOGIN",
                "FILE_UPLOAD",
                "FILE_DOWNLOAD",
                "FILE_DELETE",
                "MALWARE_DETECTED",
                "ROLE_CHANGED",
                "USER_DEACTIVATED"
            ]
        },

        resource: {
            type: String,
            default: null
        },

        details: {
            type: String,
            default: null
        },

        ipAddress: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
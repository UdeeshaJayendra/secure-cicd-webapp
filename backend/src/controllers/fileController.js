const File = require("../models/File");
const crypto = require("crypto");

const {
    initializeClamAV,
    scanBuffer
} = require("../services/clamavService");

const {
    createAuditLog
} = require("../services/auditLogService");

const {
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand
} = require("@aws-sdk/client-s3");
const {
    getSignedUrl
} = require("@aws-sdk/s3-request-presigner");
const s3Client = require("../services/s3Service");

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }
        const scanResult = await scanBuffer(req.file.buffer);

if (scanResult.isInfected) {
    console.log(
        "Malware detected:",
        scanResult.viruses
    );

    await createAuditLog({
        user: req.user._id,
        action: "MALWARE_DETECTED",
        resource: req.file.originalname,
        details: `Malware detected: ${scanResult.viruses.join(", ")}`,
        ipAddress: req.ip
    });

    return res.status(400).json({
        message: "File rejected: malware detected.",
        viruses: scanResult.viruses
    });
}

        const storedName = `${crypto.randomUUID()}-${req.file.originalname}`;

        const s3Command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: storedName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        });

        await s3Client.send(s3Command);

        const file = await File.create({
            originalName: req.file.originalname,
            storedName,
            mimeType: req.file.mimetype,
            size: req.file.size,
            s3Key: storedName,
            uploadedBy: req.user._id
        });

        await createAuditLog({
    user: req.user._id,
    action: "FILE_UPLOAD",
    resource: file._id.toString(),
    details: `Uploaded file: ${file.originalName}`,
    ipAddress: req.ip
});

        res.status(201).json({
            message: "File uploaded successfully",
            file
        });
    } catch (error) {
        console.error("Upload error:", error);

        res.status(500).json({
            message: "Failed to upload file"
        });
    }
};

const getFiles = async (req, res) => {
    try {
        const files = await File.find({
            uploadedBy: req.user._id
        })
            .populate("uploadedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            files
        });
    } catch (error) {
        console.error("Get files error:", error);

        res.status(500).json({
            message: "Failed to retrieve files"
        });
    }
};

const downloadFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        if (file.uploadedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

       const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: file.s3Key,
    ResponseContentDisposition: `attachment; filename="${file.originalName}"`,
    ResponseContentType: "application/octet-stream"
});

        const downloadUrl = await getSignedUrl(
            s3Client,
            command,
            {
                expiresIn: 300
            }
        );

        await createAuditLog({
    user: req.user._id,
    action: "FILE_DOWNLOAD",
    resource: file._id.toString(),
    details: `Downloaded file: ${file.originalName}`,
    ipAddress: req.ip
});

        res.status(200).json({
            downloadUrl
        });

    } catch (error) {
        console.error("Download error:", error);

        res.status(500).json({
            message: "Failed to generate download URL"
        });
    }
};

const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                message: "File not found"
            });
        }

        if (file.uploadedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: file.s3Key
        });

        await s3Client.send(command);

        await File.findByIdAndDelete(file._id);

        await createAuditLog({
    user: req.user._id,
    action: "FILE_DELETE",
    resource: file._id.toString(),
    details: `Deleted file: ${file.originalName}`,
    ipAddress: req.ip
});

        res.status(200).json({
            message: "File deleted successfully"
        });

    } catch (error) {
        console.error("Delete error:", error);

        res.status(500).json({
            message: "Failed to delete file"
        });
    }
};

const getAllFilesAdmin = async (req, res) => {
    try {
        const files = await File.find()
            .populate("uploadedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: files.length,
            files
        });
    } catch (error) {
        console.error("Get all files error:", error);

        res.status(500).json({
            message: "Failed to retrieve all files"
        });
    }
};

module.exports = {
    uploadFile,
    getFiles,
    downloadFile,
    deleteFile,
    getAllFilesAdmin
};
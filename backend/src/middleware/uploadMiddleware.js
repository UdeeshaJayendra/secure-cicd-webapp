const multer = require("multer");

const storage = multer.memoryStorage();

const allowedMimeTypes = [
    "text/plain",
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/zip",
    "application/json",
    "text/csv",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];

const upload = multer({
    storage,

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(
                new Error("File type is not allowed.")
            );
        }

        cb(null, true);
    }
});

module.exports = upload;
const express = require("express");
const multer = require("multer");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
    uploadFile,
    getFiles,
    downloadFile,
    deleteFile,
    
} = require("../controllers/fileController");

const router = express.Router();



// Get files belonging to the logged-in user
router.get(
    "/",
    authMiddleware,
    getFiles
);

// Download a file
router.get(
    "/:id/download",
    authMiddleware,
    downloadFile
);

// Delete a file
router.delete(
    "/:id",
    authMiddleware,
    deleteFile
);

// Upload a new file
router.post(
    "/upload",
    authMiddleware,
    (req, res, next) => {
        upload.single("file")(req, res, (error) => {

            if (error instanceof multer.MulterError) {
                return res.status(400).json({
                    message: error.message
                });
            }

            if (error) {
                return res.status(400).json({
                    message: error.message
                });
            }

            next();
        });
    },
    uploadFile
);

module.exports = router;
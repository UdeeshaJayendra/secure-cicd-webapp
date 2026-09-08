import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function formatFileSize(bytes) {
    if (!bytes) return "0 B";

    const units = ["B", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`;
}

function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) {
        return "Just now";
    }

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    const days = Math.floor(hours / 24);

    return `${days} day${days === 1 ? "" : "s"} ago`;
}

function getFileType(mimeType, fileName) {
    const extension = fileName.split(".").pop()?.toUpperCase();

    if (extension) {
        return extension;
    }

    if (mimeType === "application/pdf") {
        return "PDF";
    }

    return "FILE";
}

function RecentFiles() {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadFiles = async () => {
            try {
                const response = await api.get("/files");

                setFiles((response.data.files || []).slice(0, 5));
            } catch (error) {
                console.error("Recent files error:", error);
            }
        };

        loadFiles();
    }, []);

    return (
        <div className="panel recent-files">

            <div className="panel-header">

                <div>
                    <h2>Recent Files</h2>
                    <p>Recently modified files</p>
                </div>

                <button
                    className="view-all"
                    onClick={() => navigate("/files")}
                >
                    View all ?
                </button>

            </div>


            <div className="files-table">

                <div className="table-header">
                    <span>Name</span>
                    <span>Type</span>
                    <span>Size</span>
                    <span>Modified</span>
                </div>


                {files.length === 0 ? (

                    <div className="table-row">
                        <span>No files uploaded yet.</span>
                    </div>

                ) : (

                    files.map((file) => {

                        const type = getFileType(
                            file.mimeType,
                            file.originalName
                        );

                        return (
                            <div
                                className="table-row"
                                key={file._id}
                            >

                                <div className="file-name">

                                    <div className="file-icon">
                                        {type === "PDF" ? "P" : "F"}
                                    </div>

                                    <span>{file.originalName}</span>

                                </div>

                                <span className="file-type">
                                    {type}
                                </span>

                                <span>
                                    {formatFileSize(file.size)}
                                </span>

                                <span className="modified">
                                    {formatTimeAgo(file.createdAt)}
                                </span>

                            </div>
                        );

                    })

                )}

            </div>

        </div>
    );
}

export default RecentFiles;

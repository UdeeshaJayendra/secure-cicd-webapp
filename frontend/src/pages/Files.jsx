import React, { useEffect, useRef, useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../services/api";

function Files() {
    const fileInputRef = useRef(null);

    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchFiles = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/files", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setFiles(response.data.files || []);
        } catch (error) {
            console.error("Get files error:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to load files."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) {
            return;
        }

        setUploading(true);
        setMessage("");

        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            const token = localStorage.getItem("token");

            const response = await api.post("/files/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Upload response:", response.data);

            setMessage("File uploaded successfully.");

            await fetchFiles();
        } catch (error) {
            console.error("Upload error:", error);
            console.log("Backend response:", error.response?.data);

            setMessage(
                error.response?.data?.message ||
                "File upload failed."
            );
        } finally {
            setUploading(false);
            event.target.value = "";
        }
    };

    const handleDownload = async (fileId, fileName) => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get(
            `/files/${fileId}/download`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const fileResponse = await fetch(response.data.downloadUrl);

        if (!fileResponse.ok) {
            throw new Error("Failed to download file");
        }

        const blob = await fileResponse.blob();

        const blobUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(blobUrl);

    } catch (error) {
        console.error("Download error:", error);

        setMessage(
            error.response?.data?.message ||
            "File download failed."
        );
    }
};

const handleDelete = async (fileId) => {
    try {
        const token = localStorage.getItem("token");

        await api.delete(`/files/${fileId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setMessage("File deleted successfully.");

        await fetchFiles();

    } catch (error) {
        console.error("Delete error:", error);

        setMessage(
            error.response?.data?.message ||
            "File deletion failed."
        );
    }
};


    const formatFileSize = (bytes) => {
        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="app">

            <Sidebar />

            <div className="main">

                <Topbar />

                <main className="dashboard files-page">

                    <div className="page-heading">

                        <div>
                            <p className="eyebrow">FILE MANAGEMENT</p>

                            <h1>Files</h1>

                            <p>
                                Manage and organize your team's files securely.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="upload-button"
                            onClick={handleUploadClick}
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "+ Upload File"}
                        </button>

                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />

                    {message && (
                        <div className="upload-message">
                            {message}
                        </div>
                    )}

                    <div className="files-container">

                        <div className="files-toolbar">

                            <div className="file-search-wrapper">
                                <span className="search-icon">⌕</span>

                                <input
                                    type="text"
                                    placeholder="Search files..."
                                    className="file-search"
                                />
                            </div>

                            <select className="file-filter">
                                <option>All Files</option>
                                <option>Documents</option>
                                <option>Images</option>
                                <option>PDFs</option>
                            </select>

                        </div>

                        {loading ? (
                            <div className="empty-files">
                                <h2>Loading files...</h2>
                            </div>
                        ) : files.length === 0 ? (
                            <div className="empty-files">

                                <div className="empty-file-icon">
                                    □
                                </div>

                                <h2>No files yet</h2>

                                <p>
                                    Upload your first file to start managing
                                    your team's documents securely.
                                </p>

                            </div>
                        ) : (
                            <div className="file-list">

                                {files.map((file) => (
                                    <div
                                        className="file-row"
                                        key={file._id}
                                    >

                                        <div className="file-icon">
                                            □
                                        </div>

                                        <div className="file-details">

                                            <strong>
                                                {file.originalName}
                                            </strong>

                                            <span>
                                                {file.mimeType}
                                            </span>

                                        </div>

                                        <div className="file-size">
                                            {formatFileSize(file.size)}
                                        </div>

                                        <div className="file-date">
                                            {formatDate(file.createdAt)}
                                        </div>

                                        <button
    type="button"
    className="download-button"
    onClick={() => handleDownload(file._id, file.originalName)}
>
    Download
</button>

<button
    type="button"
    className="delete-button"
    onClick={() => handleDelete(file._id)}
>
    Delete
</button>

                                    </div>
                                ))}

                            </div>
                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Files;
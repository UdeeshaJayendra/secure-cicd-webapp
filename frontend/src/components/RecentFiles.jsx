import React from "react";

const files = [
  {
    name: "Project Architecture.pdf",
    type: "PDF",
    size: "4.8 MB",
    modified: "2 minutes ago",
  },
  {
    name: "backend-source.zip",
    type: "ZIP",
    size: "18.2 MB",
    modified: "24 minutes ago",
  },
  {
    name: "database-schema.sql",
    type: "SQL",
    size: "2.4 MB",
    modified: "1 hour ago",
  },
  {
    name: "security-report.pdf",
    type: "PDF",
    size: "8.7 MB",
    modified: "3 hours ago",
  },
];

function RecentFiles() {
  return (
    <div className="panel recent-files">
      <div className="panel-header">
        <div>
          <h2>Recent Files</h2>
          <p>Recently modified files</p>
        </div>

        <button className="view-all">
          View all →
        </button>
      </div>

      <div className="files-table">
        <div className="table-header">
          <span>Name</span>
          <span>Type</span>
          <span>Size</span>
          <span>Modified</span>
        </div>

        {files.map((file) => (
          <div className="table-row" key={file.name}>
            <div className="file-name">
              <div className="file-icon">
                {file.type === "PDF" ? "P" : "F"}
              </div>

              <span>{file.name}</span>
            </div>

            <span className="file-type">
              {file.type}
            </span>

            <span>{file.size}</span>

            <span className="modified">
              {file.modified}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentFiles;
import React from "react";

const activities = [
  {
    action: "File uploaded",
    description: "backend-source.zip",
    time: "24 minutes ago",
  },
  {
    action: "User joined",
    description: "Sarah joined the development team",
    time: "1 hour ago",
  },
  {
    action: "File downloaded",
    description: "Project Architecture.pdf",
    time: "2 hours ago",
  },
  {
    action: "Security scan",
    description: "No threats detected",
    time: "3 hours ago",
  },
];

function ActivityPanel() {
  return (
    <div className="panel activity-panel">
      <div className="panel-header">
        <div>
          <h2>Recent Activity</h2>
          <p>Latest system events</p>
        </div>

        <button className="view-all">
          View all →
        </button>
      </div>

      <div className="activity-list">
        {activities.map((activity, index) => (
          <div className="activity-item" key={index}>
            <div className="activity-icon">
              {index === 3 ? "✓" : "•"}
            </div>

            <div className="activity-content">
              <strong>{activity.action}</strong>
              <span>{activity.description}</span>
              <small>{activity.time}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityPanel;
import React, { useEffect, useState } from "react";
import api from "../services/api";

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

function getActivityDetails(log) {
    switch (log.action) {
        case "LOGIN":
            return {
                action: "User login",
                description: log.details || "User logged in",
                icon: "•"
            };

        case "FILE_UPLOAD":
            return {
                action: "File uploaded",
                description: log.details || "File uploaded",
                icon: "•"
            };

        case "FILE_DOWNLOAD":
            return {
                action: "File downloaded",
                description: log.details || "File downloaded",
                icon: "•"
            };

        case "FILE_DELETE":
            return {
                action: "File deleted",
                description: log.details || "File deleted",
                icon: "•"
            };

        case "MALWARE_DETECTED":
            return {
                action: "Malware detected",
                description: log.details || "Malware was detected",
                icon: "!"
            };

        case "ROLE_CHANGED":
            return {
                action: "Role changed",
                description: log.details || "User role changed",
                icon: "•"
            };

        case "USER_DEACTIVATED":
            return {
                action: "User deactivated",
                description: log.details || "User deactivated",
                icon: "•"
            };

        default:
            return {
                action: log.action,
                description: log.details || "System activity",
                icon: "•"
            };
    }
}

function ActivityPanel() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const loadActivities = async () => {
            try {
                const response = await api.get("/audit");

                setActivities(response.data.logs || []);
            } catch (error) {
                console.error("Recent activity error:", error);
            }
        };

        loadActivities();
    }, []);

    return (
        <div className="panel activity-panel">

            <div className="panel-header">

                <div>
                    <h2>Recent Activity</h2>
                    <p>Latest system events</p>
                </div>

                <button className="view-all">
                    View all ?
                </button>

            </div>


            <div className="activity-list">

                {activities.length === 0 ? (

                    <div className="activity-item">
                        <div className="activity-content">
                            <span>No recent activity.</span>
                        </div>
                    </div>

                ) : (

                    activities.slice(0, 5).map((log) => {

                        const activity = getActivityDetails(log);

                        return (
                            <div
                                className="activity-item"
                                key={log._id}
                            >

                                <div className="activity-icon">
                                    {activity.icon}
                                </div>

                                <div className="activity-content">

                                    <strong>
                                        {activity.action}
                                    </strong>

                                    <span>
                                        {activity.description}
                                    </span>

                                    <small>
                                        {formatTimeAgo(log.createdAt)}
                                    </small>

                                </div>

                            </div>
                        );

                    })

                )}

            </div>

        </div>
    );
}

export default ActivityPanel;

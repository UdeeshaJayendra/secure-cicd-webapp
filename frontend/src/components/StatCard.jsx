import React from "react";

function StatCard({ title, value, change, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-title">{title}</span>

        <div className="stat-icon">
          {icon}
        </div>
      </div>

      <div className="stat-value">
        {value}
      </div>

      <div className="stat-change">
        <span>↑ {change}</span>
        <small>from last month</small>
      </div>
    </div>
  );
}

export default StatCard;
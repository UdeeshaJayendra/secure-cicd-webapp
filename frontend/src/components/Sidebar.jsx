import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const getNavClass = ({ isActive }) =>
        `nav-item ${isActive ? "active" : ""}`;

    return (
        <aside className="sidebar">

            <div className="logo">
                <div className="logo-icon">S</div>
                <span>SecureOps</span>
            </div>

            <nav className="sidebar-nav">

                <p className="nav-label">MAIN</p>

                <NavLink to="/" className={getNavClass}>
                    <span>▣</span>
                    Dashboard
                </NavLink>

                <NavLink to="/files" className={getNavClass}>
                    <span>□</span>
                    Files
                </NavLink>

                <NavLink to="/team" className={getNavClass}>
                    <span>♙</span>
                    Team
                </NavLink>

                <NavLink to="/activity" className={getNavClass}>
                    <span>◷</span>
                    Activity
                </NavLink>

                <p className="nav-label settings-label">SYSTEM</p>

                <NavLink to="/settings" className={getNavClass}>
                    <span>⚙</span>
                    Settings
                </NavLink>

            </nav>

            <div className="sidebar-bottom">

                <div className="security-status">
                    <div className="status-dot"></div>

                    <div>
                        <strong>System Secure</strong>
                        <small>All services operational</small>
                    </div>
                </div>

                <button
                    type="button"
                    className="logout-button"
                    onClick={handleLogout}
                >
                    ↪ Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;
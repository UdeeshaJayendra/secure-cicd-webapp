import React from "react";

function Topbar() {
    return (
        <header className="topbar">

            <div className="mobile-logo">
                SecureOps
            </div>

            <div className="search-box">
                <span>⌕</span>

                <input
                    type="text"
                    placeholder="Search files, users, activity..."
                />

                <kbd>Ctrl K</kbd>
            </div>

            <div className="topbar-actions">

                <button
                    className="icon-button"
                    title="Notifications"
                >
                    ♢
                </button>

                <div className="user-profile">

                    <div className="avatar">
                        U
                    </div>

                    <div className="user-info">
                        <strong>Udeesha</strong>
                        <span>Administrator</span>
                    </div>

                    <span className="dropdown">
                        ⌄
                    </span>

                </div>

            </div>

        </header>
    );
}

export default Topbar;
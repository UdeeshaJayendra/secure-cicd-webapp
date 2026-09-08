import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import RecentFiles from "./components/RecentFiles";
import ActivityPanel from "./components/ActivityPanel";

import Login from "./pages/Login";
import Files from "./pages/Files";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./services/api";


function Dashboard() {
    const [totalFiles, setTotalFiles] = useState(0);
    const [storageUsed, setStorageUsed] = useState(0);
    const [teamMembers, setTeamMembers] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const [filesResponse, usersResponse] = await Promise.all([
                    api.get("/files"),
                    api.get("/users")
                ]);

                const files = filesResponse.data.files || [];
                const users = usersResponse.data.users || [];

                setTotalFiles(files.length);

                const totalBytes = files.reduce(
                    (total, file) => total + (file.size || 0),
                    0
                );

                const totalMB = totalBytes / (1024 * 1024);

                setStorageUsed(
                    totalMB < 1024
                        ? `${totalMB.toFixed(1)} MB`
                        : `${(totalMB / 1024).toFixed(1)} GB`
                );

                setTeamMembers(users.length);

            } catch (error) {
                console.error("Dashboard data error:", error);
            }
        };

        loadDashboardData();
    }, []);

    return (
        <div className="app">

            <Sidebar />

            <div className="main">

                <Topbar />

                <main className="dashboard">

                    <div className="page-heading">
                        <div>
                            <p className="eyebrow">OVERVIEW</p>

                            <h1>Good morning, Udeesha</h1>

                            <p>
                                Here's what's happening with your workspace today.
                            </p>
                        </div>

                        <button
                            className="upload-button"
                            onClick={() => navigate("/files")}
                        >
                            + Upload File
                        </button>
                    </div>


                    <div className="stats-grid">

                        <StatCard
                            title="Total Files"
                            value={totalFiles.toLocaleString()}
                            change="Live"
                            icon="?"
                        />

                        <StatCard
                            title="Storage Used"
                            value={storageUsed}
                            change="Live"
                            icon="?"
                        />

                        <StatCard
                            title="Team Members"
                            value={teamMembers.toLocaleString()}
                            change="Live"
                            icon="?"
                        />

                        <StatCard
                            title="Security Status"
                            value="Protected"
                            change="ClamAV"
                            icon="?"
                        />

                    </div>


                    <div className="dashboard-grid">

                        <RecentFiles />

                        <ActivityPanel />

                    </div>

                </main>

            </div>

        </div>
    );
}


function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/files"
                    element={
                        <ProtectedRoute>
                            <Files />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;

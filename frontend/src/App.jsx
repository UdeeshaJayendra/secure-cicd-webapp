import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import RecentFiles from "./components/RecentFiles";
import ActivityPanel from "./components/ActivityPanel";

import Login from "./pages/Login";
import Files from "./pages/Files";
import ProtectedRoute from "./components/ProtectedRoute";


function Dashboard() {
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

                        <button className="upload-button">
                            + Upload File
                        </button>
                    </div>


                    <div className="stats-grid">

                        <StatCard
                            title="Total Files"
                            value="1,248"
                            change="12.5%"
                            icon="□"
                        />

                        <StatCard
                            title="Storage Used"
                            value="68.4 GB"
                            change="8.2%"
                            icon="▣"
                        />

                        <StatCard
                            title="Team Members"
                            value="24"
                            change="4.3%"
                            icon="♙"
                        />

                        <StatCard
                            title="Security Score"
                            value="98%"
                            change="2.1%"
                            icon="✓"
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
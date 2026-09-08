function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>

            <p>Welcome to SecureOps.</p>

            <div className="stats">
                <div className="stat-card">
                    <h3>Total Files</h3>
                    <p>42</p>
                </div>

                <div className="stat-card">
                    <h3>Storage Used</h3>
                    <p>2.4 GB</p>
                </div>

                <div className="stat-card">
                    <h3>Shared Files</h3>
                    <p>8</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
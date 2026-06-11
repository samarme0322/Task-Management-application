// this is admin dashboard page, it show stats and numbers
import { useState, useEffect } from 'react';
import { getStats } from '../api';
import AdminSidebar from '../components/AdminSidebar';

function AdminDashboard() {
  // stats state
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });
  const [loading, setLoading] = useState(true);

  // load stats when page open
  useEffect(() => {
    loadStats();
  }, []);

  // function to get stats from backend
  const loadStats = async () => {
    try {
      const res = await getStats();
      setStats(res.data);
    } catch (err) {
      console.log('stats error', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="admin-layout">
      {/* sidebar on left */}
      <AdminSidebar />

      {/* main content */}
      <div className="admin-content">
        <div className="page-title">Admin Dashboard</div>

        {/* stats cards */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-number">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.completedTasks}</div>
            <div className="stat-label">Completed Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.pendingTasks}</div>
            <div className="stat-label">Pending Tasks</div>
          </div>
        </div>

        {/* info card */}
        <div className="card">
          <h2>Welcome Admin</h2>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
            You have admin access. You can manage users, view all tasks, and see activity logs from the sidebar.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

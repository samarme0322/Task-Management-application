// this is activity logs page for admin
// it show all what users did like login, create task etc
import { useState, useEffect } from 'react';
import { getActivityLogs } from '../api';
import AdminSidebar from '../components/AdminSidebar';

function ActivityLogs() {
  // activity logs state
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // load logs when page open
  useEffect(() => {
    loadLogs();
  }, []);

  // get activity logs from backend
  const loadLogs = async () => {
    try {
      const res = await getActivityLogs();
      setLogs(res.data);
    } catch (err) {
      setError('could not load activity logs');
    } finally {
      setLoading(false);
    }
  };

  // this give nice name to action type
  const getActionLabel = (action) => {
    if (action === 'login') return 'Login';
    if (action === 'task_created') return 'Task Created';
    if (action === 'task_updated') return 'Task Updated';
    if (action === 'task_deleted') return 'Task Deleted';
    return action;
  };

  // this give badge color based on action
  const getActionBadge = (action) => {
    if (action === 'login') return 'badge-blue';
    if (action === 'task_created') return 'badge-green';
    if (action === 'task_updated') return 'badge-yellow';
    if (action === 'task_deleted') return 'badge-red';
    return 'badge-blue';
  };

  if (loading) return <div className="loading">Loading logs...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <div className="page-title">Activity Logs</div>

        {error && <div className="error-msg">{error}</div>}

        <div className="card">
          {/* show logs */}
          {logs.length === 0 ? (
            <p style={{ color: '#64748b' }}>no activity logs yet</p>
          ) : (
            logs.map((log) => (
              <div key={log._id} className="activity-item">
                {/* action badge */}
                <div className="activity-action">
                  <span className={`badge ${getActionBadge(log.action)}`}>
                    {getActionLabel(log.action)}
                  </span>
                </div>
                {/* detail of what happened */}
                <div className="activity-detail">
                  {log.detail || 'no detail'}
                </div>
                {/* when it happened */}
                <div className="activity-time">
                  {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityLogs;

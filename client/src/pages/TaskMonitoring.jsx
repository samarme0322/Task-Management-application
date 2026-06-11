// this is task monitoring page for admin
// admin can see all tasks from all users and delete any task
import { useState, useEffect } from 'react';
import { getAllTasksAdmin, adminDeleteTask } from '../api';
import AdminSidebar from '../components/AdminSidebar';

function TaskMonitoring() {
  // all tasks state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  // load tasks when page open
  useEffect(() => {
    loadTasks();
  }, []);

  // get all tasks from backend
  const loadTasks = async () => {
    try {
      const res = await getAllTasksAdmin();
      setTasks(res.data);
    } catch (err) {
      setError('could not load tasks');
    } finally {
      setLoading(false);
    }
  };

  // handle admin delete task
  const handleDelete = async (id) => {
    if (!window.confirm('delete this task?')) return;
    try {
      await adminDeleteTask(id);
      setMsg('task deleted by admin');
      loadTasks();
    } catch (err) {
      setError('could not delete task');
    }
  };

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <div className="page-title">Task Monitoring</div>

        {error && <div className="error-msg">{error}</div>}
        {msg && <div className="success-msg">{msg}</div>}

        <div className="card">
          {/* tasks table */}
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Created By</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td style={{ maxWidth: '200px', color: '#64748b' }}>
                    {task.description || '-'}
                  </td>
                  <td>
                    {/* show user who created this task */}
                    {task.createdBy ? task.createdBy.name : 'unknown'}
                  </td>
                  <td>
                    <span className={`badge ${task.status === 'Completed' ? 'badge-green' : 'badge-yellow'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tasks.length === 0 && (
            <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>
              no tasks found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskMonitoring;

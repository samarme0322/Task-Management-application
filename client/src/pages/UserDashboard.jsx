// this is user dashboard page
// normal user can see their tasks here and create new ones
import { useState, useEffect } from 'react';
import { getMyTasks, createTask, updateTask, deleteTask } from '../api';

function UserDashboard() {
  // state for tasks list
  const [tasks, setTasks] = useState([]);
  // state for new task form
  const [form, setForm] = useState({ title: '', description: '' });
  // state for error and loading
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // load tasks when page opens
  useEffect(() => {
    loadTasks();
  }, []);

  // function to load tasks from backend
  const loadTasks = async () => {
    try {
      const res = await getMyTasks();
      setTasks(res.data);
    } catch (err) {
      setError('could not load tasks');
    }
  };

  // handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle create task
  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMsg('');

    try {
      await createTask(form);
      // reset form
      setForm({ title: '', description: '' });
      setMsg('task created good');
      // reload tasks
      loadTasks();
    } catch (err) {
      setError('could not create task');
    } finally {
      setLoading(false);
    }
  };

  // handle toggle task status (pending to completed and back)
  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    try {
      await updateTask(task._id, { status: newStatus });
      loadTasks();
    } catch (err) {
      setError('could not update task');
    }
  };

  // handle delete task
  const handleDelete = async (id) => {
    if (!window.confirm('are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      setMsg('task deleted');
      loadTasks();
    } catch (err) {
      setError('could not delete task');
    }
  };

  return (
    <div className="container">
      <h1>My Tasks</h1>

      {/* create task form */}
      <div className="card">
        <h2>Create New Task</h2>
        {error && <div className="error-msg">{error}</div>}
        {msg && <div className="success-msg">{msg}</div>}

        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="what is the task"
              required
            />
          </div>
          <div className="form-group">
            <label>Description (optional)</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="more detail about task"
              rows="3"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: 'auto', padding: '10px 25px' }} disabled={loading}>
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </form>
      </div>

      {/* tasks list */}
      <div className="card">
        <h2>My Tasks ({tasks.length})</h2>

        {tasks.length === 0 ? (
          <p style={{ color: '#64748b', fontSize: '14px' }}>no tasks yet, create one above</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-item">
              <div className="task-info">
                <div className="task-title">
                  {task.title}
                  &nbsp;
                  {/* show status badge */}
                  <span className={`badge ${task.status === 'Completed' ? 'badge-green' : 'badge-yellow'}`}>
                    {task.status}
                  </span>
                </div>
                {task.description && (
                  <div className="task-desc">{task.description}</div>
                )}
              </div>
              <div className="task-actions">
                {/* toggle status button */}
                <button
                  className={`btn ${task.status === 'Pending' ? 'btn-success' : 'btn-warning'}`}
                  onClick={() => handleToggleStatus(task)}
                >
                  {task.status === 'Pending' ? 'Mark Done' : 'Mark Pending'}
                </button>
                {/* delete button */}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserDashboard;

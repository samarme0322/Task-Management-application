// this is user management page for admin
// admin can see all users, delete them, and change their status
import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, updateUserStatus } from '../api';
import AdminSidebar from '../components/AdminSidebar';

function UserManagement() {
  // all users state
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  // load users when page open
  useEffect(() => {
    loadUsers();
  }, []);

  // get all users from backend
  const loadUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      setError('could not load users');
    } finally {
      setLoading(false);
    }
  };

  // handle delete user
  const handleDelete = async (id) => {
    if (!window.confirm('are you sure you want to delete this user?')) return;
    try {
      await deleteUser(id);
      setMsg('user deleted');
      loadUsers();
    } catch (err) {
      setError('could not delete user');
    }
  };

  // handle toggle user status
  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    try {
      await updateUserStatus(user._id, newStatus);
      setMsg('user status updated to ' + newStatus);
      loadUsers();
    } catch (err) {
      setError('could not update user status');
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <div className="page-title">User Management</div>

        {error && <div className="error-msg">{error}</div>}
        {msg && <div className="success-msg">{msg}</div>}

        <div className="card">
          {/* users table */}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {/* show role badge */}
                    <span className={`badge ${user.role === 'Admin' ? 'badge-blue' : 'badge-green'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    {/* show status badge */}
                    <span className={`badge ${user.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {/* toggle status button */}
                      <button
                        className={`btn ${user.status === 'Active' ? 'btn-warning' : 'btn-success'}`}
                        onClick={() => handleToggleStatus(user)}
                      >
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      {/* delete button */}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* if no users */}
          {users.length === 0 && (
            <p style={{ color: '#64748b', textAlign: 'center', padding: '20px' }}>
              no users found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManagement;

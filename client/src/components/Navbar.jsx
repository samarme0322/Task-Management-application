// this is navbar component, it show on top of all pages
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // get user from localstorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // handle logout
  const handleLogout = () => {
    // remove token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // go to login page
    navigate('/login');
  };

  return (
    <div className="navbar">
      {/* app name on left */}
      <Link to="/" className="navbar-brand">
        Task Manager
      </Link>

      {/* links on right */}
      <div className="navbar-links">
        {/* show user name */}
        <span style={{ color: '#94a3b8', fontSize: '14px' }}>
          Hello, {user.name || 'User'} ({user.role || 'User'})
        </span>

        {/* if admin show admin dashboard link */}
        {user.role === 'Admin' && (
          <Link to="/admin">Admin Panel</Link>
        )}

        {/* normal dashboard */}
        <Link to="/dashboard">Dashboard</Link>

        {/* logout button */}
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;

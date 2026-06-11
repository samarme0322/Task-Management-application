// this is admin sidebar component
// it show navigation links for admin pages
import { Link, useLocation } from 'react-router-dom';

function AdminSidebar() {
  // get current page location
  const location = useLocation();

  // check if link is active
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="sidebar">
      <Link to="/admin" className={isActive('/admin')}>
        Dashboard
      </Link>
      <Link to="/admin/users" className={isActive('/admin/users')}>
        User Management
      </Link>
      <Link to="/admin/tasks" className={isActive('/admin/tasks')}>
        Task Monitoring
      </Link>
      <Link to="/admin/activity" className={isActive('/admin/activity')}>
        Activity Logs
      </Link>
    </div>
  );
}

export default AdminSidebar;

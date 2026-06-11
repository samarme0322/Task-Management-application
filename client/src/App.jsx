// this is main app file, it handle routing
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// import pages
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import TaskMonitoring from './pages/TaskMonitoring';
import ActivityLogs from './pages/ActivityLogs';
import Navbar from './components/Navbar';

// this check if user is logged in
const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};

// this check if user is admin
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'Admin';
};

// this component protect routes, if not logged in go to login page
const PrivateRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  return children;
};

// this component protect admin routes
const AdminRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  if (!isAdmin()) {
    // not admin, go back to user dashboard
    return <Navigate to="/dashboard" />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* user route */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Navbar />
            <UserDashboard />
          </PrivateRoute>
        } />

        {/* admin routes */}
        <Route path="/admin" element={
          <AdminRoute>
            <Navbar />
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <Navbar />
            <UserManagement />
          </AdminRoute>
        } />
        <Route path="/admin/tasks" element={
          <AdminRoute>
            <Navbar />
            <TaskMonitoring />
          </AdminRoute>
        } />
        <Route path="/admin/activity" element={
          <AdminRoute>
            <Navbar />
            <ActivityLogs />
          </AdminRoute>
        } />

        {/* default redirect */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

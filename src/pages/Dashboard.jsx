import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { label: 'Projects', path: '/projects', icon: '📁' },
    { label: 'References', path: '/references', icon: '📚' },
    { label: 'Services', path: '/services', icon: '⚙️' },
    { label: 'Profile', path: '/user-profile', icon: '👤' }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Welcome, {user?.firstname}!</h1>
            <p className="subtitle">Manage portfolio</p>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Sign Out
          </button>
        </div>

        <div className="dashboard-grid">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className="dashboard-card"
              onClick={() => navigate(item.path)}
            >
              <div className="card-icon">{item.icon}</div>
              <h3>{item.label}</h3>
              <p>Manage {item.label.toLowerCase()}</p>
              <div className="card-arrow">→</div>
            </div>
          ))}
        </div>

        <div className="dashboard-footer">
          <div className="footer-box">
            <h3>Quick Info</h3>
            <p><strong>Name:</strong> {user?.firstname} {user?.lastname}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>User ID:</strong> {user?.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

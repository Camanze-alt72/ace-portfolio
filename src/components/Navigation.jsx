import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

function Navigation() {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <img src="/logo.png" alt="Portfolio Logo" className="logo-image" />
        </div>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/references">References</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
          {/* Auth Section */}
          <div className="nav-divider"></div>
          {!loading && (
            <>
              {isAuthenticated ? (
                <>
                  <li className="user-info">
                    <span>Hi, {user?.firstname}!</span>
                  </li>
                  <li><Link to="/dashboard" className="nav-link-dashboard">Dashboard</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/signin" className="nav-link-signin">Sign In</Link></li>
                  <li><Link to="/signup" className="nav-link-signup">Sign Up</Link></li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;

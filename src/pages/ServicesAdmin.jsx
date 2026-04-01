import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesAdmin.css';

function ServicesAdmin() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [serviceToDelete, setServiceToDelete] = useState(null);

  // Default/hardcoded services
  const defaultServices = [
    {
      id: 1,
      title: "Database Design & Management",
      description: "I design and manage well-structured relational databases with a focus on data integrity, efficiency, and scalability. My work emphasizes clean schemas, optimized queries, and reliable data handling.",
      image: "🗄️",
    },
    {
      id: 2,
      title: "Data-Driven Web Applications",
      description: "I build web applications powered by structured data, where databases drive features such as tracking, reporting, and user interactions across devices.",
      image: "📊",
    },
    {
      id: 3,
      title: "Backend & System Logic",
      description: "I develop backend logic that connects applications to databases, handling business rules, validations, and workflows to ensure systems run smoothly.",
      image: "🧠",
    },
    {
      id: 4,
      title: "Custom Software Systems",
      description: "I create custom software solutions and management tools that turn real-world processes into reliable digital systems.",
      image: "⚙️",
    },
  ];

  // Load services from localStorage on mount
  useEffect(() => {
    const savedServices = localStorage.getItem('services');
    if (savedServices) {
      try {
        setServices(JSON.parse(savedServices));
      } catch {
        setServices(defaultServices);
        localStorage.setItem('services', JSON.stringify(defaultServices));
      }
    } else {
      setServices(defaultServices);
      localStorage.setItem('services', JSON.stringify(defaultServices));
    }
    setLoading(false);
  }, []);



  // Delete service
  const handleDeleteService = (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    // PASSWORD PROTECTION DISABLED - TO RE-ENABLE: uncomment setShowPasswordPrompt(true) and uncomment handlePasswordSubmit
    // setServiceToDelete(id);
    // setShowPasswordPrompt(true);

    // Direct delete without password (password protection disabled)
    try {
      setLoading(true);

      // Remove service from state and save to localStorage
      const updatedServices = services.filter(s => s.id !== id);
      setServices(updatedServices);
      localStorage.setItem('services', JSON.stringify(updatedServices));
      
      alert('Service removed!');
    } catch (err) {
      alert('Error: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // PASSWORD AUTHENTICATION DISABLED - UNCOMMENT TO RE-ENABLE
  /*
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!adminPassword) {
      alert('Please enter admin password');
      return;
    }

    try {
      setLoading(true);
      setShowPasswordPrompt(false);

      // Remove service from state and save to localStorage
      const updatedServices = services.filter(s => s.id !== serviceToDelete);
      setServices(updatedServices);
      localStorage.setItem('services', JSON.stringify(updatedServices));
      
      alert('Service removed!');
      setAdminPassword('');
      setServiceToDelete(null);
    } catch (err) {
      alert('Error: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  */

  if (loading && services.length === 0) {
    return <div className="services-admin"><p>Loading services...</p></div>;
  }

  return (
    <div className="services-admin">
      <div className="admin-header">
        <div className="header-left">
          <button 
            className="back-btn"
            onClick={() => navigate('/services')}
          >
            ← Back to Services
          </button>
          <h1>Manage Services</h1>
        </div>
        <button 
          className="add-btn"
          onClick={() => navigate('/admin/services/add')}
        >
          Add New Service
        </button>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      <div className="services-grid">
        {services.length === 0 ? (
          <p className="no-services">No services yet. Add one to get started!</p>
        ) : (
          services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <h3>{service.title}</h3>
                <div className="service-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => navigate(`/admin/services/edit/${service.id}`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="service-details">
                <p className="description">
                  <strong>Description:</strong> {service.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PASSWORD PROMPT DISABLED - UNCOMMENT TO RE-ENABLE
      {showPasswordPrompt && (
        <div className="password-prompt-overlay">
          <div className="password-prompt-modal">
            <h2>Admin Authentication Required</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="adminPassword">Enter Admin Password:</label>
                <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Confirm Delete
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setAdminPassword('');
                    setServiceToDelete(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      */}
    </div>
  );
}

export default ServicesAdmin;

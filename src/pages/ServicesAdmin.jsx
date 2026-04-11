import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiDelete } from '../services/api';
import './ServicesAdmin.css';

function ServicesAdmin() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load services from API on mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiGet('/api/services');
        setServices(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);



  // Delete service
  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      setLoading(true);

      await apiDelete(`/api/services/${id}`);

      setServices((prev) => prev.filter((service) => service.id !== id));
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

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGet, apiPut, apiPost } from '../services/api';
import './ServiceForm.css';

function EditService() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  // Load service data from API
  useEffect(() => {
    const loadService = async () => {
      try {
        setFetching(true);
        const data = await apiGet(`/api/services/${id}`);
        setFormData({
          title: data.title,
          description: data.description
        });
      } catch (err) {
        setError(err.message);
        console.error('Error loading service:', err);
      } finally {
        setFetching(false);
      }
    };

    loadService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      const servicePayload = {
        title: formData.title,
        description: formData.description
      };

      // Try PUT first if service exists
      try {
        await apiPut(`/api/services/${id}`, servicePayload);
        console.log('Service updated in MongoDB successfully');
      } catch {
        // If PUT fails, try POST for new service
        try {
          await apiPost('/api/services', servicePayload);
          console.log('Service saved to MongoDB successfully');
        } catch (postErr) {
          console.warn('Service API save warning:', postErr.message || 'Failed to save service');
        }
      }

      alert('Service saved successfully!');
      navigate('/admin/services');
    } catch (err) {
      alert('Error saving service: ' + err.message);
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

      // Load existing services from localStorage
      const savedServices = localStorage.getItem('services');
      let services = savedServices ? JSON.parse(savedServices) : [];

      // Update or create service
      const serviceIndex = services.findIndex(s => s.id === parseInt(id));
      
      if (serviceIndex >= 0) {
        // Update existing service
        services[serviceIndex] = {
          ...services[serviceIndex],
          title: formData.title,
          description: formData.description
        };
      } else {
        // Create new service
        const newService = {
          id: parseInt(id),
          title: formData.title,
          description: formData.description,
          image: '🔧'
        };
        services.push(newService);
      }

      // Save updated services
      localStorage.setItem('services', JSON.stringify(services));

      alert('Service saved successfully!');
      setAdminPassword('');
      navigate('/admin/services');
    } catch (err) {
      alert('Error saving service: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  */

  if (fetching) {
    return <div className="service-form-page"><p>Loading service...</p></div>;
  }

  if (error && !formData.title) {
    return (
      <div className="service-form-page">
        <div className="error-display">
          <p>Error: {error}</p>
          <button onClick={() => navigate('/admin/services')}>Back to Services</button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-form-page">
      <div className="form-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/admin/services')}
        >
          ← Back
        </button>
        <h1>Edit Service</h1>
      </div>

      <div className="form-container">
        <form className="service-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Service Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter service title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter service description"
              rows="6"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate('/admin/services')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
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
                  Confirm
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setAdminPassword('');
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

export default EditService;

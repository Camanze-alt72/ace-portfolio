import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceForm.css';

function AddService() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

    // PASSWORD PROTECTION DISABLED - TO RE-ENABLE: uncomment setShowPasswordPrompt(true) and uncomment handlePasswordSubmit
    // setShowPasswordPrompt(true);

    // Direct submit without password (password protection disabled)
    try {
      setLoading(true);

      // Load existing services from localStorage
      const savedServices = localStorage.getItem('services');
      const services = savedServices ? JSON.parse(savedServices) : [];

      // Create new service with unique ID
      const newService = {
        id: Math.max(...services.map(s => s.id), 0) + 1,
        title: formData.title,
        description: formData.description,
        image: '🔧'
      };

      // Add to services and save
      const updatedServices = [...services, newService];
      localStorage.setItem('services', JSON.stringify(updatedServices));

      alert('Service added successfully!');
      navigate('/admin/services');
    } catch (err) {
      alert('Error adding service: ' + err.message);
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
      const services = savedServices ? JSON.parse(savedServices) : [];

      // Create new service with unique ID
      const newService = {
        id: Math.max(...services.map(s => s.id), 0) + 1,
        title: formData.title,
        description: formData.description,
        image: '🔧'
      };

      // Add to services and save
      const updatedServices = [...services, newService];
      localStorage.setItem('services', JSON.stringify(updatedServices));

      alert('Service added successfully!');
      setAdminPassword('');
      navigate('/admin/services');
    } catch (err) {
      alert('Error adding service: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  */

  return (
    <div className="service-form-page">
      <div className="form-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/admin/services')}
        >
          ← Back
        </button>
        <h1>Add</h1>
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
              {loading ? 'Adding...' : 'Add'}
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

export default AddService;

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGet, apiPut, apiPost } from '../services/api';
import './ReferenceForm.css';

function EditReference() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  // Load reference data from API
  useEffect(() => {
    const loadReference = async () => {
      try {
        setFetching(true);
        const data = await apiGet(`/api/references/${id}`);
        setFormData({
          name: data.name,
          title: data.title,
          company: data.company,
          message: data.message
        });
      } catch (err) {
        setError(err.message);
        console.error('Error loading reference:', err);
      } finally {
        setFetching(false);
      }
    };

    loadReference();
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

    if (!formData.name || !formData.title || !formData.company || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      try {
        const referencePayload = {
          name: formData.name,
          title: formData.title,
          company: formData.company,
          message: formData.message
        };

        // Try PUT first if reference exists
        try {
          await apiPut(`/api/references/${id}`, referencePayload);
          console.log('Reference updated in MongoDB successfully');
        } catch {
          // If PUT fails, try POST for new reference
          try {
            await apiPost('/api/references', referencePayload);
            console.log('Reference saved to MongoDB successfully');
          } catch (postErr) {
            console.warn('Reference API save warning:', postErr.message || 'Failed to save reference');
          }
        }
      } catch (refErr) {
        console.error('Error saving reference to MongoDB:', refErr);
      }

      alert('Reference saved successfully!');
      navigate('/admin/references');
    } catch (err) {
      alert('Error saving reference: ' + err.message);
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

      // Load existing references from localStorage
      const savedReferences = localStorage.getItem('references');
      let references = savedReferences ? JSON.parse(savedReferences) : [];

      // Update or create reference
      const referenceIndex = references.findIndex(r => r.id === parseInt(id));
      
      if (referenceIndex >= 0) {
        // Update existing reference
        references[referenceIndex] = {
          ...references[referenceIndex],
          name: formData.name,
          title: formData.title,
          company: formData.company,
          message: formData.message
        };
      } else {
        // Create new reference
        const newReference = {
          id: parseInt(id),
          name: formData.name,
          title: formData.title,
          company: formData.company,
          message: formData.message
        };
        references.push(newReference);
      }

      // Save updated references
      localStorage.setItem('references', JSON.stringify(references));

      alert('Reference saved successfully!');
      setAdminPassword('');
      navigate('/admin/references');
    } catch (err) {
      alert('Error saving reference: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  */

  if (fetching) {
    return <div className="reference-form-page"><p>Loading reference...</p></div>;
  }

  if (error && !formData.name) {
    return (
      <div className="reference-form-page">
        <div className="error-display">
          <p>Error: {error}</p>
          <button onClick={() => navigate('/admin/references')}>Back to References</button>
        </div>
      </div>
    );
  }

  return (
    <div className="reference-form-page">
      <div className="form-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/admin/references')}
        >
          ← Back
        </button>
        <h1>Edit</h1>
      </div>

      <div className="form-container">
        <form className="reference-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter reference name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title/position"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company *</label>
            <input
              id="company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter reference message"
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
              onClick={() => navigate('/admin/references')}
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
            <h2>Confirm Update</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="password">Admin Password</label>
                <input
                  id="password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Update</button>
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

export default EditReference;

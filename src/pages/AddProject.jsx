import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api';
import './ProjectForm.css';

function AddProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completion: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.completion) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      await apiPost('/api/projects', {
        title: formData.title,
        description: formData.description,
        completion: new Date(formData.completion).toISOString()
      });

      alert('Project added successfully!');
      navigate('/admin/projects');
    } catch (err) {
      setError(err.message || 'Error adding project');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-form-page">
      <div className="form-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/admin/projects')}
        >
          ← Back
        </button>
        <h1>Add New Project</h1>
      </div>

      <div className="form-container">
        {error && <div className="error-message">{error}</div>}
        
        <form className="project-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title"
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
              placeholder="Enter project description"
              rows="6"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="completion">Completion Date *</label>
            <input
              type="date"
              id="completion"
              name="completion"
              value={formData.completion}
              onChange={handleChange}
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
              onClick={() => navigate('/admin/projects')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProject;

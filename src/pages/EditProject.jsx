import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGet, apiPut, apiPost } from '../services/api';
import './ProjectForm.css';

function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completion: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  // Default projects for fallback
  const defaultProjects = {
    '1': {
      title: "Payment4AV",
      description: "A Python-based work-hours tracking and invoice generation system with authentication, client management, and PDF invoice exports.",
      completion: '2024-01-15'
    },
    '2': {
      title: "Pharmacy Management System",
      description: "A full pharmacy management system built with Python (Flask) and Oracle SQL. It supports medicine management, sales via stored procedures, returns, restocking, and real-time database operations.",
      completion: '2024-02-20'
    },
    '3': {
      title: "AI-Powered Chatbot",
      description: "A conversational AI chatbot built with React and a Node.js proxy server, integrated with Hugging Face models for real-time AI responses.",
      completion: '2024-03-10'
    }
  };

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        setFetching(true);
        const data = await apiGet(`/api/projects/${id}`);
        setFormData({
          title: data.data.title,
          description: data.data.description,
          completion: data.data.completion.split('T')[0]
        });
        setError(null);
      } catch (err) {
        // Use fallback data for default projects
        if (defaultProjects[id]) {
          setFormData(defaultProjects[id]);
          setError(null);
        } else {
          setError(err.message);
          console.error('Error fetching project:', err);
        }
      } finally {
        setFetching(false);
      }
    };

    fetchProject();
  }, [id]);

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

      const projectData = {
        title: formData.title,
        description: formData.description,
        completion: new Date(formData.completion).toISOString()
      };

      // Try PUT first (for existing projects)
      try {
        await apiPut(`/api/projects/${id}`, projectData);
      } catch (err) {
        // If PUT fails with 404, try POST instead
        if (err.status === 404) {
          await apiPost('/api/projects', projectData);
        } else {
          throw err;
        }
      }

      alert('Project saved successfully!');
      navigate('/admin/projects');
    } catch (err) {
      setError(err.message || 'Error saving project');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="project-form-page"><p>Loading project...</p></div>;
  }

  if (error && !formData.title) {
    return (
      <div className="project-form-page">
        <div className="error-display">
          <p>Error: {error}</p>
          <button onClick={() => navigate('/admin/projects')}>Back to Projects</button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-form-page">
      <div className="form-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/admin/projects')}
        >
          ← Back
        </button>
        <h1>Edit Project</h1>
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
              {loading ? 'Updating...' : 'Update'}
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

export default EditProject;

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
        const response = await fetch(`${API_BASE_URL}/api/projects/${id}`);
        
        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.data.title,
            description: data.data.description,
            completion: data.data.completion.split('T')[0]
          });
        } else {
          // Use fallback data for default projects
          if (defaultProjects[id]) {
            setFormData(defaultProjects[id]);
          } else {
            throw new Error('Project not found');
          }
        }
        setError(null);
      } catch (err) {
        // Try fallback data
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
  }, [id, API_BASE_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.completion) {
      alert('Please fill in all fields');
      return;
    }

    // PASSWORD PROTECTION DISABLED - TO RE-ENABLE: uncomment setShowPasswordPrompt(true) and uncomment handlePasswordSubmit
    // setShowPasswordPrompt(true);

    // Direct submit without password (password protection disabled)
    try {
      setLoading(true);

      const projectData = {
        title: formData.title,
        description: formData.description,
        completion: new Date(formData.completion).toISOString(),
        adminPassword: '' // Password disabled
      };

      // Always try PUT first for any ID (works for both string IDs and ObjectIds)
      let response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      // If project doesn't exist (404), create it instead
      if (response.status === 404) {
        response = await fetch(`${API_BASE_URL}/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(projectData)
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save project');
      }

      alert('Project saved successfully!');
      navigate('/admin/projects');
    } catch (err) {
      alert('Error saving project: ' + err.message);
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

      const projectData = {
        title: formData.title,
        description: formData.description,
        completion: new Date(formData.completion).toISOString(),
        adminPassword: adminPassword
      };

      let response;
      
      // Always try PUT first for any ID (works for both string IDs and ObjectIds)
      response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });

      // If project doesn't exist (404), create it instead
      if (response.status === 404) {
        response = await fetch(`${API_BASE_URL}/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(projectData)
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save project');
      }

      alert('Project saved successfully!');
      setAdminPassword('');
      navigate('/admin/projects');
    } catch (err) {
      alert('Error saving project: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  */

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

export default EditProject;

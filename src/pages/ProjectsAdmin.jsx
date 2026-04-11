import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPost, apiDelete } from '../services/api';
import './ProjectsAdmin.css';

function ProjectsAdmin() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default/hardcoded projects
  const defaultProjects = [
    {
      id: 1,
      title: "Payment4AV",
      category: "FILE BASED DATA MANAGEMENT",
      description: "A Python-based work-hours tracking and invoice generation system with authentication, client management, and PDF invoice exports.",
      completion: new Date('2024-01-15').toISOString(),
      live: "https://payment4av.onrender.com/"
    },
    {
      id: 2,
      title: "Pharmacy Management System",
      category: "DATABASE + BACKEND SYSTEMS",
      description:
        "A full pharmacy management system built with Python (Flask) and Oracle SQL. It supports medicine management, sales via stored procedures, returns, restocking, and real-time database operations.",
      completion: new Date('2024-02-20').toISOString(),
      live: "https://pharmacy-system-biwq.onrender.com/"
    },
    {
      id: 3,
      title: "AI-Powered Chatbot",
      category: "ARTIFICIAL INTELLIGENCE",
      description:
        "A conversational AI chatbot built with React and a Node.js proxy server, integrated with Hugging Face models for real-time AI responses.",
      completion: new Date('2024-03-10').toISOString(),
      live: "https://gistwithmaobi.netlify.app/"
    },
  ];

  // Fetch all projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await apiGet('/api/projects');
      
      // Get API project titles
      let apiProjects = data.data || [];
      const apiTitles = apiProjects.map(p => p.title);
      
      // Find default projects that aren't in the database yet
      const missingDefaults = defaultProjects.filter(d => !apiTitles.includes(d.title));
      
      // Auto-create missing default projects in MongoDB
      if (missingDefaults.length > 0) {
        for (const project of missingDefaults) {
          try {
            await apiPost('/api/projects', {
              title: project.title,
              description: project.description,
              completion: project.completion
            });
          } catch (err) {
            console.error(`Failed to create default project ${project.title}:`, err);
          }
        }
        
        // Re-fetch after creating missing projects
        const refetchData = await apiGet('/api/projects');
        apiProjects = refetchData.data || [];
      }
      
      if (apiProjects && apiProjects.length > 0) {
        // Merge API projects with default projects for complete data
        const mergedProjects = apiProjects.map(apiProject => {
          const defaultProject = defaultProjects.find(d => d.title === apiProject.title);
          return {
            ...apiProject,
            category: defaultProject?.category || 'PROJECT',
            live: defaultProject?.live
          };
        });
        
        setProjects(mergedProjects);
      } else {
        // If no projects in database, show default projects
        setProjects(defaultProjects);
      }
      
      setError(null);
    } catch (err) {
      // On error, show default projects
      setProjects(defaultProjects);
      setError(null);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      setLoading(true);
      await apiDelete(`/api/projects/${id}`);
      alert('Project deleted successfully!');
      fetchProjects();
    } catch (err) {
      alert('Error deleting project: ' + err.message);
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

      const response = await fetch(`${API_BASE_URL}/api/projects/${projectToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ adminPassword })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete project');
      }

      alert('Project deleted successfully!');
      setAdminPassword('');
      setProjectToDelete(null);
      fetchProjects();
    } catch (err) {
      alert('Error deleting project: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  */

  if (loading && projects.length === 0) {
    return <div className="projects-admin"><p>Loading projects...</p></div>;
  }

  return (
    <div className="projects-admin">
      <div className="admin-header">
        <div className="header-left">
          <button 
            className="back-btn"
            onClick={() => navigate('/projects')}
          >
            ← Back to Projects
          </button>
          <h1>Manage Projects</h1>
        </div>
        <button 
          className="add-btn"
          onClick={() => navigate('/admin/projects/add')}
        >
          Add New Project
        </button>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      <div className="projects-grid">
        {projects.length === 0 ? (
          <p className="no-projects">No projects yet. Add one to get started!</p>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
                <div className="project-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="project-details">
                <p className="completion-date">
                  <strong>Completed:</strong> {new Date(project.completion).toLocaleDateString()}
                </p>
                <p className="description">
                  <strong>Description:</strong> {project.description}
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
                    setProjectToDelete(null);
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

export default ProjectsAdmin;

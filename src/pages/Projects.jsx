import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Projects.css';

function Projects() {
  const navigate = useNavigate();
  
  // Default/hardcoded projects
  const defaultProjects = [
    {
      id: 1,
      title: "Payment4AV",
      category: "FILE BASED DATA MANAGEMENT",
      description: "A Python-based work-hours tracking and invoice generation system with authentication, client management, and PDF invoice exports.",
      live: "https://payment4av.onrender.com/",
      image: "💼"
    },
    {
      id: 2,
      title: "Pharmacy Management System",
      category: "DATABASE + BACKEND SYSTEMS",
      description:
        "A full pharmacy management system built with Python (Flask) and Oracle SQL. It supports medicine management, sales via stored procedures, returns, restocking, and real-time database operations.",
      image: "💊",
      live: "https://pharmacy-system-biwq.onrender.com/"
    },
     {
      id: 3,
      title: "AI-Powered Chatbot",
      category: "ARTIFICIAL INTELLIGENCE",
      description:
        "A conversational AI chatbot built with React and a Node.js proxy server, integrated with Hugging Face models for real-time AI responses.",
      image: "🤖",
      live: "https://gistwithmaobi.netlify.app/"
    },
  ];

  const [projects, setProjects] = useState(defaultProjects);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`);
        if (response.ok) {
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            // Merge API projects with default projects for images and categories
            const mergedProjects = data.data.map(apiProject => {
              const defaultProject = defaultProjects.find(d => d.title === apiProject.title);
              return {
                ...apiProject,
                image: defaultProject?.image || '🚀',
                category: defaultProject?.category || 'PROJECT',
                live: defaultProject?.live
              };
            });
            // Also keep default projects that aren't in the API
            const apiTitles = data.data.map(p => p.title);
            const remainingDefaults = defaultProjects.filter(d => !apiTitles.includes(d.title));
            setProjects([...mergedProjects, ...remainingDefaults]);
          }
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        // Keep default projects on error
      }
    };

    fetchProjects();
  }, [API_BASE_URL]);

  return (
    <div className="projects">
      <div className="projects-banner">
        <div className="banner-content">
          <h2 className="section-subtitle">PROJECTS</h2>
          <h1 className="section-title">My Recent Works</h1>
        </div>
        <button 
          className="manage-projects-btn"
          onClick={() => navigate('/admin/projects')}
        >
          Manage Projects
        </button>
      </div>

      <div className="projects-container">
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">{project.image}</div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {project.tech && (
                  <div className="project-tech">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                )}
                <div className="project-links">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link">
                      Go Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;

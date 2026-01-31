import './Projects.css';

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Payment4AV",
      category: "FILE BASED DATA MANAGEMENT",
      description: "A Python-based work-hours tracking and invoice generation system with authentication, client management, and PDF invoice exports.",
      live: "https://payment4av.onrender.com/",
      github: "https://github.com/Camanze-alt72/payment4av",
      image: "💼"
    },
    {
      id: 2,
      title: "Pharmacy Management System",
      category: "DATABASE + BACKEND SYSTEMS",
      description:
        "A full pharmacy management system built with Python (Flask) and Oracle SQL. It supports medicine management, sales via stored procedures, returns, restocking, and real-time database operations.",
      icon: "💊",
      live: "https://pharmacy-system-biwq.onrender.com/",
      github: "https://github.com/Camanze-alt72/pharmacy-system"
    },
    {
      id: 3,
      title: "E-commerce Website Template",
      category: "E-COMMERCE",
      description: "Full-featured e-commerce platform with shopping cart and payment integration.",
      image: "🛒"
    },
    {
      id: 4,
      title: "Weather Dashboard Template",
      category: "WEATHER DASHBOARD",
      description: "Real-time weather dashboard displaying forecasts and weather data visualization.",
      image: "🌤️"
    }
  ];

  return (
    <div className="projects">
      <div className="projects-banner">
        <h2 className="section-subtitle">PORTFOLIO</h2>
        <h1 className="section-title">My Recent Works</h1>
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
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub
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

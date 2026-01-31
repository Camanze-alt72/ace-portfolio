import './Projects.css';

function Projects() {
  const projects = [
    {
      id: 1,
      title: "Responsive Restaurant Website Template",
      category: "WEB DESIGN",
      description: "A modern and responsive restaurant website showcasing menu items and online reservation system.",
      image: "🍽️"
    },
    {
      id: 2,
      title: "AI Chatbot Clone",
      category: "CHAT BOT",
      description: "An interactive AI chatbot clone with natural language processing capabilities.",
      image: "🤖"
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
                <button className="project-btn">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;

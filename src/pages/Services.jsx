import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

function Services() {
  const navigate = useNavigate();
  
  // Default/hardcoded services
  const defaultServices = [
    {
      id: 1,
      title: "Database Design & Management",
      description:
        "I design and manage well-structured relational databases with a focus on data integrity, efficiency, and scalability. My work emphasizes clean schemas, optimized queries, and reliable data handling.",
      image: "🗄️",
    },
    {
      id: 2,
      title: "Data-Driven Web Applications",
      description:
        "I build web applications powered by structured data, where databases drive features such as tracking, reporting, and user interactions across devices.",
      image: "📊",
    },
    {
      id: 3,
      title: "Backend & System Logic",
      description:
        "I develop backend logic that connects applications to databases, handling business rules, validations, and workflows to ensure systems run smoothly.",
      image: "🧠",
    },
    {
      id: 4,
      title: "Custom Software Systems",
      description:
        "I create custom software solutions and management tools that turn real-world processes into reliable digital systems.",
      image: "⚙️",
    },
  ];

  const [services, setServices] = useState([]);

  useEffect(() => {
    // Load services from localStorage or use defaults
    const savedServices = localStorage.getItem('services');
    if (savedServices) {
      try {
        setServices(JSON.parse(savedServices));
      } catch {
        setServices(defaultServices);
      }
    } else {
      setServices(defaultServices);
      localStorage.setItem('services', JSON.stringify(defaultServices));
    }
  }, []);

  return (
    <div className="services">
      <div className="services-banner">
        <div className="banner-content">
          <h2 className="section-subtitle">SERVICES</h2>
          <h1 className="section-title">Here's what I can offer</h1>
        </div>
        <button 
          className="manage-services-btn"
          onClick={() => navigate('/admin/services')}
        >
          Manage Services
        </button>
      </div>

      <div className="services-container">
        <div className="services-grid">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.image}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;

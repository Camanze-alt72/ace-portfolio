import './About.css';
import DownloadCvBadge from '../components/DownloadCvBadge';

function About() {
  return (
    <div className="about">
      <div className="about-banner">
        <h2 className="section-subtitle">ABOUT ME</h2>
        <h1 className="section-title">When it comes to databases, I play my best hand every time.</h1>
      </div>

      <div className="about-container">
        <div className="about-content">
          <div className="about-image">
            <img src="/profile-photo.png" alt="Amanze Emmanuel Chimaobi" className="placeholder-image" />
            <div className="name-badge">EMMANUEL</div>
            <div className="cv-badge-container">
              <DownloadCvBadge />
            </div>
          </div>
          <div className="about-text">
            <p className="about-description">
              I design and build data-driven applications with a strong focus on database structure, performance, and reliability.
              My work centers on creating well-organized data models, efficient queries, and secure back-end systems that support scalable web applications.
              I have experience developing database-backed projects such as work-hours tracking systems, inventory management solutions, and dynamic web applications that rely on clean, structured data to function seamlessly across devices.
            </p>
            
          </div>
        </div>
      </div>

      <div className="values-section">
  <div className="values-grid">
    <div className="value-card">
      <h3>Structured Thinking</h3>
      <p>
        I approach problems with clarity and structure, breaking complex requirements into organized, logical systems that are easy to build and maintain.
      </p>
    </div>

    <div className="value-card">
      <h3>Data-Driven Mindset</h3>
      <p>
        I prioritize clean data models, efficient queries, and reliable database design to ensure systems perform accurately and scale effectively.
      </p>
    </div>

    <div className="value-card">
      <h3>Efficiency & Precision</h3>
      <p>
        I focus on writing purposeful code, optimizing workflows, and using the right tools to deliver reliable solutions without unnecessary complexity.
      </p>
    </div>

    <div className="value-card">
      <h3>Continuous Growth</h3>
      <p>
        I’m committed to constant learning, refining my technical skills, and adapting to new technologies to improve the quality of every project I build.
      </p>
    </div>
  </div>
</div>
    </div>
  );
}

export default About;

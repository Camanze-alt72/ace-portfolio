import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hello-text">Hello, my name is</p>
            <h1 className="name-title">Amanze Chimaobi .E</h1>
            <p className="hero-description">
            <strong>Mission:</strong> To transform complex problems into clear, scalable, user-centered software through
             disciplined engineering and continuous learning.
            </p>
            <Link to="/contact" className="btn btn-primary">SAY HELLO</Link>
          </div>
          <div className="hero-image">
            <img src="/profile-photo.png" alt="Amanze Emmanuel Chimaobi" className="image-placeholder" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

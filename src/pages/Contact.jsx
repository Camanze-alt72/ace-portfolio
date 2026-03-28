import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: ''
  });
  const [slidePosition, setSlidePosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      console.log('Response:', data);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        message: ''
      });
      
      alert('Message sent successfully! Redirecting to home page...');
      navigate('/');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleSlideStart = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleSlideMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    
    const slider = sliderRef.current;
    const rect = slider.getBoundingClientRect();
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const position = clientX - rect.left;
    const maxWidth = rect.width - 60;
    
    if (position >= 0 && position <= maxWidth) {
      setSlidePosition(position);
    }
    
    if (position >= maxWidth * 0.9) {
      setIsDragging(false);
      handleSubmit(e);
      setSlidePosition(0);
    }
  };

  const handleSlideEnd = () => {
    setIsDragging(false);
    setSlidePosition(0);
  };

  return (
    <div className="contact">
      <div className="contact-banner">
        <h2 className="section-subtitle">CONTACT ME</h2>
        <h1 className="section-title">Every great project starts with the right hand.</h1>
      </div>

      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-info">
            <h2>Play the Ace. Reach Out.</h2>
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div>
                <strong>Location</strong>
                <p>Toronto, Ontario</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📱</div>
              <div>
                <strong>Phone</strong>
                <p>+1 (437) 907-7644</p>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div>
                <strong>Email</strong>
                <p>tellit2maobi@gmail.com</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number *</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn desktop-submit">SUBMIT</button>
            
            <div 
              className="slide-submit mobile-submit"
              ref={sliderRef}
              onMouseMove={handleSlideMove}
              onMouseUp={handleSlideEnd}
              onMouseLeave={handleSlideEnd}
              onTouchMove={handleSlideMove}
              onTouchEnd={handleSlideEnd}
            >
              <div className="slide-track">
                <span className="slide-text">Slide to Submit</span>
              </div>
              <div 
                className="slide-button"
                style={{ left: `${slidePosition}px` }}
                onMouseDown={handleSlideStart}
                onTouchStart={handleSlideStart}
              >
                →
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;

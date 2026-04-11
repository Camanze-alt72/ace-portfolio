import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../services/api';
import './ReferenceForm.css';

function AddReference() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.title || !formData.company || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      await apiPost('/api/references', {
        name: formData.name,
        title: formData.title,
        company: formData.company,
        message: formData.message
      });

      alert('Reference added successfully!');
      navigate('/references');
    } catch (err) {
      console.error('Error adding reference:', err);
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reference-form-page">
      <div className="form-header">
        <button
          className="back-btn"
          onClick={() => navigate('/references')}
        >
          ← Back
        </button>
        <h1>Add a Reference</h1>
      </div>

      <div className="form-container">
        <form className="reference-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter reference name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title/position"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="company">Company *</label>
            <input
              id="company"
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter reference message"
              rows="6"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Adding...' : 'Add'}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/references')}
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

export default AddReference;
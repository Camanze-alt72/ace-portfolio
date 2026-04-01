import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstname || !formData.lastname) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      alert('User added successfully!');
      navigate('/admin/users');
    } catch (err) {
      alert('Error adding user: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-form-page">
      <div className="form-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/admin/users')}
        >
          ← Back
        </button>
        <h1>Add User</h1>
      </div>

      <div className="form-container">
        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name *</label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name *</label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter last name"
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
              onClick={() => navigate('/admin/users')}
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

export default AddUser;

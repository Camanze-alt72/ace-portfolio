import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserForm.css';

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  // Load user data from API
  useEffect(() => {
    const loadUser = async () => {
      try {
        setFetching(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to load user');
        }
        
        const data = await response.json();
        setFormData({
          firstname: data.data.firstname,
          lastname: data.data.lastname
        });
      } catch (err) {
        setError(err.message);
        console.error('Error loading user:', err);
      } finally {
        setFetching(false);
      }
    };

    loadUser();
  }, [id]);

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

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      alert('User updated successfully!');
      navigate('/admin/users');
    } catch (err) {
      alert('Error updating user: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="user-form-page"><p>Loading user...</p></div>;
  }

  if (error && !formData.firstname) {
    return (
      <div className="user-form-page">
        <div className="error-display">
          <p>Error: {error}</p>
          <button onClick={() => navigate('/admin/users')}>Back to Users</button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-form-page">
      <div className="form-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/admin/users')}
        >
          ← Back
        </button>
        <h1>Edit User</h1>
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
              {loading ? 'Updating...' : 'Update'}
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

export default EditUser;

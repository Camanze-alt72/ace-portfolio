import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiDelete } from '../services/api';
import './UsersAdmin.css';

function UsersAdmin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load users from API on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await apiGet('/api/users');
        setUsers(data.data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      setLoading(true);

      await apiDelete(`/api/users/${id}`);

      // Remove from state
      setUsers(users.filter(u => u.id !== id));
      
      alert('User deleted!');
    } catch (err) {
      alert('Error: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // PASSWORD AUTHENTICATION DISABLED - UNCOMMENT TO RE-ENABLE
  /*
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!adminPassword) {
      alert('Please enter admin password');
      return;
    }

    try {
      setLoading(true);
      setShowPasswordPrompt(false);

      // Delete user via API
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/${userToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Remove from state
      setUsers(users.filter(u => u.id !== userToDelete));
      
      alert('User deleted!');
      setAdminPassword('');
      setUserToDelete(null);
    } catch (err) {
      alert('Error: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  */

  if (loading && users.length === 0) {
    return <div className="users-admin"><p>Loading users...</p></div>;
  }

  return (
    <div className="users-admin">
      <div className="admin-header">
        <div className="header-left">
          <button 
            className="back-btn"
            onClick={() => navigate('/users')}
          >
            ← Back to Users
          </button>
          <h1>Manage Users</h1>
        </div>
        <button 
          className="add-btn"
          onClick={() => navigate('/admin/users/add')}
        >
          Add User
        </button>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      <div className="users-list">
        {users.length === 0 ? (
          <p className="no-users">No users yet</p>
        ) : (
          <div className="users-table">
            <div className="table-header">
              <div className="col-name">Name</div>
              <div className="col-date">Date Joined</div>
              <div className="col-actions">Actions</div>
            </div>
            {users.map((user) => (
              <div key={user.id} className="table-row">
                <div className="col-name">
                  {user.firstname} {user.lastname}
                </div>
                <div className="col-date">
                  {new Date(user.created).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="col-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PASSWORD PROMPT DISABLED - UNCOMMENT TO RE-ENABLE
      {showPasswordPrompt && (
        <div className="password-prompt-overlay">
          <div className="password-prompt-modal">
            <h2>Confirm Delete</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="password">Admin Password</label>
                <input
                  id="password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Delete</button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowPasswordPrompt(false);
                    setAdminPassword('');
                    setUserToDelete(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      */}
    </div>
  );
}

export default UsersAdmin;

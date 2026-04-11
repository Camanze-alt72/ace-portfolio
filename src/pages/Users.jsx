import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Users.css';

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
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

  return (
    <div className="users">
      <div className="users-header">
        <h1>Users</h1>
        <button 
          className="manage-users-btn"
          onClick={() => navigate('/admin/users')}
        >
          Manage Users
        </button>
      </div>

      <div className="users-container">
        {loading && <p className="loading">Loading users...</p>}
        
        {error && <div className="error-message">Error: {error}</div>}

        {!loading && !error && users.length === 0 && (
          <p className="no-users">No users yet</p>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="users-grid">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <h3 className="user-name">
                    {user.firstname} {user.lastname}
                  </h3>
                  <p className="user-date">
                    {new Date(user.created).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;

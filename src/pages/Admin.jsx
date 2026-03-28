import { useState, useEffect } from 'react';
import './Admin.css';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if already authenticated
    const authToken = localStorage.getItem('adminToken');
    if (authToken) {
      setIsAuthenticated(true);
      fetchMessages();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        throw new Error('Incorrect password');
      }

      const data = await response.json();
      
      // Save token to localStorage
      localStorage.setItem('adminToken', data.token);
      setIsAuthenticated(true);
      setPassword('');
      setError(null);
      fetchMessages();
    } catch (err) {
      alert(err.message || 'Login failed');
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setMessages([]);
    setPassword('');
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contacts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.contacts || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const token = localStorage.getItem('adminToken');
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contacts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete message');
        }

        // Remove message from state
        setMessages(messages.filter(msg => msg._id !== id));
        alert('Message deleted successfully');
      } catch (err) {
        alert('Failed to delete message');
        console.error('Error deleting message:', err);
      }
    }
  };

  if (loading) {
    return <div className="admin"><p>Loading...</p></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="admin">
        <div className="login-container">
          <div className="login-box">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="password">Enter Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <button type="submit" className="login-btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin-header">
        <div className="header-content">
          <h1>Dashboard</h1>
          <p>Contact Messages ({messages.length})</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      {messages.length === 0 ? (
        <div className="no-messages">
          <p>No messages yet</p>
        </div>
      ) : (
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message._id} className="message-card">
              <div className="message-header">
                <h3>{message.firstName} {message.lastName}</h3>
                <button
                  className="delete-btn"
                  onClick={() => deleteMessage(message._id)}
                >
                  Delete
                </button>
              </div>

              <div className="message-details">
                <div className="detail-row">
                  <strong>Email:</strong>
                  <span>{message.email}</span>
                </div>
                <div className="detail-row">
                  <strong>Phone:</strong>
                  <span>{message.contactNumber}</span>
                </div>
                <div className="detail-row">
                  <strong>Date:</strong>
                  <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="message-content">
                <strong>Message:</strong>
                <p>{message.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="refresh-btn" onClick={fetchMessages}>
        Refresh Messages
      </button>
    </div>
  );
}

export default Admin;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiDelete } from '../services/api';
import './ReferencesAdmin.css';

function ReferencesAdmin() {
  const navigate = useNavigate();
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReferences = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await apiGet('/api/references');

        const apiReferences = Array.isArray(data.data) ? data.data : [];

        const transformedReferences = apiReferences.map((ref) => ({
          id: ref.id || ref._id,
          _id: ref.id || ref._id,
          name: ref.name || '',
          title: ref.title || '',
          company: ref.company || '',
          message: ref.message || ''
        }));

        setReferences(transformedReferences);
      } catch (err) {
        console.error('Error fetching references:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadReferences();
  }, []);

  const handleDeleteReference = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reference?')) {
      return;
    }

    try {
      setLoading(true);

      await apiDelete(`/api/references/${id}`);

      setReferences((prev) => prev.filter((reference) => reference.id !== id));
      alert('Reference removed!');
    } catch (err) {
      console.error('Error deleting reference:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading && references.length === 0) {
    return <div className="references-admin"><p>Loading references...</p></div>;
  }

  return (
    <div className="references-admin">
      <div className="admin-header">
        <div className="header-left">
          <button
            className="back-btn"
            onClick={() => navigate('/references')}
          >
            ← Back to References
          </button>
          <h1>Manage References</h1>
        </div>
        <button
          className="add-btn"
          onClick={() => navigate('/admin/references/add')}
        >
          Add New Reference
        </button>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      <div className="references-grid">
        {references.length === 0 ? (
          <p className="no-references">No references yet. Add one to get started!</p>
        ) : (
          references.map((reference) => (
            <div key={reference.id} className="reference-card">
              <div className="reference-header">
                <h3>{reference.name}</h3>
                <div className="reference-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/references/edit/${reference.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteReference(reference.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="reference-details">
                <p><strong>Title:</strong> {reference.title}</p>
                <p><strong>Company:</strong> {reference.company}</p>
                <p className="description">
                  <strong>Message:</strong> {reference.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReferencesAdmin;
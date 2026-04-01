import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './References.css';

function References() {
  const navigate = useNavigate();
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReferences = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('http://localhost:3000/api/references');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch references');
        }

        const apiReferences = Array.isArray(data.data) ? data.data : [];

        const transformedReferences = apiReferences.map((ref) => ({
          id: ref.id || ref._id,
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

  return (
    <div className="references">
      <div className="references-banner">
        <div className="banner-content">
          <h2 className="section-subtitle">REFERENCES</h2>
        </div>
        <div className="banner-buttons">
          <button
            className="add-reference-btn"
            onClick={() => navigate('/add-reference')}
          >
            Add Reference
          </button>
          <button
            className="manage-references-btn"
            onClick={() => navigate('/admin/references')}
          >
            Manage References
          </button>
        </div>
      </div>

      <div className="references-container">
        {loading ? (
          <p>Loading references...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : references.length === 0 ? (
          <p>No references yet.</p>
        ) : (
          <div className="references-grid">
            {references.map((reference) => (
              <div key={reference.id} className="reference-card">
                <div className="reference-content">
                  <h3 className="reference-name">{reference.name}</h3>
                  <p className="reference-title">{reference.title}</p>
                  <p className="reference-company">{reference.company}</p>
                  <p className="reference-message">"{reference.message}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default References;
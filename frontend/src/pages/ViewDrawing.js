import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDrawing, deleteDrawing } from '../services/api';

const ViewDrawing = () => {
  const { id } = useParams();
  const [drawing, setDrawing] = useState(null);

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const data = await getDrawing(id);
        setDrawing(data);
      } catch (error) {
        console.error('Error fetching drawing:', error);
      }
    };

    fetchDrawing();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this drawing?')) {
      try {
        await deleteDrawing(id);
        alert('Drawing deleted successfully!');
        window.location.href = '/'; // Redirect to home
      } catch (error) {
        console.error('Error deleting drawing:', error);
        alert('Failed to delete drawing.');
      }
    }
  };

  if (!drawing) return <p>Loading...</p>;

  return (
    <div className="view-drawing">
      <h1>{drawing.name}</h1>
      <img src={drawing.image} alt={drawing.name} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
      <div>
        <Link to={`/edit/${id}`}>Edit Drawing</Link>
        <button onClick={handleDelete}>Delete Drawing</button>
      </div>
    </div>
  );
};

export default ViewDrawing;

// src/components/DrawingList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDrawings, deleteDrawing } from '../services/api';
import '../styles/DrawingList.css';

const DrawingList = () => {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    const fetchDrawings = async () => {
      try {
        const data = await getDrawings();
        setDrawings(data);
      } catch (error) {
        console.error('Error fetching drawings:', error);
      }
    };

    fetchDrawings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDrawing(id);
      setDrawings(drawings.filter(drawing => drawing._id !== id));
    } catch (error) {
      console.error('Error deleting drawing:', error);
    }
  };

  return (
    <div className="drawing-list">
      <h1>All Drawings</h1>
      <ul>
        {drawings.map((drawing) => (
          <li key={drawing._id} className="drawing-item">
           
              {drawing.title}
        
            <div className="drawing-actions">
            <Link to={`/drawing/${drawing._id}`} className="view-button">view</Link>

              <Link to={`/edit/${drawing._id}`} className="edit-button">Edit</Link>
              <button onClick={() => handleDelete(drawing._id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul> 
    </div>
  );
};

export default DrawingList;

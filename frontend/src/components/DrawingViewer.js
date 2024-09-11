import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDrawing } from '../services/api';
import '../styles/DrawingViewer.css';
import Whiteboard from '../components/Whiteboard';

const DrawingViewer = () => {
  const { id } = useParams();
  const [drawing, setDrawing] = useState(null);

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const data = await getDrawing(id);
        setDrawing(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching drawing:', error);
      }
    };

    fetchDrawing();
  }, [id]);

  if (!drawing) return <p>Loading...</p>;

  return (
    <div className="drawing-viewer">
     {drawing ? (
        <Whiteboard initialDrawing={drawing} />
      ) : (
        <p>Loading...</p>
      )}      </div>

      /*<h1>{drawing.name}</h1>
      <img src={drawing.image} alt={drawing.name} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain' }} />
*/
  );
};

export default DrawingViewer;

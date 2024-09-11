import React, { useEffect, useState } from 'react';
import DrawingForm from '../components/DrawingForm';
import { getDrawing, updateDrawing } from '../services/api';
import { useParams } from 'react-router-dom';

const EditDrawing = () => {
  const { id } = useParams();
  const [drawing, setDrawing] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const data = await getDrawing(id);
        setDrawing(data);
        setImage(data.image);
      } catch (error) {
        console.error('Error fetching drawing:', error);
      }
    };

    fetchDrawing();
  }, [id]);

  const handleSave = async (updatedDrawing) => {
    try {
      await updateDrawing(id, { ...updatedDrawing, image });
      alert('Drawing updated successfully!');
    } catch (error) {
      console.error('Error updating drawing:', error);
      alert('Failed to update drawing.');
    }
  };



  if (!drawing) return <p>Loading...</p>;

  return (
    <div className="edit-drawing">
      <h1>Edit Drawing</h1>
      <DrawingForm drawing={drawing} onSave={handleSave} />
    </div>
  );
};

export default EditDrawing;

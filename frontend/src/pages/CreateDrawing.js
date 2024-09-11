import React from 'react';
import DrawingPage from '../components/DrawingPage';
import { createDrawing } from '../services/api';

const CreateDrawing = () => {
  const handleSave = async (drawing) => {
    try {
      await createDrawing({ image: drawing });
      alert('Drawing created successfully!');
    } catch (error) {
      console.error('Error creating drawing:', error);
      alert('Failed to create drawing.');
    }
  };
 
  return (
    <div className="create-drawing">
      <h1>Create a New Drawing</h1>
      <DrawingPage onSave={handleSave} />
    </div>
  );
};

export default CreateDrawing;

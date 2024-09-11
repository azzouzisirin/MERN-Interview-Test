import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDrawing, updateDrawing } from '../services/api'; // Import your API service
import '../styles/DrawingPage.css';

const shapeTypes = [
  'circle',
  'rectangle',
  'line'
];

const DrawingForm = () => {
  const { id } = useParams(); // Get the drawing ID from the URL
  const navigate = useNavigate(); // For navigation after update
  const [title, setTitle] = useState('');
  const [lines, setLines] = useState([{ startX: '', startY: '', endX: '', endY: '', color: '', thickness: '' }]);
  const [shapes, setShapes] = useState([{ type: 'circle', x: '', y: '', width: '', height: '', color: '' }]);
  const [texts, setTexts] = useState([{ x: '', y: '', content: '', fontSize: '', color: '' }]);

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const data = await getDrawing(id);
        setTitle(data.title);
        setLines(data.lines || []);
        setShapes(data.shapes || []);
        setTexts(data.texts || []);
      } catch (error) {
        console.error('Error fetching drawing:', error);
      }
    };

    fetchDrawing();
  }, [id]);

  const handleLineChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLines = lines.map((line, i) => (i === index ? { ...line, [name]: value } : line));
    setLines(updatedLines);
  };

  const handleShapeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedShapes = shapes.map((shape, i) => (i === index ? { ...shape, [name]: value } : shape));
    setShapes(updatedShapes);
  };

  const handleTextChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTexts = texts.map((text, i) => (i === index ? { ...text, [name]: value } : text));
    setTexts(updatedTexts);
  };

  const resetForm = () => {
    setTitle('');
    setLines([{ startX: '', startY: '', endX: '', endY: '', color: '', thickness: '' }]);
    setShapes([{ type: 'circle', x: '', y: '', width: '', height: '', color: '' }]);
    setTexts([{ x: '', y: '', content: '', fontSize: '', color: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDrawing(id, { title, lines, shapes, texts });
      alert('Drawing updated successfully!');
      navigate('/'); // Redirect to the drawing list page or any other page
    } catch (error) {
      console.error('Error updating drawing:', error);
      alert('Failed to update drawing.');
    }
  };

  return (
    <div className="edit-drawing-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <h3>Lines</h3>
          {lines.map((line, index) => (
            <div key={index}>
              <input
                type="number"
                name="startX"
                value={line.startX}
                onChange={(e) => handleLineChange(index, e)}
                placeholder="Start X"
                required
              />
              <input
                type="number"
                name="startY"
                value={line.startY}
                onChange={(e) => handleLineChange(index, e)}
                placeholder="Start Y"
                required
              />
              <input
                type="number"
                name="endX"
                value={line.endX}
                onChange={(e) => handleLineChange(index, e)}
                placeholder="End X"
                required
              />
              <input
                type="number"
                name="endY"
                value={line.endY}
                onChange={(e) => handleLineChange(index, e)}
                placeholder="End Y"
                required
              />
              <input
                type="text"
                name="color"
                value={line.color}
                onChange={(e) => handleLineChange(index, e)}
                placeholder="Color"
                required
              />
              <input
                type="number"
                name="thickness"
                value={line.thickness}
                onChange={(e) => handleLineChange(index, e)}
                placeholder="Thickness"
                required
              />
            </div>
          ))}
        </div>

        <div>
          <h3>Shapes</h3>
          {shapes.map((shape, index) => (
            <div key={index}>
              <select
                name="type"
                value={shape.type}
                onChange={(e) => handleShapeChange(index, e)}
                required
              >
                {shapeTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="x"
                value={shape.x}
                onChange={(e) => handleShapeChange(index, e)}
                placeholder="X"
                required
              />
              <input
                type="number"
                name="y"
                value={shape.y}
                onChange={(e) => handleShapeChange(index, e)}
                placeholder="Y"
                required
              />
              <input
                type="number"
                name="width"
                value={shape.width}
                onChange={(e) => handleShapeChange(index, e)}
                placeholder="Width"
                required
              />
              <input
                type="number"
                name="height"
                value={shape.height}
                onChange={(e) => handleShapeChange(index, e)}
                placeholder="Height"
                required
              />
              <input
                type="text"
                name="color"
                value={shape.color}
                onChange={(e) => handleShapeChange(index, e)}
                placeholder="Color"
                required
              />
            </div>
          ))}
        </div>

        <div>
          <h3>Texts</h3>
          {texts.map((text, index) => (
            <div key={index}>
              <input
                type="number"
                name="x"
                value={text.x}
                onChange={(e) => handleTextChange(index, e)}
                placeholder="X"
                required
              />
              <input
                type="number"
                name="y"
                value={text.y}
                onChange={(e) => handleTextChange(index, e)}
                placeholder="Y"
                required
              />
              <input
                type="text"
                name="content"
                value={text.content}
                onChange={(e) => handleTextChange(index, e)}
                placeholder="Content"
                required
              />
              <input
                type="number"
                name="fontSize"
                value={text.fontSize}
                onChange={(e) => handleTextChange(index, e)}
                placeholder="Font Size"
                required
              />
              <input
                type="text"
                name="color"
                value={text.color}
                onChange={(e) => handleTextChange(index, e)}
                placeholder="Color"
                required
              />
            </div>
          ))}
        </div>

        <button type="submit">Update Drawing</button>
        <button type="button" onClick={resetForm}>Reset Form</button>
      </form>
    </div>
  );
};

export default DrawingForm;

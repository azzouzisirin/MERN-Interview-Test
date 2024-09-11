import React, { useRef, useState, useEffect } from 'react';
import { getDrawing } from '../services/api'; // Import the API function
import { useParams } from 'react-router-dom'; // To get the drawing ID from the URL

const Whiteboard = () => {
  const { id } = useParams(); // Assuming the drawing ID comes from the route parameter
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingMode, setDrawingMode] = useState('line'); // 'line', 'shape', 'text'
  const [annotations, setAnnotations] = useState([]);
  const [lineStart, setLineStart] = useState({ x: 0, y: 0 });
  const [shapeStart, setShapeStart] = useState({ x: 0, y: 0 });
  const [text, setText] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [drawingData, setDrawingData] = useState(null); // State to hold fetched drawing data

  useEffect(() => {
    const fetchDrawing = async () => {
      try {
        const data = await getDrawing(id); // Fetch drawing by ID
        setDrawingData(data); // Set the fetched drawing data
      } catch (error) {
        console.error('Error fetching drawing:', error);
      }
    };

    if (id) {
      fetchDrawing(); // Fetch the drawing when the component mounts
    }
  }, [id]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = 2;
    context.lineCap = 'round';
  }, []);

  useEffect(() => {
    if (drawingData) {
      // Render the drawing data on the canvas when fetched
      renderDrawing(drawingData);
    }
  }, [drawingData]);

  const renderDrawing = (drawing) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Render lines
    drawing.lines.forEach((line) => {
      context.beginPath();
      context.moveTo(line.startX, line.startY);
      context.lineTo(line.endX, line.endY);
      context.strokeStyle = line.color;
      context.lineWidth = line.thickness;
      context.stroke();
    });

    // Render shapes
    drawing.shapes.forEach((shape) => {
      context.beginPath();
      context.fillStyle = shape.color;
      if (shape.type === 'circle') {
        context.arc(shape.x, shape.y, shape.width / 2, 0, 2 * Math.PI);
        context.fill();
      } else if (shape.type === 'rectangle') {
        context.fillRect(shape.x, shape.y, shape.width, shape.height);
      }
    });

    // Render text annotations
    drawing.texts.forEach((annotation) => {
      context.font = `${annotation.fontSize}px Arial`;
      context.fillStyle = annotation.color;
      context.fillText(annotation.content, annotation.x, annotation.y);
    });
  };

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (drawingMode === 'line') {
      setIsDrawing(true);
      setLineStart({ x: offsetX, y: offsetY });
    } else if (drawingMode === 'shape') {
      setShapeStart({ x: offsetX, y: offsetY });
    } else if (drawingMode === 'text') {
      setTextPosition({ x: offsetX, y: offsetY });
      setAnnotations([...annotations, { text, x: offsetX, y: offsetY }]);
      setText(''); // Clear the input field
    }
  };

  const drawLine = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(lineStart.x, lineStart.y);
    context.lineTo(offsetX, offsetY);
    context.stroke();
    setLineStart({ x: offsetX, y: offsetY });
  };

  const drawShape = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.beginPath();
    if (drawingMode === 'circle') {
      context.arc(shapeStart.x, shapeStart.y, Math.sqrt(Math.pow(offsetX - shapeStart.x, 2) + Math.pow(offsetY - shapeStart.y, 2)), 0, 2 * Math.PI);
      context.fill();
    } else if (drawingMode === 'rectangle') {
      context.fillRect(shapeStart.x, shapeStart.y, offsetX - shapeStart.x, offsetY - shapeStart.y);
    }
  };

  const stopDrawing = () => {
    if (isDrawing) setIsDrawing(false);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const renderAnnotations = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    annotations.forEach((annotation) => {
      context.font = '16px Arial';
      context.fillStyle = 'black';
      context.fillText(annotation.text, annotation.x, annotation.y);
    });
  };

  useEffect(() => {
    renderAnnotations();
  }, [annotations]);

  return (
    <div>
      <h1>Whiteboard</h1>
      <div>
        <button onClick={() => setDrawingMode('line')}>Draw Line</button>
        <button onClick={() => setDrawingMode('circle')}>Draw Circle</button>
        <button onClick={() => setDrawingMode('rectangle')}>Draw Rectangle</button>
        <button onClick={() => setDrawingMode('text')}>Add Text</button>
        {drawingMode === 'text' && (
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter text"
          />
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black' }}
        onMouseDown={startDrawing}
        onMouseMove={drawingMode === 'line' ? drawLine : drawingMode === 'circle' || drawingMode === 'rectangle' ? drawShape : null}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default Whiteboard;

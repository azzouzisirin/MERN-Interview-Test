import React, { useRef, useEffect } from 'react';

const DrawingCanvas = ({ drawing }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw lines
        drawing.lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.startX, line.startY);
            ctx.lineTo(line.endX, line.endY);
            ctx.strokeStyle = line.color;
            ctx.lineWidth = line.thickness;
            ctx.stroke();
        });

        // Draw shapes
        drawing.shapes.forEach(shape => {
            ctx.beginPath();
            if (shape.type === 'rectangle') {
                ctx.rect(shape.x, shape.y, shape.width, shape.height);
            } else if (shape.type === 'circle') {
                ctx.arc(shape.x, shape.y, shape.width, 0, 2 * Math.PI);
            }
            ctx.strokeStyle = shape.color;
            ctx.stroke();
        });

        // Draw text
        drawing.texts.forEach(text => {
            ctx.font = `${text.fontSize}px Arial`;
            ctx.fillStyle = text.color;
            ctx.fillText(text.content, text.x, text.y);
        });
    }, [drawing]);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            style={{ border: '1px solid black' }}
        />
    );
};

export default DrawingCanvas;

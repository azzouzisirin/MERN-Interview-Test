import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDrawingById } from '../api';
import DrawingCanvas from './DrawingCanvas';

const DrawingDetail = () => {
    const { id } = useParams();
    const [drawing, setDrawing] = useState(null);

    useEffect(() => {
        const fetchDrawing = async () => {
            try {
                const response = await getDrawingById(id);
                setDrawing(response.data);
            } catch (error) {
                console.error('Error fetching drawing:', error);
            }
        };

        fetchDrawing();
    }, [id]);

    return (
        <div>
            {drawing ? (
                <div>
                    <h1>{drawing.title}</h1>
                    <DrawingCanvas drawing={drawing} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default DrawingDetail;

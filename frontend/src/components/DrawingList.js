import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllDrawings } from '../api';

const DrawingList = () => {
    const [drawings, setDrawings] = useState([]);

    useEffect(() => {
        const fetchDrawings = async () => {
            try {
                const response = await getAllDrawings();
                setDrawings(response.data);
            } catch (error) {
                console.error('Error fetching drawings:', error);
            }
        }; 

        fetchDrawings();
    }, []);

    return (
        <div>
            <h1>All Drawings</h1>
            <ul>
                {drawings.map(drawing => (
                    <li key={drawing._id}>
                        <Link to={`/drawing/${drawing._id}`}>{drawing.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DrawingList;

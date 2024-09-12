const mongoose = require('mongoose');
const Drawing = require('../models/Drawing');
require('dotenv').config();
// Sample data for drawings
const sampleDrawings = [
    {
        title: 'Sample Drawing 1',
        lines: [
            { startX: 10, startY: 20, endX: 100, endY: 200, color: 'black', thickness: 2 }
        ],
        shapes: [
            { type: 'circle', x: 50, y: 50, width: 100, height: 100, color: 'red' }
        ],
        texts: [
            { x: 10, y: 10, content: 'Hello World', fontSize: 12, color: 'blue' }
        ]
    },
    {
        title: 'Sample Drawing 2',
        lines: [
            { startX: 30, startY: 40, endX: 120, endY: 220, color: 'green', thickness: 3 }
        ],
        shapes: [
            { type: 'rectangle', x: 70, y: 70, width: 150, height: 80, color: 'yellow' }
        ],
        texts: [
            { x: 20, y: 20, content: 'Sample Text', fontSize: 16, color: 'purple' }
        ]
    }
];

// Connect to MongoDB and insert sample data
mongoose.connect(process.env.MONGODB_URI, {  })
    .then(async () => {
        console.log('Connected to MongoDB');
        
        // Clear existing data
        await Drawing.deleteMany({});

        // Insert sample data
        await Drawing.insertMany(sampleDrawings);

        console.log('Sample data inserted');
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

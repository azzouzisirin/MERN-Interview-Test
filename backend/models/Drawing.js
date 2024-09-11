const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a drawing
const DrawingSchema = new Schema({
    title: { type: String, required: true },
    lines: [{
        startX: { type: Number, required: true },
        startY: { type: Number, required: true },
        endX: { type: Number, required: true },
        endY: { type: Number, required: true },
        color: { type: String, default: 'black' },
        thickness: { type: Number, default: 1 }
    }],
    shapes: [{
        type: { type: String, enum: ['circle', 'rectangle'], required: true },
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        color: { type: String, default: 'black' }
    }],
    texts: [{
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        content: { type: String, required: true },
        fontSize: { type: Number, default: 12 },
        color: { type: String, default: 'black' }
    }],
    createdAt: { type: Date, default: Date.now }
});

// Export the model based on the schema
module.exports = mongoose.model('Drawing', DrawingSchema);

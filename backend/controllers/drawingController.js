const Drawing = require('../models/Drawing');

// Create a new drawing
exports.createDrawing = async (req, res) => {
    try {
        const newDrawing = new Drawing(req.body);
        const savedDrawing = await newDrawing.save();
        res.status(201).json(savedDrawing);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all drawings
exports.getAllDrawings = async (req, res) => {
    try {
        const drawings = await Drawing.find();
        res.status(200).json(drawings);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a specific drawing by ID
exports.getDrawingById = async (req, res) => {
    try {
        const drawing = await Drawing.findById(req.params.id);
        if (drawing) {
            res.status(200).json(drawing);
        } else {
            res.status(404).json({ error: 'Drawing not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a drawing
exports.updateDrawing = async (req, res) => {
    try {
        const updatedDrawing = await Drawing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedDrawing) {
            res.status(200).json(updatedDrawing);
        } else {
            res.status(404).json({ error: 'Drawing not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a drawing
exports.deleteDrawing = async (req, res) => {
    try {
        const deletedDrawing = await Drawing.findByIdAndDelete(req.params.id);
        if (deletedDrawing) {
            res.status(200).json({ message: 'Drawing deleted' });
        } else {
            res.status(404).json({ error: 'Drawing not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

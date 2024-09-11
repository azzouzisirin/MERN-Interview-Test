const express = require('express');
const router = express.Router();
const drawingController = require('../controllers/drawingController');

// Create a new drawing
router.post('/drawings', drawingController.createDrawing);

// Get all drawings
router.get('/drawings', drawingController.getAllDrawings);

// Get a specific drawing by ID
router.get('/drawings/:id', drawingController.getDrawingById);

// Update a drawing
router.put('/drawings/:id', drawingController.updateDrawing);

// Delete a drawing
router.delete('/drawings/:id', drawingController.deleteDrawing);

module.exports = router;

# MERN Whiteboard App 

## Overview
This repository contains a MERN stack application for a Whiteboard App, which allows users to create and manage drawings. The app features a MongoDB database to store drawings, an Express.js API to handle requests, a React.js frontend for user interaction, and a Node.js server to serve the application.

##  Project Structure
backend/: Contains server-side code including the API and database models.
models/: Mongoose schemas for MongoDB.
data/: Scripts to populate the database with sample data.
server.js: Main server file for starting the Express.js server and connecting to MongoDB.
.env: Configuration file for environment variables.
frontend/: Contains client-side code for the React.js application.
Setup Instructions

1. Clone the Repository
Clone this repository to your local machine:

bash
Copier le code
git clone https://github.com/azzouzisirin/MERN-Interview-Test.git
cd mern-whiteboard-app

2. Create and Configure .env File
In the backend directory, create a .env file to store your environment variables. You will need to set up the MongoDB connection string and other configuration variables.

File: backend/.env

plaintext
Copier le code
MONGO_URI=mongodb://localhost:27017/whiteboard
PORT=5000
MONGO_URI: MongoDB connection string. Replace localhost with your MongoDB server address if it's hosted elsewhere.
PORT: The port number for the Express server to listen on (default is 5000).

3. Install Dependencies
Navigate to the backend directory and install the server-side dependencies:

bash
Copier le code
cd backend
npm install

4. Set Up the Database
Make sure MongoDB is installed and running on your local machine. Populate the database with sample data by running:

bash
Copier le code
node data/sampleDrawings.js

5. Start the Server
Start the Express server:

bash
Copier le code
node server.js

6. Create and Configure .env File
In the frontend directory, create a .env file to store your environment variables. 

File: frontend/.env

plaintext
Copier le code
REACT_APP_API_URL = http://localhost:5000/api

7. Run the Frontend
Navigate to the frontend directory, install the client-side dependencies, and start the React app:

bash
Copier le code
cd ../frontend
npm install
npm start

## API Endpoints
GET /api/drawings: Retrieve all drawings.
GET /api/drawings/:id: Retrieve a specific drawing by ID.
POST /api/drawings: Create a new drawing.
PUT /api/drawings/:id: Update an existing drawing by ID.
DELETE /api/drawings/:id: Delete a drawing by ID.

## Schema
Drawing Schema
title: The title of the drawing (String, required).
lines: Array of lines with start and end coordinates, color, and thickness.
shapes: Array of shapes (circle, rectangle) with position, size, and color.
texts: Array of text annotations with position, content, font size, and color.
createdAt: Timestamp of creation (Date, default: current date).
Documentation
For detailed documentation, including the schema and API usage, see the API Documentation.

Notes
Ensure MongoDB is properly installed and running before starting the server.
Customize the .env file or environment variables if necessary for your setup.
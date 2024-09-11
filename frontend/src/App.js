import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Drawing from './pages/Drawing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/drawing/:id" element={<Drawing />} />
                <Route path="/about" element={<div>About Page</div>} /> 
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;

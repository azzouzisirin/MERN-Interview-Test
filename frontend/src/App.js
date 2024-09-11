import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreateDrawing from './pages/CreateDrawing';
import EditDrawing from './pages/EditDrawing';
import DrawingViewer from './components/DrawingViewer';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateDrawing />} />
          <Route path="/drawing/:id" element={<DrawingViewer />} />
          <Route path="/edit/:id" element={<EditDrawing />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

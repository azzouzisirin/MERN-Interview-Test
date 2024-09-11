import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <h1 className="navbar-brand">Whiteboard App</h1>
                <button className="navbar-toggle" onClick={toggleMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li> {/* Example link */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

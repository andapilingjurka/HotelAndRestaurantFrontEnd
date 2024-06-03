import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo"> BAMBUS HOTEL</div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/mainpage" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/aboutus" className="navbar-link">About Us</Link>
        </li>
        <li className="navbar-item">
          <Link to="/usermenu" className="navbar-link">Restaurant</Link>
        </li>
        <li className="navbar-item">
          <Link to="/home" className="navbar-link">Rooms</Link>
        </li>
        <li className="navbar-item">
          <Link to="/login" className="navbar-link">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

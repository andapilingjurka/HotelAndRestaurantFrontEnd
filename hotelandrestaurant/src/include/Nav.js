import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import LogoutButton from '../components/LoginRegister/LogoutButton';
import { useGetRole } from '../components/interceptors/tokenService';

const Navbar = () => {
  const token = localStorage.getItem("accessToken");
  const role = useGetRole();
  return (
    <nav className="navbar">
      <div className="navbar-logo"> BAMBUS HOTEL</div>
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
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
          <Link to="/contact" className="navbar-link">Contact</Link>
        </li>
        {/* {localStorage.getItem('accessToken') ? (
            <>
              <LogoutButton /> 
            </>
          ) : (
              <li className="navbar-item">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
          )}
          {role == 'admin' && (
            <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link">
            Dashboard
            </Link>
          </li>
            
          )} */}
          {localStorage.getItem('accessToken') ? (
  <>
    {role === 'admin' && (
      <li className="navbar-item">
        <Link to="/dashboard" className="navbar-link">
          Dashboard
        </Link>
      </li>
    )}
    <LogoutButton />
  </>
) : (
  <li className="navbar-item">
    <Link to="/login" className="navbar-link">
      Login
    </Link>
  </li>
)}
      </ul>
    </nav>
  );
};

export default Navbar;

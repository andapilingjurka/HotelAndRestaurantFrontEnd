import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { decodeToken } from '../../components/LoginRegister/jwtUtils';

function Nav({ Toggle }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');

  

  };
  const token = localStorage.getItem('token');
  const decodedToken = decodeToken(token);
  const isAdmin = decodedToken && decodedToken.role === 'admin';
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent bg-white">
      <i className="bi bi-justify-left fs-4 navbar-brand" onClick={Toggle}></i>

      {/* Pjesa e anës së djathtë të navbarit */}
      <div className="navbar-nav ms-auto d-flex align-items-center">
        {/* Ikonë dhe tekst për admin */}
        <span className="fs-6 text-white">Admin</span>
        <i className="bi bi-person-circle fs-4 me-4 ms-2 text-white"></i>

        <i className="bi bi-bell-fill fs-5 text-white me-3"></i>

        {isAdmin && (
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          )}

          {localStorage.getItem('token') ? (
            <>
              <button onClick={handleLogout} className="nav-link">
                Çkyqu
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">
              Kyqu
            </Link>
          )}
      </div>
      
    </nav>
  );
}

export default Nav;

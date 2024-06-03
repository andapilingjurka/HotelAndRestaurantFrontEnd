import React from 'react';
import './Footer.css'; // Ensure you have a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="social-media">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
        <p>&copy; 2024 Hotel Bambus. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
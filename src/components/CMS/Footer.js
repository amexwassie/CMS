// Footer.js
import React from 'react';
import './Footer.css'; // Optional: Create a separate CSS file for footer styles

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} CBE All rights reserved.</p>
      <p>Privacy Policy | Terms of Service</p>
    </footer>
  );
};

export default Footer;
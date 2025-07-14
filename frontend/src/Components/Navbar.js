import React from 'react';
import './Navbar.css';
import bunnyLogo from './Images/bunny.jpg';  // adjust the path to where your image is

const Navbar = () => {
  return (
    <div className="navbar">
      <img
        src={bunnyLogo}
        alt="Logo"
        className="logo"
      />
    </div>
  );
};

export default Navbar;

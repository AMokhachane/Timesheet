import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link" activeclassname="active">Dashboard</NavLink>
        <NavLink to="/clients" className="sidebar-link" activeclassname="active">Clients</NavLink>
        <NavLink to="/timesheet" className="sidebar-link" activeclassname="active">Timesheet</NavLink>
        <NavLink to="/register" className="sidebar-link" activeclassname="active">Register</NavLink>
        <NavLink to="/login" className="sidebar-link" activeclassname="active">Login</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import profile from './Images/profile.jpg';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Nerdy</h2>

       <div className="sidebar-search">
          <div className="search-input-wrapper">
            <i className="fas fa-search search-icon"></i>
            <input type="text" placeholder="Search..." />
          </div>
       </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className="sidebar-link" activeclassname="active">
          <i className="fas fa-home icon-left"></i> Dashboard
        </NavLink>
        <NavLink to="/clients" className="sidebar-link" activeclassname="active">
          <i className="fas fa-users icon-left"></i> Clients
        </NavLink>
        <NavLink to="/timesheet" className="sidebar-link" activeclassname="active">
          <i className="fas fa-clock icon-left"></i> Timesheet
        </NavLink>
        <NavLink to="/register" className="sidebar-link" activeclassname="active">
          <i className="fas fa-user-plus icon-left"></i> Register
        </NavLink>
        <NavLink to="/login" className="sidebar-link" activeclassname="active">
          <i className="fas fa-sign-in-alt icon-left"></i> Login
        </NavLink>
      </nav>

      <div className="sidebar-profile-wrapper">
        <div className="sidebar-profile">
            <img
              src={profile}
              alt="Profile"
              className="profile-pic"
            />
          <div className="profile-info">
            <span className="profile-name">Amanda Mokhachane</span>
            <button className="profile-options-btn">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

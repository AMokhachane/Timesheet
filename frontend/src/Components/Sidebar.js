import React from 'react';
import './Sidebar.css';
import { NavLink, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import profile from './Images/profile.jpg';
import tba from './Images/tba.png';

export const Sidebar = () => {
  const location = useLocation();

  // Define routes where the sidebar should be hidden
  const hideSidebarRoutes = ['/login', '/register'];
  const isVisible = !hideSidebarRoutes.includes(location.pathname);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="sidebar">
      <img src={tba} alt="Logo" className="sidebar-logo" />

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
          <img src={profile} alt="Profile" className="profile-pic" />
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

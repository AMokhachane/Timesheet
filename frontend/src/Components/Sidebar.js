import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import pic from './Images/pic.jpg';
import axios from 'axios';
import log from './Images/log.png';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const hideSidebarRoutes = ['/', '/register'];
  const isVisible = !hideSidebarRoutes.includes(location.pathname);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/account/current-user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // clear token
    navigate('/'); // redirect to login
  };

  if (!isVisible) return null;

  return (
    <div className="sidebar">
      <img src={log} alt="Log" className="Log-pic" />
      <nav className="sidebar-nav">
        <NavLink to="/dash" className="sidebar-link" activeclassname="active">
          <i className="fas fa-home icon-left"></i> Dashboard
        </NavLink>
        <NavLink to="/clients" className="sidebar-link" activeclassname="active">
          <i className="fas fa-users icon-left"></i> Clients
        </NavLink>
        <NavLink to="/timesheet" className="sidebar-link" activeclassname="active">
          <i className="fas fa-clock icon-left"></i> Timesheet
        </NavLink>
        <NavLink to="/communication-log" className="sidebar-link" activeclassname="active">
          <i className="fas fa-comments icon-left"></i> Communication Log
        </NavLink>
        <NavLink to="/overtime" className="sidebar-link" activeclassname="active">
          <i className="fas fa-comments icon-left"></i> Overtime Schedule
        </NavLink>
        <NavLink to="/leave" className="sidebar-link" activeclassname="active">
          <i className="fas fa-comments icon-left"></i> Leave Request
        </NavLink> 
        {user?.role === "Admin" && (
  <NavLink to="/admin" className="sidebar-link" activeclassname="active">
    <i className="fas fa-comments icon-left"></i> Timesheet Analysis
  </NavLink>
)}

        <div className="sidebar-logout-container">
  <div onClick={handleLogout} className="sidebar-link logout-link">
    <i className="fas fa-sign-out-alt icon-left"></i> Logout
  </div>
</div>
      </nav>

      <div className="sidebar-profile-wrapper">
        <div className="sidebar-profile">
          <img src={pic} alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <span className="profile-name">
              {user
                ? `${user.firstName || user.username} ${user.lastName || ''}`.trim()
                : "Loading..."}
            </span>
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

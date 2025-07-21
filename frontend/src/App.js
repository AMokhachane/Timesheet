import React from 'react';
import './App.css';
import { Sidebar } from './Components/Sidebar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Clients from './Components/Clients';
import Timesheet from './Components/Timesheet';
import CommunicationLog from './Components/CommunicationLog';
import OvertimeSchedule from './Components/OvertimeSchedule';

function AppContent() {
  const location = useLocation();
  const noSidebarPaths = ['/', '/register'];
  const isNoSidebar = noSidebarPaths.includes(location.pathname);

  return (
    <div className="App">
      {!isNoSidebar && <Sidebar />}
      <div className={isNoSidebar ? 'full-width' : 'main-content'}>
        <div className="page-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/timesheet" element={<Timesheet />} />
            <Route path="/communication-log" element={<CommunicationLog />} />
            <Route path="/overtime" element={<OvertimeSchedule />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

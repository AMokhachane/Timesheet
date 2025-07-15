import React from 'react';
import './App.css';
import { Sidebar } from './Components/Sidebar';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Clients from './Components/Clients';
import Timesheet from './Components/Timesheet';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="page-content">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/timesheet" element={<Timesheet />} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

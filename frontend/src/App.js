import React from 'react';
import './App.css';
import { Sidebar } from './Components/Sidebar';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          {/* Your future content here */}
        </div>
      </div>
    </div>
  );
}

export default App;

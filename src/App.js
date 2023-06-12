import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Account from './pages/Account';
import Donation from './pages/Donation';

import "./App.css"

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Router>
      <div>
        <Header toggleSidebar={toggleSidebar} />
        <div className={`page-container ${showSidebar ? 'sidebar-open' : ''}`}>
          {showSidebar && <Sidebar />}
          <div className="content">
            <Routes>
              <Route path="/donation" element={<Donation />} />
              <Route path="*" element={<Account />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

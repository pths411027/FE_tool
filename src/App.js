import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Account from './pages/Account';
import Donation from './pages/Donation';

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="page-container">
          <Sidebar />
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

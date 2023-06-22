import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Account from './pages/Account';
import Workload from './pages/Workload'

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
              <Route path="/workload" element={<Workload />} />
              <Route path="*" element={<Account />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Account from './pages/Account';
import Workload from './pages/Workload'
import Datasuite from './pages/DataSuite';
import User from "./pages/User";


import "./App.css";


function App() {
  const [mode, setMode] = useState('none'); // 預設為登入模式
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8081/user/login', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      setIsLoggedIn(data.isLoggedIn); // 假設後端返回一個包含{ isLoggedIn: true }或{ isLoggedIn: false }的物件
    });
  }, []);



  return (
    <Router>
      {mode === 'none' ? (
        <div>
          <Header />
          <div className="page-container">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/workload" element={<Workload />} />
                <Route path="/account" element={<Account />} />
                <Route path="/datasuite" element={<Datasuite />} />
                <Route path="*" element={<User />}/>
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Header />
          <Routes>
            <Route path="*" element={<User />}/>
          </Routes>
        </div> 
      )}
    </Router>
  );
}

export default App;

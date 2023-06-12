import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css"

function Header({ toggleSidebar }) {
  return (
    <header>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </header>
  );
}

export default Header;

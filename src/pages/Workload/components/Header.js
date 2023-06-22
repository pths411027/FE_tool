import React from 'react';
import "./Header.css";

const Header = ({ handleToggle, loggedIn}) => {
    return (
        <div className="header">
            <div className="logo">Logo</div>
            <div className="register" onClick={handleToggle}>
                {loggedIn == '未登錄' ? '註冊' : loggedIn}
            </div>
        </div>
    );
}

export default Header;

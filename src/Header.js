/*
import React from 'react';
import "./Header.css";

function Header() {
  return (
    <header className="header">
      Dingtwo
    </header>
  );
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    return (
        <div className="Header">
            <Link to="/account" className="link">Project Manage</Link>
        </div>
    );
}

export default Header;
*/
import "./Header.css";
import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react'

function header () {
  return(
    <Header as='h2' icon textAlign='left' style={{ backgroundColor: ' rgb(22, 55, 105)', position: 'sticky', top: 0, zIndex: 1000, padding: '10px', height: '50px', alignItems:'center'}}>

      <Header.Content style={{ fontSize: '30px', color: 'white', textAlign: 'left', alignItems:'center',  marginLeft:"0%"}}>
          <Link to="/account" className="link" >Project Manage</Link>
      </Header.Content>
    
    </Header>
  );
}

export default header



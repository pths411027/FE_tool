
import "./Header.css";
import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react'

function header () {
  return(
    <Header as='h2' style={{ backgroundColor: ' rgb(23, 48, 100)', position: 'sticky', top: 0, zIndex: 1000, padding: '10px', height: '50px', display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
      <Header.Content style={{ fontSize: '30px', color: 'white', marginLeft: '0%'}}>
        <Link to="*" className="link">Project Manage</Link>
      </Header.Content>
      <Header.Content style={{ fontSize: '30px', color: 'white'}}>
        <Link to="/user" className="link" style={{fontSize: '20px'}}>
          <Icon className="user circle ico"></Icon>登入
        </Link>
      </Header.Content>
    </Header>

  );
}
export default header



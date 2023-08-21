import React, { useState, useEffect } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';


const Layer2 = ({ mode, setMode }) => {
  useEffect(() => {
    setMode(mode); // 监听 mode 值的变化，并更新 index 组件中的 mode
  }, [mode, setMode]);

  const handleChangeMode = (newMode) => {
    switch (newMode) {
      case 'Editor':
        setMode('Editor');
        break;
      case 'WorkFlow':
        setMode('WorkFlow');
        break;
      default:
        setMode('none');  // 默认模式为 'addProject'
    }
  };
  return (
    <div>
      <div className="ui  segment" style={{ marginLeft: "5%", width: "75%" }}>
        <Menu ui secondary menu style={{ fontSize: '20px' }}>
          <Menu.Item
            name="資料庫編輯器"
            active={mode === 'Editor'}
            onClick={() => handleChangeMode('Editor')}
          />
          <Menu.Item
            name="工作流UI系統"
            active={mode === 'WorkFlow'}
            onClick={() => handleChangeMode('WorkFlow')}
          />
        </Menu>
      </div>
    </div>
  );
}
export default Layer2;  
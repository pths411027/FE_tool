import React, { useState, useEffect} from 'react';
import { Menu, Dropdown} from 'semantic-ui-react';
import MermaidChart from './MermaidChart';


const Layer2 = ({mode, setMode}) => {
  useEffect(() => {
      setMode(mode); // 监听 mode 值的变化，并更新 index 组件中的 mode
  }, [mode, setMode]);

  const handleChangeMode = (newMode) => {
    switch (newMode) {
      case 'itemList':
        setMode('itemList');
        break;
      case 'addProject':
        setMode('addProject');
        break;
      case 'projectList':
        setMode('projectList');
        break;
      case 'member_team':
        setMode('member_team');
        break;
      case 'setting':
        setMode('setting');
        break;
      
      default:
        setMode('none');  // 默认模式为 'addProject'
    }
  };
  return (
    <div>
      <div className="ui  segment" style={{marginLeft:"5%",width:"90%"}}>
        <Menu ui   secondary  menu  style={{ fontSize: '20px'}}>
          <Menu.Item 
            name="選擇題"
            active={mode === 'itemList'}
            onClick={() => handleChangeMode('itemList')}
          />
          <Menu.Item
            name="創建專案"
            active={mode === 'addProject'}
            onClick={() => handleChangeMode('addProject')}
          />
          <Menu.Item
            name="專案列表"
            active={mode === 'projectList'}
            onClick={() => handleChangeMode('projectList')}
          />
          <Dropdown item text='檢視時間線'>
            <Dropdown.Menu>
              <Dropdown.Item 
                onClick={() => {
                  handleChangeMode('seeTimeline');
                  
                }}
              >
                一月
              </Dropdown.Item>
              <Dropdown.Item 
                onClick={() => {
                  handleChangeMode('seeTimeline');
                  
                }}
              >
                二月
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item
            name="人力資源"
            active={mode === 'member_team'}
            onClick={() => handleChangeMode('member_team')}
          />
          <Menu.Item
            name="系統設定"
            active={mode === 'setting'}
            onClick={() => handleChangeMode('setting')}
          />
        </Menu>
      </div>
      
      

    </div>
  );
}

export default Layer2;

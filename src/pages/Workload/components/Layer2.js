/*
import "./Layer2.css"
import React, { useState, useEffect } from "react";
import Log_form from "./Log_form";
import Register_form from "./Register_form";


const Layer2 = ({mode, setMode}) => {
  useEffect(() => {
      setMode(mode); // 监听 mode 值的变化，并更新 index 组件中的 mode
  }, [mode, setMode]);

  const handleChangeMode = (newMode) => {
    switch (newMode) {
      case 'addProject':
        setMode('addProject');
        break;
      case 'seeProject':
        setMode('seeProject');
        break;
      case 'seeTimeline':
        setMode('seeTimeline');
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
        <div className="button_group_1">
          <button 
                  className={`action_button ${mode === 'addProject' ? 'selected' : ''}`}
                  onClick={() => handleChangeMode('addProject')}>
                  新增任務
          </button>
          <button 
                  className={`action_button ${mode === 'seeProject' ? 'selected' : ''}`}
                  onClick={() => handleChangeMode('seeProject')}>
                  檢視任務
          </button>
          <button 
                  className={`action_button ${mode === 'seeTimeline' ? 'selected' : ''}`}
                  onClick={() => handleChangeMode('seeTimeline')}>
                  檢視時間軸
          </button>
          <button 
                  className={`action_button ${mode === 'setting' ? 'selected' : ''}`}
                  onClick={() => handleChangeMode('setting')}>
                  系統設定
          </button>
        </div>  
      </div>
    );


    
    
    return (
      <div>
        /*
        <div className="button-group">
            <button 
                className={`button ${mode === 'signup' ? 'selected' : ''}`}
                onClick={() => handleModeChange('signup')}>
                註冊帳號
            </button>
            <button 
                className={`button ${mode === 'login' ? 'selected' : ''}`}
                onClick={() => handleModeChange('login')}>
                登入帳號
            </button>
        </div>
        {mode === 'signup' ? (
          < Register_form onSuccess={handleRegisterSuccess}/>
        ) : (
          < Log_form />
        )}
      </div>
    );
    
  };

export default Layer2;

*/

import React, { useState, useEffect} from 'react';
import { Menu, Dropdown} from 'semantic-ui-react';
import MermaidChart from './MermaidChart';


const Layer2 = ({mode, setMode}) => {
  useEffect(() => {
      setMode(mode); // 监听 mode 值的变化，并更新 index 组件中的 mode
  }, [mode, setMode]);

  const handleChangeMode = (newMode) => {
    switch (newMode) {
      case 'addProject':
        setMode('addProject');
        break;
      case 'seeProject':
        setMode('seeProject');
        break;
      case 'seeTimeline':
        setMode('seeTimeline');
        break;
      case 'cardProject':
        setMode('cardProject');
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
      <div className="ui  segment" style={{marginLeft:"5%",width:"85%"}}>
        <Menu ui   secondary  menu  style={{ fontSize: '20px'}}>
          <Menu.Item 
            name="新增任務"
            active={mode === 'addProject'}
            onClick={() => handleChangeMode('addProject')}
          />
          <Menu.Item
            name="檢視任務"
            active={mode === 'seeProject'}
            onClick={() => handleChangeMode('seeProject')}
          />
          <Menu.Item
            name="檢視時間線"
            active={mode === 'seeTimeline'}
            onClick={() => handleChangeMode('seeTimeline')}
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
            name="任務卡片"
            active={mode === 'cardProject'}
            onClick={() => handleChangeMode('cardProject')}
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

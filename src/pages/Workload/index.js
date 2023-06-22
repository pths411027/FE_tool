import Header from "./components/Header"
import NavbarContainer from "./components/NavbarContainer"

import Layer2 from "./components/Layer2"
import ListProject from "./components/ListProject";
import AddProject from "./components/AddProject";
import TimelineProject from "./components/TimelineProject";
import SetProject from "./components/SetProject";
import Layer6 from "./components/Layer6";
import React, { createContext, useState, useContext } from 'react';
import AuthContext from "./components/AuthContext";

import Title from "./components/Title"



import "./index.css"


const Account = () => {
    const [mode, setMode] = useState('none'); // 預設為登入模式
   

    return (
        <div>
        <Title />
        <Layer2 mode={mode} setMode={setMode}/>
        
        {mode === 'addProject' && <AddProject mode = {mode} setMode = {setMode} />} {/* 根据 mode 值渲染 Layer3Signup 组件 */}
        {mode === 'seeProject' && <ListProject />} {/* 根据 mode 值渲染 Layer3Login 组件 */}
        {mode === 'seeTimeline' && <TimelineProject />} {/* 根据 mode 值渲染 Layer3Login 组件 */}
        {mode === 'cardProject' && <Layer6 />} {/* 根据 mode 值渲染 Layer3Login 组件 */}
        {mode === 'setting' && <SetProject />} {/* 根据 mode 值渲染 Layer3Login 组件 */}
        
        </div>
    );
}
export default Account
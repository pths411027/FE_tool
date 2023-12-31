
import NavbarContainer from "./components/NavbarContainer"

import Layer2 from "./components/Layer2"

import AddProject from "./components/AddProject";
import ProjectList from "./components/ProjectList";

import SetProject from "./components/SetProject";
import Layer6 from "./components/Layer6";
import Member_Team from "./components/MemberTeam";
import React, { createContext, useState, useContext } from 'react';
import AuthContext from "./components/AuthContext";

import Title from "./components/Title"
import ItemList from "./components/ItemList";



import "./index.css"


const Account = () => {
    const [mode, setMode] = useState('none'); // 預設為登入模式
    return (
        <div>
            <Title />
            <Layer2 mode={mode} setMode={setMode} />

            {mode === 'itemList' && <ItemList mode={mode} setMode={setMode} />} {/* 根据 mode 值渲染 Layer3Signup 组件 */}
            {mode === 'addProject' && <AddProject mode={mode} setMode={setMode} />} {/* 根据 mode 值渲染 Layer3Login 组件 */}
            {mode === 'projectList' && <ProjectList />} {/* 根据 mode 值渲染 Layer3Login 组件 */}
            {mode === 'member_team' && <Member_Team />} {/* 根据 mode 值渲染 Layer3Login 组件 */}
            {mode === 'setting' && <SetProject />} {/* 根据 mode 值渲染 Layer3Login 组件 */}

        </div>
    );
}
export default Account
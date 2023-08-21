import React, { createContext, useState, useContext } from 'react';

import Title from "./components/Title";
import Layer2 from "./components/Layer2";
import Editor from "./components/Editor";
import WorkFlow from "./components/WorkFlow";
import "./index.css"

const Datasuite = () => {
    const [mode, setMode] = useState('none'); // 預設為登入模式


    return (
        <div>
            <Title />
            <Layer2 mode={mode} setMode={setMode} />
            {mode === 'Editor' && <Editor />}
            {mode === 'WorkFlow' && <WorkFlow />}
        </div>
    );
}
export default Datasuite
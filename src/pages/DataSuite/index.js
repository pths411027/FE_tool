import React, { createContext, useState, useContext } from 'react';

import Title from "./components/Title"
import Editor from "./components/Editor";
import "./index.css"
import { Form, Select, Button, Dropdown, Modal, Label} from 'semantic-ui-react';



const Datasuite = () => {
    const [mode, setMode] = useState('none'); // 預設為登入模式
   

    return (
        <div>
        <Title />
        
        <Editor />
       
        
        
        
        
        </div>
    );
}
export default Datasuite
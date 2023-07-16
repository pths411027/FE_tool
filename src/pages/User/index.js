
import React, { createContext, useState, useContext } from 'react';
import Title from "./components/Title"
import Login from './components/Login';
import "./index.css"
import { Dropdown, Input, Button, Label, Header, Modal, Icon, Card, Grid, Menu, Form, Checkbox, Image, Divider, Table } from 'semantic-ui-react';


const User = () => {
    const [mode, setMode] = useState('none'); // 預設為登入模式
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    return (
        <div>
            <Form style={{
                marginTop:'10%',
                marginLeft: '30%', 
                width: '40%', 
                backgroundColor: 'rgb(249, 250, 251)', 
                border: '1px solid rgb(234, 234, 235)', 
                borderRadius: '10px',
                padding: '20px',                        
                }}>
                <h2 className="ui  header">登入帳號</h2>
                
                <Form.Input
                    label="電子郵件"
                    name="chineseName"
                    placeholder="marcus.tsai@shopee.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{fontWeight:"bold"}}
                    />
                <Form.Input
                    label="密碼"
                    name="chineseName"
                    placeholder="請輸入密碼"
                    value={password}
                    type="password"  
                    onChange={e => setPassword(e.target.value)}
                    required
                    style={{fontWeight:"bold"}}
                    />
                <Button
                    content="登入"
                    labelPosition='left'
                    icon='user circle icon'
                    positive
                    style={{width:"150px"}}
                />
                <Button
                    content="註冊"
                    labelPosition='left'
                    icon='user circle outline icon'
                    negative
                    style={{width:"150px"}}
                />
            </Form>
        </div>
    );
}
export default User

import React, { createContext, useState, useContext } from 'react';
import Title from "./components/Title"
import Login from './components/Login';
import "./index.css"
import { Dropdown, Input, Button, Label, Header, Modal, Icon, Card, Grid, Menu, Form, Checkbox, Image, Divider, Table } from 'semantic-ui-react';


const User = () => {
    // 預設為登入模式
    const [mode, setMode] = useState('login'); 

    // 登入資料
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegistePassword] = useState('');



    // 註冊資料


    const handle_transform_to_register= () => {
        setLoginEmail('');
        setLoginPassword('');
        setMode('register')
    };

    const handle_transform_to_login= () => {
        setLoginEmail('');
        setLoginPassword('');
        setMode('login');
    };


   
    return (
        <div>
            {mode === 'login' ? (
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
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    required
                    style={{fontWeight:"bold"}}
                    />
                <Form.Input
                    label="密碼"
                    name="chineseName"
                    placeholder="請輸入密碼"
                    value={loginPassword}
                    type="password"  
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                    style={{fontWeight:"bold"}}
                    />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        content="登入"
                        labelPosition='left'
                        icon='user circle icon'
                        positive
                        style={{width:"50%"}}
                    />
                    <Button
                        content="註冊"
                        labelPosition='left'
                        icon='user circle outline icon'
                        negative
                        style={{width:"50%"}}
                        onClick={(event) => {
                            event.preventDefault();
                            handle_transform_to_register();
                        }}
                        
                    />
                </div>
            </Form>
            ) : (
                <Form style={{
                    marginTop:'10%',
                    marginLeft: '30%', 
                    width: '40%', 
                    backgroundColor: 'rgb(249, 250, 251)', 
                    border: '1px solid rgb(234, 234, 235)', 
                    borderRadius: '10px',
                    padding: '20px',                        
                    }}>
                    <h2 className="ui  header">註冊帳號</h2>
                    
                    <Form.Input
                        label="電子郵件"
                        name="chineseName"
                        placeholder="marcus.tsai@shopee.com"
                        value={registerEmail}
                        onChange={e => setRegisterEmail(e.target.value)}
                        required
                        style={{fontWeight:"bold"}}
                        />
                    <Form.Input
                        label="密碼"
                        name="chineseName"
                        placeholder="請輸入密碼"
                        value={registerPassword}
                        type="password"  
                        onChange={e => setRegistePassword(e.target.value)}
                        required
                        style={{fontWeight:"bold"}}
                        />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            content="註冊"
                            labelPosition='left'
                            icon='user circle icon'
                            positive
                            style={{width:"50%"}}
                        />
                        <Button
                            content="登入"
                            labelPosition='left'
                            icon='user circle outline icon'
                            negative
                            style={{width:"50%"}}
                            onClick={(event) => {
                                event.preventDefault();
                                handle_transform_to_login();
                            }}
                            
                        />
                    </div>
                </Form>
            )}

        </div>
    );
}
export default User
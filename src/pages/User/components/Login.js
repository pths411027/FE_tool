import React, { useState, useEffect } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Input, Button, Label, Header, Modal, Icon, Card, Grid, Menu, Form, Checkbox, Image, Divider, Table } from 'semantic-ui-react';


function Login() {


  const [activeItem, setActiveItem] = useState('TeamItem');
  const [openAddTeamModal, setOpenAddTeamModal] = useState(false);
  const [modalFinish, setmMdalFinish] = useState(false);
  const [isTeamChecked, setIsTeamChecked] = useState(false);
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);


  // form information
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const [modalKey, setModalKey] = useState(Date.now());



  const handleAddTeamClick = () => {
    setOpenAddTeamModal(true)
  }
  const handleAddMemberClick = () => {
    setOpenAddMemberModal(true)``
  }

  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleAddTeamFetch = () => {
    const payload = {
      email,
      password,
    };
    fetch('http://0.0.0.0:8081/work-load/add-team', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => {
      // 回傳成功
      if (response.ok) {
        setOpenAddTeamModal(false);
        setEmail('');
        setPassword('');
      }
      else {
        return response.json().then(err => {
          ;
        });
      }
    }
    ).then(data => {
      console.log(data);
    }).catch(error => {
      console.error('There was a problem with the fetch operation: ', error);
    });
  };
  return (
    <div style={{ marginTop: "1%", marginLeft: "5%" }}>
      {activeItem === 'TeamItem' ? (
        <div>
          <Button color='green'
            size="large"
            onClick={handleAddTeamClick}
          >
            登入
          </Button>

        </div>
      ) : (
        <div>
          <Button color='green'
            size="small"
            onClick={handleAddMemberClick}
          >
            新增成員
          </Button>
        </div>
      )}

      <Modal
        key={modalKey}
        size='tiny'
        onClose={() => setOpenAddTeamModal(false)}
        onOpen={() => {
          setOpenAddTeamModal(true);
          setModalKey(Date.now());
        }}
        open={openAddTeamModal}
      >
        <Modal.Header>登入</Modal.Header>
        <Modal.Content style={{ width: "80%" }}>
          <Form style={{
            marginLeft: "-5%",
            width: '100%'
          }}>
            <Form.Input
              label="電子郵件"
              name="chineseName"
              placeholder="marcus.tsai@shopee.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ fontWeight: "bold" }}
            />
            <Form.Input
              label="密碼"
              name="chineseName"
              placeholder="請輸入密碼"
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
              required
              style={{ fontWeight: "bold" }}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="新增"
            labelPosition='right'
            icon='square outline icon'
            onClick={() => {
              setOpenAddTeamModal(false);
              setmMdalFinish(true);
              setIsTeamChecked(false);
              handleAddTeamFetch();
            }}
            negative
            disabled={!isTeamChecked}
            style={{ width: "120px" }}
          />

          <Button
            content="新增"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {
              setOpenAddTeamModal(false);
              setmMdalFinish(true);
              setIsTeamChecked(false);
              handleAddTeamFetch();
            }}
            positive
            disabled={!isTeamChecked}
            style={{ width: "120px" }}
          />
          <Button
            content="無帳號"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {
              setOpenAddTeamModal(false);
              setmMdalFinish(true);
              setIsTeamChecked(false);
              handleAddTeamFetch();
            }}
            positive
            disabled={!isTeamChecked}
            style={{ width: "120px" }}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
}
export default Login;
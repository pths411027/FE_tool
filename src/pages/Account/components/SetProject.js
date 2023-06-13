import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Dropdown, Modal, Label, Input, Checkbox } from 'semantic-ui-react';
import ModalProject from './Modal_Project';

import "./Layer2.css"

import 'semantic-ui-css/semantic.min.css';




function SetProject() {

  const [data, setData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);


  // 表單內容
  const [chineseName, setChineseName] = useState('');
  const [englishName, setEnglishName] = useState('');
  const [department, setDepartment] = useState('');
  const [team, setTeam] = useState('');
  const [level, setLevel] = useState('');

  
  const [manager, setManager] = useState(['']);
  const [email, setEmail] = useState('');

  const [isChecked, setIsChecked] = useState(false);


  const [memberdata, setMemberData] = useState([]);

  useEffect(() => {
    fetchMemberData();
  }, []);

  const handleAdd = () => {
    const formData = {
      chineseName,
      englishName,
      email,
      department,
      team,
      level,
      manager
    };
  
    fetch('http://0.0.0.0:8081/pm-server/add-member', {  // 請根據你的 API 地址調整這裡
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setOpenAdd(false);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const fetchMemberData = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8081/pm-server/member');
      const result = await response.json();
      setMemberData(result.member);
    } catch (error) {
      console.error('There was a problem fetching the data: ', error);
    }
  };








  
  return (
    <div>
      <button className="ui blue labeled icon button" onClick={()=>setOpenAdd(true)} style={{marginLeft: "5%", marginTop: "1%", width:"200px"}}>
              <i className="icon user"></i>
              Add Friend
      </button>
      <Modal
        size='large' 
        onClose={() => setOpenAdd(false)}
        onOpen={() => setOpenAdd(true)}
        open={openAdd}
      >
        <Modal.Header>Add Friend</Modal.Header>
        <Modal.Content style ={{width : "80%"}}>
          <Form  style={{
              marginLeft :"-5%",
              width: '100%'
            }}>
              <Form.Group widths='equal'>
                <Form.Input
                  label="中文姓名"
                  name="chineseName"
                  placeholder="王大明"
                  value={chineseName}
                  onChange={e => setChineseName(e.target.value)}
                  width={1}
                  required
                />
                <Form.Input
                  label="英文姓名"
                  name="englishName"
                  placeholder="Peter Lin"
                  value={englishName}
                  onChange={e => setEnglishName(e.target.value)}
                  width={1}
                  required
                />
                <Form.Input
                  label="電子信箱"
                  name="email"
                  placeholder="marcus.tsai@shopee.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  width={5}
                  required
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Input
                  label="單位"
                  name="department"
                  placeholder="Ops"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  width={1}
                  required
                />
                <Form.Input
                  label="團隊"
                  name="team"
                  placeholder="DPD"
                  value={team}
                  onChange={e => setTeam(e.target.value)}
                  width={1}
                  required
                />
                <Form.Input
                  label="職等"
                  name="level"
                  placeholder="SE"
                  value={level}
                  onChange={e => setLevel(e.target.value)}
                  width={1}
                  required
                />
                <Form.Input
                  label="直屬老闆"
                  name="manager"
                  placeholder="Willian Lian"
                  value={manager[0]}
                  onChange={e => setManager([e.target.value])}
                  width={1}
                  required
                />
              </Form.Group>
              <Form.Field>
                <Checkbox 
                  label='我已確認填寫內容無誤！絕對不會耍雷'
                  onChange={()=>setIsChecked(!isChecked)} 
                  tabIndex='0' 
                />
              </Form.Field>
            </Form>

        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => {
            setOpenAdd(false);
            setIsChecked(false);

          }}>
            取消
          </Button>
          <Button
            content="新增"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {
              setOpenAdd(false);
              setOpenConfirm(true);
              setIsChecked(false);
            }}
            positive
            disabled={!isChecked}
            style={{width:"120px"}}
          />
        </Modal.Actions>
      </Modal>
      <Modal
        size='small'
        onClose={() => setOpenConfirm(false)}
        open={openConfirm}
      >
        <Modal.Header>完成新增團隊成員</Modal.Header>
        <Modal.Content style ={{width : "80%"}}>
          <p>您已新增『 {chineseName} 』進入團隊</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="完成"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {
              setOpenConfirm(false);
              handleAdd();
              fetchMemberData();
            }}
            positive
            style={{width:"120px"}}
          />
        </Modal.Actions>
      </Modal>
      <table className="ui red celled striped table" style={{marginLeft: "5%", width:"60%"}}>
        <thead>
          <tr>
            <th colspan="6">人員列表</th>
            
          </tr>
        </thead>
        <thead>
          <tr>
            <th style={{width: "10%"}}> 中文姓名</th>
            <th style={{width: "10%"}}> 英文姓名</th>
            <th style={{width: "10%"}}> 所屬單位</th>
            <th style={{width: "10%"}}> 所屬團隊</th>
            <th style={{width: "10%"}}> 直屬主管</th>
            <th style={{width: "10%"}}> 職稱</th>
          </tr>
        </thead>
        <tbody>
          {memberdata.map((item, index) => (
            <tr key={index}>
              <td>{item.chineseName}</td>
              <td>{item.englishName}</td>
              <td>{item.department}</td>
              <td>{item.team}</td>
              <td>{item.manager}</td>
              <td>{item.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
  </div>
  );
}
export default SetProject;
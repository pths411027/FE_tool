


import "./Layer2.css"
import React, { useState, useEffect } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Input, Button, Label, Header, Modal, Icon, Card, Grid, Menu, Form, Checkbox } from 'semantic-ui-react';
import ModalProject from "./Modal_Project";
// 圖片
import man from "./page/man.png"
import oldman from "./page/old-man.png"
import hatman from "./page/hat-man.png"
import hairman from "./page/hair-man.png"
import youngman from "./page/young-man.png"
import woman from "./page/woman.png"
import hatwoman from "./page/hat-woman.png"




const data = [
  {
    user_id: 'User1',
    item_id: 'Item1',
    ctime: '2023-01-01',
    history_name: 'History1',
    shop_id: 'Shop1',
    seller_type: 'Type1',
    name_score: 'Score1',
    image_score: 'Score2',
    be_link: 'Link1',
    first_rating: 'Rating1',
    score: 'Score3',
    complete: '',
    pic_remark: '',
  },
  {
    user_id: 'User1',
    item_id: 'Item2',
    ctime: '2023-01-01',
    history_name: 'History1',
    shop_id: 'Shop1',
    seller_type: 'Type1',
    name_score: 'Score1',
    image_score: 'Score2',
    be_link: 'Link1',
    first_rating: 'Rating1',
    score: 'Score3',
    complete: '',
    pic_remark: '',
  },
  
  // More items...
];
const emailOptions = [
  { key: 'gmail', text: '@gmail.com', value: '@gmail.com', style:{marginLeft:"-5px"} },
  { key: 'yahoo', text: '@yahoo.com', value: '@yahoo.com' , style:{marginLeft:"-5px"} },
  { key: 'shopee', text: '@shopee.com', value: '@shopee.com' , style:{marginLeft:"-5px"} },
  // 更多选项...
]

function Member_Team() {
  //const [data, setData] = useState([]);
  /*
  useEffect(() => {
    fetchData(); // 在组件挂载时获取数据
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8081/pm-server/main-project');
      const result = await response.json();
      setData(result.main_projects);
    } catch (error) {
      console.error('There was a problem fetching the data: ', error);
    }
  };
  */
  
  const [activeItem, setActiveItem] = useState('TeamItem');
  const [openAddTeamModal, setOpenAddTeamModal] = useState(false);
  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [manager, setManager] = useState('');
  const [memberList, setMemberList] = useState([]);

  const [modalFinish, setmMdalFinish] = useState(false);
  const [modalError, setmMdalError] = useState(false);


  const [isTeamChecked, setIsTeamChecked] = useState(false);
  const [isMemberChecked, setIsMemberChecked] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  // add member
  const [memberName, setMemberName] = useState('');
  const [memberPhoto, setMemberPhoto] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberEmailType, setMemberEmailType] = useState('@gmail.com');
  const [memberLevel, setMemberLevel] = useState('');

  const buttons_2 = [
    {
      color: 'green',
      inverted: true,
      icon: 'checkmark',
      text: 'Yes',
      onClick: () => {
        setmMdalFinish(false);
        
      },
    }
  ];
  const buttons_3 = [
    {
      color: 'green',
      inverted: true,
      icon: 'checkmark',
      text: 'Yes',
      onClick: () => {
        setmMdalError(false);
      },
    }
  ];




  

  //卡片資料
  const cards = [
    {
      header: '日本藥妝',
      meta: 'Joined in 2013',
      events: [
        { name: 'Elliot Fu', action: 'added', target: 'Jenny Hess', role: 'project' },
        { name: 'Stevie Feliciano', action: 'was added as an', target: 'Administrator' },
        { name: 'Helen Troy', action: 'added', target: 'two pictures' },
      ],
      link: 'http://example.com',
    },
    {
      header: 'FMCG',
      meta: 'Joined in 2013',
      events: [
        { name: 'Elliot Fu', action: 'added', target: 'Jenny Hess', role: 'project' },
        { name: 'Stevie Feliciano', action: 'was added as an', target: 'Administrator' },
        { name: 'Helen Troy', action: 'added', target: 'two pictures' },
      ],
      link: 'http://example.com',
    },
    
    // 更多卡片数据...
  ];
  const handleItemClick = (name) => {
    setActiveItem(name);
  };

  const handleAddTeamClick = () => {
    setOpenAddTeamModal(true)
  }
  const handleAddMemberClick = () => {
    setOpenAddMemberModal(true)
  }

  const ManagerOptions = [
    { key: '', value: '', text: 'Select...' },
    { key: 'Sonny', value: 'Sonny', text: 'Sonny',  image: { avatar: true, src: man }, },
    { key: 'David', value: 'David', text: 'David',  image: { avatar: true, src:  hairman}, },
    { key: 'Polo', value: 'Polo', text: 'Polo',  image: { avatar: true, src: youngman }, },
    { key: 'Shana', value: 'Shana', text: 'Shana',  image: { avatar: true, src: hatwoman }, },
    { key: 'Charlie', value: 'Charlie', text: 'Charlie',  image: { avatar: true, src: hatman }, },
    { key: 'Marcus', value: 'Marcus', text: 'Marcus',  image: { avatar: true, src: oldman }, },
    { key: 'Amber', value: 'Amber', text: 'Amber',  image: { avatar: true, src: woman }, },

  ];
  const PhotoOptions = [
    { key: '', value: '', text: 'Select...', style:{fontWeight:"bold"} },
    { key: 'man', value: 'man', text: 'normal',  image: { avatar: true, src: man }, },
    { key: 'woman', value: 'woman', text: 'normal',  image: { avatar: true, src: woman }, },
    { key: 'hairman', value: 'hairman', text: 'hair',  image: { avatar: true, src:  hairman}, },
    { key: 'hatwoman', value: 'hatwoman', text: 'hat',  image: { avatar: true, src: hatwoman }, },
    { key: 'hatman', value: 'hatman', text: 'hat',  image: { avatar: true, src: hatman }, },
    { key: 'oldman', value: 'oldman', text: 'old',  image: { avatar: true, src: oldman }, },
    { key: 'youngman', value: 'youngman', text: 'young',  image: { avatar: true, src: youngman }, },
    

  ];

  // Level
  
  const levels = [
    { key: 'Entry', color: 'grey' },
    { key: 'Junior', color: 'olive' },
    { key: 'Senior', color: 'teal' },
    { key: 'Leader', color: 'blue' },
  ]
  const LevelOptions = [{ key: '', value: '', text: 'Select...' }];
  for (let i = 0; i < levels.length; i++) {
    LevelOptions.push({
      key: levels[i].key,
      value: levels[i].key,
      text: (
        <span>
          <Label circular color={levels[i].color} empty style={{ marginLeft: "10px", marginRight: "15px" }} /> 
          {levels[i].key}
        </span>
      ),
      style: { fontWeight: "bold" }
    });
  }

  const handleAddMemberFetch = () => {
    const payload = {
      memberName,
      memberPhoto,
      memberEmail,
      memberEmailType,
      memberLevel
    };
    fetch('http://0.0.0.0:8081/work_load/add_member', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => {
      // 回傳成功
      if (response.ok){
        setOpenAddMemberModal(false);
        setmMdalFinish(true);
        setMemberName('');
        setMemberPhoto('');
        setMemberEmail('');
        setMemberEmailType('');
        setMemberLevel('');

      }
      else{
        return response.json().then(err => {
          ;
        });
      }}
      ).then(data => {
        console.log(data);
      }).catch(error => {
        
        console.error('There was a problem with the fetch operation: ', error);
      });
  };

  






  

     
  return (
    <div style={{marginTop: "1%", marginLeft: "5%"}}>
      <Menu pointing secondary style={{ width: '256px' }}>
        <Menu.Item
          style={{
            borderBottomWidth: activeItem === 'TeamItem' ? '2px' : '0',
            borderBottomStyle: activeItem === 'TeamItem' ? 'solid' : 'none',
            minWidth: '0',
            paddingRight: '20px',
          }}
          name='TeamItem'
          active={activeItem === 'TeamItem'}
          onClick={() => handleItemClick('TeamItem')}
        >
          <Icon name='users' size='large' />
          <span style={{ fontSize: '25px', marginLeft: '10px' }}>團隊</span>
        </Menu.Item>
        <Menu.Item
          style={{
            borderBottomWidth: activeItem === 'MemberItem' ? '2px' : '0',
            borderBottomStyle: activeItem === 'MemberItem' ? 'solid' : 'none',
            minWidth: '0',
            paddingRight: '20px',
            
          }}
          name='MemberItem'
          active={activeItem === 'MemberItem'}
          onClick={() => handleItemClick('MemberItem')}
        >
          <Icon name='user icon' size='large' />
          <span style={{ fontSize: '25px', marginLeft: '10px' }}>成員</span>
        </Menu.Item>
      </Menu>


      {activeItem === 'TeamItem' ? (
        <div>
          <Button color='green'
                  size="large"
                  onClick={handleAddTeamClick}
          > 
            新增團隊
          </Button>
          <Card.Group itemsPerRow={3} stackable style={{ width: '95%', height: '100%', marginTop:"1%" }}>
            {cards.map((card, index) => (
              <Card key={index} 
                    fluid  
                >
                <Card.Content>
                  <Card.Header
                    style={{ fontSize: "25px", fontWeight: "bold", textAlign: "center" }}>
                    {card.header}
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <Grid textAlign="center" verticalAlign="middle" style={{fontSize:"35px"}}>
                    <Grid.Column>
                      <Icon name='users' size='huge' style={{fontSize:"55px"}}/>
                      15
                      
                    </Grid.Column>
                  </Grid>
                </Card.Content>
                
                <Button fluid 
                        color="blue"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                >
                  新增成員
                </Button>
              </Card>
            ))}
          </Card.Group>
        </div>
      ) : (
        <div>
          <Button color='green'
                  size="large"
                  onClick={handleAddMemberClick}
          > 
            新增成員
          </Button>
          <table className="ui  celled striped table" style={{width:"95%", marginTop:"2%"}}>
            
            <thead>
              <tr>
                <th style={{width: "5%"}}> user_id</th>
                <th style={{width: "5%"}}> item_id</th>
                <th style={{width: "10%"}}> ctime</th>
                <th style={{width: "5%"}}> history_name</th>
                
              </tr>
            </thead>
            <tbody>
            {data.map((item, index) => {
              const uniqueId = `${item.item_id}-${index}`;
              return(
                <tr key={index}>
                  <td>{item.user_id}</td>
                  <td>{item.item_id}</td>
                  <td>{item.ctime}</td>
                  <td>{item.history_name}</td>
                </tr>
                );
              })}
          </tbody>
          </table>
        </div>
      )}
      <Modal
        size='large' 
        onClose={() => setOpenAddTeamModal(false)}
        onOpen={() => setOpenAddTeamModal(true)}
        open={openAddTeamModal}
      >
        <Modal.Header>新增團隊</Modal.Header>
        <Modal.Content style ={{width : "80%"}}>
          <Form  style={{
              marginLeft :"-5%",
              width: '100%'
            }}>
              <Form.Group widths='equal'>
                <Form.Input
                  label="團隊名稱"
                  name="chineseName"
                  placeholder="FMCG產品部門"
                  value={teamName}
                  onChange={e => setTeamName(e.target.value)}
                  width={4}
                  required
                  style={{fontWeight:"bold"}}
                />
                <Form.Field required width={4}>
                  <label>主管</label>
                  <Dropdown
                    placeholder='manager name'
                    fluid
                    selection
                    options={ManagerOptions}
                    onChange={(e, { value }) => setManager(value)}
                    style={{fontWeight:"bold"}}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Field required>
                <label>團隊成員(多選)</label>
                <Dropdown
                  placeholder='member name'
                  fluid
                  multiple
                  selection
                  options={ManagerOptions}
                  onChange={(e, { value }) => setMemberList(value)}
                />
              </Form.Field>

              <Form.Field>
                <Checkbox 
                  label='我已確認填寫內容無誤！絕對不會耍雷'
                  onChange={()=>setIsTeamChecked(!isTeamChecked)} 
                  tabIndex='0' 
                />
              </Form.Field>
            </Form>

        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => {
            setOpenAddTeamModal(false);
            setIsTeamChecked(false);

          }}>
            取消
          </Button>
          <Button
            content="新增"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {
              setOpenAddTeamModal(false);
              setOpenConfirm(true);
              setIsTeamChecked(false);
            }}
            positive
            disabled={!isTeamChecked}
            style={{width:"120px"}}
          />
        </Modal.Actions>
      </Modal>
      <Modal
        size='small' 
        onClose={() => setOpenAddMemberModal(false)}
        onOpen={() => setOpenAddMemberModal(true)}
        open={openAddMemberModal}
      >
        <Modal.Header>新增成員</Modal.Header>
        <Modal.Content style ={{width : "80%"}}>
          <Form  style={{
              marginLeft :"-5%",
              width: '100%'
            }}>
              <Form.Group widths='equal'>
                <Form.Input
                  label="英文姓名"
                  name="memberName"
                  placeholder="Marcus Tsai"
                  value={memberName}
                  onChange={e => setMemberName(e.target.value)}
                  width={10}
                  required
                  style={{fontWeight:"bold"}}
                />
                <Form.Field required width={3}>
                  <label>人像</label>
                  <Dropdown
                    placeholder='memberPhoto'
                    fluid
                    selection
                    options={PhotoOptions}
                    onChange={(e, { value }) => setMemberPhoto(value)}
                    style={{fontWeight:"bold"}}
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.Field required width={10}>
                    <label>電子信箱</label>
                    <Input
                      label={<Dropdown defaultValue='@gmail.com'
                                       options={emailOptions} 
                                       style={{width:"140px"}}
                                       onChange={(e, {value}) => setMemberEmailType(value)} 
                              />}
                      labelPosition='right'
                      placeholder='Marcus Tsai'
                      value={memberEmail}
                      onChange={e => setMemberEmail(e.target.value)}
                      style={{fontWeight:"bold"}}
                    />
                </Form.Field>
                <Form.Field required width={3}>
                  <label>職稱</label>
                  <Dropdown
                    placeholder='Level'
                    fluid
                    selection
                    options={LevelOptions}
                    onChange={(e, { value }) => setMemberLevel(value)}
                    style={{fontWeight:"bold"}}
                  />
                </Form.Field>
              </Form.Group>
              

              <Form.Field>
                <Checkbox 
                  label='我已確認填寫內容無誤！絕對不會耍雷'
                  onChange={()=>setIsMemberChecked(!isMemberChecked)} 
                  tabIndex='0' 
                />
              </Form.Field>
            </Form>

        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => {
            setOpenAddMemberModal(false);
            setIsMemberChecked(false);

          }}>
            取消
          </Button>
          <Button
            content="新增"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {
              setOpenConfirm(true);
              setIsMemberChecked(false);
              handleAddMemberFetch();
            }}
            positive
            disabled={!isMemberChecked}
            style={{width:"120px"}}
          />
        </Modal.Actions>
      </Modal>
      <ModalProject
        modalOpen={modalFinish}
        closeModalOpen={() => setmMdalFinish(false)}
        modal_title="完成"
        modal_des="系統已完成新增!"
        buttons={buttons_2}
      />

      
    

  </div>
);
}

export default Member_Team;

import "./Layer2.css"
import React, { useState, useEffect } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Input, Button, Label, Header, Modal, Icon, Card, Grid, Menu, Form, Checkbox, Image, Divider, Table } from 'semantic-ui-react';
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
  { key: 'gmail', text: '@gmail.com', value: '@gmail.com', style: { marginLeft: "-5px" } },
  { key: 'yahoo', text: '@yahoo.com', value: '@yahoo.com', style: { marginLeft: "-5px" } },
  { key: 'shopee', text: '@shopee.com', value: '@shopee.com', style: { marginLeft: "-5px" } },
  // 更多选项...
]

function Member_Team() {
  //const [data, setData] = useState([]);




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
  const [openCardAdd, setOpenCardAdd] = useState(false);


  // add member
  const [memberName, setMemberName] = useState('');
  const [memberPhoto, setMemberPhoto] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberEmailType, setMemberEmailType] = useState('@gmail.com');
  const [memberLevel, setMemberLevel] = useState('');

  const [teamLeader, setTeamLeader] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [allMember, setAllMember] = useState([]);
  const [teamCard, setTeamCard] = useState([]);

  const [modalKey, setModalKey] = useState(Date.now());







  useEffect(() => {
    fetchAddProjectData();
  }, [activeItem, openAddTeamModal, openAddMemberModal]);

  const fetchAddProjectData = async () => {
    if (activeItem === 'TeamItem') {
      try {
        const response_leader = await fetch('http://0.0.0.0:8081/work-load/member-list?level=Leader');
        const response_member = await fetch('http://0.0.0.0:8081/work-load/member-list?level=Junior');
        const response_team = await fetch('http://0.0.0.0:8081/work-load/team-list');
        const result_leader = await response_leader.json();
        const result_member = await response_member.json();
        const result_team = await response_team.json();
        const free_leaders = result_leader.member_list.filter(member => member.teamName === '未定');
        const free_member = result_member.member_list.filter(member => member.teamName === '未定');

        setTeamLeader(free_leaders);
        setTeamMember(free_member);
        setTeamCard(result_team.team);
      } catch (error) {
        console.error('There was a problem fetching the data: ', error);
      }
    } else {
      try {
        const response = await fetch('http://0.0.0.0:8081/work-load/member-list?level=All');
        const result = await response.json();
        setAllMember(result.member_list);
      } catch (error) {
        console.error('There was a problem fetching the data: ', error);
      }
    }
  };

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


  const [ManagerOptions, setManagerOptions] = useState([{ key: '', value: '', text: 'Select...' }]);
  const [MemberOptions, setMemberOptions] = useState([{ key: '', value: '', text: 'Select...' }]);
  const [selectedMember, setSelectedMember] = useState([]);


  useEffect(() => {
    // 只有当 teamLeader 不为空时才执行以下操作
    if (teamLeader && teamLeader.length > 0) {
      setManagerOptions([{ key: '', value: '', text: 'Select...' }].concat(
        teamLeader.map((leader) => ({
          key: leader.memberName,
          value: leader.member_id,
          text: leader.memberName,
          image: { avatar: true, src: PhotoOptionsDict[leader.memberPhoto] },
        }))
      ));
    }
    if (teamMember && teamMember.length > 0) {
      setMemberOptions([{ key: '', value: '', text: 'Select...' }].concat(
        teamMember.map((member) => ({
          key: member.memberName,
          value: member.member_id,
          text: member.memberName,
          image: { avatar: true, src: PhotoOptionsDict[member.memberPhoto] },
        }))
      ));
    }
  }, [teamLeader, teamMember]);  // 侦听 teamLeader 的变化

  const [memberStatus, setMemberStatus] = useState({});
  const [selectedMembers, setSelectedMembers] = useState([]);
  const handleMemberIntoList = (memberId) => {
    console.error('Handling member: ', memberId);
    setMemberStatus((prevStatus) => {
      const newStatus = {
        ...prevStatus,
        [memberId]: !prevStatus[memberId],
      };

      const newSelectedMembers = Object.keys(newStatus).filter(id => newStatus[id]);
      setSelectedMembers(Object.keys(newStatus).filter(id => newStatus[id]));
      console.error('Handling member: 狀態', newStatus);
      console.error('Handling member: 列表', newSelectedMembers);
      console.error('Handling member: 結果', selectedMembers);


      return newStatus;
    });
  };
  const [selectedMemberOptions, setSelectedMemberOptions] = useState([]);

  useEffect(() => {
    // 当 selectedMembers 改变时，此回调将被触发
    if (selectedMembers.length === 0) {
      setSelectedMemberOptions([{ key: '', value: '', text: 'Select...' }])
    } else {

      setSelectedMemberOptions(
        selectedMembers.map((memberId) => {
          console.error(memberId);
          console.error(teamMember)
          const member = teamMember.find((leader) => leader.member_id === parseInt(memberId, 10));
          console.error(member)
          if (!member) return []; // 如果找不到成员，返回 null

          return {
            key: member.memberName,
            value: member.member_id,
            text: member.memberName,
            image: { avatar: true, src: PhotoOptionsDict[member.memberPhoto] },
          };
        })
      );
    }
  }, [selectedMembers]);






  const PhotoOptions = [
    { key: '', value: '', text: 'Select...', style: { fontWeight: "bold" } },
    { key: 'man', value: 'man', text: 'normal', image: { avatar: true, src: man }, },
    { key: 'woman', value: 'woman', text: 'normal', image: { avatar: true, src: woman }, },
    { key: 'hairman', value: 'hairman', text: 'hair', image: { avatar: true, src: hairman }, },
    { key: 'hatwoman', value: 'hatwoman', text: 'hat', image: { avatar: true, src: hatwoman }, },
    { key: 'hatman', value: 'hatman', text: 'hat', image: { avatar: true, src: hatman }, },
    { key: 'oldman', value: 'oldman', text: 'old', image: { avatar: true, src: oldman }, },
    { key: 'youngman', value: 'youngman', text: 'young', image: { avatar: true, src: youngman }, },
  ];
  const PhotoOptionsDict = {
    'man': man,
    'woman': woman,
    'hairman': hairman,
    'hatwoman': hatwoman,
    'hatman': hatman,
    'oldman': oldman,
    'youngman': youngman,
  };

  // Level

  const levels = [
    { key: 'Entry', color: 'grey' },
    { key: 'Junior', color: 'olive' },
    { key: 'Senior', color: 'teal' },
    { key: 'Leader', color: 'blue' },
  ]

  const levelsDict = {
    'Entry': 'grey',
    'Junior': 'olive',
    'Senior': 'teal',
    'Leader': 'blue',
  };

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
    fetch('http://0.0.0.0:8081/work-load/add_member', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => {
      // 回傳成功
      if (response.ok) {
        setOpenAddMemberModal(false);
        setmMdalFinish(true);
        setMemberName('');
        setMemberPhoto('');
        setMemberEmail('');
        setMemberEmailType('');
        setMemberLevel('');

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
  const handleAddTeamFetch = () => {
    const payload = {
      teamName,
      manager,
      memberList,
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
        setTeamName('');
        setManager('');
        setMemberList([])
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
          <Card.Group itemsPerRow={3} stackable style={{ width: '95%', height: '100%', marginTop: "1%" }}>
            {teamCard.map((card, index) => (
              <Card key={index}
                fluid
              >
                <Card.Content>
                  <Card.Header
                    style={{ fontSize: "25px", fontWeight: "bold", textAlign: "center" }}>
                    {card.teamName}
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <Grid textAlign="center" verticalAlign="middle" style={{ fontSize: "35px" }}>
                    <Grid.Column>
                      <Icon name='users' size='huge' style={{ fontSize: "55px" }} />
                      {card.memberCount}

                    </Grid.Column>
                  </Grid>
                </Card.Content>

                <Button fluid
                  color="blue"
                  style={{ fontSize: "15px", fontWeight: "bold" }}
                  onClick={() => setOpenCardAdd(true)}
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
          <table className="ui  celled striped table" style={{ width: "60%", marginTop: "2%" }}>


            <thead>
              <tr>
                <th style={{ width: "5%" }}> 成員</th>
                <th style={{ width: "5%" }}> 信箱</th>
                <th style={{ width: "10%" }}> 職稱</th>
                <th style={{ width: "5%" }}> 團隊</th>

              </tr>
            </thead>
            <tbody>
              {allMember.map((item, index) => {

                return (
                  <tr key={index} style={{ fontWeight: "bold" }}>

                    <td>
                      <Grid >
                        <Grid.Column width={1} style={{ marginRight: '0px' }}>
                          <Image src={PhotoOptionsDict[item.memberPhoto]} alt={item.memberPhoto} size="mini" />
                        </Grid.Column>
                        <Grid.Column width={1} verticalAlign='middle'>
                        </Grid.Column>
                        <Grid.Column width={10} verticalAlign='middle'>
                          {item.memberName}
                        </Grid.Column>
                      </Grid>
                    </td>
                    <td><a>{item.email}</a></td>
                    <td>
                      <Label circular color={levelsDict[item.level]} empty style={{ marginRight: '10px' }} />
                      {item.level}
                    </td>
                    <td>{item.teamName}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        size='small'
        onClose={() => setOpenCardAdd(false)}
        onOpen={() => setOpenCardAdd(true)}
        open={openCardAdd}
      >
        <Modal.Header>新增團隊成員</Modal.Header>
        <Modal.Content style={{ width: "80%" }}>
          <table className="ui  celled striped table"
            style={{
              marginLeft: "-5%",
              width: '100%'
            }}>
            <thead>
              <tr><th colspan="3">
                當前成員列表
              </th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th style={{ width: "45%" }}> 成員</th>
                <th style={{ width: "45%" }}> 職稱</th>
                <th style={{ width: "5%" }}> 新增</th>

              </tr>
            </thead>
            <tbody>
              {teamMember.map((item, index) => {

                return (
                  <tr key={index} style={{ fontWeight: "bold" }}>

                    <td>
                      <Grid >
                        <Grid.Column width={1} style={{ marginRight: '0px' }}>
                          <Image src={PhotoOptionsDict[item.memberPhoto]} alt={item.memberPhoto} size="mini" />
                        </Grid.Column>
                        <Grid.Column width={1} verticalAlign='middle'>
                        </Grid.Column>
                        <Grid.Column width={10} verticalAlign='middle'>
                          {item.memberName}
                        </Grid.Column>
                      </Grid>
                    </td>
                    <td>
                      <Label circular color={levelsDict[item.level]} empty style={{ marginRight: '10px' }} />
                      {item.level}
                    </td>
                    <td>
                      <Button
                        fluid
                        color={memberStatus[item.member_id] ? 'red' : 'green'}
                        onClick={() => handleMemberIntoList(item.member_id)}
                      >
                        <Icon name={memberStatus[item.member_id] ? 'minus' : 'plus'}
                          size="large"
                          style={{
                            marginRight: '0px'
                          }} />
                      </Button>

                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>

          <Form style={{
            marginLeft: "-5%",
            width: '100%'
          }}>

            <Form.Field>
              <label>已選擇成员</label>
              <Dropdown
                placeholder=''
                fluid
                multiple
                selection
                options={selectedMemberOptions}
                //value={selectedMemberOptions}
                //onChange={e => setSelectedMember(e.target.value)}
                onChange={(e, { value }) => setSelectedMember(selectedMemberOptions)}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label='我已確認填寫內容無誤！絕對不會耍雷'
                onChange={() => setIsTeamChecked(!isTeamChecked)}
                tabIndex='0'
              />
            </Form.Field>
          </Form>

        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => {
            setOpenCardAdd(false);
            setIsTeamChecked(false);


          }}>
            取消
          </Button>
          <Button
            content="新增"
            labelPosition='right'
            icon='checkmark'
            onClick={() => {
              setOpenCardAdd(false);
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
      <Modal
        key={modalKey}
        size='large'
        onClose={() => setOpenAddTeamModal(false)}
        onOpen={() => {
          setOpenAddTeamModal(true);
          setModalKey(Date.now());
        }}
        open={openAddTeamModal}
      >
        <Modal.Header>新增團隊</Modal.Header>
        <Modal.Content style={{ width: "80%" }}>
          <Form style={{
            marginLeft: "-5%",
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
                style={{ fontWeight: "bold" }}
              />
              <Form.Field required width={4}>
                <label>主管</label>
                <Dropdown
                  placeholder='manager name'
                  fluid
                  selection
                  options={ManagerOptions}
                  onChange={(e, { value }) => setManager(value)}
                  style={{ fontWeight: "bold" }}
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
                options={MemberOptions}
                onChange={(e, { value }) => setMemberList(value)}
              />
            </Form.Field>

            <Form.Field>
              <Checkbox
                label='我已確認填寫內容無誤！絕對不會耍雷'
                onChange={() => setIsTeamChecked(!isTeamChecked)}
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
      <Modal
        size='small'
        onClose={() => setOpenAddMemberModal(false)}
        onOpen={() => setOpenAddMemberModal(true)}
        open={openAddMemberModal}
      >
        <Modal.Header>新增成員</Modal.Header>
        <Modal.Content style={{ width: "80%" }}>
          <Form style={{
            marginLeft: "-5%",
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
                style={{ fontWeight: "bold" }}
              />
              <Form.Field required width={3}>
                <label>人像</label>
                <Dropdown
                  placeholder='memberPhoto'
                  fluid
                  selection
                  options={PhotoOptions}
                  onChange={(e, { value }) => setMemberPhoto(value)}
                  style={{ fontWeight: "bold" }}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field required width={10}>
                <label>電子信箱</label>
                <Input
                  label={<Dropdown defaultValue='@gmail.com'
                    options={emailOptions}
                    style={{ width: "140px" }}
                    onChange={(e, { value }) => setMemberEmailType(value)}
                  />}
                  labelPosition='right'
                  placeholder='Marcus Tsai'
                  value={memberEmail}
                  onChange={e => setMemberEmail(e.target.value)}
                  style={{ fontWeight: "bold" }}
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
                  style={{ fontWeight: "bold" }}
                />
              </Form.Field>
            </Form.Group>


            <Form.Field>
              <Checkbox
                label='我已確認填寫內容無誤！絕對不會耍雷'
                onChange={() => setIsMemberChecked(!isMemberChecked)}
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
            style={{ width: "120px" }}
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

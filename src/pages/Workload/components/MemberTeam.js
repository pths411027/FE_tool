


import "./Layer2.css"
import React, { useState, useEffect } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Input, Button, Label, Header, Icon, Card, Grid } from 'semantic-ui-react';


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
  {
    user_id: 'User1',
    item_id: 'Item3',
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
    item_id: 'Item4',
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
    item_id: 'Item5',
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
    item_id: 'Item6',
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
    item_id: 'Item8',
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
  const [selectedItems, setSelectedItems] = useState([]);
  const [submittedItems, setSubmittedItems] = useState({});
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
    {
      header: '3C產品',
      meta: 'Joined in 2013',
      events: [
        { name: 'Elliot Fu', action: 'added', target: 'Jenny Hess', role: 'project' },
        { name: 'Stevie Feliciano', action: 'was added as an', target: 'Administrator' },
        { name: 'Helen Troy', action: 'added', target: 'two pictures' },
      ],
      link: 'http://example.com',
    },
    {
      header: '數據產品',
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

  return (
    <div style={{marginTop: "1%", marginLeft: "5%"}}>
      <Header as='h1' style={{ display: 'flex', justifyContent: 'flex-start', marginLeft:'0%'}}>
          <Icon name='users icon' size='mini' />
          <Header.Content style={{marginLeft:'0%'}}>團隊</Header.Content>
      </Header>



      <Button color='green'> 新增團隊</Button>

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
              Add Friend
            </Button>
          </Card>
        ))}
      </Card.Group>



      <table className="ui red celled striped table" style={{width:"95%"}}>
        
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
    
    <Button color='blue' onClick={() => {
      Object.entries(selectedItems).forEach(([itemId, value]) => {
        fetch(`YOUR_SERVER_URL/YOUR_REQUEST_PATH`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId, value })
        });
      });
      // 修正原本的錯誤（不是要替代，而是新增）
      setSubmittedItems(prev => ({...prev, ...selectedItems}));
      setSelectedItems({});  // Clear selected items
    }}>
      Send your ans
    </Button>
    

  </div>
);
}

export default Member_Team;

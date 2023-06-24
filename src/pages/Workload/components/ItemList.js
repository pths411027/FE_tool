


import "./Layer2.css"
import React, { useState, useEffect } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Input, Button, Label } from 'semantic-ui-react';


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

function ItemList() {
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

  return (
    <div style={{marginTop: "1%", marginLeft: "5%"}}>
      <Button color='green'> Ask for Tasks</Button>
      <table className="ui red celled striped table" style={{width:"95%"}}>
        
        <thead>
          <tr>
            <th style={{width: "5%"}}> user_id</th>
            <th style={{width: "5%"}}> item_id</th>
            <th style={{width: "10%"}}> ctime</th>
            <th style={{width: "5%"}}> history_name</th>
            <th style={{width: "5%"}}> shop_id</th>
            <th style={{width: "5%"}}> Seller Type</th>
            <th style={{width: "5%"}}> name_score</th>
            <th style={{width: "5%"}}> image_score</th>
            <th style={{width: "5%"}}> be_link</th>
            <th style={{width: "5%"}}> first_rating</th>
            <th style={{width: "5%"}}> score</th>
            <th style={{width: "40%"}}> Complete</th>
            <th style={{width: "10%"}}> PIC_Remark</th>
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
              <td>{item.shop_id}</td>
              <td>{item.seller_type}</td>
              <td>{item.name_score}</td>
              <td>{item.image_score}</td>
              <td>{item.be_link}</td>
              <td>{item.first_rating}</td>
              <td>{item.score}</td>
              <td>
              <Dropdown
                className={submittedItems[uniqueId] ? "disabled-dropdown" : ""}
                disabled={!!submittedItems[uniqueId]}
                placeholder='Please Select...'
                fluid
                clearable
                selection
                onChange={(e, { value }) => setSelectedItems(prev => ({ ...prev, [uniqueId]: value }))}
                options={[
                  { key: '',
                   text: (
                    <span>
                      Please Select...
                    </span> ),
                    value: '' ,
                    style:{fontWeight:"normal"}},
                  { key: 'Yes',
                    text: (
                          <span>
                            <Label circular color='green' empty style={{marginRight:"10px"}}/>Yes
                          </span> ),
                    value: 'Yes', 
                    style:{fontWeight:"bold"}},
                  { key: 'No',
                    text: (
                          <span>
                            <Label circular color='red' empty style={{marginRight:"10px"}}/> No
                          </span> ),
                    value: 'No', 
                    style:{fontWeight:"bold"}},
                ]}
                defaultValue={item.complete}
                style={{fontWeight:"bold"}}
              />

              </td>
              <td>
                <Input placeholder='PIC Remark' defaultValue={item.pic_remark} />
              </td>
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

export default ItemList;

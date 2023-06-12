import React, { useState } from 'react';
import { Form, Select, Button, Dropdown, Modal } from 'semantic-ui-react';
import ModalProject from './Modal_Project';


const KYCoptions = [
  { key: 'Sam', value: 'Sam', text: 'Sam' },
  { key: 'Peter', value: 'Peter', text: 'Peter' },
  { key: 'Marcus', value: 'Marcus', text: 'Marcus' },
  { key: 'David', value: 'David', text: 'David' },
  { key: 'Shana', value: 'Shana', text: 'Shana' },
  { key: 'Sonny', value: 'Sonny', text: 'Sonny' },
  { key: 'Polo', value: 'Polo', text: 'Polo' },
  { key: 'Peggy', value: 'Peggy', text: 'Peggy' },
  { key: 'James', value: 'James', text: 'James' },
  { key: 'Charlie', value: 'Charlie', text: 'Charlie' },

  
  // ... 省略其他州
];

const options = [
  { key: 'CICD', value: 'CICD', text: 'CICD' },
  { key: 'BE', value: 'BE', text: 'BE' },
  { key: 'FE', value: 'FE', text: 'FE' },
  { key: 'PM', value: 'PM', text: 'PM' },
  
  // ... 省略其他州
];

function AddProject({mode, setMode}) {
  const [projectName, setProjectName] = useState('');
  const [KYC, setKYC] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [startDay, setstartDay] = useState('');
  const [endDay, setendDay] = useState('');
  const [extraInputs, setExtraInputs] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalFinish, setmMdalFinish] = useState(false);
  

  const buttons_1 = [
    {
      color: 'red',
      inverted: true,
      icon: 'remove',
      text: 'No',
      onClick: () => setModalOpen(false),
    },
    {
      color: 'green',
      inverted: true,
      icon: 'checkmark',
      text: 'Yes',
      onClick: () => {
        setModalOpen(false);
        handleConfirm();
      },
    },
  ];
  const buttons_2 = [
    {
      color: 'green',
      inverted: true,
      icon: 'checkmark',
      text: 'Yes',
      onClick: () => {
        setmMdalFinish(false);
        setMode('seeProject');
      },
    }
  ];
  




  const handleFormSubmit = () => {
    setModalOpen(true);
  };



  // event
  const handleExtraInputChange_event = (index, fieldIndex, event) => {
    const newInputs = [...extraInputs];
    newInputs[index][fieldIndex] = event.target.value;
    setExtraInputs(newInputs);
  };
  // value
  const handleExtraInputChange_value = (index, fieldIndex, value) => {
    const newInputs = [...extraInputs];
    newInputs[index][fieldIndex] = value.value;
    setExtraInputs(newInputs);
  };


  const handleAddInput = () => {
    setExtraInputs([...extraInputs, ['', '', '']]);
  };


  const handleConfirm = () => {
    const payload = {
      projectName,
      KYC,
      tag,
      description,
      startDay,
      endDay,
      extraInputs,
    };

    fetch('http://0.0.0.0:8081/pm-server/main-project', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
       
      },
      body: JSON.stringify(payload)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
        
      }
      setModalOpen(false)
      setmMdalFinish(true)
      return response.json();
      
    }).then(data => {
      console.log(data);
    }).catch(error => {
      console.error('There was a problem with the fetch operation: ', error);
    });
  };


  return (
    <div>
    
    <Form onSubmit={handleFormSubmit} style={{
        marginLeft: '5%', 
        width: '60%', 
        backgroundColor: 'rgb(249, 250, 251)', 
        border: '1px solid rgb(234, 234, 235)', 
        borderRadius: '10px',
        padding: '20px',
        marginTop:'14px'
        
      }}>
    <h4 className="ui dividing header">新增任務</h4>
      <Form.Group widths='equal'>
        <Form.Input
          label="任務名稱"
          name="projectName"
          placeholder="任務名稱"
          value={projectName}
          onChange={e => setProjectName(e.target.value)}
          width={10}
          required
        />


        <Form.Field required width={4}>
          <label>負責KYC</label>
          <Dropdown
            placeholder='KYC'
            fluid
            search
            selection
            options={KYCoptions}
            onChange={(e, { value }) => setTag(value)}
          />
        </Form.Field>
        
        <Form.Field required width={4}>
          <label>標籤</label>
          <Dropdown
            placeholder='State'
            fluid
            search
            selection
            options={options}
            onChange={(e, { value }) => setTag(value)}
          />
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input
            label="詳述"
            name="description"
            placeholder="詳述"
            value={description}
            onChange={e => setDescription(e.target.value)}
            width={10}
            required
          />
        <Form.Input
            label="開始日期"
            name="date"
            type="date"
            value={startDay}
            onChange={e => setstartDay(e.target.value)}
            width={4}
            required
          />
        <Form.Input
            label="結束日期"
            name="date"
            type="date"
            value={endDay}
            onChange={e => setendDay(e.target.value)}
            width={4}
            required
          />
      </Form.Group>
      <Button 
        onClick={handleAddInput} 
        size='large' 
        style={{height:"40px", width:"150px", marginBottom: "10px"}}  // 添加 marginTop 調整按鈕與上一個元素的間距
        >
        新增欄位
      </Button>
        {extraInputs.length > 0 && extraInputs.map((input, i) => (
          <Form.Group widths='equal' key={i}>
              <Form.Input
              label={`子任務名稱 ${i + 1}`}
              placeholder="子任務名稱"
              value={input[0]}
              onChange={e => handleExtraInputChange_event(i, 0, e)}
              width={2}  // 調整 input 欄位的長度
              required
              
              />
              <Form.Input
              label="詳述"  // 使用模板字符串添加索引到 label 中
              placeholder="詳述"
              value={input[1]}
              onChange={e => handleExtraInputChange_event(i, 1, e)}
              width={5}  // 調整 input 欄位的長度

              />
              <Form.Select
                fluid
                label="標籤"
                placeholder="標籤"
                options={options}
                value={input[2]}
                onChange={(e, { value }) => handleExtraInputChange_value(i, 2, { value })}
                width={2}
                required
              />

          </Form.Group>
      ))}
      <Button type='submit' size='large' style={{height:"40px", width:"150px",marginTop: "10px"}}>
        提交
      </Button>
    </Form>
    <ModalProject
        modalOpen={modalOpen}
        closeModalOpen={() => setModalOpen(false)}
        modal_title="確認新增任務？"
        modal_des="系統將新增此需求進入訊息列表，請確認資料是否填正確！"
        buttons={buttons_1}
      />
    <ModalProject
        modalOpen={modalFinish}
        closeModalOpen={() => setmMdalFinish(false)}
        modal_title="已經新增任務"
        modal_des="系統已加入此任務!"
        buttons={buttons_2}
    />

    
    
   
    
    
    </div>
  );
}

export default AddProject;
/*
<Modal basic open={modalOpen} onClose={closeModalOpen} size='small'>
<Modal.Header>
  <i className="archive icon"></i>
  確認新增任務ㄇ？
</Modal.Header>
<Modal.Content>
  <p>系統將新增此需求進入訊息列表，請確認資料是否填正確！</p>
  <p>By Ops BI</p>
</Modal.Content>
<Modal.Actions>
  <Button basic color='red' inverted onClick={closeModalOpen}>
    <i className="remove icon"></i>
    No
  </Button>
  <Button color='green' inverted onClick={handleConfirm}>
    <i className="checkmark icon"></i>
    Yes
  </Button>
</Modal.Actions>
</Modal>

<Modal basic open={modalFinish} onClose={closeModalFinish} size='small'>
        <Modal.Header>
          <i className="archive icon"></i>
          已經新增任務
        </Modal.Header>
        <Modal.Content>
          <p>系統將新增此需求進入訊息列表，請確認資料是否填正確！</p>
          <p>By Ops BI</p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={closeModalFinish}>
            <i className="checkmark icon"></i>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>


*/

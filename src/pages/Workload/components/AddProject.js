import { async } from 'q';
import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Dropdown, Modal, Label } from 'semantic-ui-react';
import ModalProject from './Modal_Project';

// 顏色
const colors = ["red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "grey", "black"];
const color_options = colors.map(color => {
  return {
    key: color,
    value: color,
    text: (
      <span>
        <Label circular color={color} empty style={{ marginRight: "10px" }} /> {color}
      </span>
    ),
    style: { fontWeight: "bold" }
  }
});
color_options.unshift({
  key: '',
  value: '',
  text: (
    <span>
      Please Select...
    </span>
  ),
  style: { fontWeight: "bold" }
});

// 可更改選項/不可更改選項
const revise_options = [
  { key: 'yes', value: true, text: '可更改選項' },
  { key: 'no', value: false, text: '不可更改選項' },

];

// 資料類型選項
const col_type_options = [
  { key: 'int', value: 'int', text: '數字' },
  { key: 'str', value: 'str', text: '文字' },

];


function AddProject({ mode, setMode }) {
  const [projectName, setProjectName] = useState('');
  const [team, setTeam] = useState('');
  const [KPI, setKPI] = useState('');
  const [optionInputs, setOptionInputs] = useState([]);
  const [customerInputs, setCustomerInputs] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalFinish, setmMdalFinish] = useState(false);
  const [modalError, setmMdalError] = useState(false);
  const [Error, setError] = useState('');

  const [Teamoptions, setTeamoptions] = useState([]);


  useEffect(() => {
    fetchTeamrList();
  }, [team]);

  const fetchTeamrList = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8081/work-load/team-list');
      const result = await response.json();
      setTeamoptions(result.team.map(team => (
        { key: team.teamName, value: team.teamName, text: team.teamName }
      )));
    }
    catch (error) {
      console.error('There was a fetch problem the data: ', error)
    }
  };


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
        setMode('none')
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




  const handleFormSubmit = () => {
    setModalOpen(true);
  };

  // event
  const handleExtraInputChange_event = (index, fieldIndex, event, myInputs, setInput) => {
    const newInputs = [...myInputs];
    newInputs[index][fieldIndex] = event.target.value;
    setInput(newInputs);
  };
  // value
  const handleExtraInputChange_value = (index, fieldIndex, value, myInputs, setInput) => {
    const newInputs = [...myInputs];
    newInputs[index][fieldIndex] = value.value;
    setInput(newInputs);
  };

  // 增加新的選項
  const handleAddOptionInput = () => {
    setOptionInputs([...optionInputs, ['', '', '']]);
  };

  // 增加新的欄位
  const handleAddCustomerInput = () => {
    setCustomerInputs([...customerInputs, ['', '', '']]);
  };

  // 刪除選項
  const handleDeleteOptionInput = (index) => {
    const newExtraInputs = [...optionInputs];
    newExtraInputs.splice(index, 1);
    setOptionInputs(newExtraInputs);
  };

  // 刪除選項
  const handleDeleteCustomerInput = (index) => {
    const newExtraInputs = [...customerInputs];
    newExtraInputs.splice(index, 1);
    setCustomerInputs(newExtraInputs);
  };


  const handleConfirm = () => {
    const payload = {
      projectName,
      team,
      KPI,
      optionInputs,
      customerInputs,
    };

    fetch('http://0.0.0.0:8081/work-load/add-project', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => {
      // 回傳成功
      if (response.ok) {
        setModalOpen(false)
        setmMdalFinish(true)
      }
      else {
        return response.json().then(err => {
          setError(err.detail)
          setModalOpen(false)
          setmMdalError(true)
        });
      }
    }
    ).then(data => {
      console.log(data);
    }).catch(error => {
      setModalOpen(false)
      setmMdalError(true)
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
        marginTop: '14px'

      }}>
        <h2 className="ui dividing header" style={{ marginBottom: "%" }}>創建專案</h2>
        <Form.Group widths='equal'>
          <Form.Input
            label="專案名稱"
            name="projectName"
            placeholder="專案名稱"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            width={9}
            required
          />

          <Form.Field required width={4}>
            <label>負責團隊</label>
            <Dropdown
              placeholder='負責團隊'
              fluid
              search
              selection
              options={Teamoptions}
              onChange={(e, { value }) => setTeam(value)}
              style={{ fontWeight: "bold" }}
            />
          </Form.Field>
          <Form.Input
            label="KPI"
            name="KPI"
            placeholder="KPI"
            value={KPI}
            onChange={e => setKPI(e.target.value)}
            width={2}
            required
          />
        </Form.Group>

        <Button
          onClick={handleAddOptionInput}
          color='green'
          size='large'
          style={{ height: "40px", width: "180px", marginBottom: "10px" }}  // 添加 marginTop 調整按鈕與上一個元素的間距
        >
          新增回填選項
        </Button>
        {optionInputs.length > 0 && optionInputs.map((input, i) => (
          <Form.Group widths='equal' key={i}>

            <Form.Input
              label={` 回填選項 ${i + 1}`}
              placeholder="子任務名稱"
              value={input[0]}
              onChange={e => handleExtraInputChange_event(i, 0, e, optionInputs, setOptionInputs)}
              width={3}  // 調整 input 欄位的長度
              required
              style={{ fontWeight: "bold" }}

            />
            <Form.Select
              fluid
              search
              label="答案類型"
              placeholder="可更改選項/不可更改選項"
              options={revise_options}
              value={input[1]}
              onChange={(e, { value }) => handleExtraInputChange_value(i, 1, { value }, optionInputs, setOptionInputs)}
              width={3}
              required
              style={{ fontWeight: "bold" }}
            />
            <Form.Select
              fluid
              label="標籤顏色"
              placeholder="標籤顏色"
              options={color_options}
              value={input[2]}
              onChange={(e, { value }) => handleExtraInputChange_value(i, 2, { value }, optionInputs, setOptionInputs)}
              width={3}
              required
              style={{ fontWeight: "bold" }}
            />
            <Form.Field width={1} style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Button
                color='red'
                fluid
                onClick={() => handleDeleteOptionInput(i)}
                style={{ fontWeight: "bold" }}
              >
                Delete
              </Button>
            </Form.Field>


          </Form.Group>
        ))}
        <br />
        <Button
          onClick={handleAddCustomerInput}
          color='blue'
          size='large'
          style={{ height: "40px", width: "180px", marginBottom: "10px" }}  // 添加 marginTop 調整按鈕與上一個元素的間距
        >
          新增客製化欄位
        </Button>
        {customerInputs.length > 0 && customerInputs.map((input, i) => (
          <Form.Group widths='equal' key={i}>
            <Form.Input
              label={` 欄位名稱 ${i + 1}`}
              placeholder="欄位名稱"
              value={input[0]}
              onChange={e => handleExtraInputChange_event(i, 0, e, customerInputs, setCustomerInputs)}
              width={3}  // 調整 input 欄位的長度
              required
              style={{ fontWeight: "bold" }}

            />
            <Form.Select
              fluid
              label="資料類別"
              placeholder="資料類別"
              options={col_type_options}
              value={input[1]}
              onChange={(e, { value }) => handleExtraInputChange_value(i, 1, { value }, customerInputs, setCustomerInputs)}
              width={3}
              required
              style={{ fontWeight: "bold" }}
            />
            <Form.Input
              label={` 註解`}
              placeholder="註解"
              value={input[2]}
              onChange={e => handleExtraInputChange_event(i, 2, e, customerInputs, setCustomerInputs)}
              width={3}  // 調整 input 欄位的長度
              required
              style={{ fontWeight: "bold" }}
            />

            <Form.Field width={1} style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Button
                color='red'
                fluid
                onClick={() => handleDeleteCustomerInput(i)}
                style={{ fontWeight: "bold" }}
              >
                Delete
              </Button>
            </Form.Field>
          </Form.Group>
        ))}
        <br />
        <Button type='submit' size='large' style={{ height: "40px", width: "150px", marginTop: "10px" }}>
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
      <ModalProject
        modalOpen={modalError}
        closeModalOpen={() => setmMdalError(false)}
        modal_title="新增失敗任務"
        modal_des={`${Error}`}
        buttons={buttons_3}
      />
    </div>
  );
}
export default AddProject;
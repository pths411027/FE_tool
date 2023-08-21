
import React, { useState, useEffect, useRef } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Grid, Input, Button, Label, Modal, Icon, Form, Dropdown } from 'semantic-ui-react';

// 圖片
import pdf from "./page/pdf.png"
import docx from "./page/docx.png"
import ppt from "./page/ppt.png"
import xlsx from "./page/xlsx.png"
import jpg from "./page/jpg.png"
import png from "./page/png.png"
import csv from "./page/csv.png"
import others from "./page/others.png"


function WorkFlow() {
  const [workflow, setWorkflow] = useState([]);  // 新的状态变量
  const [projectdata, setProjectData] = useState([]);
  const [showSecondPart, setShowSecondPart] = useState(false);  // 新的状态变量
  const [projectdetial, setProjectDetail] = useState([]);
  const [projectheader, setProjectHeader] = useState([])
  const fileInput = useRef(null); // 新增一個ref

  const [loadingButtons, setLoadingButtons] = useState({});
  const [uploadingButtons, setUploadingButtons] = useState(true);

  const [frequency, setFrequency] = useState('');

  const FileDict = {
    '.pdf': pdf,
    '.docx': docx,
    '.pptx': ppt,
    '.xlsx': xlsx,
    '.jpg': jpg,
    '.png': png,
    '.png': png,
    '.csv': csv,
  };
  function determineColor(last_run_status) {
    if (last_run_status === "未執行") {
      return "blue";
    } else if (last_run_status === "成功") {
      return "green";
    } else {
      return "red";  // 你可以根據需要替換這個顏色
    }
  }


  // 在组件挂载时获取数据
  useEffect(() => {
    fetchWorkflowData();
  }, []);

  const fetchWorkflowData = async () => {
    try {
      const response = await fetch('http://localhost:8081/data-suite/workflow');
      const result = await response.json();
      setWorkflow(result.worrkflow);
    } catch (error) {
      console.error('There was a problem fetching the data: ', error);
    }
  };

  const handleButtonClick = async (pro_id, project_name, index) => {
    setLoadingButtons({ ...loadingButtons, [index]: true });
    try {
      // 根据项目名进行 GET 请求
      const response = await fetch(`http://0.0.0.0:8081/work-load/project-detail?pro_id=${pro_id}`);
      const result = await response.json();
      console.error(result)
      setProjectHeader([pro_id, project_name])
      setProjectDetail(result.project_detail)
      setShowSecondPart(true);
      setUploadingButtons(true);
    } catch (error) {
      console.error('There was a problem fetching the data: ', error);
    }
  };
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // 新建 state 用于保存选中的文件

  const handleFileSelect = (event) => {
    //setSelectedFiles(Array.from(event.target.files).map(file => file.name));
    setSelectedFiles(Array.from(event.target.files));
    setUploadModalOpen(true);
  };
  const handleUploadConfirm = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]); // 將每個檔案加入 FormData 的 "files" 欄位
    }

    try {
      const response = await fetch(`http://0.0.0.0:8081/work-load/upload-task-file?pro_id=${projectheader[0]}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
      handleButtonClick(projectheader[0], projectheader[1]);
      setUploadModalOpen(false); // 上传成功后关闭 Modal`
    } catch (error) {
      console.error("Error:uploaderror", error);
    }
  };

  const [addWorkflowModalOpen, setAddWorkflowModalOpen] = useState(false);
  //const handleAddWorkflow = async () => {


  const implementFrequencyOptions = [
    { key: '1', text: 'daily', value: 'daily' },
    { key: '2', text: 'hourly', value: 'hourly' },
  ]

  const implementTimingOptions = [];

  for (let i = 0; i <= 23; i++) {
    const value = i.toString();
    implementTimingOptions.push({
      key: value,
      text: value,
      value: value
    });
  }














  return (
    <div style={{ marginTop: "1%", marginLeft: "5%" }}>
      <Button
        color='linkedin'
        onClick={() => setAddWorkflowModalOpen(true)}
      > 新增工作流</Button>
      <table className="ui red celled striped table" style={{ width: "80%" }}>
        <thead>
          <tr>
            <th style={{ width: "10%" }}> 流程名稱</th>
            <th style={{ width: "10%" }}> 執行頻率</th>
            <th style={{ width: "10%" }}> 上次執行狀態</th>
            <th style={{ width: "10%" }}> 下次執行時間</th>
            <th style={{ width: "10%" }}> 上次修改時間</th>
            <th style={{ width: "10%" }}> 創建時間</th>
            <th style={{ width: "10%" }}> 創建人員</th>

          </tr>
        </thead>
        <tbody>
          {workflow.map((item, index) => {
            const buttonLoading = loadingButtons[index] === true;
            return (
              <tr key={index}
                style={{ fontSize: "14px" }}>
                <td>
                  <Button
                    className={buttonLoading ? 'ui loading' : ''}
                    fluid
                    onClick={() => handleButtonClick(item.pro_id, item.project_name, index)}
                    color='gray'
                    style={{
                      fontWeight: "bolder",
                      fontSize: "16px",
                    }}
                  >
                    {item.work_flow_name}
                  </Button>
                </td>

                <td>{item.work_flow_frequency}</td>
                <td>
                  <Icon name='circle' color={determineColor(item.last_run_status)} /> {item.last_run_time}
                </td>
                <td>{item.next_run_time}</td>
                <td>{item.last_modify_time}</td>
                <td>{item.create_time}</td>
                <td>{item.create_person}</td>

              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        onClose={() => setAddWorkflowModalOpen(false)}
        onOpen={() => setAddWorkflowModalOpen(true)}
        open={addWorkflowModalOpen}
        size='small'
      >
        <Modal.Header>新增工作流</Modal.Header>
        <Modal.Content style={{ width: "80%" }}>
          <Form>
            <Form.Field>
              <label>工作流名稱</label>
              <input placeholder='工作流名稱' />
            </Form.Field>

            <Form.Group widths='equal'>
              <Form.Field required>
                <label>執行頻率</label>
                <Dropdown
                  //placeholder='Daily'
                  fluid
                  search
                  selection
                  options={implementFrequencyOptions}
                  value={frequency}
                  onChange={(e, { value }) => setFrequency(value)}
                />
              </Form.Field>

              <Form.Field required>
                <label>執行頻率</label>
                <Dropdown
                  //placeholder='Daily'
                  fluid
                  search
                  selection
                  options={implementTimingOptions}
                  disabled={frequency === 'hourly' ? true : false}
                //onChange={(e, { value }) => setKYC(value)}
                />
              </Form.Field>
            </Form.Group>



          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setAddWorkflowModalOpen(false)}>
            取消
          </Button>
          <Button

            content="新增"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setAddWorkflowModalOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>



    </div>
  );
}

export default WorkFlow;

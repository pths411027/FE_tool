


import "./Layer2.css"
import React, { useState, useEffect, useRef} from "react";
import 'semantic-ui-css/semantic.min.css';
import { Dropdown, Input, Button, Label, Header, Icon } from 'semantic-ui-react';




function ProjectList() {
  const [projectdata, setProjectData] = useState([]);
  const [showSecondPart, setShowSecondPart] = useState(false);  // 新的状态变量
  const [projectdetial, setProjectDetail] = useState([]);
  const [projectheader, setProjectHeader] = useState([])
  const fileInput = useRef(null); // 新增一個ref


  
  // 在组件挂载时获取数据
  useEffect(() => {
    fetchProjectData();
  }, []);
  
  const fetchProjectData = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8081/work_load/project-list');
      const result = await response.json();
      setProjectData(result.project_list);
    } catch (error) {
      console.error('There was a problem fetching the data: ', error);
    }
  };

  const handleButtonClick = async (pro_id, project_name) => {
    try {
      // 根据项目名进行 GET 请求
      const response = await fetch(`http://0.0.0.0:8081/work_load/project-detail?pro_id=${pro_id}`);
      const result = await response.json();
      console.error(result)
      setProjectHeader([pro_id, project_name])
      setProjectDetail(result.project_detail)
      setShowSecondPart(true);
    } catch (error) {
      console.error('There was a problem fetching the data: ', error);
    }
  };


  const handleUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    // 在這裡處理上傳檔案的邏輯
    // 可以使用 FormData 來包裝檔案和其他資料，並發送 POST 請求到後端的 "/upload-task-file" 端點
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]); // 將每個檔案加入 FormData 的 "files" 欄位
    }

    try {
      const response = await fetch(`http://0.0.0.0:8081/work_load/upload-task-file?pro_id=${projectheader[0]}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);        
      handleButtonClick(projectheader[0], projectheader[1]);
    } catch (error) {
      console.error("Error:uploaderror", error);
    }
    
    
  };

  const handleClick = () => {
    fileInput.current.value = ""; // 將 file input 的值設置為空
    fileInput.current.click(); // 使用 ref 點擊 input 元素
    
  }
  
  return (
    <div>
      {!showSecondPart ? (
        <div style={{marginTop: "1%", marginLeft: "5%"}}>
          <Button color='green'> Ask for Tasks</Button>
          <table className="ui red celled striped table" style={{width:"95%"}}>
            <thead>
              <tr>
                <th style={{width: "10%"}}> 專案名稱</th>
                <th style={{width: "10%"}}> KPI</th>
                <th style={{width: "10%"}}> 創建時間</th>
                <th style={{width: "10%"}}> 更新時間</th>
                <th style={{width: "10%"}}> 負責團隊</th>
                <th style={{width: "30%"}}> 負責成員</th>
                <th style={{width: "10%"}}> 進入專案</th>
              </tr>
            </thead>
            <tbody>
            {projectdata.map((item, index) => {
              return(
                <tr key={index}>
                  <td>{item.project_name}</td>
                  <td>{item.KPI}</td>
                  <td>{item.created_time}</td>
                  <td>{item.updated_time}</td>
                  <td>{item.team}</td>
                  <td>{item.team}</td>
                  <td>
                    <Button
                      fluid
                      onClick={() => 
                        handleButtonClick(item.pro_id, item.project_name)}
                      color='green'
                    >
                      進入該專案
                    </Button>
                  </td>
                </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      ) : (
      <div style={{marginTop: "1%", marginLeft: "5%"}}>
          <Header as='h1' style={{ display: 'flex', justifyContent: 'flex-start', marginLeft:'0%'}}>
          <Icon name='tasks icon' size='mini' />
            <Header.Content style={{marginLeft:'0%'}}>{projectheader[1]}</Header.Content>
          </Header>
          <Button color="green" onClick={handleClick}>
            <Icon name='upload icon' style={{ marginRight:"10px" }} color='white' />
            上傳檔案
          </Button>

          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInput} // 將ref綁定到input元素
            onChange={handleUpload}
            multiple
          />

          <table className="ui red celled striped table" style={{width:"95%"}}>
            <thead>
              <tr>
                <th style={{width: "10%"}}> 上傳時間</th>
                <th style={{width: "30%"}}> 檔案名稱</th>
                <th style={{width: "10%"}}> 物件總數</th>
                <th style={{width: "10%"}}> 暫緩總數</th>
                <th style={{width: "10%"}}> 完成總數</th>
                <th style={{width: "10%"}}> 狀態</th>
                <th style={{width: "10%"}}> 下載檔案</th>
              </tr>
            </thead>
            <tbody>
            {projectdetial.map((item, index) => {
              return(
                <tr key={index}>
                  <td>{item.created_time}</td>
                  <td>{item.file_name}</td>
                  <td>{item.item_sum}</td>
                  <td>{item.project_name}</td>
                  <td>{item.project_name}</td>
                  <td>{item.project_name}</td>
                  <td>
                    <Button
                      fluid
                      
                      color='green'
                    >
                      下載檔案
                    </Button>
                  </td>
                </tr>
                );
              })}
          </tbody>
        </table>
          

      </div>
      )}
  </div>
);
}

export default ProjectList;

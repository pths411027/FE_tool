import "./Layer2.css"
import React, { useState, useEffect, useRef } from "react";
import 'semantic-ui-css/semantic.min.css';
import { Grid, Input, Button, Label, Modal, Icon, Image } from 'semantic-ui-react';

// 圖片
import pdf from "./page/pdf.png"
import docx from "./page/docx.png"
import ppt from "./page/ppt.png"
import xlsx from "./page/xlsx.png"
import jpg from "./page/jpg.png"
import png from "./page/png.png"
import csv from "./page/csv.png"
import others from "./page/others.png"


function ProjectList() {
  const [projectdata, setProjectData] = useState([]);
  const [showSecondPart, setShowSecondPart] = useState(false);  // 新的状态变量
  const [projectdetial, setProjectDetail] = useState([]);
  const [projectheader, setProjectHeader] = useState([])
  const fileInput = useRef(null); // 新增一個ref

  const [loadingButtons, setLoadingButtons] = useState({});
  const [uploadingButtons, setUploadingButtons] = useState(true);

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



  // 在组件挂载时获取数据
  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8081/work-load/project-list');
      const result = await response.json();
      setProjectData(result.project_list);
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


  const handleUpload = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]); // 將每個檔案加入 FormData 的 "files" 欄位
    }

    try {
      const response = await fetch(`http://0.0.0.0:8081/work-load/upload-task-file?pro_id=${projectheader[0]}`, {
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
        <div style={{ marginTop: "1%", marginLeft: "5%" }}>
          <Button color='green'> Ask for Tasks</Button>
          <table className="ui red celled striped table" style={{ width: "95%" }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}> 專案名稱</th>
                <th style={{ width: "10%" }}> KPI</th>
                <th style={{ width: "10%" }}> 創建時間</th>
                <th style={{ width: "10%" }}> 更新時間</th>
                <th style={{ width: "10%" }}> 負責團隊</th>
                <th style={{ width: "30%" }}> 負責成員</th>
                <th style={{ width: "15%" }}> 進入專案</th>
              </tr>
            </thead>
            <tbody>
              {projectdata.map((item, index) => {
                const buttonLoading = loadingButtons[index] === true;
                return (
                  <tr key={index}>
                    <td>{item.project_name}</td>
                    <td>{item.KPI}</td>
                    <td>{item.created_time}</td>
                    <td>{item.updated_time}</td>
                    <td>{item.team}</td>
                    <td>{item.team}</td>
                    <td>
                      <Button
                        className={buttonLoading ? 'ui loading' : ''}
                        fluid
                        onClick={() => handleButtonClick(item.pro_id, item.project_name, index)}
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
        <div style={{ marginTop: "1%", marginLeft: "5%" }}>

          <Button color="green" onClick={handleClick}>
            <Icon name='upload icon' style={{ marginRight: "10px" }} color='white' />
            上傳檔案
          </Button>
          <input
            type="file"
            style={{ display: 'none' }}
            ref={fileInput} // 將ref綁定到input元素
            onChange={handleFileSelect}
            multiple
          />

          <Modal size="tiny"
            open={uploadModalOpen}
            onClose={() => setUploadModalOpen(false)}
          >
            <Modal.Header>確認上傳</Modal.Header>
            <Modal.Content style={{ width: "80%" }}>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </Modal.Content>
            <Modal.Actions>

              <Button className={uploadingButtons === false ? 'ui loading' : ''}
                color="green"
                onClick={
                  () => {
                    handleUploadConfirm();
                    setUploadingButtons(false);
                  }
                }>Confirm</Button>
              <Button color="red" onClick={() => setUploadModalOpen(false)}>Cancel</Button>
            </Modal.Actions>
          </Modal>

          <table className="ui red celled striped table" style={{ width: "95%" }}>
            <thead>
              <tr>
                <th style={{ width: "10%" }}> 上傳時間</th>
                <th style={{ width: "5%" }}> 檔案類型</th>
                <th style={{ width: "30%" }}> 檔案名稱</th>
                <th style={{ width: "10%" }}> 檔案大小</th>
                <th style={{ width: "5%" }}> 下載檔案</th>
              </tr>
            </thead>
            <tbody>
              {projectdetial.map((item, index) => {
                const handleDownload = () => {
                  window.open(`http://localhost:8081/work-load/download-task-file/${item.file_id}`);
                };
                return (
                  <tr key={index}>
                    <td>{item.created_time}</td>
                    <td>
                      <Grid.Column width={1} style={{ marginLeft: '20%', width: '60%' }}>
                        <Image src={FileDict[item.file_extension] || others} alt={item.file_extension} size="mini" />
                      </Grid.Column>
                    </td>
                    <td>{item.file_name}</td>
                    <td>{item.file_size}</td>
                    <td>
                      <Button color="green" size="tiny" onClick={handleDownload}>
                        <Icon name='cloud download icon' style={{ marginRight: "0px" }} color='white' />
                        下載點
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

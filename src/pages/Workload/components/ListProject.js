


/*


function Layer3() {
    const data = [
        { name: '腳本標寫', registrationDate: 'September 14, 2013', email: 'gitlab 自動部署、測試', premiumPlan: 'CICD', color: 'rgb(30, 123, 162)'},
        { name: 'UI設計', registrationDate: 'January 11, 2014', email: '表單設計、標籤頁設計', premiumPlan: 'FE', color: 'rgb(250, 197, 93)'},
        { name: '後端工程', registrationDate: 'May 11, 2014', email: 'API設計', premiumPlan: 'BE', color: 'rgb(237, 106, 95)'},
      ];

  return (
    <table className="ui red celled striped table" style={{marginLeft: "5%", width:"60%"}}>
      <thead>
            <tr><th colspan="5">
            任務列表
            </th>
        </tr>
    </thead>
      <thead>
        <tr>
          <th>開關</th>
          <th>任務名稱</th>
          <th>任務時間</th>
          <th>任務詳情</th>
          <th>標籤</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="collapsing">
              <div className="ui fitted slider checkbox">
                <input type="checkbox" /> <label></label>
              </div>
            </td>
            <td>{item.name}</td>
            <td>{item.registrationDate}</td>
            <td>{item.email}</td>
            
            <td><span style={{backgroundColor: item.color, padding: '0.5em', color:"white", fontWeight:"900", borderRadius: '5px', textShadow: '1px 1px 2px black'}}>{item.premiumPlan}</span></td>

          </tr>
        ))}
      </tbody>
      <tfoot className="full-width">
        <tr>
          <th></th>
          <th colSpan="4">
            <div className="ui right floated small primary labeled icon button">
              <i className="user icon"></i> Add User
            </div>
            <div className="ui small button">
              Approve
            </div>
            <div className="ui small disabled button">
              Approve All
            </div>
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

export default Layer3;
*/

import "./Layer2.css"
import React, { useState, useEffect } from "react";
import 'semantic-ui-css/semantic.min.css';

function ListProject() {
  const [data, setData] = useState([]);

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

  return (
    <table className="ui red celled striped table" style={{marginLeft: "5%", width:"60%"}}>
      <thead>
        <tr>
          <th colspan="5">任務列表</th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th style={{width: "20%"}}>任務名稱</th>
          <th style={{width: "15%"}}>開始時間</th>
          <th style={{width: "15%"}}>結束時間</th>
          <th style={{width: "30%"}}>任務詳情</th>
          <th style={{width: "15%"}}>標籤</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.project_name}</td>
            <td>{item.start_day}</td>
            <td>{item.end_day}</td>
            <td>{item.description}</td>
            <td>
              <span
                style={{
                  backgroundColor: item.color,
                  paddingTop: '0.3em',
                  paddingBottom: '0.3em',
                  paddingLeft: '0.7em',
                  paddingRight: '0.7em',
                  color: 'black',
                  fontWeight: '900',
                  borderRadius: '8px',
                  
                }}
              >
                {item.tag}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListProject;

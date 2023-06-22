import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Table } from 'semantic-ui-react';




function Timeline({ start, end , color}) {

  

  const startDate = new Date(start);
  const endDate = new Date(end);
  const daysInMonth = new Date(endDate.getFullYear(), endDate.getMonth()+1, 0).getDate();

  // Calculate start position and length of colored part
  const startPos = ((startDate.getDate()-1) / daysInMonth) * 100;
  const length = ((endDate - startDate) / (1000 * 60 * 60 * 24)) / daysInMonth * 100;


  //const color = "rgb(250, 197, 93)";  // Fill color, also used for border color

  return (
    <div style={{ 
      width: "100%", 
      height: "42px", 
      border: `1px solid ${color}`,  // Use fill color as border color
      borderRadius: "5px",  // Rounded corners
      overflow: 'hidden',  // So the inner div's corners don't exceed the outer div
      display: 'flex',  // Use Flex layout
      alignItems: 'center'  // Center the inner div vertically
    }}>
      <div
        style={{
          width: `${length}%`,
          height: "30px",
          background: color,
          marginLeft: `${startPos+2}%`,
          borderRadius: "10px",  // Rounded corners
          display: 'flex',  // Use Flex layout
          justifyContent: 'space-between',  // Spread children elements evenly across the horizontal axis
          alignItems: 'center',  // Center the text vertically
          padding: '0 2%',  // Give some room for the start and end dates
          color: 'black',  // Set text color to white for better visibility
          fontWeight: "900",
          fontFamily:'sans-serif'
        }}
      >
        <span>{startDate.getDate()}日</span> 
        <span>{endDate.getDate()}日</span>  
      </div>
    </div>
  );
}


// 表格组件
function TaskTable({ tasks }) {
  return (
    <Table celled style={{marginLeft:"5%", width:"60%"}}>
      <Table.Header>
        <Table.Row>
        
          <Table.HeaderCell style={{width: "20%"}}>項目</Table.HeaderCell>
          <Table.HeaderCell style={{width: "80%"}}>時間軸</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {tasks.map((task) => (
          <Table.Row key={task.name}>
            <Table.Cell>{task.name}</Table.Cell>
            <Table.Cell>
              <Timeline start={task.start} end={task.end} color={task.color}/>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function TimelineProject() {
  /*
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // 在组件挂载时获取数据
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8081/pm-server/now-main-project');
      const result = await response.json();
      setData(result.main_projects);
    } catch (error) {
      console.error('There was a problem fetching the data: ', error);
    }
  };
  
  const tasks = [
    { name: "CICD腳本編寫", start: "2023-05-01", end: "2023-12-31", color:"rgba(250, 197, 93, 0.8)" },
    { name: "前段工程", start: "2023-03-01", end: "2023-09-30" ,color:"rgba(30, 123, 162, 0.8)" },
    { name: "後段工程", start: "2023-01-11", end: "2023-09-04" ,color:"rgba(237, 106, 95, 0.8)" },
    { name: "後段工程", start: "2023-06-01", end: "2023-11-30" ,color:"rgba(30, 123, 162, 0.8)" },
  ];
  */
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://0.0.0.0:8081/pm-server/main-project');
      const result = await response.json();

      const formattedData = result.main_projects.map(project => ({
        name: project.project_name,
        start: project.start_day,
        end: project.end_day,
        color: project.color
      }));

      setTasks(formattedData);
    } catch (error) {
      console.error('There was a problem fetching the data: ', error);
    }
  };


  return <TaskTable tasks={tasks}/>;
}
export default TimelineProject;



import "./Title.css"

import { useState, useEffect} from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/material.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/python/python.js";
import { Controlled as ControlledEditor } from "react-codemirror2";

import { Segment, Select, Button, Table, Label, Icon, Menu, Item} from 'semantic-ui-react';
const Editor = () => {
    const [value, setValue] = useState('');
    const [result, setResult] = useState(null);
    const [tablelist, setTablelist] = useState([]);


    function handleChange(editor, data, value) {
        setValue(value);
    }
    const fetchData = async () => {
        fetch('http://localhost:8081/data-suite/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'query': value}),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setResult(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const fetch_table = async () => {
        fetch('http://localhost:8081/data-suite/table', {   
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => { 
            console.log('Success:', data);
            setTablelist(data.table_list);
        })  
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        fetch_table();
      }, []);

    const handleClick = async () => {
        // 调用 API 下载查询结果的 CSV 文件
        fetch('http://localhost:8081/data-suite/download', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 'query': value }),
        })
        .then(response => response.blob()) // 将响应转换为 Blob 对象
        .then(blob => {
          // 创建隐藏的 <a> 标签，并设置下载链接和文件名
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.download = 'query_result.csv';
          // 触发点击事件，开始下载文件
          downloadLink.click();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    const [menuClicked, setMenuClicked] = useState(false);
    const handleMenuClick = () => {
        // 将 menuClicked 置为 true，表示菜单项被点击了
        setMenuClicked(true);
    
        // 设置一个延时，让菜单项点击的反应持续一段时间
        setTimeout(() => {
          // 将 menuClicked 置为 false，恢复菜单项状态
          setMenuClicked(false);
        }, 500); // 这里的 500 表示菜单项点击后的反应持续时间（单位为毫秒）
      };



    
    

    return (
        <div className="editor" style={{marginLeft:"5%"}}>
            <div style={{ display: 'flex' }}>
                `<Menu vertical style ={{width:"15%"}}>
                    <Menu.Item style={{fontWeight: 'bolder', fontSize: "18px", marginLeft: "0%"}}>
                        <div style={{ display: "flex", alignItems: "center" , fontWeight: 'bolder'}}>
                            <Icon name='sitemap' style={{ marginRight: "8px" }} />
                            <div>Table List</div>
                        </div>
                    </Menu.Item>
                    <Menu.Item>
                        {tablelist.map((item, tableIndex) => (
                            <Menu.Item 
                                style={{ 
                                fontWeight: menuClicked ? 'bolder' : 'normal', 
                                
                                marginLeft: "0%", 
                                cursor: 'pointer',
                                transition: 'font-weight 0.5s'
                                }} 
                                onClick={handleMenuClick}
                                
                            >
                                <div
                                    onClick={() => {
                                        setValue(`SELECT * FROM "${item}"`);
                                        fetchData();
                                    }} 
                                    style={{ display: "flex", alignItems: "center" , fontWeight: 'bolder'}} 
                                    >
                                
                                    <Icon name='table' style={{ marginRight: "8px" }} />
                                    <div>{item}</div>
                                </div>
                            </Menu.Item>
                        ))}
                    </Menu.Item>
                </Menu>
                <Segment style={{fontWeight: "bolder", width: "64%", marginLeft: '10px', marginTop: '0px', height: '520px'}}>
                    <div className="ui small basic icon buttons" style={{marginBottom: "10px"}}>
                        <Button basic onClick={fetchData} >
                            <Icon name='play'/>
                        </Button>
                        <Button basic onClick={handleClick}>
                            <Icon name='download icon'/>
                        </Button>
                        
                    </div>
                    <ControlledEditor 
                        style={{fontSize : '12px'}}
                        
                        onBeforeChange={handleChange}
                        value={value}
                        className="codemirrorRaper"
                        options={{
                            lineWrapping: true,
                            lint: true,
                            mode: "sql",
                            lineNumbers: true,
                            theme: "eclipse",
                            tabSize: 4,
                            autoScrollMaxHeight: 250,
                            }}
                        height="100px"
                    />
                </Segment>

            </div>
            
            
            
            {result && (
                <Table celled style={{width:"80%"}}>
                    <Table.Header>
                        <Table.Row>
                        {result.column_names.map((col) => (
                            <Table.HeaderCell key={col}>{col}</Table.HeaderCell>
                        ))}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {result.data.map((task, taskIndex) => (
                            <Table.Row key={taskIndex}>
                                {result.column_names.map((col) => (
                                    <Table.Cell key={col}>{task[col]}</Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>

                </Table>
            )}
        </div>
    );
}

export default Editor;
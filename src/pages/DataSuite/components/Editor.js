
import "./Title.css"

import { useState, useEffect } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/material.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/python/python.js";
import { Controlled as ControlledEditor } from "react-codemirror2";

import { Segment, Form, Button, Table, Checkbox, Icon, Menu, Item, Modal, Dropdown } from 'semantic-ui-react';
const Editor = () => {
    const [value, setValue] = useState('');
    const [result, setResult] = useState(null);
    const [tablelist, setTablelist] = useState([]);

    const [modalSheetOpen, setModalSheetOpen] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [url, setUrl] = useState('');
    const [sheets, setSheets] = useState([]);
    const [sheet, setSheet] = useState('');
    const [isHeader, setIsHeader] = useState(false);
    const [start, setStart] = useState('A1');
    const [valid_url, setValid_url] = useState('');

    const [isToggled, setIsToggled] = useState(false);




    function handleChange(editor, data, value) {
        setValue(value);
    }
    const fetchData = async () => {
        fetch('http://localhost:8081/data-suite/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'query': value }),
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

    const checkURL = async (url) => {
        if (url === '') {
            setValid_url('');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/data-suite/google-sheet-name?url=${url}`);
            const data = await response.json();

            if (data.status === 'success') {
                setValid_url(true);
                setSheets(data.sheet_list);
            } else {
                setValid_url(false);
                setSheets([]);

            }
        } catch (err) {
            console.log(err);
        }

    }
    const handleSheetRemove = () => {
        setModalSheetOpen(false);
        setTaskName('');
        setUrl('');
        setSheets([]);
        setIsHeader(false);
        setStart('A1');
        setValid_url(true);
    }

    const handleSheetSubmit = async () => {
        const response = await fetch('http://localhost:8081/data-suite/google-sheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'query': value,
                'task_name': taskName,
                'url': url,
                'sheet_name': sheet,
                'start_cell': start,
                'include_header': isHeader,

            }),
        });
        const data = await response.json();
        console.log(data);
        handleSheetRemove();
    }


    return (
        <div className="editor" style={{ marginLeft: "5%", marginTop: "1%" }}>
            <div style={{ display: 'flex' }}>
                <Menu vertical style={{ width: "15%" }}>
                    <Menu.Item style={{ fontWeight: 'bolder', fontSize: "18px", marginLeft: "0%" }}>
                        <div style={{ display: "flex", alignItems: "center", fontWeight: 'bolder' }}>
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
                                    style={{ display: "flex", alignItems: "center", fontWeight: 'bolder' }}
                                >
                                    <Icon name='table' style={{ marginRight: "8px" }} />
                                    <div>{item}</div>
                                </div>
                            </Menu.Item>
                        ))}
                    </Menu.Item>
                </Menu>
                <Segment style={{ fontWeight: "bolder", width: "64%", marginLeft: '10px', marginTop: '0px', height: '520px' }}>
                    <div className="ui small basic icon buttons" style={{ marginBottom: "10px" }}>
                        <Button basic onClick={fetchData}>
                            <Icon name='play' />
                        </Button>
                        <Button basic onClick={handleClick}>
                            <Icon name='download icon' />
                        </Button>
                        <Button basic onClick={() => setModalSheetOpen(true)}>
                            <Icon name='google drive icon' />
                        </Button>
                    </div>
                    <ControlledEditor
                        style={{ fontSize: '12px' }}

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

            <Modal
                open={modalSheetOpen}
                onClose={() => setModalSheetOpen(false)}
                size='tiny'>
                <Modal.Header>
                    <i className="google drive icon"></i>
                    Export Google Sheet

                </Modal.Header>
                <Modal.Content style={{ width: '80%' }}>
                    <Form style={{
                        marginLeft: "-5%",
                        width: '100%'
                    }}>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label="任務名稱"
                                name="taskName"
                                placeholder="請輸入任務名稱"
                                value={taskName}
                                onChange={e => setTaskName(e.target.value)}


                                width={1}
                                required
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>


                            <Form.Input
                                label={url === '' ? "請輸入URL" : "已輸入URL"}
                                name="url"
                                placeholder="http"
                                value={url}
                                onChange={e => {
                                    setUrl(e.target.value);
                                    checkURL(e.target.value);
                                }}
                                width={1}
                                required
                            />
                        </Form.Group>

                        {url !== '' && valid_url === false && <p style={{ color: 'red', fontWeight: 'bolder' }}>無法打開此 G-sheet，請確認連結是否正確且具有存取權！</p>}
                        {url !== '' && valid_url === true && <p style={{ color: 'green', fontWeight: 'bolder' }}>成功打開此 G-sheet！</p>}
                        {url !== '' && valid_url === '' && <p style={{ color: 'black', fontWeight: 'bolder' }}>驗證中</p>}
                        <Form.Field widths='equal'>

                            <label>選擇工作表</label>

                            <Dropdown
                                placeholder="工作表"
                                fluid
                                selection
                                options={sheets.map((sheet, sheetIndex) => ({
                                    key: sheetIndex,
                                    text: sheet,
                                    value: sheet,
                                }))}
                                onChange={(e, { value }) => setSheet(value)}
                            >

                            </Dropdown>
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Input
                                label="起始儲存格"
                                name="cell"
                                placeholder="A1"
                                value={start}
                                onChange={e => setStart(e.target.value)}
                                width={1}
                                required
                            />
                        </Form.Group>
                        <Form.Field>
                            <Checkbox
                                label='是否包含表頭'
                                onChange={() => setIsHeader(!isHeader)}
                                tabIndex='0'
                            />
                        </Form.Field>

                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => handleSheetRemove()}>
                        <Icon name='remove' /> 取消
                    </Button>
                    <Button onClick={handleSheetSubmit} disabled={value === '' || sheet === ''}>
                        <Icon name='checkmark' /> 確認
                    </Button>
                </Modal.Actions>
            </Modal>
            {result && (
                <Table celled style={{ width: "80%" }}>
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
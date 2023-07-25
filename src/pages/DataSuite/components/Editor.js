
import "./Title.css"

import { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/material.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/python/python.js";
import { Controlled as ControlledEditor } from "react-codemirror2";

import { Segment, Select, Button, Table, Modal, Label, Tab} from 'semantic-ui-react';
const Editor = () => {
    const [value, setValue] = useState('');
    const [result, setResult] = useState(null);

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

    return (
        <div className="editor" style={{marginLeft: '5%'}}> 
            <Segment style={{fontWeight: "bolder", width: "80%"}}>
                <ControlledEditor 
                    style={{fontSize : '1.2em'}}
                    onBeforeChange={handleChange}
                    value={value}
                    className="codemirrorRaper"
                    options={{
                    lineWrapping: true,
                    lint: true,
                    mode: "sql",
                    lineNumbers: true,
                    theme: "eclipse",
                    }}
                />
            </Segment>
            <Button onClick={fetchData}>
                送出
            </Button>
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
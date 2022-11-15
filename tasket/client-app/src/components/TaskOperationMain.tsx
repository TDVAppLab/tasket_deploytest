import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { useTaskContext } from "../app/store/TaskContext";
import { TaskEdit } from "./TaskEdit"
import { TaskList } from "./TaskList"


export const TaskOperationMain = () => {
    
    const navigate = useNavigate();
    const {id} = useParams<{id:string}>();
    
    
    const taskStore = useTaskContext();    

    
    useEffect(()=> {

        taskStore.loadTaskList();
        if(id) {
            taskStore.setSelectedTaskbyID(id);
        } else {
            taskStore.setSelectedTaskbyID(null);
        }

    }, [id])
    

    return (
        <div className="mx-5">
            

            <Row>
                <Col className="m-2 my-3 p-4 bg-white rounded shadow-sm">
                    <h3 id="tabelLabel">Task List</h3>
                    <Button className="shadow-sm float-end" variant="primary" onClick={()=>{taskStore.setIsModeAddnew(true); taskStore.setSelectedTaskbyID(null); navigate(`/taskcreate`);} }>Add New Task</Button>
                    <TaskList />
                </Col>
                <Col className="m-2 my-3 p-4 bg-white rounded shadow-sm">
                    {
                        (taskStore.isModeAddnew || taskStore.selectedTask !== null) &&
                            <TaskEdit />
                    }
                </Col>
            </Row>
        </div>
    )
}

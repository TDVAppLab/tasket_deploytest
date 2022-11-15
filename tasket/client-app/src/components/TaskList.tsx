import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../app/api/api';
import { Task } from '../app/models/Task';
import { useTaskContext } from '../app/store/TaskContext';






export const TaskList = () => {
  
    const navigate = useNavigate();

    const taskStore = useTaskContext();    
  

    return (
        <div>
            <Table >
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Fin.</th>
                  <th>Title</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {taskStore.taskList && taskStore.taskList.map((task, index) => (
                  <tr 
                    key={task.id_task} onClick={()=>{taskStore.setIsModeAddnew(false); taskStore.setSelectedTaskbyID(task.id_task);
                      navigate(`/task/${task.id_task}`);
                    }}  
                    className={ taskStore.selectedTask?.id_task === task.id_task ? "table-info" :  ""}                  
                  >
                    <td>{index+1}</td>
                    <td><input type="checkbox" defaultChecked={task.is_finish} disabled /></td>
                    <td>{task.title}</td>
                    <td>{task.end_date_scheduled && (new Date(task.end_date_scheduled).toDateString())}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
        </div>
    )
}
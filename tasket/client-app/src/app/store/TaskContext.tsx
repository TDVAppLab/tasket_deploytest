import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Task } from "../models/Task";

export type TaskContextType = {
  taskList: Task[];
  loadTaskList: () => void;
  selectedTask: Task | null;
  setSelectedTaskbyID: (id:string | null) => Promise<Task | undefined>;
  updateTask: (task:Task) => Promise<Task | undefined>;
  createTask: (task:Task) => Promise<Task | undefined>;
  deleteTask: (task:Task) => void;
  isModeAddnew:boolean;
  setIsModeAddnew: (isModeAddnew:boolean) => void;
}
const TaskContext = React.createContext<TaskContextType>({} as TaskContextType);

export const useTaskContext = ():TaskContextType => {
  return React.useContext<TaskContextType>(TaskContext);
}

type Props = {
  children: React.ReactNode
}

export const TaskProvider = (props:Props) => {
  const [taskList, setTaskList] = React.useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [isModeAddnew, setIsModeAddnew] = React.useState(false);

  const navigate = useNavigate();
  
  const loadTaskList = async () => {
    
    try {
        const objects = await api.Tasks.index();
        setTaskList(objects);
        
    } catch (error) {
        setTaskList([]);
        console.log(error);
    }
  }

  const setSelectedTaskbyID = async (id:string | null) => {
    if(id) {
        try {
          const data = await api.Tasks.details(id);
          if(data){
            setSelectedTask(data);
            return data;
          } else {
            navigate(`/notfound`);
          }
        }catch {
          navigate(`/notfound`);
        }
    } else {
      setSelectedTask(null);
    }
  };
  
  
  const updateTask = async (task:Task) => {
    if(task) {
      const data = await api.Tasks.update(task);
      if(data){
        setSelectedTask(data);
        loadTaskList();
        return data;
      }
    }    
  };
  
  
  const createTask = async (task:Task) => {
    if(task) {
      const data = await api.Tasks.create(task);
      if(data){
        setSelectedTask(data);
        return data;
      }
    }
  };

  const deleteTask = async (task:Task) => {
    if(task) {
      const data = await api.Tasks.delete(task.id_task);
      loadTaskList();
    }
  };

  const value:TaskContextType = { taskList, loadTaskList, selectedTask, setSelectedTaskbyID, updateTask, createTask, deleteTask, isModeAddnew, setIsModeAddnew };
  
  return (
    <TaskContext.Provider value={value}>
      {props.children}
    </TaskContext.Provider>
  );
}
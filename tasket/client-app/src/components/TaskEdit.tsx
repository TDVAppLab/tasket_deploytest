import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import * as Yup from 'yup';
import CheckBoxGeneral from "../app/common/CheckBoxGeneral";
import DateInputGeneral from "../app/common/DateInputGeneral";
import TextAreaGeneral from "../app/common/TextAreaGeneral";
import TextInputGeneral from "../app/common/TextInputGeneral";
import {v4} from 'uuid';
import { Task } from "../app/models/Task";
import { useTaskContext } from "../app/store/TaskContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PreviewDescription from "./PreviewDescription";





export const TaskEdit = () => {    
    
    const [task, setTask] = useState<Task>();
    
    const taskStore = useTaskContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(taskStore.selectedTask){
            setTask(taskStore.selectedTask);
        } else {
            setTask({id_task : "", title : "", is_finish: false, description:"", end_date_scheduled : null, end_date_actual : null})
        }
    }, [taskStore.selectedTask]);


    const updateTaskDetails = async (value : Task) => {

        if(value.id_task===""){
            const newTask = value;
            newTask.id_task=v4();
            
            taskStore.createTask(value).then(result => {
                toast.info('task created');
                navigate(`/task/${result?.id_task}`);
            });

        } else {
            taskStore.updateTask(value).then(result => toast.info('task updated'));
        }
    };


    const deleteTask = async (value : Task) => {

        if(value.id_task!==""){
            try {
                taskStore.deleteTask(value);
                taskStore.setSelectedTaskbyID(null);
                navigate(`/task`);
                toast.info('task deleted');
            } catch {

            }
        
        }
    };
    
    const validationSchema = Yup.object({
        title: Yup.string().required(),
        is_finish: Yup.bool().required(),
        description: Yup.string().nullable(),
        end_date_scheduled: Yup.date().nullable(),
        end_date_actual: Yup.date().nullable(),
    });
    
    const validationSchemaDel = Yup.object({
        id_task: Yup.string().required(),
    });



    return (
        <div>
            {
                taskStore.isModeAddnew ?
                    <h3>Add New Task</h3>
                    :
                    <h3>Task Detail : {task?.title}</h3>
            }
            { task &&
            <div>
                <Formik
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={task} 
                onSubmit={values => updateTaskDetails(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>

                        <Row className="my-4">
                            <Col><TextInputGeneral label='Title' name='title' placeholder='Title' /></Col>
                        </Row>

                        
                        <Row className="my-4">
                            <Col >
                                <Tabs defaultActiveKey={"editor"} id="article-editor-main-tab" className="mb-3">                                

                                    <Tab eventKey="editor" title="Editor">
                                        <TextAreaGeneral label='Description' placeholder='Description' name='description' rows={3}   />
                                    </Tab>
                                    
                                    <Tab eventKey="preview" title="Preview">
                                        <PreviewDescription />
                                    </Tab>
                                    
                                </Tabs>
                            </Col>

                        </Row>
                        
                        <Row className="my-4">
                            <Col ><DateInputGeneral title="Due Date" placeholderText='Due Date' name = 'end_date_scheduled' dateFormat='MM d, yyyy' /></Col>
                            <Col ><DateInputGeneral title="Completion Date" placeholderText='Completion Date' name = 'end_date_actual' dateFormat='MM d, yyyy' /></Col>
                        </Row>


                        
                        <Row className="my-4">
                            <Col xs={4}><CheckBoxGeneral label='Finished' name='is_finish'  /></Col>
                        </Row>
                        
                        <hr />
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className='btn btn-primary float-end'>
                            {isSubmitting ? "Processing" : "submit"}
                        </button>
                    </Form>
                )}

                </Formik>
                {
                !taskStore.isModeAddnew &&
                <Formik
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={task} 
                onSubmit={values => deleteTask(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>                        
                        <button disabled={!isValid || isSubmitting} type = 'submit' className='btn btn-danger float-end'>
                            {isSubmitting ? "Processing" : "Delete"}
                        </button>
                    </Form>
                )}
                </Formik>
                }
            </div>

            }
        </div>

        

    )
}
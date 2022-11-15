import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import { Task } from '../app/models/Task';
import { marked } from "marked";


const PreviewDescription = () => {

    const {
      values,
    } = useFormikContext<Task>(); 


    useEffect(() => {
        }, [values.description]
    );

    
    return <div dangerouslySetInnerHTML={{__html: marked(values.description)}}></div>;
  }


export default  PreviewDescription;
import { useField } from "formik";
import { Form } from 'react-bootstrap'

interface Props{
    name:string;
    label?: string;
}

export default function CheckBoxGeneral(props: Props){
    const[field, meta] = useField({ name: props.name, type: "checkbox" }
        );
    return (
        <>
            <Form.Check {...field} type='checkbox' label={props.label} />
            {meta.touched && meta.error ? (
                <Form.Label>{meta.error}</Form.Label>
            ) : null}
        </>
    )
}
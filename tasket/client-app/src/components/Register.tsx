import { ErrorMessage, Formik } from 'formik';
import React from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import TextInputGeneral from '../app/common/TextInputGeneral';
import * as Yup from 'yup';
import api from '../app/api/api';

const Register = () => {
    
    return (
        <div className='form-signin text-center'>
        <Formik
            initialValues={{username: '', email:'', password: '', error: null}}
            onSubmit={(values, {setErrors}) => 
            api.Account.register(values).catch(error => 
                setErrors({error}))
           }
            validationSchema={Yup.object({
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
            >
                {({handleSubmit, isSubmitting, errors, isValid, dirty}) =>(
                    <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                        <h3>Sigh up to Tasket</h3>
                        <TextInputGeneral name='username' placeholder="User Name" />
                        <TextInputGeneral name='email' placeholder="Email" />
                        <TextInputGeneral name='password' placeholder="Password" type="password" />
                        <ErrorMessage 
                            name='error' render={() => 
                            <ValidationErrors errors = {errors.error} />}
                        />
                        <button disabled={!isValid || !dirty || isSubmitting} type = 'submit' className="btn btn-primary">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );

}

export default Register;




interface Props {
    errors: any;
}
function ValidationErrors({errors}: Props){
    return (
    <>
        {errors && (
        <ListGroup>
            {errors.map((err: any, i: any) => (
                <ListGroup.Item key = {i} >{err}</ListGroup.Item>
            ))}
            </ListGroup>
        )}
    </>
    )
}
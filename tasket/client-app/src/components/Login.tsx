import { ErrorMessage,  Formik } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '../app/api/api';
import TextInputGeneral from '../app/common/TextInputGeneral';
import { UserInfo } from '../app/models/Account';
import { useAuthUserContext } from '../app/store/AuthUserContext';



const Login = () => 
{
    const authUser = useAuthUserContext();    
    const navigate = useNavigate();
    
    return (
        <div className='form-signin text-center'>

        <Formik
            initialValues={{email:'', password: '', error: null}}
            onSubmit={async (values, {setErrors}) => {
                const content = await api.Account.login(values).catch(error => 
                    setErrors({error:'Invalid email or password'}));
                    if(content){
                        window.localStorage.setItem('tasket_jwt_token', content.token);
                        authUser.signin(content);
                        toast.success('successfully logged in');
                        navigate(`/task`);
                    }
                }
            }
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
            >
                {({handleSubmit, isSubmitting, errors, isValid}) =>(
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <h3>Login</h3>
                        <TextInputGeneral name='email' placeholder="Email" />
                        <TextInputGeneral name='password' placeholder="Password" type="password" />
                        <ErrorMessage 
                            name='error' render={() => 
                                <Form.Label style = {{marginBottom:10}} basic color='red' >{errors.error}</Form.Label>
                        }
                        />
                        <button disabled={!isValid || isSubmitting} type = 'submit' className="btn btn-lg btn-primary w-100">Login</button>
                    </Form>
                )}
            </Formik>
            <Link to='/register' >register</Link>
        </div>
    );

}

export default Login;

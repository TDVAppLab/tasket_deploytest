import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './signin.css';
import api from './app/api/api';
import { UserInfo } from './app/models/Account';
import Login from './components/Login';
import Register  from './components/Register';
import { RouteAuthChk } from './components/RouteAuthChk';
import { TaskOperationMain } from './components/TaskOperationMain';
import { NavBar } from './NavBar';
import { useAuthUserContext } from './app/store/AuthUserContext';
import Notfound from './components/Notfound';
import { ToastContainer } from 'react-toastify';

function App() {

  const authUser = useAuthUserContext();    
  
  const [isFirstLoginChecked, setIsFirstLoginChecked] = useState(false);
  

  useEffect(() => {
    // add class to body element
    document.body.classList.add('bg-light');


    const token = window.localStorage.getItem('tasket_jwt_token');
    try{
      api.Account.current().then(user => {
        window.localStorage.setItem('tasket_jwt_token', user.token);
        authUser.signin(user);
        setIsFirstLoginChecked(true);
      }).catch(x=>setIsFirstLoginChecked(true))
      
    } catch (error) {
      
      console.log(error);
    }
  }, []);

  if(!isFirstLoginChecked) { return (<div>loading</div>) }

  
  return (
    <>
      <ToastContainer position ='bottom-right' hideProgressBar />
      <NavBar />
      <main>
      <Routes>
          <Route path = '/' element={ <RouteAuthChk component={<TaskOperationMain />} redirect="/login" /> } />
          <Route path = '/task' element={ <RouteAuthChk component={<TaskOperationMain />} redirect="/login" /> } />
          <Route path = '/task/:id' element={ <RouteAuthChk component={<TaskOperationMain />} redirect="/login" /> } />
          <Route path = '/taskcreate' element={ <RouteAuthChk component={<TaskOperationMain />} redirect="/login" /> } />
          <Route path = '/login' element={<Login />} />
          <Route path = '/register' element={<Register />} />
          <Route path = '/notfound' element={<Notfound />} />
          <Route path = '*' element={<Notfound />} />
      </Routes>
      </main>
     </>
  );
}
export default App;
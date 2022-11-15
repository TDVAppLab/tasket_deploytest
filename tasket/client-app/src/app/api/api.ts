import axios, { AxiosResponse } from "axios";
import { UserFormValues, UserInfo } from "../models/Account";
import { Task } from "../models/Task";

axios.defaults.baseURL = "https://localhost:5001"; 


axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('tasket_jwt_token');
    if(token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

const Account = {
    current: () => axios.get<UserInfo>(`/account`).then((response: AxiosResponse<UserInfo>)=>response.data),
    login: (user: UserFormValues) => axios.post<UserInfo>(`/account/login`, user).then((response: AxiosResponse<UserInfo>)=>response.data),
    register: (user: UserFormValues) => axios.post<UserInfo>(`/account/register`, user).then((response: AxiosResponse<UserInfo>)=>response.data),
}

const Tasks = {
    index: () => axios.get<Task[]>(`/task`).then((response: AxiosResponse<Task[]>)=>response.data),
    details: (id:string) => axios.get<Task>(`/task/${id}`).then((response: AxiosResponse<Task>)=>response.data),
    create: (task:Task) => axios.post<Task>(`/task/create`, task).then((response: AxiosResponse<Task>)=>response.data),
    update: (task:Task) => axios.post<Task>(`/task/update`, task).then((response: AxiosResponse<Task>)=>response.data),
    delete:(id:string) => axios.post<void>(`/task/delete/${id}`),
}



const api = {
    Account,
    Tasks,
}

export default api;
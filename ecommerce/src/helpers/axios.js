import axios from 'axios';
import {api} from './baseURL';
import configureStore from '../store/configureStore';
import { authConstants } from '../actions/actionTypes';

const token=window.localStorage.getItem('token');

const axiosInstance= axios.create({
    baseURL :api,
    headers :{
        'Authorization':  token ? `${token}` : ''
    }
});
axiosInstance.interceptors.request.use((req)=>{
    const {auth} = configureStore.getState();
    if(auth.token){
        req.headers.Authorization = `${auth.token}`
    }
    return req;
})

axiosInstance.interceptors.response.use((res)=>{

    return res;
}, (error) => {
    console.log(error);
    const { status } = error.response ? error.response :500;
    if(status && status === 500){
        localStorage.clear();
        configureStore.dispatch({type: authConstants.LOGOUT_SUCCESS})
    }
    return Promise.reject(error);
})
export default axiosInstance;
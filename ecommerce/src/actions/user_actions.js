import axiosInstance from "../helpers/axios"
import {  authConstants } from "./actionTypes";

export const register=(user)=> async(dispatch) => {
    dispatch({type:authConstants.SIGNUP_REQUEST});
    const res =await axiosInstance.post(`signup`,{
       ...user
    });

    if(res.status===201){
        const{message}=res.data;
        
        dispatch({
            type:authConstants.SIGNUP_SUCCESS,
            payload :{
                message
            }
        })
    }
    else if(res.status===400){
        dispatch({
            type: authConstants.SIGNUP_FAILURE,
            payload: {
                error:res.data.error
            }
        })
    }
}
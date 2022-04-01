import axiosInstance from "../helpers/axios"
import {  authConstants, userConstants, cartConstants } from "./actionTypes";


export const getAddress = () => {
    return async (dispatch) => {
      try {
        const res = await axiosInstance.post(`/user/getaddress`);
        dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
        if (res.status === 200) {
          const {
            userAddress: { address },
          } = res.data;
          dispatch({
            type: userConstants.GET_USER_ADDRESS_SUCCESS,
            payload: { address },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: userConstants.GET_USER_ADDRESS_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export const addAddress = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axiosInstance.post(`/user/address/create`, { payload });
        dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
        if (res.status === 201) {
          console.log(res);
          const {
            address: { address },
          } = res.data;
          dispatch({
            type: userConstants.ADD_USER_ADDRESS_SUCCESS,
            payload: { address },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: userConstants.ADD_USER_ADDRESS_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export const addOrder = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axiosInstance.post(`/addOrder`, payload);
        dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
        if (res.status === 201) {
          console.log(res);
          const { order } = res.data;
          dispatch({
            type: cartConstants.RESET_CART,
          });
          dispatch({
            type: userConstants.ADD_USER_ORDER_SUCCESS,
            payload: { order },
          });
          // const {
          //   address: { address },
          // } = res.data;
          // dispatch({
          //   type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          //   payload: { address },
          // });
        } else {
          const { error } = res.data;
          dispatch({
            type: userConstants.ADD_USER_ORDER_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export const getOrders = () => {
    return async (dispatch) => {
      try {
        const res = await axiosInstance.get(`/getOrders`);
        dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
        if (res.status === 200) {
          console.log(res);
          const { orders } = res.data;
          dispatch({
            type: userConstants.GET_USER_ORDER_SUCCESS,
            payload: { orders },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: userConstants.GET_USER_ORDER_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  // single order with complete info and delivery location
  export const getOrder = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axiosInstance.post(`/getOrder`, payload);
        dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
        if (res.status === 200) {
          console.log(res);
          const { order } = res.data;
          dispatch({
            type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
            payload: { order },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

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
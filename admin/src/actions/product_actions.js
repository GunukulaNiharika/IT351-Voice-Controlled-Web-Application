import { productConstants } from "./actionTypes";
import axiosInstance from "../helpers/axios"



const getProducts = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
        const res = await axiosInstance.post(`product/getProducts`);
        if (res.status === 200) {
          const { products } = res.data;
          dispatch({
            type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
            payload: { products },
          });
        } else {
          dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const addProduct= (form) => async(dispatch) =>{

    dispatch({type: productConstants.ADD_PRODUCT_REQUEST});
    const res =await axiosInstance.post('/product/create',form);
    console.log(res);
    if(res.status===201){
        console.log(res.data.product);
        dispatch({
            type: productConstants.ADD_PRODUCT_SUCCESS,
            payload: {products :res.data.product}
        });
    }
    else{
        dispatch({
            type: productConstants.ADD_PRODUCT_FAILURE,
            payload: {error:res.data.error}
        })
    }
}
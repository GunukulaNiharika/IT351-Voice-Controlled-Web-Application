// import axiosInstance from "../helpers/axios";
// import { categoryConstansts, initialDataConstants, productConstants } from "./actionTypes"

// export const getInitialData = () => async (dispatch) =>{
//     dispatch({ type: initialDataConstants.GET_ALL_INITIAL_DATA_REQUEST});
//     // dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST});
//     // dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST});
//     const res= await axiosInstance.post('/initialdata');
//     const {categories, products}=res.data;
//      if(res.status===200){
//          console.log(products);
//          dispatch({
//              type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
//              payload: {categories}
//          });
//          dispatch({
//              type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
//              payload:{products}
//          })
//      }
//      else{
//          dispatch({
//              type: initialDataConstants.GET_ALL_INITIAL_DATA_FAILURE,
//              payload: {error: res.data.error}
//          })
//      }
// }
import axiosInstance from "../helpers/axios"
import { pageConstants } from "./actionTypes";

export const createPage = (form) => async(dispatch) => {
    
    dispatch({ type: pageConstants.CREATE_PAGE_REQUEST});
    try{
        const res = await axiosInstance.post('/page/create', form);
        if(res.status === 200){
            dispatch({
                type: pageConstants.CREATE_PAGE_SUCCESS,
                payload: {
                    page: res.data.page
                }
            })
        }
        else{
            dispatch({
                type: pageConstants.CREATE_PAGE_FAILURE,
                payload: {
                    error: res.data.error
                }
            })
        }
    }
    catch(error){
        console.log(error);
    }

}
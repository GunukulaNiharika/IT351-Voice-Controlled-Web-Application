import { categoryConstansts} from './actionTypes';
import axiosInstance from "../helpers/axios"

const get_categories = () => async(dispatch) =>{

    try{
        dispatch({type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST});
    const res= await axiosInstance.get(`category/getcategory`);
    
    if(res.status === 200){
        const {categoryList}=res.data;
        dispatch({
            type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
            payload: { categories: categoryList}
        })
    }
    else if(res.status === 400){
        dispatch({
            type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
            payload: {error: res.data.error}
        })
    }
    }
    catch(error){
        console.log(error);
    }
}

export const addCategory= (form) => async(dispatch) =>{
    try{
        dispatch({type: categoryConstansts.ADD_NEW_CATEGORY_REQUEST});
    const res =await axiosInstance.post('/category/create',form);
   console.log(res);
    if(res.status===201){
        
        console.log(res.data.cat);
        dispatch({
            type: categoryConstansts.ADD_NEW_CATEGORY_SUCCESS,
            payload: {categories :res.data.cat}
        });
    }
    else{
        dispatch({
            type: categoryConstansts.ADD_NEW_CATEGORY_FAILURE,
            payload: {error:res.data.error}
        })
    }
    }
    catch(error){
        console.log(error.response);
    }
}

export const updateCategories= (form) => async(dispatch) =>{
    dispatch({type: categoryConstansts.UPDATE_CATEGORIES_REQUEST});
    const res =await axiosInstance.post('/category/update',form);
   
    if(res.status===201){
        dispatch({type:categoryConstansts.UPDATE_CATEGORIES_SUCCESS});
        dispatch(get_categories);
    }
    else{
        const {status} = res;
        dispatch({
            type: categoryConstansts.UPDATE_CATEGORIES_FAILURE,
            payload: {error: res.data.error}
        })
    }
}

export const deleteCategories= (ids) => async(dispatch) =>{
    dispatch({type:categoryConstansts.DELETE_CATEGORIES_REQUEST});
    const res = await axiosInstance.post(`/category/delete`, {
        payload: {
            ids
        }
    });
   
    if(res.status===200){
        dispatch({type: categoryConstansts.DELETE_CATEGORIES_SUCCESS});
        dispatch(get_categories);
    }
    else{
        dispatch({
            type: categoryConstansts.DELETE_CATEGORIES_FAILURE,
            payload: {error: res.data.error}
        })
    }
}

export {
    get_categories
}
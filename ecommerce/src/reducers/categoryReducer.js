import { categoryConstansts } from "../actions/actionTypes"

const initState ={
    categories:[],
    loading:false,
    error: null
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if(parentId == undefined){
        return [
            ...categories,
            {   
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ];
    }
    
    for(let cat of categories){

        if(cat._id == parentId){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        }else{
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }

        
    }


    return myCategories;
}
export default(state= initState,action) => {
    switch(action.type){
        case categoryConstansts.GET_ALL_CATEGORIES_REQUEST:
            state={
                ...state,
                loading :true,
            }
            break;
        case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
           
            state={
                ...state,
                categories: action.payload.categories,
                loading: false
            }
            break;
        case categoryConstansts.GET_ALL_CATEGORIES_FAILURE:
            state={
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_REQUEST:
            
            state={
                ...state,
                loading: true,
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_SUCCESS:
            const cate=action.payload.categories;
            const updatedCategories=buildNewCategories(cate.parentId,state.categories,cate)
            state={
                ...state,
                categories: updatedCategories,
                loading: false
            }
            break;
        case categoryConstansts.ADD_NEW_CATEGORY_FAILURE:
            state={
                ...initState,
                error: action.payload.error
            }
            break;
        case categoryConstansts.UPDATE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstansts.UPDATE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstansts.UPDATE_CATEGORIES_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
            case categoryConstansts.DELETE_CATEGORIES_REQUEST:
                state = {
                    ...state,
                    loading: true
                }
                break;
            case categoryConstansts.DELETE_CATEGORIES_SUCCESS:
                state = {
                    ...state,
                    loading: false
                }
                break;
            case categoryConstansts.DELETE_CATEGORIES_FAILURE:
                state = {
                    ...state,
                    loading: false,
                    error: action.payload.error
                }
                break;
    }
    return state;
}
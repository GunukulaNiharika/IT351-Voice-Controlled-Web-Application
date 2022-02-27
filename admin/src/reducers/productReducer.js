import { productConstants } from "../actions/actionTypes"

const initState ={
    products: [],
    loading:false,
    error: null
}

export default (state = initState, action) => {
    console.log(action);
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.products
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case productConstants.ADD_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.ADD_PRODUCT_SUCCESS:
            const prod = action.payload.products;
            const updatedProducts = [...state.products, prod];
            state = {
                ...state,
                loading: false,
                products: updatedProducts
            }
            break;
        case productConstants.ADD_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}
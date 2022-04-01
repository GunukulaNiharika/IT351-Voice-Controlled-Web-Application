import { userConstants } from "../actions/actionTypes";

const initState = {
    address: [],
    orders: [],
    orderDetails: {},
    error: null,
    loading: false,
    orderFetching: false,
    placedOrderId: null,
  };

export default (state=initState,action)=>{
    switch(action.type){
        case userConstants.GET_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.GET_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false,
            };
            break;
        case userConstants.GET_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case userConstants.ADD_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.ADD_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false,
            };
            break;
        case userConstants.ADD_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case userConstants.GET_USER_ORDER_REQUEST:
            state = {
                ...state,
                orderFetching: true,
            };
            break;
        case userConstants.GET_USER_ORDER_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders,
                orderFetching: false,
            };
            break;
        case userConstants.GET_USER_ORDER_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                orderFetching: false,
            };
        break;
        case userConstants.GET_USER_ORDER_DETAILS_REQUEST:
        break;
        case userConstants.GET_USER_ORDER_DETAILS_SUCCESS:
            state = {
                ...state,
                orderDetails: action.payload.order,
            };
            break;
        case userConstants.GET_USER_ORDER_DETAILS_FAILURE:
            break;
        case userConstants.ADD_USER_ORDER_SUCCESS:
            state = {
                ...state,
                placedOrderId: action.payload.order._id,
            };
            break;
        // case authConstants.SIGNUP_REQUEST:
        //     state={
        //         ...state,
        //         registered: false,
        //         loading: true,
        //     }
        //     break;
        // case authConstants.SIGNUP_SUCCESS:
        //     state={
        //         ...state,
        //         loading: false,
        //         registered: true,
        //         message: action.payload.message
        //     }
        //     break;
        // case authConstants.SIGNUP_FAILURE:
        //     state={
        //         ...state,
        //         loading: false,
        //         registered: false,
        //         error: action.payload.error
        //     }
        //     break;
    }
    return state;
}
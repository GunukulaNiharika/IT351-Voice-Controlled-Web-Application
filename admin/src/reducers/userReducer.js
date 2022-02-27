import { userConstants } from "../actions/actionTypes";

const initState={
    error : null,
    message : "",
    loading : false,
    registered:false
}

export default (state=initState,action)=>{
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:
            state={
                ...state,
                registered: false,
                loading: true,
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state={
                ...state,
                loading: false,
                registered: true,
                message: action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state={
                ...state,
                loading: false,
                registered: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}
import { authConstants } from "../actions/actionTypes";

const initState={
    error : null,
    message : "",
    loading : false,
    registered:false
}

export default (state=initState,action)=>{
    switch(action.type){
        case authConstants.SIGNUP_REQUEST:
            state={
                ...state,
                registered: false,
                loading: true,
            }
            break;
        case authConstants.SIGNUP_SUCCESS:
            state={
                ...state,
                loading: false,
                registered: true,
                message: action.payload.message
            }
            break;
        case authConstants.SIGNUP_FAILURE:
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
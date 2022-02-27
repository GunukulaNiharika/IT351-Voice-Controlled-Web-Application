import { combineReducers } from 'redux';
import authReducers from './authReducers';
import userReducers from './userReducer';
// import orderReducers from './orderReducer';
import productReducers from './productReducer';
import categoryReducers from './categoryReducer';
import pageReducers from './pageReducer';

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    category: categoryReducers,
    product: productReducers,
    page: pageReducers
    // orders: orderReducers
});

export default rootReducer;
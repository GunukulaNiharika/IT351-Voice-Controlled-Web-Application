import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';


const configureStore=createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk,logger)));

export default configureStore;
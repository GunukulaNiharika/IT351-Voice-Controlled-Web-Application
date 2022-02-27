   
import { Switch, Route, withRouter} from 'react-router-dom';
import Home from '../Containers/Home';
import Login from '../Containers/Login';
import Register from '../Containers/Register';
import Product from '../Containers/Product/Products';
import Category from '../Containers/Category/Categories';
// import Orders from '../Containers/Orders';
import PrivateRoute from "./privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IsUserLoggedIn } from "../actions/auth_actions";
import { getInitialData } from '../actions/initialData_actions';
import Page from '../Containers/Page';
function Main(){
    const dispatch =useDispatch();
    const auth= useSelector(state=> state.auth);

    useEffect(()=>{
        if(!auth.authenticate){
          dispatch(IsUserLoggedIn());
        }
        if(auth.authenticate){
        dispatch(getInitialData());
        }
    },[auth.authenticate])

    return(
        <>
            <Switch>
                <PrivateRoute path="/" exact component={Home}/>
                <PrivateRoute path="/page" component={Page} />
                <PrivateRoute path="/category" component={Category} />
                <PrivateRoute path="/products" component={Product} />
                {/* <PrivateRoute path="/orders" component={Orders}/> */}
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </>
    );
}

export default withRouter(Main);
   
import { Switch, Route, withRouter} from 'react-router-dom';
import Home from '../Containers/Home';

import PrivateRoute from "./privateRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IsUserLoggedIn } from "../actions/auth_actions";
import { updateCart } from '../actions/cart_actions'
import { getInitialData } from '../actions/initialData_actions';
import ProductDetailsPage from '../Containers/ProductDetailsPage/ProductDetailsPage'
import ProductListPage from '../Containers/ProductListPage/ProductListPage'
import CartPage from '../Containers/CartPage/Cart';
import CheckoutPage from '../Containers/CheckOutPage/CheckOutPage';
import OrderDetailsPage from '../Containers/OrderDetailsPage/OrderDetailsPage';
import OrderPage from '../Containers/OrderPage/OrderPage';
function Main(){
    const dispatch =useDispatch();
    const auth= useSelector(state=> state.auth);

    useEffect(()=>{
        if(!auth.authenticate){
          dispatch(IsUserLoggedIn());
        }
        // if(auth.authenticate){
        // dispatch(getInitialData());
        // }
    },[auth.authenticate])

    useEffect(() => {
        console.log("App.js - updateCart");
        dispatch(updateCart());
      }, [auth.authenticate]);

    return(
        <>
            <Switch>
                <Route path="/" exact component={Home}/>
                {/* <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/> */}
                <Route path="/cart" component={CartPage}/>
                <Route path="/checkout" component={CheckoutPage}/>
                <Route path="/account/orders" component={OrderPage} />
                <Route path="/order_details/:orderId" component={OrderDetailsPage} />
                <Route path="/:productSlug/:productId/p" component={ProductDetailsPage}/>
                <Route path="/:slug" component={ProductListPage} />
            </Switch>
        </>
    );
}

export default withRouter(Main);
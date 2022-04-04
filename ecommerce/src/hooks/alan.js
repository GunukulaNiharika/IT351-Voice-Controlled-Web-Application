import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import alanBtn from '@alan-ai/alan-sdk-web'
import { useState } from "react";
import { useCallback } from "react";
import {register} from './alanFunctions';
import {useHistory} from 'react-router-dom';
import { addToCart } from "../actions/cart_actions";
import { getProductDetailsById } from "../actions/product_actions";
const COMMANDS = {
    REGISTER: 'register',
    GetCategories: 'getAllCategories',
    openproducts : 'openProducts',
    addToCart: 'addToCart',
    openCart: 'openCart',
    placeOrder: "placeOrder",
    selectAddress: "selectAddress",
    deliverhere: 'deliverhere',
    contin: 'continue',
    confirmOrder: 'confirmOrder',
    openOrders: 'openOrders',
    HomePage: 'HomePage'
}

const Alan = () =>{
    const navigate = useHistory();
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();
    // const [productdata, setProductData] = useState(product)
    const [alanInstance, setAlanInstance] = useState();

    // useEffect(() => {
    //     setProductData(product)
    // },[product, alanInstance])

    const register = useCallback(() =>{
        alanInstance.playText("Registering");
    },[alanInstance]);

    const GetallCategories = useCallback(() =>{
        alanInstance.playText("Fetching Categories");
        
        navigate.push('/sample');
    },[alanInstance])
    const openLink = useCallback((url) =>{
        // console.log(name.value)
        //alanInstance.playText(`Fetching ${name.value}`);
        const win = window.open(url, '_top');
        if (win != null) {
          win.focus();
        }
        // console.log(category)
        // var cat = category.categories.map(m => m.name.includes(name.value))
        // console.log(cat)

        
    },[alanInstance])
    const additemstocart = useCallback(()=>{
        var path = window.location.pathname
        
        document.getElementById("addtocart").click()
        
    },[alanInstance])

    const HomePage = useCallback(()=>{
        const win = window.open("/", '_top');
        if (win != null) {
          win.focus();
        }
    },[alanInstance])

    const openCart = useCallback(()=>{
        const win = window.open("/cart", '_top');
        if (win != null) {
          win.focus();
        }
    },[alanInstance])

    const placeOrder = useCallback(()=>{
        const win = window.open("/checkout", '_top');
        if (win != null) {
          win.focus();
        }
    },[alanInstance])

    const selectAddress = useCallback((name)=>{
        document.getElementById(name.value).click()
    },[alanInstance])
    const deliverhere = useCallback(()=>{
        document.getElementById('deliverhere').click()
    },[alanInstance])
    const contin = useCallback(()=>{
        document.getElementById('continue').click()
    },[alanInstance])
    const confirmOrder = useCallback(()=>{
        document.getElementById('confirmorder').click()
    },[alanInstance])
    const openOrders = useCallback(()=>{
        const win = window.open("/account/orders", '_top');
        if (win != null) {
          win.focus();
        }
    },[alanInstance])

    useEffect(()=> {
        window.addEventListener(COMMANDS.REGISTER,register)
        window.addEventListener(COMMANDS.HomePage, HomePage)
        window.addEventListener(COMMANDS.GetCategories,GetallCategories);
        window.addEventListener(COMMANDS.addToCart, additemstocart)
        window.addEventListener(COMMANDS.openCart, openCart)
        window.addEventListener(COMMANDS.placeOrder, placeOrder)
        window.addEventListener(COMMANDS.deliverhere, deliverhere)
        window.addEventListener(COMMANDS.contin, contin)
        window.addEventListener(COMMANDS.confirmOrder, confirmOrder)
        window.addEventListener(COMMANDS.openOrders, openOrders)
        window.addEventListener(COMMANDS.openproducts,function(evt){
            openLink(evt.detail)
        });
        window.addEventListener(COMMANDS.selectAddress,function(evt){
            selectAddress(evt.detail)
        });
        

        return () =>{
            window.removeEventListener(COMMANDS.REGISTER,register)
            window.removeEventListener(COMMANDS.HomePage,HomePage)
            window.removeEventListener(COMMANDS.GetCategories,GetallCategories)
            window.removeEventListener(COMMANDS.addToCart,additemstocart)
            window.removeEventListener(COMMANDS.openCart, openCart)
            window.removeEventListener(COMMANDS.placeOrder,placeOrder)
            window.removeEventListener(COMMANDS.deliverhere,deliverhere)
            window.removeEventListener(COMMANDS.contin,contin)
            window.removeEventListener(COMMANDS.confirmOrder,confirmOrder)
            window.removeEventListener(COMMANDS.openOrders,openOrders)
            // window.removeEventListener(COMMANDS.openProducts, function(evt))
        }
    },[register,additemstocart, openCart, openLink, placeOrder,deliverhere ])
    useEffect(()=>{
        if(alanInstance!=null) return
        setAlanInstance(alanBtn({
            top: '75px',
            right: '50px',
            zIndex:5,
            key: 'd460a2b8d124ba918d6916c9bee052562e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                // console.log(commandData.link);
                var evt = new CustomEvent(commandData.command, {detail: commandData.link})
               window.dispatchEvent(evt);
            
            } 
        })
    )},[])
    return null;
}

export default Alan;
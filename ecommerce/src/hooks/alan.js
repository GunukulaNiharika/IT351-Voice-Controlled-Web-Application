import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import alanBtn from '@alan-ai/alan-sdk-web'
import { useState } from "react";
import { useCallback } from "react";
import {register} from './alanFunctions';
import {useHistory} from 'react-router-dom';
import { addToCart } from "../actions/cart_actions";
const COMMANDS = {
    REGISTER: 'register',
    GetCategories: 'getAllCategories',
    openproducts : 'openProducts',
    addToCart: 'addToCart'
}

const Alan = () =>{
    const navigate = useHistory();
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();


    const [alanInstance, setAlanInstance] = useState();
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
        const arr = path.split('/')
        console.log(arr[2])
        console.log(product)
        product.products.map((prod,index) => {
            const id = prod._id;
            const name = prod.name;
            const price = prod.price;
            const img = prod.productPictures[0].img;
            console.log(id)
            
            if(id==arr[2]){
                console.log("True")
                dispatch(addToCart({id, name, price, img}))
            }
        })
    },[alanInstance])

    useEffect(()=> {
        window.addEventListener(COMMANDS.REGISTER,register)
        window.addEventListener(COMMANDS.GetCategories,GetallCategories);
        window.addEventListener(COMMANDS.addToCart, additemstocart)
        window.addEventListener(COMMANDS.openproducts,function(evt){
            openLink(evt.detail)
        });
        

        return () =>{
            window.removeEventListener(COMMANDS.REGISTER,register)
            window.removeEventListener(COMMANDS.GetCategories,GetallCategories)
            window.removeEventListener(COMMANDS.addToCart,additemstocart)
            // window.removeEventListener(COMMANDS.openProducts, function(evt))
        }
    },[register,openLink])
    useEffect(()=>{
        if(alanInstance!=null) return
        setAlanInstance(alanBtn({
            top: '75px',
            right: '50px',
            zIndex:5,
            key: 'd460a2b8d124ba918d6916c9bee052562e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
                console.log(commandData.link);
                var evt = new CustomEvent(commandData.command, {detail: commandData.link})
               window.dispatchEvent(evt);
            
            } 
        })
    )},[])
    return null;
}

export default Alan;
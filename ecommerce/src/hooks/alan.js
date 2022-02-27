import { useEffect } from "react";
import alanBtn from '@alan-ai/alan-sdk-web'
import { useState } from "react";
import { useCallback } from "react";
import {register} from './alanFunctions';
import {useHistory} from 'react-router-dom';
const COMMANDS = {
    REGISTER: 'register',
    GetCategories: 'getAllCategories'
}

const Alan = () =>{
    const navigate = useHistory();
    const [alanInstance, setAlanInstance] = useState();
    const register = useCallback(() =>{
        alanInstance.playText("Registering");
    },[alanInstance]);

    const GetallCategories = useCallback(() =>{
        alanInstance.playText("Fetching Categories");
        
        navigate.push('/sample');
    },[alanInstance])

    useEffect(()=> {
        window.addEventListener(COMMANDS.REGISTER,register)
        window.addEventListener(COMMANDS.GetCategories,GetallCategories);

        return () =>{
            window.removeEventListener(COMMANDS.REGISTER,register)
            window.removeEventListener(COMMANDS.GetCategories,GetallCategories)
        }
    },[register])
    useEffect(()=>{
        if(alanInstance!=null) return
        setAlanInstance(alanBtn({
            top: '75px',
            right: '50px',
            zIndex:5,
            key: 'd460a2b8d124ba918d6916c9bee052562e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: ({command}) => {
               window.dispatchEvent(new CustomEvent(command));
            console.log(command);
            } 
        })
    )},[])
    return null;
}

export default Alan;
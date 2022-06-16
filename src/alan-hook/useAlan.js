import { useEffect,useState,useCallback } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";


//COMMANDS
const COMMANDS ={
    OPEN_CART: 'open-cart',

}


export default function useAlan(){

const [alanInstance, setAlanInstance]=useState();


const openCart =useCallback(()=> {
    alanInstance.playText("opening Cart")

},[alanInstance])

useEffect(()=>{
    window.addEventListener(COMMANDS.OPEN_CART,openCart)

    return () =>{
        window.removeEventListener(COMMANDS.OPEN_CART,openCart)
    }

},[openCart])

 useEffect(()=>{

    if(alanInstance!=null) return;

    setAlanInstance(
     alanBtn({
        key:
        "2adf496f322f4108cd6b7151151d911d2e956eca572e1d8b807a3e2338fdd0dc/stage",
        onCommand:({command})=>{
            window.dispatchEvent(new CustomEvent(command))
        }
     })
    )
 },[])
 
 return null
}


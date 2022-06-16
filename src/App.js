import React, {useState,useEffect,useCallback,useContext} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
//import useAlan from "./alan-hook/useAlan";
import {DUMMY_MEALS} from "./components/Meals/AvailableMeals";
import CartContext from "./store/cart-context";
import alanBtn from "@alan-ai/alan-sdk-web";

function App() {

  const [cartIsShown, setCartIsShown]= useState(false);
  
  const showCartHandler=()=>{
    setCartIsShown(true);
  } ;

  const hideCartHandler=()=>{
    setCartIsShown(false);
  };

//COMMANDS
const COMMANDS ={
  OPEN_CART: 'open-cart',
  CLOSE_CART: 'close-cart',
  ADD_CART:'add-cart',
  REMOVE_CART:'remove-cart'
}

const [alanInstance, setAlanInstance]=useState();


const openCart =useCallback(()=> {
  alanInstance.playText("Cart Opened")
  setCartIsShown(true);
},[alanInstance,setCartIsShown])


const closeCart =useCallback(()=> {
  alanInstance.playText("Cart Closed")
  setCartIsShown(false);
},[alanInstance,setCartIsShown])

/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
const cartCtx = useContext(CartContext);
const addCart =useCallback(({detail:{name,quantity}})=>{
  const item=DUMMY_MEALS.find(i=>i.name.toLowerCase()===name.toLowerCase())
  if (item==null){
    alanInstance.playText(`${name} is not in the menu` )
  }
  else{
    
    console.log('1');
    const i={
      id: 'amount_'+item.id,
      name: item.name,
      amount: quantity,
      price: item.price,
    };
    cartCtx.addItem(i);
    console.log(cartCtx.addItem,i);
  
////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
    console.log('2');
    alanInstance.playText(`${quantity} ${name} added to the cart`)
  }
},[alanInstance,cartCtx])



const removeCart =useCallback(({detail:{name}})=>{
  const item=DUMMY_MEALS.find(i=>i.name.toLowerCase()===name.toLowerCase())
  if (item==null){
    alanInstance.playText(`${name} is not in the menu` )
  }
  else{
    const i='amount_'+item.id;
    cartCtx.removeItem(i);
    alanInstance.playText(`${name} removed from the cart`)
  }
},[alanInstance,cartCtx])



useEffect(()=>{
  window.addEventListener(COMMANDS.OPEN_CART,openCart)
  window.addEventListener(COMMANDS.CLOSE_CART,closeCart)
  window.addEventListener(COMMANDS.ADD_CART,addCart)
  window.addEventListener(COMMANDS.REMOVE_CART,removeCart)


  return () =>{
      window.removeEventListener(COMMANDS.OPEN_CART,openCart)
      window.removeEventListener(COMMANDS.CLOSE_CART,closeCart)
      window.removeEventListener(COMMANDS.ADD_CART,addCart)
      window.removeEventListener(COMMANDS.REMOVE_CART,removeCart)
  }

},[openCart,closeCart,addCart,removeCart])

useEffect(()=>{

  if(alanInstance!=null) return;

  setAlanInstance(
   alanBtn({
      key:
      "2adf496f322f4108cd6b7151151d911d2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand:({command,payload})=>{
          window.dispatchEvent(new CustomEvent(command,{detail:payload}))
      }
   })
  )
},[])



  return (
<>

      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
      </>

  );
}

export default App;

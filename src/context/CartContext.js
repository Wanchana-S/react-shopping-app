import { createContext, useContext, useReducer,useEffect } from "react";
import products from "../data/product";
import cartReducer from "../reducer/CartReducer";
//การสร้าง context
const CartContext = createContext();
const initState = {
  products: products,
  total: 0,
  amount: 0,
};
export const CartProvider=({children})=>{
    const [state,dispatch] = useReducer(cartReducer,initState)
    function formatMoney(money){
      return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  function removeItem(id){
    dispatch({type:"Remove",payload:id})
  }
  function addQuantity(id){
    dispatch({type:"Add_qty",payload:id})
  }
  function removeQuantity(id){
    dispatch({type:"Remove_qty",payload:id})
  }
  useEffect(()=>{
      console.log("คำนวณหาผลรวม")
      dispatch({type:"Calculate_Total"})
  },[state.products])
    return(
    <CartContext.Provider value={{...state,formatMoney,removeItem,addQuantity,removeQuantity}}>
        {children}
    </CartContext.Provider>)
}
//การนำเอา context ไปใช้งานด้านนอก
export const useCart=()=>{
  return useContext(CartContext);
};

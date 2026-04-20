import { createContext, useEffect, useState } from "react";
import api from "../service/Api";


export const CartContext = createContext()


export const CartProvider = ({ children }) => {


 
   const [orderHistory, setOrderHistory] = useState()


    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");


        if (!stored || stored === "undefined") {
            return [];

        }
        return JSON.parse(stored)
    })

    useEffect(() => {

        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])


    
      useEffect(() => {
    
        getMyOrder();
    
      }, []);

  const getMyOrder = async () => {
    try {
      const res = await api.get("/getMyOrder")
      setOrderHistory(res.data)
    } catch (error) {
      console.log(error.response?.data?.message);

    }
  }





    return (

        <CartContext.Provider value={{ setCart, cart ,orderHistory ,getMyOrder}}>
            {children}
        </CartContext.Provider>


    )
}
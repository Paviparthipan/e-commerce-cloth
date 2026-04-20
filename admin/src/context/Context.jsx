import { createContext, useState, useEffect } from "react";
import api from "../service/Api";


export const globContext = createContext();



export const Context = ({ children }) => {

    const [order, setOrder] = useState()
    const [client, setClient] = useState()
    const [dark, setDark] = useState(false);

    const toggleTheme = () => {
        setDark(prev => !prev);

        //   document.documentElement.classList.toggle("dark");
    };
    const fetchOrder = async (status) => {
        try {
            const res = await api.get('/getOrder', { status })
            setOrder(res.data)
        } catch (error) {

        }
    }

    const fetchCus = async () => {
        const res = await api.get("/getClient")
        setClient(res.data)
    }
    useEffect(() => {
        fetchOrder()
        fetchCus()
    }, [])


    return (
        <globContext.Provider value={{ dark, toggleTheme, order, client, fetchOrder }}>
            {children}

        </globContext.Provider>

    )
}


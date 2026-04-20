import React, { createContext, useCallback, useEffect, useState } from 'react'
import { Nav } from '../components/Nav'
import { Outlet } from 'react-router-dom'
import api from '../service/Api'
import { Footer } from '../components/Footer'


export const StoreContext = createContext()

export const Layout = () => {

    const user = JSON.parse(localStorage.getItem("User"))
    const [randData, setRandData] = useState([])

    const randomData = async () => {
        try {
            const res = await api.get('/randomProduct')
            setRandData(res.data);

        } catch (error) {
            console.log(error.response?.data?.message);

        }
    }


    useEffect(() => {
        randomData()
    }, [])

    const [cart, setCart] = useState()


    return (

        <StoreContext.Provider value={{ user, randData }}>




            <div>
                <div>
                    <Nav />

                </div>
                <div className='mt-17'>
                    <Outlet />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
     
     
        </StoreContext.Provider>
    )
}

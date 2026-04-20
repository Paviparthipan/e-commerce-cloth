import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useState } from 'react'
import sun from '../assets/sun.png'
import moon from '../assets/moon.png'
import { globContext } from '../context/Context'
import { useContext } from 'react'

export const Sidebar = () => {

    const { dark, toggleTheme } = useContext(globContext)

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate("/")
    }



    return (
        <div className={  ` border-r-2 ${dark? "bg-gray-900 text-white" : "bg-gray-200 text-black"} top-0   md:h-screen scroll` }>


            <div className=' flex md:flex-col justify-evenly  items-center p-2  '>


                <img src={logo} alt="" className=' w-10  h-10 md:w-20 md:h-20' />

                <h2 className='md:text-2xl text-xl md:text-center'>StyleHub</h2>




                <ul className='md:px-10 md:mt-10 list-none flex justify-center items-center md:flex-col '>

                    <li className='w-8' onClick={toggleTheme}>{dark ? <img className='' src={moon} alt="" /> : <img src={sun} alt="" />}</li>



                    <li className='transition-all md:mt-5 duration-200 
                    md:hover:scale-105 md:hover:ml-5  md:hover:shadow-2xl'>

                        <Link to="Home"
                            className={`md:block 
                          px-4 py-2 
                        
                          hover:underline md:hover:no-underline
                        ${dark? "md:hover:bg-gray-600" :"md:hover:bg-blue-600 md:hover:text-amber-50"}    rounded`}>
                            Home
                        </Link>

                    </li>
                    <li className='transition-all duration-200 hover:underline md:hover:no-underline md:hover:scale-105 md:hover:ml-5  md:hover:shadow-2xl'>

                        <Link to="Products" className={`md:block 
                          px-4 py-2 
                          ${dark? "md:hover:bg-gray-600" :"md:hover:bg-blue-600 md:hover:text-amber-50"}  rounded`}>
                            Products

                        </Link>

                    </li>
                    <li className='transition-all duration-200 hover:underline md:hover:no-underline md:hover:scale-105 md:hover:ml-5  md:hover:shadow-2xl'>

                        <Link to="Order" className={`md:block 
                          px-4 py-2
                           rounded ${dark? "md:hover:bg-gray-600" :"md:hover:bg-blue-600 md:hover:text-amber-50"}  `}>
                            Orders

                        </Link>

                    </li>


                </ul>




                <button onClick={logOut} className='md:mt-5 md:w-40 md:py-3 cursor-pointer'>LogOut</button>


            </div>
        </div>
    )
}

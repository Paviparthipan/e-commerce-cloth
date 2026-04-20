import React, { useContext, useState } from 'react'
import logo2 from '../assets/logo2.png'
import logo21 from '../assets/logo21.png'
import { Link, useSearchParams } from 'react-router-dom'
import hb from '../assets/hb.png'
import cartlogo from '../assets/cart_icon.png'
import { CartContext } from '../context/CartContext'

import { useNavigate } from 'react-router-dom'

export const Nav = () => {
  const navigate = useNavigate()
  const { cart } = useContext(CartContext)

  const [togMenu, setTogMenu] = useState(false)

  const logout = () => {

    localStorage.clear()
    navigate('/')
  }



  return (

    <div className="bg-white z-10 shadow-md px-6 w-full top-0 py-3 fixed flex items-center justify-between ">

      <div className="flex items-center gap-2">
        <img src={logo21} alt="Logo" className="w-10 h-10" />
        <img src={logo2} alt="Logo" className="w-28" />
      </div>


      <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
        <li><Link to="/Store" className="hover:text-red-500">Shop</Link></li>
        <li><Link to="/Store/Men" className="hover:text-red-500">Men</Link></li>
        <li><Link to="/Store/Women" className="hover:text-red-500">Women</Link></li>
        <li><Link to="/Store/Kids" className="hover:text-red-500">Kids</Link></li>
        <li><Link to="/Store/Orders" className="hover:text-red-500">My Orders</Link></li>
        <li className='relative'> <Link to="/Store/Cart"> <img className='h-5 w-6' src={cartlogo} alt="" /> <span className='absolute bottom-2 bg-red-700 text-white px-2 rounded-2xl text-sm left-5'>{cart.length}</span> </Link>  </li>
      </ul>



      <div className="hidden md:flex items-center gap-4">
        <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>



      <button
        onClick={() => setTogMenu(prev => !prev)}
        className="md:hidden"
      >
        <img src={hb} alt="menu" className="w-6" />
      </button>


      {togMenu && (
        <div className="absolute top-16 right-4 w-48 bg-white shadow-lg rounded-lg p-4 md:hidden z-50">
          <ul className="flex flex-col gap-4 text-gray-700">
            <li><Link to="/Store">Shop</Link></li>
            <li><Link to="/Store/Men">Mens</Link></li>
            <li><Link to="/Store/Women">Women</Link></li>
            <li><Link to="/Store/Kids">Kids</Link></li>
            <li className='relative'>  <Link to="/Store/Cart">
              <img className='h-7 w-7' src={cartlogo} alt="" />
              <span className='absolute bottom-4 rounded-2xl bg-red-700 text-white text-sm px-1 left-7'>{cart.length}</span> </Link> </li>
            <button
              onClick={logout}
              className="bg-red-500 text-white py-1 rounded mt-2">
              Logout
            </button>
          </ul>
        </div>
      )}

    </div>
  )
}

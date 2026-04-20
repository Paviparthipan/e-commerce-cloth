import React from 'react'
import logo from '../assets/logo1.png'
import whatsapp from '../assets/whatsapp_icon.png'
import instagram from '../assets/instagram_icon.png'
import pin from '../assets/pintester_icon.png'
export const Footer = () => {
  return (
    <div className='flex flex-col pt-10 gap-3 bg-pink-100 items-center'>

      <img src={logo} alt="" />

      <ul className='flex gap-10 flex-wrap'>
        <li>
          Company
        </li>
        <li>Products</li>
        <li>Office</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <ul className='flex gap-10 '>
        <li className='w-5'><img src={whatsapp} alt="" /></li>
        <li className='w-5'><img src={instagram} alt="" /></li>
        <li className='w-5'><img src={pin} alt="" /></li>
      </ul>
      <span className='border-t border-gray-700  w-100 md:w-150'></span>
      <p>Copyright @2026 - All Right Reserved</p>
    </div>
  )
}

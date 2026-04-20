import React, { useEffect, useState } from 'react'
import api from '../service/Api'
import banner_mens from '../assets/banner_mens.png'
import { useNavigate } from 'react-router-dom'

export const Men = () => {

 const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchMens()
  }, [])

  const fetchMens = async () => {


    try {
      const res = await api.get("/getAllProducts?category=men")
      setProducts(res.data)

    } catch (error) {
      console.log(error.response?.data?.message);

    }
  }

  return (
      <div className='bg-pink-100'>
    
          <div className=''>
            <img src={banner_mens} alt="" />
          </div>
          <div className='px-10'>
            <span>Showing product / {products.length}</span>
    
            <div className=' '>
              <ul className='flex flex-wrap px-10 justify-evenly gap-5'>
                {products.map((p) => (
                  <li onClick={() => navigate("/product", { state: p })} className='h-auto rounded-lg shadow-xl p-2 mt-10  hover:scale-110 transition cursor-pointer  w-50' key={p._id}>
    
                    <span>
                      <img src={`https://e-commerce-cloth.onrender.com/${p.img}`} alt="" />
                    </span>
                    <span className='text-sm'>
                      {p.name}
                    </span>
                    <span className='flex gap-3'>

                <p className='font-semibold text-gray-600 line-through'>
                  ₹   {p.price + 25}
                </p>
                <p className='font-semibold'>
                  ₹   {p.price }
                </p>
                </span>
    
                  </li>
                ))}
    
              </ul>
            </div>
    
    
    
          </div>
    
        </div>
  )
}

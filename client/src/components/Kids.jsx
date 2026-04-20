import React, { useEffect, useState } from 'react'
import api from '../service/Api'
import banner_kids from '../assets/banner_kids.png'
import { useNavigate } from 'react-router-dom'
export const Kids = () => {

  const navigate = useNavigate()
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchKids()
  }, [])

  const fetchKids = async () => {


    try {
      const res = await api.get("/getAllProducts?category=kids")
      setProducts(res.data)

    } catch (error) {
      console.log(error.response?.data?.message);

    }
  }




  return (
    <div className='bg-pink-100'>

      <div className=''>
        <img src={banner_kids} alt="" />
      </div>
      <div className='px-10'>
        <span>Showing product / {products.length}</span>

        <div className=' '>
          <ul className='flex flex-wrap px-10 justify-evenly gap-5'>
            {products.map((p) => (
              <li onClick={() => navigate("/product", { state: p })} className='h-auto rounded-lg shadow-xl p-2 mt-10  hover:scale-110 transition cursor-pointer  w-50' key={p._id}>

                <span>
                  <img src={`http://localhost:5000${p.img}`} alt="" />
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

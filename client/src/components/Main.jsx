import React, { useContext } from 'react'
import { StoreContext } from '../layout/Layout'
import hero_img from '../assets/hero_image.png'
import hand from '../assets/hand_icon.png'
import { Overview } from './Overview'
import { useNavigate } from 'react-router-dom'
export const Main = () => {

  const { randData, overView } = useContext(StoreContext)

  const navigate = useNavigate()



  return (
    <div className='bg-pink-100 '>

      <div className='bg-bottom md:bg-right bg-contain md:px-20  bg-no-repeat  h-180 '
        style={{ backgroundImage: `url(${hero_img})` }}
      >
        <p className='text-sm font-semibold pt-45 pl-10 md:pt-25 md:text-xl lg:text-2xl '>New Arrivals Only</p>

        <div className='text-2xl font-bold pl-10 pt-5 md:text-4xl lg:text-6xl '>
          <span className='flex items-center gap-3'>
            New
            <img src={hand} alt="" className='w-5 md:w-15' />
          </span>
          Collection
          <br />
          For Everyone
        </div>
      </div>
      <div className=''>

        <h1 className='text-center font-semibold text-2xl'>Our Trending Collections</h1>

        <div className=' '>
          <ul className='flex flex-wrap px-10 justify-evenly gap-5'>
            {randData.map((p) => (
              <li onClick={() => navigate("/product", { state: p })} className='h-auto rounded-lg shadow-xl p-2 mt-10  hover:scale-110 transition cursor-pointer  w-50' key={p._id}>

                <span>
                  <img src={`https://e-commerce-cloth.onrender.com${p.img}`} alt="" />
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

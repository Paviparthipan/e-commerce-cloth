import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { globContext } from '../context/Context'
import { useContext } from 'react'

export const Dashboard = () => {

   const { dark } = useContext(globContext)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      navigate('/')
    }

  }, [])

  return (
    <div className=' md:flex'>
      <div className='fixed top-0 z-10 md:z-0  w-full  lg:w-75 md:w-60' >

        <Sidebar />
      </div>
      <div className={` ${dark? "bg-gray-950 text-white " : "bg-gray-200"}  w-full
       md:overflow-y-auto
         
          md:ml-60 lg:ml-75
           md:mt-0 
           `}>

        <Outlet />
      </div>

    </div>
  )
}

import React, {  useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../layout/Layout'




export const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      navigate("/")
    }
  }, [])

  return (

    <div>
      <Layout />
    </div>




  )
}

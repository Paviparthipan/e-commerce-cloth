import React, { useState } from 'react'
import api from '../service/Api';
import { useNavigate } from 'react-router-dom';

export const RegLogin = () => {

  const navigate = useNavigate()


  const [tog, setTog] = useState(false);
  const [regData, setRegData] = useState({
    userName: "",
    email: "",
    password: ""
  })
  const [logData, setLogData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    setRegData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleChangeLogin = (e) => {
    setLogData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const register = async (e) => {
    e.preventDefault();
    try {

      const res = await api.post("/regClient", regData)


      alert(res.data.message)
      navigate('/')
    } catch (error) {
      console.log(error.response?.data?.message);
      alert(error.response?.data?.message)

    }
  }

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/loginClient", logData)


      localStorage.setItem("accessToken", res.data.accessToken)
      localStorage.setItem("refreshToken", res.data.refreshToken)
      localStorage.setItem("User", JSON.stringify(res.data.userDetail))


      navigate("/Store")

    } catch (error) {
      console.log(error.response?.data?.message);
      alert(error.response?.data?.message)
    }
  }
  const toggle = () => {
    setTog(prev => !prev)
  }




  return (



    <div className='min-h-screen bg-pink-100 flex items-center justify-center px-4 py-10'>

      {tog ? (
        <div className='w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl'>

          <form action="" onSubmit={register}>

            <h2 className='text-lg font-semibold'>
              Register
            </h2>
            <input type="text"
              name="userName"
              value={regData.userName || ""}
              onChange={handleChange}
              required
              placeholder='User Name'
              className='px-3 border rounded w-full block py-2 mt-5 '
            />
            <input type="text"
              name='email'
              value={regData.email || ""}
              onChange={handleChange}
              required
              placeholder='Email'
              className='px-3 border rounded w-full block py-2 mt-5'
            />
            <input type="password"
              name='password'
              value={regData.password || ""}
              onChange={handleChange}
              required
              placeholder='Password'
              className=' px-3 border rounded w-full block py-2 mt-5' />
            <button type='submit'
              className='bg-red-600 w-full py-2 mt-5 rounded
              text-white cursor-pointer'>
              Continue
            </button>


            <p className='mt-3'>Already have an account?
              <span
                onClick={toggle}
                className=' text-blue-700 cursor-pointer'>
                Click here
              </span>
            </p>


          </form>


        </div>
      ) : (

        <div className='w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl'>

          <form action="" onSubmit={login}>

            <h2 className='text-lg font-semibold'>
              Login
            </h2>

            <input
              type="text"
              name='email'
              value={logData.email || ""}
              onChange={handleChangeLogin}
              required
              placeholder='Email'
              className=' px-3 border rounded w-full block py-2 mt-5' />
            <input
              type="password"
              name="password"
              value={logData.password || ""}
              onChange={handleChangeLogin}
              required
              placeholder='Password'
              className='px-3 border rounded w-full block py-2 mt-5' />
            <button className='bg-red-600 w-full py-2 mt-5 rounded text-white cursor-pointer'>Continue</button>

            <p className='mt-3'>Create an account?
              <span onClick={toggle}
                className=' text-blue-700 cursor-pointer'>
                Click here</span> </p>


          </form>


        </div>
      )

      }


    </div>
  )
}

import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../service/Api'
export const Login = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev, [name]: value
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post("/AdminLogin", formData)


            localStorage.setItem("accessToken", res.data.accessToken)
            localStorage.setItem("refreshToken", res.data.refreshToken)







            navigate('/Admin/Home')


        } catch (error) {

            return alert(error.response.data.message)

        }
    }

    return (



        <div className='bg-gray-200'>

            <div className='flex h-screen justify-center  items-center text-center '>
                <form action="" onSubmit={handleSubmit} className='rounded-lg shadow-2xl w-100 h-100  p-12 bg-white'>
                    <h2 className='text-xl font-semibold '>Admin Login</h2>

                    <input type="text"
                        name='userName'
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder='Admin'
                        className='block border rounded-sm mt-13 py-2 px-3 w-full' />
                    <input type="password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Admin@123'
                        className='block border rounded-sm mt-8 py-2 px-3 w-full' />
                    <button type='submit' className='border px-2 py-2 hover:bg-red-700 bg-red-500 mt-6 text-white rounded-sm w-50'>Continue</button>
                </form>
            </div>



        </div>
    )
}

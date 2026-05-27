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



        <div className='min-h-screen bg-gray-200'>

            <div className='flex min-h-screen items-center justify-center p-4 text-center'>
                <form action="" onSubmit={handleSubmit} className='w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl'>
                    <h2 className='text-xl font-semibold '>Admin Login</h2>

                    <input type="text"
                        name='userName'
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder='Admin'
                        className='block w-full rounded-lg border px-3 py-2 mt-4' />
                    <input type="password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Admin@123'
                        className='block border rounded-sm mt-8 py-2 px-3 w-full' />
                    <button type='submit' className='w-full rounded-lg bg-red-500 px-4 py-2 mt-6 text-white hover:bg-red-700'>Continue</button>
                </form>
            </div>



        </div>
    )
}

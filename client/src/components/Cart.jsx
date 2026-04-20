import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import api from '../service/Api'

export const Cart = () => {

  const { cart, setCart ,getMyOrder, orderHistory} = useContext(CartContext);

  

  const removeCartItem = (id, s) => {

    setCart(prev =>
      prev.map(item =>
        item._id === id && item.size === s
          ? { ...item, qty: item.qty - 1, total: (item.qty - 1) * item.price } : item
      ).filter(item => item.qty > 0)
    )

    cart.reduce((a, item) => a + item.total, 0)


  }

  const totalAmount = cart.reduce((a, item) => a + item.total, 0)

  const [address, setAddress] = useState({
    cusName: "",
    cusNumber: "",
    cusAddress: ""
  })
  const placeOrder = async (e) => {
    e.preventDefault()

    try {

      const orderData = {
        items: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          size: item.size,
          qty: item.qty,
          img: item.img
        })),
        totalAmount: totalAmount,
        address: address
      }



      const res = await api.post("/createOrder", orderData)
      alert(res.data.message)


      setCart([])
      localStorage.removeItem("cart")
      setAddress({
        cusName: "",
        cusNumber: "",
        cusAddress: ""
      })

    } catch (error) {
      console.log(error.response?.data?.message);

    }

  }


 









  const handleChange = (e) => {
    const { name, value } = e.target

    setAddress((prev) => ({
      ...prev, [name]: value
    }))
  }





  return (
    <div className='bg-pink-100 px-15 py-10'>


      {cart.length === 0 ?
        <p className='text-center font-semibold'>Your Stylehub  Cart is Empty </p>
        :

        <table className='  table-auto w-full border border-collapse border-gray-400'>
          <thead>
            <tr className='bg-gray-400'>
              <th className='border border-gray-300 px-4 py-2 text-center'>
                Product
              </th>
              <th className='border border-gray-300 px-4 py-2 text-center'>
                Title
              </th>
              <th className='border border-gray-300 px-4 py-2 text-center'>
                Quandity /Size
              </th>
              <th className='border border-gray-300 px-4 py-2 text-center'>
                Price
              </th>
              <th className='border border-gray-300 px-4 py-2 text-center'>
                Total
              </th>
              <th className='border border-gray-300 px-4 py-2 text-center'>
                Remove
              </th>
            </tr>
          </thead>

          <tbody>
            {
              cart.map((p) => (
                <tr key={p._id + p.size}>
                  <td className='border border-gray-300 px-4 py-2 text-center'><img className='w-10' src={`http://localhost:5000${p.img}`} alt="" /></td>
                  <td className='border border-gray-300 px-4 py-2 text-center' >{p.name}</td>
                  <td className='border border-gray-300 px-4 py-2 text-center'> {p.qty} -- {p.size}</td>
                  <td className='border border-gray-300 px-4 py-2 text-center'> ₹{p.price} </td>
                  <td className='border border-gray-300 px-4 py-2 text-center'> ₹{p.total} </td>
                  <td className='border border-gray-300 px-4 py-2 text-center'> <button onClick={() => removeCartItem(p._id, p.size)}>X</button></td>

                </tr>
              ))
            }
          </tbody>


        </table>


      }


      {cart.length > 0 &&

        <div className='flex justify-between flex-wrap p-5'>
          <div className=' w-full md:w-59 lg:w-100'>
            <h3 className='text-2xl'>
              Cart Total
            </h3>

            <span className='flex mt-5 justify-between'>
              <p>Sub Total</p>
              <p> {cart.reduce((a, item) => a + item.total, 0)} </p>
            </span>
            <span className='flex mt-5 justify-between'>
              <p>Shipping</p>
              <p>Free</p>
            </span>
            <span className='flex mt-5 justify-between'>
              <p>Total</p>
              <p> {totalAmount} </p>
            </span>
          </div>

          <div className=' '>
            <form action="" onSubmit={placeOrder}>
              <input type="text" required name="cusName"
                value={address.cusName}
                onChange={handleChange}
                placeholder='Name' className='border block mt-3 w-75 px-4 py-2 rounded ' />
              <input type="number" required name="cusNumber"
                value={address.cusNumber}
                placeholder='Number'
                onChange={handleChange}
                className='border block mt-3 w-75 px-4 py-2 rounded ' />
              <input type="text"
                required name="cusAddress"
                value={address.cusAddress}
                onChange={handleChange}
                placeholder='Address' className='border block mt-3 w-75 px-4 py-2 rounded ' />
              <button type='submit' className=' bg-red-600 px-3 py-2 mt-3 text-white rounded hover:bg-red-800'>Checkout</button>
            </form>
          </div>

        </div>
      }


     </div>
  )
}

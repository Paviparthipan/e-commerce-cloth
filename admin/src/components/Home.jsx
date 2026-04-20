import React, { useContext } from 'react'
import { useState } from 'react'
import api from '../service/Api'
import { useEffect } from 'react'

import accept from '../assets/accept.png'
import reject from '../assets/reject.png'
import { globContext } from '../context/Context'

import p from '../assets/pending-order.png'
import o from '../assets/order.png'
import d from '../assets/deliver-order.png'
import c from '../assets/customer.png'



export const Home = () => {

  const { order, client } = useContext(globContext)
  const [prevOrder, setPrevOrder] = useState(null)

  const { dark } = useContext(globContext)




  const openOrder = (item) => {
    setPrevOrder(item)

  }



  const { pending, delivered } = order?.reduce(
    (acc, item) => {
      if (item.status === "pending") acc.pending += 1;
      if (item.status === "delivered") acc.delivered += 1;
      return acc;
    },
    { pending: 0, delivered: 0 }

  ) || { pending: 0, delivered: 0 }


  const acceptOrder = async (id, action) => {
    try {
      const payload = { id, action }
      const res = await api.post("/actionOrder", payload)
      alert(res.data?.message || `order ${action} successfully`)
      setPrevOrder(null)
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Unable to update order"
      console.error(message)
      alert(message)
    }
  }



  return (




    <div className='pt-20  md:pt-10 mx-5 h-screen relative'>

      <div className='ml-13'>
        <p className='text-xl '>
          Hi ! Admin
        </p>

        <p>
          Quickly Review what’s going on in your store
        </p>
      </div>


      <div className={`flex  border justify-evenly flex-wrap mt-5 gap-3  p-5   ${dark ? "bg-gray-900 " : ""}`}>
        <div className='flex gap-3 flex-wrap items-center' >
          <img src={o} alt="" />
          <p>
            Total Orders
          </p>
          {order && order.length}
        </div>
        <div className='flex gap-3 flex-wrap items-center' >
          <img src={p} alt="" />
          <p>
            Pendding Orders
          </p>
          {order && pending}
        </div>
        <div className='flex gap-3 flex-wrap items-center' >
          <img src={d} alt="" className='h-15' />
          <p>
            Delivered Orders
          </p>
          {order && delivered}
        </div>
        <div className='flex gap-3 flex-wrap items-center' >
          <img src={c} alt="" />
          <p>
            Total Customers
          </p>
          {client && client.length}
        </div>
      </div>



      <div className='mt-10  '>
        <h4 className='text-center text-xl font-semibold'>OrderStatus</h4>


        <div className='border'>

          <table className=' table-auto w-full  '>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Customer name</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody className='border-t border-gray-600 w-100'>
              {order && order.filter(item => item.status === "pending").map((item) => (



                <tr className='text-center hover:cursor-text' key={item._id}>
                  <td className='py-2 px-3'>
                    {item.orderNumber}
                  </td>
                  <td className='py-2 px-5'>
                    {item.address.cusName}
                  </td>
                  <td className='py-2 px-3'>{item.status}</td>
                  <td className='py-2 px-3'>₹{item.totalAmount}</td>
                  <td className='py-2 px-3  flex gap-2 items-center flex-wrap justify-center'>



                    {/* <button className='cursor-pointer' ><img src={accept} alt="" /></button> */}

                    {/* <button className='cursor-pointer' ><img className='w-5' src={reject} alt="" /></button> */}
                    <button onClick={() => openOrder(item)} className=' cursor-pointer bg-blue-600 text-white rounded px-3 py-1 '>Open</button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>




      {prevOrder &&
        <div className='   w-full fixed bg-black/65
      flex justify-center items-center inset-1'>

          <div key={prevOrder} className="border bg-white 
          p-8 mt-5 transition-all relative rounded ">

            <button onClick={() => setPrevOrder(null)} className='absolute right-7 hover:bg-red-600 rounded-2xl hover:text-white w-5 top-4'>x</button>

            <p><strong>Order ID:</strong> {prevOrder.orderNumber}</p>
            <p><strong>Customer Name :</strong> {prevOrder.address.cusName}</p>
            <p><strong>Customer Phone:</strong> {prevOrder.address.cusNumber}</p>
            <p><strong>Total:</strong> ₹{prevOrder.totalAmount}</p>
            <p><strong>Status:</strong> {prevOrder.status}</p>

            <div className="mt-3">
              {prevOrder.items.map(item => (
                <div key={item.productId + item.size} className="flex gap-3 mt-2">

                  <img
                    src={`https://e-commerce-cloth.onrender.com${item.img}`}
                    className="w-16 h-16"
                  />

                  <div>
                    <p>{item.name}</p>
                    <p>Size: {item.size}</p>
                    <p>Qty: {item.qty}</p>
                    <p>₹{item.price * item.qty}</p>
                  </div>



                </div>

              ))}
              <button onClick={() => acceptOrder(prevOrder._id, "accept")} className='mt-4 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-2 py-1 rounded'>Accept order</button>
              <button onClick={() => acceptOrder(prevOrder._id, "reject")} className='mt-4 bg-red-500 hover:bg-red-600 
              cursor-pointer text-white px-2 py-1 ml-4 rounded'>Reject order</button>

            </div>

          </div>
        </div>
      }


    </div>



  )
}

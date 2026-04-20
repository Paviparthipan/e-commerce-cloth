import React, { useContext, useState } from 'react'
import { globContext } from '../context/Context'

export const Order = () => {

const {dark} = useContext(globContext)

  const { order, fetchOrder } = useContext(globContext)

  const [statusFilter, setStatusFilter] = useState("all")

  const filterOder = statusFilter === "all" ? order : order.filter(item => item.status === statusFilter)

  

  return (


    <div>
      <div className='md:pt-10 h-screen pt-5 '>
        <div className='flex justify-between px-15' >
          <h4 className=' text-xl font-semibold'>OrderStatus</h4>

          <select className={`${dark?"bg-gray-900":""}`} name="" id="" onChange={(e) => setStatusFilter(e.target.value)}>

            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="rejected">Cancel</option>
            <option value="delivered">Delivered</option>
          </select>

        </div>
        <div className='mt-10' >

          <table className=' table-auto w-full  '>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Customer name</th>
                <th>Status</th>
                <th>Amount</th>
                {/* <th>Actions</th> */}
              </tr>

            </thead>

            <tbody className={`border-t border-gray-600 w-100 ${dark ? "bg-gray-900": ""}`}>
              { filterOder?.map((item) => (



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



                   
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>

    </div>
  )
}

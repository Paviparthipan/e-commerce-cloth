import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../service/Api';

export const Order = () => {
    const { getMyOrder, orderHistory } = useContext(CartContext);


    const acceptOrder = async (id, action) => {

        try {
            const d = { id, action }
            const res = await api.post("/actionOrder", d)
            alert(res.data?.message || `order ${action} successfully`)
            setPrevOrder(null)


        } catch (error) {
            console.log(error.response?.data?.message);

        }

    }


    return (
        <div className='px-15 py-10 bg-pink-100'>

            {orderHistory && orderHistory.map(order => (
                <div key={order._id} className="border p-4 mt-5 rounded">

                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                    <p><strong>Status:</strong> {order.status}</p>

                    <div className="mt-3">
                        {order.items.map(item => (
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
                    </div>
                    {order.status === "delivered" || "reject" ? "" :
                        <button onClick={() => acceptOrder(order._id, "reject")} className='text-blue-600 cursor-pointer mt-4 ml-19'>Cancel Order</button>
                    }

                    {order.status === "shipping" && <button onClick={() => acceptOrder(order._id, "delivered")} className='text-blue-600 cursor-pointer mt-4 ml-5'>Delivery Recieved</button>}
                </div>
            ))}
        </div>
    )
}

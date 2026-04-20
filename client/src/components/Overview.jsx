import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { CartContext } from '../context/CartContext'


export const Overview = () => {

    const { setCart, cart } = useContext(CartContext)




    const location = useLocation()
    const product = location.state
    const [size, setSize] = useState(null)
    const getSize = (category) => {
        if (category === "men") return ["S", "M", "L", "XL"];
        if (category === "women") return ["S", "M", "L"];
        if (category === "kids") return ["XS", "S", "M", "XL"];
    }

    const sizes = getSize(product.category);

    const selectSize = (s) => {
        setSize(s)
    }

    const handleCart = (product, size) => {



        if (!size) {
            alert("please select size")
            return
        }

        const existProduct = cart.find(
            (item) =>
                item._id === product._id && item.size === size
        )

        if (existProduct) {
            const updatedProduct = cart.map((item) =>
                item._id === product._id && item.size === size
                    ? { ...item, qty: item.qty + 1, total: (item.qty + 1) * item.price } : item

            );
            setCart(updatedProduct)
        } else {
            const newItem = {
                ...product,
                size: size,
                qty: 1,
                total: product.price
            };
            setCart([...cart, newItem])
        }


    }



    return (
        <div className='bg-pink-100'>

            <Nav />

            <div className='flex p-5 pt-25 lg:p-25 gap-5 flex-wrap lg:gap-5 justify-evenly'>





                <div className='flex '>
                    <ul className='hidden md:block'>

                        <li>
                            <img className='lg:h-30 h-25' src={`https://e-commerce-cloth.onrender.com${product.img}`} alt="" />

                        </li>
                        <li>
                            <img className='lg:h-30 h-25' src={`https://e-commerce-cloth.onrender.com${product.img}`} alt="" />

                        </li>
                        <li>
                            <img className='lg:h-30 h-25' src={`https://e-commerce-cloth.onrender.com${product.img}`} alt="" />

                        </li>
                        <li>
                            <img className='lg:h-30 h-25' src={`https://e-commerce-cloth.onrender.com${product.img}`} alt="" />

                        </li>
                    </ul>
                    <img className=' lg:w-100 w-70' src={`https://e-commerce-cloth.onrender.com${product.img}`} alt="" />

                </div>
                <div>

                    <div className='text-wrap w-100 '>
                        <h2 className='text-xl mt-5 md:text-2xl lg:text-3xl '>
                            {product.name}
                        </h2>
                        <p className='text-xs text-wrap mt-5 lg:text-lg'>{product.dis}</p>

                        <p className='mt-5'>Category : {product.category}</p>

                        <span className='flex gap-3 mt-3'>

                            <p className='font-semibold text-gray-600 line-through'>
                                ₹   {product.price + 25}
                            </p>
                            <p className='font-semibold'>
                                ₹   {product.price}
                            </p>
                        </span>

                        <ul className='flex  gap-5 mt-3'>
                            {sizes.map((s, index) => (
                                <li onClick={() => selectSize(s)} className={` ${size === s ? "text-white bg-blue-600" : "bg-white"} cursor-pointer hover:bg-blue-600 p-1 hover:text-white rounded-2xl`} key={index}>{s}</li>
                            ))}
                        </ul>

                    </div>

                    <button onClick={() => handleCart(product, size)} className='bg-red-600 text-white py-2 px-4 mt-5 rounded hover:bg-red-800'>Add to cart</button>

                </div>

            </div>
            <div>

                <Footer />
            </div>
        </div>
    )
}

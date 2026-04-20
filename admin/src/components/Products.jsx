import React, { useContext, useEffect, useState } from 'react'
import api from '../service/Api';
import trash from '../assets/trash.png'
import { globContext } from '../context/Context';

export const Products = () => {
  const { dark } = useContext(globContext)
  const [data, setData] = useState([])
  const [refersh, setRefresh] = useState(false)
  const [tog, setTog] = useState(false)
  const [img, setImg] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    dis: ""
  })

  const toggleProduct = () => {
    setTog(prev => !prev)
  }
  const handleChange = (e) => {

    const { name, value } = e.target;
    const cleanValue = value.trimStart().toLowerCase()
    setForm((prev) => ({
      ...prev, [name]: cleanValue
    }));

  };

  const handleFile = (e) => {
    setImg(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("category", form.category);
    data.append("stock", form.stock);
    data.append("dis", form.dis);
    data.append("img", img);

    try {
      const res = await api.post('/addProduct', data);
      alert("product Added");



    } catch (error) {
      console.log(error);

    }

    setRefresh(prev => !prev)
    setForm({
      name: "",
      price: "",
      category: "",
      stock: "",
      dis: ""
    })
    setImg(null)


  };


  const getProduct = async () => {
    try {
      const res = await api.get('/getProduct')
      setData(res.data.product);

    } catch (error) {
      console.log(error.response?.data?.message);

    }
  }
  useEffect(() => {

    getProduct()
  }, [refersh])


  const handleDelete = async (id) => {


    try {
      const res = await api.delete(`/deleteProduct/${id}`)
      getProduct()


    } catch (error) {
      console.log(error);

    }


  }



  return (
    <div className='relative '>

      <div className={`fixed  md:top-0 border  top-14 w-full flex justify-between   p-3  ${dark ? "bg-gray-900" : "bg-white"}`}>
        <h2 className='font-semibold text-2xl ml-12  '>
          Product Overview
        </h2>
        <button onClick={toggleProduct} className='bg-red-600 md:mr-80 text-white px-3 rounded hover:bg-red-800 cursor-pointer'>
          Add Product
        </button>
      </div>


      {tog &&
        <div className={`  ${dark ? "" : ""} fixed inset-0  
          bg-black/65 flex justify-center flex-col items-center`}>

          <div className={` ${dark ? "bg-gray-900" : "bg-white"} 
          relative rounded-2xl shadow-2xl p-5`}>
            <h2 className='text-lg font-semibold text-center'>Add New Product</h2>
            <button onClick={toggleProduct} className='absolute top-4 right-5 hover:bg-red-600 rounded-2xl w-6 hover:text-white '>x</button>
            <form onSubmit={handleSubmit} className='h-100 w-100  flex mt-5 items-center  flex-col'>



              <input name="name" value={form.name} required placeholder="Name" onChange={handleChange} className=' border mt-2 w-75  px-4 py-2 rounded ' />
              <input name="price" value={form.price} required placeholder="Price" onChange={handleChange} className=' border mt-2 w-75 px-4 py-2 rounded' />
              <input name="category" value={form.category} required placeholder="Category" onChange={handleChange} className=' border mt-2 w-75 px-4 py-2 rounded' />
              <input name="stock" value={form.stock} required placeholder="Stock" onChange={handleChange} className=' border mt-2 w-75 px-4 py-2 rounded' />
              <input name="dis" value={form.dis} required placeholder="description" onChange={handleChange} className=' border mt-2 w-75 px-4 py-2 rounded' />

              <input type="file" required onChange={handleFile} className='border mt-2 w-45 px-4 py-2 rounded' />

              <button type="submit" className='bg-orange-700 px-3 py-1 mt-4 rounded cursor-pointer hover:bg-orange-800 text-white'>Add Product</button>
            </form>
          </div>

        </div>}

      <div className='pt-3 md:pt-0 text-center flex justify-center border '>

        {data.length === 0 ? <p className='text-center text-red-800 font-semibold'>No Product available</p> :
          <table className='mt-25   border-separate border-spacing-4 w-3/4 '>
            <thead>
              <tr className='bg-blue-500 text-white'>

                <th className='px-3 py-2  rounded-sm'>S.no</th>
                <th className='px-3 py-2 rounded-sm'>Img</th>
                <th className='px-3 py-2 rounded-sm'>Product Name</th>
                <th className='px-3 py-2 rounded-sm'> Price</th>
                <th className='px-3 py-2 rounded-sm'>Stock</th>
                <th className='px-3 py-2 rounded-sm'>Action</th>
              </tr>
            </thead>


            <tbody>
              {data.map((p, index) => (

                <tr key={p._id} className='text-lg '>
                  <td className='px-3 py-2  rounded-sm'> {index + 1}  </td>
                  <td className='px-3 py-2  rounded-sm'>   <img src={`http://localhost:5000${p.img}`} alt="" height="20px" width="30px" />  </td>
                  <td className='px-3 py-2  rounded-sm'>{p.name.slice(0, 15)}</td>
                  <td className='px-3 py-2  rounded-sm'>{p.price}</td>
                  <td className='px-3 py-2  rounded-sm'> {p.stock} </td>
                  <td className='px-3 py-2  rounded-sm'>
                    <button onClick={() => handleDelete(p._id)} className='cursor-pointer'> <img width={20} src={trash} alt="" /> </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        }
      </div>

    </div>
  )
}

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Home } from './components/Home'
import { Products } from './components/Products'
import { Order } from './components/Order'


const App = () => {

 


  return (

    <div >

      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Login />} />

          <Route path='/Admin/' element={<Dashboard />} >
            <Route index path='Home' element={<Home />} />
            <Route path='Products' element={<Products />} />
            <Route path='Order' element={<Order />} />
          </Route>

        </Routes>

      </BrowserRouter>







    </div>
  )
}

export default App
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RegLogin } from './pages/RegLogin'
import { Home } from './pages/Home'
import { Main } from './components/Main'
import { Kids } from './components/Kids'
import { Women } from './components/Women'
import { Men } from './components/Men'
import { Overview } from './components/Overview'
import { Cart } from './components/Cart'
import { Order } from './components/Order'
const App = () => {


  return (


    <div className='bg-pink-100 h-screen'>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<RegLogin />} />
          <Route path="/Store" element={<Home />} >

            <Route index element={<Main />} />
            <Route path="Men" element={<Men />} />
            <Route path="Women" element={<Women />} />
            <Route path="Kids" element={<Kids />} />
            <Route path="Orders" element={<Order />} />
            <Route path="Cart" element={<Cart />} />



          </Route>
          <Route path="/product" element={<Overview />} />

        </Routes>



      </BrowserRouter>


    </div>
  )
}

export default App
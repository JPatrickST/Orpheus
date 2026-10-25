import { useState, useEffect } from 'react'
import {Route, Routes, useLocation } from 'react-router-dom'
import { products } from './Data/products.js'
import Home from './Components/Home.jsx'
import Header from './Components/Header.jsx'
import Body from './Components/Body.jsx'

export default function App() {
  const { pathname } = useLocation()

  const [cart, setCart] = useState([
    { id: 1, price: 19.99, name: 'Product 1' },
  ])

  const [selectedProduct, setSelectedProduct] = useState(products[0].id)

  const currentProduct = products.find(
    (product) => product.id === selectedProduct)

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])


  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home />}
      />
      <Route 
        path='/shop'
        element ={
          <>
            <Header 
              products={products}
              cart={cart}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
            <Body 
              currentProduct={currentProduct}
            />
          </>
        }
      />
    </Routes>
  )
}
import { useState, useEffect } from 'react'
import {Route, Routes, useLocation } from 'react-router-dom'
import { products } from './Data/products.js'
import Home from './Components/Home.jsx'
import Header from './Components/Header.jsx'
import Body from './Components/Body.jsx'

export default function App() {
  const { pathname } = useLocation()

  // STATE 2: the cart. It is an ARRAY of OBJECTS, one object per instrument in the cart:
  //   [ { id: "violin", name: "HP Violin", price: 1000, quantity: 2 },
  //     { id: "kalimba", name: "Lumen Kalimba", price: 85, quantity: 1 } ]
  const [cart, setCart] = useState([])

  const handleAddToCart = (product) => {
    const existing = cart.find(
      (item) => item.id === product.id)

    if (existing) {
      setCart( 
        cart.map( (item) => item.id === product.id 
        ? {...item, quantity: item.quantity + 1} 
          : item
      ))
    } else {
      setCart([
        ...cart, 
        {id:       product.id, 
         name:     product.name, 
         price:    product.price, 
         quantity: 1}
      ])}
  }

  const handleRemove = (id) => {
    setCart(
      cart.filter(
        (item) => (item.id !== id)
      ))}

  const handleOrderPlaced = () => setCart([])

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
              cart={cart}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
              onOrderPlaced={handleOrderPlaced}
            />
          </>
        }
      />
    </Routes>
  )
}
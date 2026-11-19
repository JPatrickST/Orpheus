import { useState, useEffect } from 'react'
import {Route, Routes, useLocation } from 'react-router-dom'
import { supabase } from './lib/supabase.js'
import Home from './Pages/Home.jsx'
import Header from './Group/Header.jsx'
import Body from './Pages/Body.jsx'

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

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const currentProduct = products.find(
  (product) => product.id === selectedProduct)

  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  useEffect(() => {
  async function loadProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('price')

    if (error) {
      setError(error.message)
    } else {
      setProducts(data)
      setSelectedProduct(data[0]?.id)
    }
    setLoading(false)
    }

    loadProducts()
  }, [])


  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home />}
      />
      <Route
        path='/shop'
        element={
          loading ? (
            <p className="text-center mt-10">Loading instruments...</p>
          ) : error ? (
            <p className="text-center mt-10">Couldn't load the instruments: {error}</p>
          ) : (
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
          )
        }
      />
    </Routes>
  )
}
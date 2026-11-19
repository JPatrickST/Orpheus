import { useState, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase.js'
import Home from './Pages/Home.jsx'
import Header from './Group/Header.jsx'
import Body from './Pages/Body.jsx'
import CartDrawer from './Components/CartDrawer.jsx'
import PageMessage from './Components/PageMessage.jsx'

export default function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // The cart: an ARRAY of OBJECTS, one object per instrument in the cart.
  //   [ { id: "violin", name: "HP Violin", price: 1000, quantity: 2 }, ... ]
  const [cart, setCart] = useState([])

  // Is the cart drawer (the panel that slides in from the right) open?
  const [cartOpen, setCartOpen] = useState(false)

  const handleAddToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id)

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([
        ...cart,
        { id: product.id, name: product.name, price: product.price, quantity: 1 },
      ])
    }
  }

  // change is +1 or -1. The quantity is kept between 1 and 10.
  const handleChangeQuantity = (id, change) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(10, Math.max(1, item.quantity + change)) }
          : item
      )
    )
  }

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id))
  }

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

  // Used by the home page: pick an instrument, then go to the shop with it already selected
  const handlePickFromHome = (id) => {
    setSelectedProduct(id)
    navigate('/shop')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            products={products}
            loading={loading}
            error={error}
            onPick={handlePickFromHome}
          />
        }
      />
      <Route
        path="/shop"
        element={
          loading ? (
            <PageMessage title="Tuning the instruments..." pulse />
          ) : error ? (
            <PageMessage
              title="We couldn't load the instruments"
              text={error}
              action="Try again"
              onAction={() => window.location.reload()}
            />
          ) : (
            <>
              <Header
                products={products}
                cart={cart}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                onOpenCart={() => setCartOpen(true)}
              />
              <Body
                currentProduct={currentProduct}
                onAddToCart={handleAddToCart}
              />
              <CartDrawer
                open={cartOpen}
                onClose={() => setCartOpen(false)}
                cart={cart}
                onChangeQuantity={handleChangeQuantity}
                onRemove={handleRemove}
                onOrderPlaced={handleOrderPlaced}
              />
            </>
          )
        }
      />
    </Routes>
  )
}

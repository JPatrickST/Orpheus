import { useState, useEffect } from 'react'
import { products } from './Data/products.js'
import Home from './Components/Home.jsx'
import Header from './Components/Header.jsx'
import Body from './Components/Body.jsx'

export default function App() {
  //State for the page, default is home
  const [page, setPage] = useState('home')

  const [cart, setCart] = useState([
    { id: 1, price: 19.99, name: 'Product 1' },
  ])

  const [selectedProduct, setSelectedProduct] = useState(products[0].id)

  const currentProduct = products.find(
    (product) => product.id === selectedProduct)

  useEffect(() => {window.scrollTo(0, 0)}, [page])

  if (page === 'home') {
    return (
        <Home onEnter={() => setPage('shop')} />
    )
  }

  return (
    <>
      <Header 
        onHome={() => setPage('home')}
        products={products}
        cart={cart}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <Body 
        currentProduct={currentProduct}
      />

    </>
  );
}
import { useState } from 'react'
import Home from './Components/Home.jsx'
import Header from './Components/Header.jsx'
import Body from './Components/Body.jsx'
import { products } from './Data/products.js'

export default function App() {
  //State for the page, default is home
  const [page, setPage] = useState('home')

  const [cart, setCart] = useState([
    { id: 1, price: 19.99, name: 'Product 1' },
  ])


  if (page === 'home') {
    return (
        <Home onEnter={() => setPage('shop')} />
    )
  }

  return (
    <>
        <Header 
          onHome={() => setPage('home')}
          cart={cart}
        />
        <Body 
          products={products}
        />

    </>
  );
}
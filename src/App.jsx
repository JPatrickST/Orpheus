import { useState } from 'react'
import Home from './Components/Home.jsx'
import Header from './Components/Header.jsx'
import Body from './Components/Body.jsx'
import { products } from './Data/products.js'

export default function App() {
  //State for the page, default is home
  const [page, setPage] = useState('home')


  if (page === 'home') {
    return (
        <Home onEnter={() => setPage('shop')} />
    )
  }

  return (
    <>
        <Header 
          onHome={() => setPage('home')}
        />
        <Body 
          products={products}
        />

    </>
  );
}
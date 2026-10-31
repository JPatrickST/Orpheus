import { useState, useEffect } from 'react'
import { formatMoney } from '../utils/totals';
import Specs from '../Components/Specs'
import Cart from '../Components/Cart'
import PaymentDetails from "../Components/PaymentDetails";

export default function Body({ currentProduct, onAddToCart, cart, onRemove, onOrderPlaced}) {
    const [buying, setBuying] = useState(false)

    const emptyDetails  = {
        fullName: '',
        email: '',
        streetAddress: '',
        city: '',
        postalCode: '',
        shippingAddress: 'Philippines',
        paymentMethod: 'Credit Card'
    }
    const [details, setDetails] = useState(emptyDetails)
    const [order, setOrder] = useState(null)

    useEffect(() => {
        if (!order) return
        const timer = setTimeout(() => setOrder(null), 5000)
        return () => clearTimeout(timer)
    }, [order])

    const shippingRates = {
        'Philippines': 12,
        'Rest of Asia': 35,
        'Rest of World': 60,
    }


    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = shippingRates[details.shippingAddress]
    const total = subtotal + shipping 

    
    const handleSubmit = (event) => {
        event.preventDefault()

        setOrder({ 
            name: details.fullName, 
            total, 
            itemCount: cart.reduce(
                (n, item) => n + item.quantity, 0) })
        setDetails(emptyDetails)
        setBuying(false)
        onOrderPlaced()
    }

    const handleChange = (e) => {
        setDetails({
            ...details, [e.target.name]: e.target.value
        })
    }

    const handleRemove = (id) => {
        onRemove(id)
        if (cart.length === 1) {
            setBuying(false)}}

    return (
        <main>
            <div className="flex flex-row justify-center items-center max-w-5xl mx-auto gap-6 mt-6">
                <div className="flex-1 flex flex-col justify-center items-center gap-6 w-full max-w-2xl min-w-0">
                    <div className="w-full bg-stone-200 rounded-lg p-4">
                        <h1>
                            Picture
                        </h1>   
                    </div>
                    
                    <div className="w-full bg-stone-200 rounded-lg p-4">
                        <h1>
                            Sound Sample
                        </h1>
                    </div>
                </div>
        
                <div className="flex-1 flex flex-col justify-center items-center gap-6 w-full max-w-2xl min-w-0">
                    <div className="w-full bg-stone-200 rounded-lg p-4">
                        <Specs
                            currentProduct={currentProduct}
                            onAddToCart={onAddToCart}/>
                    </div>
                    <div className="w-full bg-stone-200 rounded-lg p-4">
                        
                        <Cart 
                            cart={cart}
                            handleRemove={handleRemove}
                            onBuyNow={() => setBuying(true)}
                            subtotal={subtotal}/>

                        {buying && (
                            <div className="w-full bg-stone-200 rounded-lg p-4">
                                <form onSubmit={handleSubmit}>
                                    <PaymentDetails 
                                        details={details} 
                                        onChange={handleChange} />
                                    
                                    <div className="py-4 text-sm">
                                        <p className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span className="font-mono">
                                                {formatMoney(subtotal)}
                                            </span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span>
                                                Shipping ({details.shippingAddress})
                                            </span>
                                            <span className="font-mono">
                                                {formatMoney(shipping)}
                                            </span>
                                        </p>
                                        <p 
                                          className="flex justify-between font-bold text-base border-t 
                                          border-slate-800/60 mt-2 pt-2">
                                            <span>Total</span>
                                            <span className="font-mono">
                                                {formatMoney(total)}
                                            </span>
                                        </p>
                                    </div>

                                    <button 
                                       type="submit" 
                                       className="w-full bg-stone-800 text-white py-2 rounded-md 
                                                  hover:bg-stone-700">
                                        Place order                 
                                    </button>
                                    <button 
                                       type="button" 
                                       onClick={() => setBuying(false)} 
                                       className="w-full mt-2 underline text-sm">
                                        Cancel
                                    </button>
                        
                                </form>
                            </div>

                            )}
                    </div>
                    
                    
                </div>
                {order && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
                        onClick={() => setOrder(null)}
                        role="dialog"
                        aria-modal="true">
                        <div className="bg-stone-200 rounded-lg p-6 max-w-md shadow-xl">
                            <h2 className="text-2xl font-bold">Order placed</h2>
                            <p className="mt-2">
                                Thank you, {order.name}. {order.itemCount} item(s), total {formatMoney(order.total)}.
                                This is a demo, nothing was charged or shipped.
                            </p>
                        </div>
                    </div>
                )}
            </div>    
        </main>
    )

}
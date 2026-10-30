import { formatMoney } from '../utils/totals'
import CartList from './CartList'

export default function Cart({cart, handleRemove, onAddToCart}) {
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    )

    if (cart.lenght === 0) {
        return <p>Your cart is empty.</p>
    }

    return(
        <div>
            <h1 className='text-4xl font-bold pb-3'>
                Your Cart
            </h1>

            <CartList cart={cart} handleRemove={handleRemove}/>
    
            <p className="flex justify-between py-3 font-bold">
                <span>
                    Subtotal
                </span>
                <span className="font-mono">
                    {formatMoney(subtotal)}
                </span>
            </p>

            <button
                onClick={onAddToCart}
                className='w-full bg-stone-800 text-white py-2 rounded-md hover:bg-stone-700'>
                Buy now
            </button>

        </div>        
    )
}
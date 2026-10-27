import { formatMoney } from '../utils/totals'
import CartList from './CartList'

export default function Cart(cart) {


    return(
        <div>
            <h1 className='text-4xl font-bold py-3'>
                Your Cart
            </h1>

            <CartList 
                cart={cart} />
        </div>        
    )
}
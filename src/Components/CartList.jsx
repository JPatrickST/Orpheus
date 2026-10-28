import { formatMoney } from "../utils/totals";

export default function CartList({cart, onRemove}) {


    return(
        <div className="boarder-t border-slate-800/80" >
            {cart.map( (item) => (
                <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b border-slate-800/60">
                    <span> {item.name} x {item.quantity} </span>
                    <span className="font-mono"> 
                        {formatMoney(subtotal)}
                    </span>
                    <button
                        onClick={onRemove(item.id)}
                        className="text-sm underline">
                        Remove
                    </button>
                </div>))}
        </div>
    )
}
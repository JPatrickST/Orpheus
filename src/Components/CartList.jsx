import { formatMoney } from "../utils/totals";

export default function CartList({cart, onRemove, subtotal}) {


    return(
        <div className="boarder-t border-slate-800/80" >
            {cart.map((item) => (
                <div 
                    key={item.id} 
                    className="grid grid-cols-[1fr_auto_auto] gap-6 items-center py-3 border-b border-slate-800/60">
                    <span className="truncate">{item.name} × {item.quantity}</span>

                    <span className="font-mono text-right">$ {(item.price * item.quantity).toLocaleString()}</span>

                    <button 
                    onClick={() => onRemove(item.id)} 
                    className="text-sm underline text-right">
                    Remove
                    </button>
                </div>
                ))}
        </div>
    )
}
import { formatMoney } from "../utils/totals";

export default function CartList({cart, handleRemove}) {


    return(
        <div className="boarder-t border-slate-800/80" >
            {cart.map((item) => (
            <div 
                key={item.id} 
                className="grid grid-cols-[1fr_3rem_6rem_5rem] items-center gap-4 py-2 border-b border-slate-800/60">

                <span>{item.name} </span>
                <span
                    className="text-center"> × {item.quantity}</span>
                <span 
                    className="font-mono text-right">
                        {formatMoney(item.price * item.quantity)}
                </span>

                <button 
                    onClick={() => handleRemove(item.id)} 
                    className="text-sm underline text-right">
                    Remove
                </button>
            </div>
                ))}
        </div>
    )
}
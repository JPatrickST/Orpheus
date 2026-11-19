import { formatMoney } from "../utils/totals"

// One row per instrument in the cart: name and price, a quantity stepper, and a Remove link.
export default function CartList({ cart, onChangeQuantity, onRemove }) {
    return (
        <ul className="divide-y divide-line">
            {cart.map((item) => (
                <li key={item.id} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 py-5">

                    <div>
                        <p className="font-display text-lg leading-tight">{item.name}</p>
                        <p className="text-sm tabular-nums text-muted">{formatMoney(item.price)} each</p>
                    </div>
                    <p className="text-right font-medium tabular-nums">
                        {formatMoney(item.price * item.quantity)}
                    </p>

                    {/* The - 1 + stepper. Disabled at the limits (1 and 10). */}
                    <div className="inline-flex items-center justify-self-start rounded-full border border-line">
                        <button
                            onClick={() => onChangeQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="h-9 w-9 rounded-full text-lg transition hover:bg-sand disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                            −
                        </button>
                        <span className="w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onChangeQuantity(item.id, 1)}
                            disabled={item.quantity >= 10}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="h-9 w-9 rounded-full text-lg transition hover:bg-sand disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={() => onRemove(item.id)}
                        className="justify-self-end text-sm text-muted underline underline-offset-4 transition hover:text-clay"
                    >
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    )
}

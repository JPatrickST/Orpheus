import { useNavigate } from "react-router-dom"
import { getItemCount } from "../utils/totals"

export default function Header({ products, cart, selectedProduct, setSelectedProduct, onOpenCart }) {

    const navigate = useNavigate()
    const cartCount = getItemCount(cart)

    return (
        // sticky + top-0 keeps the header on screen while scrolling. backdrop-blur frosts what passes behind it.
        <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur">

            {/* Row 1: logo on the left, cart button on the right */}
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
                <button
                    onClick={() => navigate("/")}
                    aria-label="Orpheus, back to the home page"
                    className="font-display text-2xl font-semibold tracking-tight transition-colors hover:text-clay"
                >
                    Orpheus
                </button>

                <button
                    onClick={onOpenCart}
                    aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
                    className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-medium transition hover:border-ink hover:bg-ink hover:text-paper"
                >
                    {/* a small shopping-bag icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 7h12l1 13H5L6 7Z" />
                        <path d="M9 7a3 3 0 0 1 6 0" />
                    </svg>
                    Cart
                    {cartCount > 0 && (
                        // key={cartCount} makes React rebuild the badge every time the number changes, which replays the "pop"
                        <span
                            key={cartCount}
                            className="grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-clay px-1 text-xs font-bold text-white"
                        >
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Row 2: one pill per instrument. overflow-x-auto lets it scroll sideways on a phone. */}
            <nav aria-label="Instruments" className="mx-auto max-w-6xl px-4 sm:px-6">
                <ul className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none]">
                    {products.map((product) => (
                        <li key={product.id} className="shrink-0">
                            <button
                                onClick={() => setSelectedProduct(product.id)}
                                aria-current={product.id === selectedProduct ? "true" : undefined}
                                className={
                                    product.id === selectedProduct
                                        ? "rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-paper"
                                        : "rounded-full border border-line px-4 py-1.5 text-sm text-muted transition hover:border-ink hover:text-ink"
                                }
                            >
                                {product.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

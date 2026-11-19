import { useNavigate } from "react-router-dom"
import { getItemCount } from "../utils/totals"
import ThemeToggle from "../Components/ThemeToggle"

// Many classes below come in pairs: one for light mode, and one with dark: that only applies in dark mode.
export default function Header({ products, cart, selectedProduct, setSelectedProduct, onOpenCart }) {

    const navigate = useNavigate()
    const cartCount = getItemCount(cart)

    return (
        // sticky + top-0 keeps the header on screen while scrolling. backdrop-blur frosts what passes behind it.
        <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur dark:border-accent/40 dark:bg-canvas/90">

            {/* Row 1. Light: logo left, buttons right. Dark: a 3-column grid so the logo sits in the centre. */}
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 dark:grid dark:grid-cols-[1fr_auto_1fr] dark:pb-0 dark:pt-4">

                <p className="hidden font-display text-xs uppercase tracking-[0.3em] text-soft dark:sm:block">
                    Est. MMXXVI
                </p>

                <button
                    onClick={() => navigate("/")}
                    aria-label="Orpheus, back to the home page"
                    className="font-display text-2xl font-semibold tracking-tight transition-colors hover:text-accent
                               dark:col-start-2 dark:text-3xl dark:uppercase dark:tracking-[0.3em] sm:dark:text-4xl"
                >
                    Orpheus
                </button>

                <div className="flex items-center gap-2 dark:col-start-3 dark:justify-self-end">
                    <ThemeToggle />

                    <button
                        onClick={onOpenCart}
                        aria-label={`Open cart, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
                        className="inline-flex items-center gap-2 rounded-btn border border-fg/20 px-4 py-2 text-sm font-medium transition hover:border-fg hover:bg-fg hover:text-canvas
                                   dark:border-accent/50 dark:px-3 dark:font-display dark:text-xs dark:font-semibold dark:uppercase dark:tracking-[0.2em] dark:text-accent dark:hover:border-accent dark:hover:bg-accent dark:hover:text-canvas"
                    >
                        {/* shopping-bag icon (light mode only) */}
                        <svg className="dark:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M6 7h12l1 13H5L6 7Z" />
                            <path d="M9 7a3 3 0 0 1 6 0" />
                        </svg>
                        Cart
                        {cartCount > 0 && (
                            // key={cartCount} rebuilds the badge each time the number changes, which replays the "pop"
                            <span
                                key={cartCount}
                                className="grid h-5 min-w-5 animate-pop place-items-center rounded-full bg-action px-1 text-xs font-bold text-on-action"
                            >
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Row 2: one tab per instrument. Light: pills. Dark: plain words with an underline on the chosen one. */}
            <nav aria-label="Instruments" className="mx-auto max-w-6xl px-4 sm:px-6 dark:px-4 dark:sm:px-6">
                <ul className="flex w-max max-w-full gap-2 overflow-x-auto pb-3 [scrollbar-width:none] dark:mx-auto dark:gap-6 dark:py-3 sm:dark:gap-8">
                    {products.map((product) => (
                        <li key={product.id} className="shrink-0">
                            <button
                                onClick={() => setSelectedProduct(product.id)}
                                aria-current={product.id === selectedProduct ? "true" : undefined}
                                className={
                                    "rounded-btn px-4 py-1.5 text-sm transition dark:rounded-none dark:border-b dark:px-0 dark:pb-1 dark:pt-0 dark:font-display dark:font-semibold dark:uppercase dark:tracking-[0.18em] " +
                                    (product.id === selectedProduct
                                        ? "bg-fg font-medium text-canvas dark:border-accent dark:bg-transparent dark:text-accent"
                                        : "border border-line text-soft hover:border-fg hover:text-fg dark:border-transparent dark:hover:text-fg")
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

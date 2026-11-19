import { useNavigate } from "react-router-dom"
import { formatMoney } from "../utils/totals"

// The three promises shown in the strip at the bottom of the page
const promises = [
    ["01", "Listen first", "Every instrument has a recorded sample, so you hear it before you buy it."],
    ["02", "Chosen with care", "A small collection of five. Each one earns its place on the shelf."],
    ["03", "Shipped to your door", "Delivery to the Philippines, the rest of Asia, and the rest of the world."],
]

export default function Home({ products, loading, error, onPick }) {

    const navigate = useNavigate()

    return (
        <main className="relative flex min-h-screen flex-col overflow-hidden">

            {/* Decorative rings, like ripples from a plucked string. aria-hidden = screen readers skip them. */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 hidden lg:block">
                <div className="h-[34rem] w-[34rem] rounded-full border border-line" />
                <div className="absolute inset-12 rounded-full border border-line" />
                <div className="absolute inset-24 rounded-full border border-line" />
            </div>

            {/* Top bar */}
            <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
                <span className="font-display text-2xl font-semibold tracking-tight">Orpheus</span>
                <button
                    onClick={() => navigate("/shop")}
                    className="text-sm font-medium underline-offset-4 hover:text-clay hover:underline"
                >
                    Visit the shop
                </button>
            </div>

            {/* Hero: headline on the left, instrument list on the right (stacked on a phone) */}
            <section className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:py-16">

                <div className="animate-fade-up">
                    <p className="eyebrow">A small shop for instruments</p>
                    <h1 className="mt-5 font-display text-5xl leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
                        Instruments with a <em className="text-clay">voice</em> of their own.
                    </h1>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                        Step inside, take your time, and listen. Find the one that sounds like you,
                        and we will ship it to your door.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        {/* group + group-hover: the arrow slides when the mouse is anywhere on the button */}
                        <button onClick={() => navigate("/shop")} className="btn-primary group px-8">
                            Browse the collection
                            <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">→</span>
                        </button>
                    </div>
                </div>

                {/* The collection card: each row opens that instrument in the shop */}
                <div className="relative animate-fade-up rounded-3xl border border-line bg-sand/70 p-5 [animation-delay:150ms] sm:p-6">
                    <p className="eyebrow">The collection</p>

                    {loading && (
                        <ul className="mt-4 space-y-3" aria-label="Loading instruments">
                            {[0, 1, 2, 3, 4].map((n) => (
                                <li key={n} className="h-14 animate-pulse rounded-xl bg-paper/70" />
                            ))}
                        </ul>
                    )}

                    {error && (
                        <p className="mt-4 text-sm text-muted">The collection could not be loaded right now.</p>
                    )}

                    {!loading && !error && (
                        <ul className="mt-4 space-y-2">
                            {products.map((product) => (
                                <li key={product.id}>
                                    <button
                                        onClick={() => onPick(product.id)}
                                        className="group flex w-full items-center justify-between gap-4 rounded-xl bg-paper/70 px-4 py-3 text-left transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                                    >
                                        <span>
                                            <span className="block font-display text-lg leading-tight">{product.name}</span>
                                            <span className="block text-xs uppercase tracking-widest text-muted">
                                                {product.category.split(" / ")[1] ?? product.category}
                                            </span>
                                        </span>
                                        <span className="flex items-center gap-2 text-sm font-medium tabular-nums">
                                            {formatMoney(product.price)}
                                            <span className="text-clay transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>

            {/* Promises strip */}
            <section className="relative border-t border-line">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
                    {promises.map(([number, title, text]) => (
                        <div key={number}>
                            <p className="font-display text-sm text-clay">{number}</p>
                            <h2 className="mt-1 font-display text-xl">{title}</h2>
                            <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                        </div>
                    ))}
                </div>
                <p className="border-t border-line px-4 py-4 text-center text-xs text-muted">
                    Orpheus is a fictional shop made for a portfolio. Nothing here is for sale.
                </p>
            </section>
        </main>
    )
}

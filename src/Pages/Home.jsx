import { useNavigate } from "react-router-dom"
import { formatMoney } from "../utils/totals"
import ThemeToggle from "../Components/ThemeToggle"

// Roman numerals for numbering the catalogue entries (only visible in dark mode)
const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]

// The three promises shown in the strip at the bottom of the page
const promises = [
    ["Listen first", "Every instrument has a recorded sample, so you hear it before you buy it."],
    ["Chosen with care", "A small collection of five. Each one earns its place on the shelf."],
    ["Shipped to your door", "Delivery to the Philippines, the rest of Asia, and the rest of the world."],
]

// Many classes come in pairs: one for light mode, and a dark: one that only applies in dark mode.
export default function Home({ products, loading, error, onPick }) {

    const navigate = useNavigate()

    return (
        <main className="relative flex min-h-screen flex-col overflow-hidden">

            {/* Decorative rings, like ripples from a plucked string. aria-hidden = screen readers skip them. */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-44 top-10 hidden lg:block">
                <div className="h-[34rem] w-[34rem] rounded-full border border-line dark:border-accent/15" />
                <div className="absolute inset-12 rounded-full border border-line dark:border-accent/15" />
                <div className="absolute inset-24 rounded-full border border-line dark:border-accent/15" />
            </div>

            {/* Top bar. Light: the name on the left. Dark: "Est. MMXXVI" on the left and a line underneath. */}
            <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6 dark:border-b dark:border-accent/30 dark:py-4">
                <span className="font-display text-2xl font-semibold tracking-tight dark:hidden">Orpheus</span>
                <span className="hidden font-display text-xs uppercase tracking-[0.3em] text-soft dark:block">Est. MMXXVI</span>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/shop")}
                        className="text-sm font-medium underline-offset-4 hover:text-accent hover:underline
                                   dark:font-display dark:text-xs dark:font-semibold dark:uppercase dark:tracking-[0.25em] dark:text-accent dark:no-underline dark:hover:text-accent-hover"
                    >
                        Visit the shop
                    </button>
                    <ThemeToggle />
                </div>
            </div>

            {/* Hero: headline on the left, collection on the right (stacked on a phone) */}
            <section className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:py-16 dark:gap-14 dark:py-12">

                <div className="animate-fade-up">
                    <p className="eyebrow">
                        <span className="dark:hidden">A small shop for instruments</span>
                        <span className="hidden dark:inline">Purveyors of fine instruments</span>
                    </p>

                    <h1 className="mt-5 font-display text-5xl leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl dark:mt-6 dark:font-medium dark:leading-[0.98] dark:sm:text-7xl dark:lg:text-8xl">
                        Instruments with a <em className="text-accent">voice</em> of their own.
                    </h1>

                    {/* Ornamental divider: dark mode only */}
                    <div className="my-8 hidden items-center gap-4 text-accent dark:flex" aria-hidden="true">
                        <span className="h-px w-16 bg-accent/50" />
                        <span>✦</span>
                        <span className="h-px w-16 bg-accent/50" />
                    </div>

                    <p className="mt-6 max-w-md text-lg leading-relaxed text-soft dark:mt-0 dark:text-xl dark:text-fg/80">
                        Step inside, take your time, and listen. Find the one that sounds like you,
                        and we will ship it to your door.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 dark:mt-10">
                        {/* group + group-hover: the arrow slides when the mouse is anywhere on the button */}
                        <button onClick={() => navigate("/shop")} className="btn-primary group px-8">
                            Browse the collection
                            <span className="transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true">→</span>
                        </button>
                        <p className="hidden font-display text-lg italic text-soft dark:block">“Ars longa, vita brevis.”</p>
                    </div>
                </div>

                {/* The collection: each row opens that instrument in the shop */}
                <div className="plate animate-fade-up [animation-delay:150ms] sm:p-6 dark:sm:p-7">
                    <p className="eyebrow dark:text-center">
                        <span className="dark:hidden">The collection</span>
                        <span className="hidden dark:inline">The Catalogue</span>
                    </p>

                    {loading && (
                        <ul className="mt-4 space-y-3" aria-label="Loading instruments">
                            {[0, 1, 2, 3, 4].map((n) => (
                                <li key={n} className="h-14 animate-pulse rounded-field bg-canvas/70 dark:h-12 dark:bg-panel-hover/70" />
                            ))}
                        </ul>
                    )}

                    {error && (
                        <p className="mt-4 text-sm text-soft dark:text-center">The collection could not be loaded right now.</p>
                    )}

                    {!loading && !error && (
                        <ul className="mt-4 space-y-2 dark:mt-5 dark:space-y-0 dark:divide-y dark:divide-line">
                            {products.map((product, index) => (
                                <li key={product.id}>
                                    <button
                                        onClick={() => onPick(product.id)}
                                        className="group flex w-full items-center gap-4 rounded-field bg-canvas/70 px-4 py-3 text-left transition duration-200
                                                   hover:-translate-y-0.5 hover:bg-panel-hover hover:shadow-md
                                                   dark:bg-transparent dark:px-2 dark:py-3.5 dark:hover:translate-y-0 dark:hover:shadow-none"
                                    >
                                        {/* Roman numeral: dark mode only */}
                                        <span className="hidden w-8 font-display text-sm text-accent dark:block">{numerals[index]}.</span>

                                        <span className="flex-1">
                                            <span className="block font-display text-lg leading-tight transition-colors dark:text-xl dark:font-semibold dark:group-hover:text-accent-hover">
                                                {product.name}
                                            </span>
                                            <span className="block text-xs uppercase tracking-widest text-soft dark:font-display dark:tracking-[0.2em]">
                                                {product.category.split(" / ")[1] ?? product.category}
                                            </span>
                                        </span>
                                        <span className="flex items-center gap-2 text-sm font-medium tabular-nums dark:text-base dark:font-normal">
                                            {formatMoney(product.price)}
                                            <span className="text-accent transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>

            {/* Promises strip */}
            <section className="relative border-t border-line dark:border-accent/30">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 dark:py-12">
                    {promises.map(([title, text], index) => (
                        <div key={title}>
                            {/* "01" in light mode, "I." in dark mode */}
                            <p className="font-display text-sm text-accent">
                                <span className="dark:hidden">0{index + 1}</span>
                                <span className="hidden dark:inline">{numerals[index]}.</span>
                            </p>
                            <h2 className="mt-1 font-display text-xl dark:text-2xl dark:font-semibold">{title}</h2>
                            <p className="mt-1 text-sm leading-relaxed text-soft dark:text-base">{text}</p>
                        </div>
                    ))}
                </div>
                <p className="border-t border-line px-4 py-4 text-center text-xs text-soft dark:text-sm dark:italic">
                    Orpheus is a fictional shop made for a portfolio. Nothing here is for sale.
                </p>
            </section>
        </main>
    )
}

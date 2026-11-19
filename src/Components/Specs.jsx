import { useState, useEffect } from 'react'
import { formatMoney, shippingRates } from '../utils/totals'

// The cheapest shipping rate, worked out from the same table the checkout uses
const cheapestShipping = Math.min(...Object.values(shippingRates))

// Many classes below come in pairs: one for light mode, and a dark: one that only applies in dark mode.
export default function Specs({ currentProduct, onAddToCart }) {

    // After clicking, the button says "Added" for a moment so you know it worked
    const [added, setAdded] = useState(false)

    useEffect(() => {
        if (!added) return
        const timer = setTimeout(() => setAdded(false), 1500)
        return () => clearTimeout(timer)
    }, [added])

    const handleAdd = () => {
        onAddToCart(currentProduct)
        setAdded(true)
    }

    // specs could be empty in the database, so fall back to an empty list
    const specs = currentProduct.specs ?? []

    return (
        <article className="animate-fade-up">
            <p className="eyebrow">{currentProduct.category}</p>

            <h1 className="mt-3 font-display text-5xl leading-none tracking-tight sm:text-6xl dark:font-semibold sm:dark:text-7xl">
                {currentProduct.name}
            </h1>

            <p className="mt-4 font-display text-3xl tabular-nums dark:text-4xl dark:font-medium dark:text-accent">
                {formatMoney(currentProduct.price)}
            </p>

            {/* In dark mode the first letter becomes a big "drop cap", like an old book.
                first-letter: styles only the first letter. Floating it left lets the text wrap around it. */}
            <p className="mt-6 flow-root max-w-lg text-lg leading-relaxed text-soft
                          dark:text-xl dark:text-fg/85
                          dark:first-letter:float-left dark:first-letter:mr-3 dark:first-letter:font-display dark:first-letter:text-7xl
                          dark:first-letter:font-semibold dark:first-letter:leading-[0.8] dark:first-letter:text-accent">
                {currentProduct.description}
            </p>

            {/* A "description list": each spec is a label (dt) and a value (dd).
                Dark mode adds a dotted line between them (a "leader", like in a table of contents). */}
            {specs.length > 0 && (
                <dl className="mt-8 divide-y divide-line border-y border-line dark:divide-y-0 dark:border-accent/40 dark:py-2">
                    {specs.map((spec) => (
                        <div key={spec.label} className="flex items-baseline gap-3 py-3 text-sm dark:py-2 dark:text-base">
                            <dt className="w-32 shrink-0 text-soft sm:w-40 dark:w-auto dark:shrink dark:font-display dark:text-sm dark:font-semibold dark:uppercase dark:tracking-[0.2em]">
                                {spec.label}
                            </dt>
                            <span aria-hidden="true" className="hidden flex-1 border-b border-dotted border-accent/40 dark:block" />
                            <dd className="flex-1 font-medium dark:flex-none dark:text-right dark:font-normal">{spec.value}</dd>
                        </div>
                    ))}
                </dl>
            )}

            <button
                type="button"
                onClick={handleAdd}
                className="btn-primary mt-8 w-full sm:w-auto sm:px-12 dark:sm:px-14"
            >
                {added ? "Added to cart" : "Add to cart"}
            </button>

            <p className="mt-3 text-sm text-soft dark:mt-4 dark:italic">
                Ships worldwide, from {formatMoney(cheapestShipping)}.
            </p>
        </article>
    )
}

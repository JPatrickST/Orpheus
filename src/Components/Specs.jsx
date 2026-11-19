import { useState, useEffect } from 'react'
import { formatMoney, shippingRates } from '../utils/totals'

// The cheapest shipping rate, worked out from the same table the checkout uses
const cheapestShipping = Math.min(...Object.values(shippingRates))

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

            <h1 className="mt-3 font-display text-5xl leading-none tracking-tight sm:text-6xl">
                {currentProduct.name}
            </h1>

            <p className="mt-4 font-display text-3xl tabular-nums">
                {formatMoney(currentProduct.price)}
            </p>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                {currentProduct.description}
            </p>

            {/* A "description list": each spec is a label (dt) and a value (dd) on one row */}
            {specs.length > 0 && (
                <dl className="mt-8 divide-y divide-line border-y border-line">
                    {specs.map((spec) => (
                        <div key={spec.label} className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm sm:grid-cols-[10rem_1fr]">
                            <dt className="text-muted">{spec.label}</dt>
                            <dd className="font-medium">{spec.value}</dd>
                        </div>
                    ))}
                </dl>
            )}

            <button
                type="button"
                onClick={handleAdd}
                className="btn-primary mt-8 w-full sm:w-auto sm:px-12"
            >
                {added ? "Added to cart" : "Add to cart"}
            </button>

            <p className="mt-3 text-sm text-muted">
                Ships worldwide, from {formatMoney(cheapestShipping)}.
            </p>
        </article>
    )
}

import { useState } from "react"

// The big picture of the instrument. Your pictures are transparent PNGs, so whatever is behind shows through.
// Light mode: a soft stage with a pale disc. Dark mode: a framed plate lit by a warm lamp.
export default function ProductImage({ product }) {

    // If the link is empty or the picture fails to load, we show a placeholder instead of a broken image
    const [failed, setFailed] = useState(false)
    const showImage = product.image_url && !failed

    return (
        <div className="relative aspect-square overflow-hidden rounded-card bg-panel sm:aspect-[4/3] lg:aspect-[6/5] dark:border dark:border-accent/40">

            {/* LIGHT ONLY: a pale disc and a ring behind the instrument */}
            <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-canvas/70 dark:hidden" />
            <div aria-hidden="true" className="absolute inset-[4%] rounded-full border border-line dark:hidden" />

            {/* DARK ONLY: a glow like a lamp on the desk, and a second thin frame line */}
            <div
                aria-hidden="true"
                className="absolute inset-0 hidden bg-[radial-gradient(circle_at_50%_45%,rgba(214,179,110,0.38),rgba(184,146,79,0.1)_45%,transparent_70%)] dark:block"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-2 hidden border border-accent/20 dark:block" />

            {showImage ? (
                <img
                    src={product.image_url}
                    alt={product.name}
                    onError={() => setFailed(true)}
                    className="relative h-full w-full animate-fade-up object-contain p-[10%]
                               drop-shadow-[0_18px_22px_rgba(30,40,34,0.28)] dark:drop-shadow-[0_0_24px_rgba(214,179,110,0.25)]"
                />
            ) : (
                <div className="relative grid h-full w-full place-items-center">
                    <div className="text-center">
                        <p className="font-display text-8xl text-fg/20 dark:text-9xl dark:text-accent/30">{product.name.charAt(0)}</p>
                        <p className="text-xs uppercase tracking-widest text-soft dark:font-display dark:tracking-[0.3em]">
                            <span className="dark:hidden">Photo coming soon</span>
                            <span className="hidden dark:inline">Plate to follow</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Category label: a pill in light mode (bottom left), plain text in dark mode (bottom right) */}
            <p className="absolute bottom-4 left-4 rounded-btn bg-canvas/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-soft
                          dark:bottom-4 dark:left-auto dark:right-4 dark:bg-transparent dark:p-0 dark:font-display dark:font-normal dark:tracking-[0.2em]">
                {product.category}
            </p>
            <p className="absolute left-4 top-4 hidden font-display text-xs uppercase tracking-[0.3em] text-accent dark:block">Plate I</p>
        </div>
    )
}

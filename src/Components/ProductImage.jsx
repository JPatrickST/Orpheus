import { useState } from "react"

// The big picture of the instrument, sitting on a soft "stage".
// Your pictures are transparent PNGs, so the stage colour shows through behind the instrument.
export default function ProductImage({ product }) {

    // If the link is empty or the picture fails to load, we show a placeholder instead of a broken image
    const [failed, setFailed] = useState(false)
    const showImage = product.image_url && !failed

    return (
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-sand sm:aspect-[4/3] lg:aspect-[6/5]">

            {/* A pale disc and a ring behind the instrument, so it feels lit */}
            <div aria-hidden="true" className="absolute inset-[10%] rounded-full bg-paper/70" />
            <div aria-hidden="true" className="absolute inset-[4%] rounded-full border border-line" />

            {showImage ? (
                <img
                    src={product.image_url}
                    alt={product.name}
                    onError={() => setFailed(true)}
                    className="relative h-full w-full animate-fade-up object-contain p-[10%] drop-shadow-[0_18px_22px_rgba(30,40,34,0.28)]"
                />
            ) : (
                <div className="relative grid h-full w-full place-items-center">
                    <div className="text-center">
                        <p className="font-display text-8xl text-ink/20">{product.name.charAt(0)}</p>
                        <p className="text-xs uppercase tracking-widest text-muted">Photo coming soon</p>
                    </div>
                </div>
            )}

            {/* Category tag in the corner */}
            <p className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted">
                {product.category}
            </p>
        </div>
    )
}

import Specs from '../Components/Specs'
import ProductImage from '../Components/ProductImage'
import SoundPlayer from '../Components/SoundPlayer'
import PageMessage from '../Components/PageMessage'

// The shop page content: the picture and sound on the left, the details on the right.
// The cart and checkout live in CartDrawer, so this page is only about the instrument.
export default function Body({ currentProduct, onAddToCart }) {

    // If the table is empty there is nothing to show
    if (!currentProduct) {
        return <PageMessage title="No instruments yet" text="Add some rows to the products table in Supabase." />
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">

            {/* One column on a phone, two columns from the "lg" breakpoint (1024px) up */}
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">

                {/* lg:sticky keeps the picture on screen while you read a long spec list */}
                <div className="space-y-5 lg:sticky lg:top-36 lg:self-start">
                    {/* key={id} makes React start fresh when you switch instruments (new fade-in, player resets) */}
                    <ProductImage key={currentProduct.id} product={currentProduct} />
                    <SoundPlayer key={`sound-${currentProduct.id}`} src={currentProduct.audio_url} name={currentProduct.name} />
                </div>

                <Specs key={`specs-${currentProduct.id}`} currentProduct={currentProduct} onAddToCart={onAddToCart} />
            </div>

            <p className="mt-16 border-t border-line pt-6 text-center text-xs text-muted">
                Orpheus is a fictional shop made for a portfolio. Nothing here is for sale.
            </p>
        </main>
    )
}

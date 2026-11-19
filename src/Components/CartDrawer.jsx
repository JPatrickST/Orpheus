import { useState, useEffect, useRef } from 'react'
import CartList from './CartList'
import PaymentDetails from './PaymentDetails'
import { formatMoney, getSubtotal, getItemCount, shippingRates } from '../utils/totals'

const emptyDetails = {
    fullName: '',
    email: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    shippingAddress: 'Philippines',
    paymentMethod: 'Credit Card',
}

// The panel that slides in from the right. It has three steps, kept in one piece of state:
//   'cart'      -> the items, with quantity buttons
//   'checkout'  -> the Buy and Ship form and the order summary
//   'done'      -> the "thank you" screen
export default function CartDrawer({ open, onClose, cart, onChangeQuantity, onRemove, onOrderPlaced }) {

    const [step, setStep] = useState('cart')
    const [details, setDetails] = useState(emptyDetails)
    const [order, setOrder] = useState(null)

    // Worked out on every render from the cart, never stored
    const subtotal = getSubtotal(cart)
    const shipping = shippingRates[details.shippingAddress]
    const total = subtotal + shipping

    const panelRef = useRef(null)

    // While the drawer is open: stop the page behind it from scrolling, and move the keyboard focus into it
    useEffect(() => {
        if (!open) return
        document.body.style.overflow = 'hidden'
        panelRef.current?.focus()
        return () => { document.body.style.overflow = '' }
    }, [open])

    // Each time the step changes, put the focus back on the panel. (The button you just clicked
    // may have disappeared, and without this the Escape key would stop working.)
    useEffect(() => {
        if (open) panelRef.current?.focus()
    }, [step, open])

    // Close the drawer, then (after the slide-out animation) go back to the first step
    const close = () => {
        onClose()
        setTimeout(() => setStep('cart'), 300)
    }

    const handleChange = (event) => {
        setDetails({ ...details, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        // Save a snapshot BEFORE emptying the cart, because the thank-you screen needs these numbers
        setOrder({
            name: details.fullName,
            itemCount: getItemCount(cart),
            total,
        })
        setDetails(emptyDetails)
        setStep('done')
        onOrderPlaced()
    }

    const titles = { cart: 'Your cart', checkout: 'Buy and ship', done: 'Order placed' }

    return (
        <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>

            {/* The dimmed, blurred backdrop. Clicking it closes the drawer. */}
            <div
                onClick={close}
                className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* The panel itself. translate-x-full pushes it off-screen to the right; translate-x-0 slides it in. */}
            <aside
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
                tabIndex={-1}
                onKeyDown={(event) => { if (event.key === 'Escape') close() }}
                className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-canvas shadow-2xl dark:border-accent/40 dark:bg-panel outline-none transition-[transform,visibility] duration-300 ${open ? 'visible translate-x-0' : 'invisible translate-x-full'}`}
            >

                {/* Top: the title and the close button */}
                <div className="flex items-center justify-between border-b border-line px-5 py-4 dark:border-accent/30">
                    <h2 className="font-display text-2xl dark:text-3xl dark:font-semibold">{titles[step]}</h2>
                    <button
                        onClick={close}
                        aria-label="Close cart"
                        className="grid h-9 w-9 place-items-center rounded-btn text-xl transition hover:bg-panel-hover dark:text-2xl dark:text-accent"
                    >
                        ×
                    </button>
                </div>

                {/* Middle: scrolls on its own if the content is tall */}
                <div className="flex-1 overflow-y-auto px-5 py-2">

                    {step === 'cart' && (
                        cart.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
                                <p className="font-display text-2xl dark:text-3xl dark:font-semibold">Your cart is empty.</p>
                                <p className="max-w-xs text-soft dark:text-lg dark:italic">
                                    Choose an instrument, listen to its sample, and place it here.
                                </p>
                                <button className="btn-ghost mt-2" onClick={close}>Keep browsing</button>
                            </div>
                        ) : (
                            <CartList cart={cart} onChangeQuantity={onChangeQuantity} onRemove={onRemove} />
                        )
                    )}

                    {step === 'checkout' && (
                        <div className="py-4">
                            {/* The form has an id so the Place order button (in the footer, outside the form) can submit it */}
                            <form id="checkout-form" onSubmit={handleSubmit}>
                                <PaymentDetails details={details} onChange={handleChange} />
                            </form>

                            {/* Order summary */}
                            <dl className="mt-8 space-y-2 rounded-card bg-panel p-4 text-sm dark:rounded-none dark:border dark:border-line dark:bg-canvas/50 dark:text-base">
                                <div className="flex justify-between">
                                    <dt className="text-soft">Subtotal</dt>
                                    <dd className="tabular-nums">{formatMoney(subtotal)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-soft">Shipping ({details.shippingAddress})</dt>
                                    <dd className="tabular-nums">{formatMoney(shipping)}</dd>
                                </div>
                                <div className="flex justify-between border-t border-line pt-2 text-base font-bold dark:border-accent/40 dark:text-lg dark:font-semibold">
                                    <dt>Total</dt>
                                    <dd className="tabular-nums">{formatMoney(total)}</dd>
                                </div>
                            </dl>
                        </div>
                    )}

                    {step === 'done' && order && (
                        <div className="flex h-full flex-col items-center justify-center gap-3 py-16 text-center">
                            <div className="grid h-14 w-14 place-items-center rounded-full bg-accent text-2xl text-white dark:border dark:border-accent dark:bg-transparent dark:text-accent" aria-hidden="true">✓</div>
                            <p className="font-display text-3xl dark:text-4xl dark:font-semibold">Thank you, {order.name}.</p>
                            <p className="text-soft">
                                {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'} · {formatMoney(order.total)}
                            </p>
                            <p className="max-w-xs text-sm text-soft dark:text-base dark:italic">
                                This is a demo, so nothing was charged and nothing will be shipped.
                            </p>
                            <button className="btn-primary mt-4" onClick={close}>Continue shopping</button>
                        </div>
                    )}
                </div>

                {/* Bottom: the main action for the current step */}
                {step === 'cart' && cart.length > 0 && (
                    <div className="border-t border-line px-5 py-4 dark:border-accent/30">
                        <div className="mb-3 flex justify-between font-bold dark:font-display dark:text-lg dark:font-semibold dark:uppercase dark:tracking-[0.15em]">
                            <span>Subtotal</span>
                            <span className="tabular-nums">{formatMoney(subtotal)}</span>
                        </div>
                        <button className="btn-primary w-full" onClick={() => setStep('checkout')}>
                            Checkout
                        </button>
                        <p className="mt-3 text-center text-xs text-soft dark:text-sm dark:italic">Shipping is added at checkout.</p>
                    </div>
                )}

                {step === 'checkout' && (
                    <div className="space-y-2 border-t border-line px-5 py-4 dark:border-accent/30">
                        <button type="submit" form="checkout-form" className="btn-primary w-full">
                            Place order · {formatMoney(total)}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep('cart')}
                            className="w-full text-sm text-soft underline underline-offset-4 hover:text-accent dark:italic"
                        >
                            Back to cart
                        </button>
                    </div>
                )}
            </aside>
        </div>
    )
}

// The Buy and Ship fields. This component keeps no state of its own:
// `details` is one object holding every field, and `onChange` updates it. Both live in CartDrawer,
// because the order summary also needs to know the shipping region ("lifting state up").
export default function PaymentDetails({ details, onChange }) {
    return (
        <div className="space-y-8">

            <fieldset>
                <legend className="eyebrow">Contact</legend>
                <div className="mt-3 space-y-4">
                    <div>
                        <label htmlFor="fullName" className="field-label">Full name</label>
                        <input
                            type="text" id="fullName" name="fullName"
                            value={details.fullName} onChange={onChange}
                            required autoComplete="name" placeholder="Juan Dela Cruz"
                            className="field"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="field-label">Email address</label>
                        <input
                            type="email" id="email" name="email"
                            value={details.email} onChange={onChange}
                            required autoComplete="email" placeholder="juan@example.com"
                            className="field"
                        />
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend className="eyebrow">Ship to</legend>
                <div className="mt-3 space-y-4">
                    <div>
                        <label htmlFor="streetAddress" className="field-label">Street address</label>
                        <input
                            type="text" id="streetAddress" name="streetAddress"
                            value={details.streetAddress} onChange={onChange}
                            required autoComplete="street-address" placeholder="123 Main Street"
                            className="field"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="field-label">City</label>
                            <input
                                type="text" id="city" name="city"
                                value={details.city} onChange={onChange}
                                required autoComplete="address-level2" placeholder="Manila"
                                className="field"
                            />
                        </div>
                        <div>
                            <label htmlFor="postalCode" className="field-label">Postal code</label>
                            <input
                                type="text" id="postalCode" name="postalCode"
                                value={details.postalCode} onChange={onChange}
                                required autoComplete="postal-code" placeholder="1000"
                                className="field"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="shippingAddress" className="field-label">Region</label>
                        <select
                            id="shippingAddress" name="shippingAddress"
                            value={details.shippingAddress} onChange={onChange}
                            className="field"
                        >
                            <option value="Philippines">Philippines</option>
                            <option value="Rest of Asia">Rest of Asia</option>
                            <option value="Rest of World">Rest of World</option>
                        </select>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend className="eyebrow">Payment</legend>
                <div className="mt-3">
                    <label htmlFor="paymentMethod" className="field-label">Method</label>
                    <select
                        id="paymentMethod" name="paymentMethod"
                        value={details.paymentMethod} onChange={onChange}
                        className="field"
                    >
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                    <p className="mt-2 text-xs text-muted">This is a demo. No payment is taken.</p>
                </div>
            </fieldset>
        </div>
    )
}

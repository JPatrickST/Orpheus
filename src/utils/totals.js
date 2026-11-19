// Shipping cost by region. The keys must match the <option value="..."> in PaymentDetails.
export const shippingRates = {
    'Philippines': 12,
    'Rest of Asia': 35,
    'Rest of World': 60,
}

// Turns 1000 into "$ 1,000"
export function formatMoney(amount) {
    return `$ ${amount.toLocaleString()}`
}

// Both of these are worked out from the cart every time, never stored in state.
export function getSubtotal(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function getItemCount(cart) {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
}

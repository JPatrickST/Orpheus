# Orpheus

A front-end storefront for a fictional musical instrument shop, built as a portfolio project while learning React and Tailwind CSS. It is a demo: there is no backend, no real payment, and nothing is saved or sent anywhere. The project is still in progress, and this README describes what the code does today.

## What works today

- **Welcome page** (`/`) with a button that opens the shop.
- **Shop page** (`/shop`) with the header, instrument details, cart, and buy form together on one screen. Routing is done with React Router.
- **Five instruments** stored as an array of objects in `src/Data/products.js`: HP Violin, Solace Classical Guitar, Lumen Kalimba, Sora Bamboo Flute, and Nocturne Handpan.
- **Instrument switching** from the header. Choosing an instrument updates the details panel (category, name, price, description, spec list).
- **Cart** kept as a `useState` array of objects (`id`, `name`, `price`, `quantity`):
  - Add to cart; adding the same instrument again increases its quantity instead of adding a second row.
  - Each row shows name, quantity, line total, and a Remove button.
  - A running subtotal, and an item count in the header (`Cart: 3`).
  - An empty-cart message.
- **Buy now** opens the Buy and Ship form only when the cart has items. The form closes if the last item is removed or the user cancels.
- **Buy and Ship form** with controlled inputs (name, email, street address, city, postal code, ship-to region, payment method). Required fields are checked by the browser before submitting.
- **Order summary** with subtotal, shipping by region (Philippines $12, Rest of Asia $35, Rest of World $60), and a total that updates when the region changes.
- **Order confirmation** shown as a blurred overlay. It closes after 5 seconds or when clicked, and the cart is emptied.
- Clicking the **Orpheus** title in the header returns to the welcome page.

## Not built yet

- The **Picture** and **Sound Sample** boxes are placeholders.
- The **welcome page** is a plain placeholder and is not styled to match the shop.
- Quantity can only be changed by adding more from the details panel; there are no `+` / `-` buttons in the cart.
- The shop layout does not adapt to phone widths (the two columns stay side by side).
- No Supabase connection. Products come from the local data file.

## Stack

| Area | Tools |
| --- | --- |
| Framework | React 19, Vite 8, JavaScript/JSX |
| Routing | React Router (`react-router-dom` 7) |
| Styling | Tailwind CSS 3.4 with PostCSS and Autoprefixer |
| Tooling | ESLint 10 with `eslint-plugin-react-hooks`, React Compiler (via `babel-plugin-react-compiler`) |
| Planned | Supabase (instrument data), audio samples |

## Structure

```text
Orpheus-main/
├── public/                    # Favicon and icons
├── src/
│   ├── assets/                # Starter assets from the Vite template
│   ├── Components/
│   │   ├── Home.jsx           # Welcome page
│   │   ├── Header.jsx         # Title, instrument buttons, cart count
│   │   ├── Body.jsx           # Shop layout, buying flow, order overlay
│   │   ├── Specs.jsx          # Selected instrument details + Add to cart
│   │   ├── Cart.jsx           # Cart heading, subtotal, Buy now
│   │   ├── CartList.jsx       # One aligned row per cart item
│   │   └── PaymentDetails.jsx # Buy and Ship form fields
│   ├── CSS/
│   │   ├── index.css          # Tailwind directives
│   │   └── App.css
│   ├── Data/products.js       # The five instruments
│   ├── utils/totals.js        # formatMoney helper
│   ├── App.jsx                # Routes and the cart state
│   ├── main.jsx               # Renders the app inside BrowserRouter
│   └── output.css             # Leftover stylesheet (see Notes)
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── eslint.config.js
└── package.json
```

### Routes

| Path | Shows |
| --- | --- |
| `/` | `Home` |
| `/shop` | `Header` and `Body` together |

`BrowserRouter` is set up once, in `main.jsx`. It must not be added a second time in `App.jsx`.

### How the state is organised

| State | Lives in | Purpose |
| --- | --- | --- |
| `cart` | `App` | Array of `{ id, name, price, quantity }` objects; changed only through `handleAddToCart`, `handleRemove`, and `handleOrderPlaced` |
| `selectedProduct` | `App` | Id of the instrument on screen; `currentProduct` is looked up from it |
| `buying` | `Body` | Whether the Buy and Ship form is visible |
| `details` | `Body` | One object holding every form field; shared with the order summary |
| `order` | `Body` | Snapshot of the last order, used by the confirmation overlay |

Values that can be worked out from state (subtotal, shipping, total, cart count) are calculated on each render rather than stored.

## Prerequisites and installation

Use **Node.js 20.19 or newer** (or 22.12+), as required by Vite 8, and npm.

```sh
npm install
```

## Development

```sh
npm run dev
```

Open the URL Vite prints (normally `http://localhost:5173`). Other commands:

```sh
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint
```

## Adding an instrument

Open `src/Data/products.js`, copy one object in the array, give it a new unique `id`, and change the other values. It appears in the header automatically. Keep the same shape:

```js
{
    id: "cello",
    category: "Strings / Cello",
    name: "Example Cello",
    price: 2000,
    description: "...",
    specs: [{ label: "Size", value: "4/4" }],
}
```

## Deployment note

The app uses client-side routing. A static host must send every path to `index.html`, or refreshing on `/shop` returns a 404. Vercel and Netlify need a rewrite rule for this; the Vite dev server handles it automatically.

## Notes

- `index.html` links `./output.css`, which does not exist at build time (Vite prints a warning). The line can be removed.
- `src/CSS/App.css` is not imported anywhere.

## Status check

Checked on 31 October 2026 with Node 22.22.0 and npm 10.9.4:

- `npm run lint` and `npm run build` both pass with no errors.
- In a browser, the full flow worked with no console errors: welcome page, shop, instrument switching, add to cart (quantity merging), remove, Buy now, shipping total by region, required-field validation, order overlay with automatic close, and the cart emptying after an order.

## Next steps

1. Add an image and an audio sample per instrument (`image` and `audio` fields in `products.js`) and show them in the Picture and Sound Sample boxes.
2. Style the welcome page to match the shop, with a hover effect on its button.
3. Make the layout stack on phone widths (`flex-col md:flex-row`).
4. Add `+` / `-` quantity buttons in the cart.
5. Remove the `output.css` link, then deploy with a rewrite rule for `/shop`.
6. Move the product data to Supabase.

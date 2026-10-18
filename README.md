# Orpheus

A front-end storefront for a fictional musical instrument shop, built as a portfolio project while learning React and Tailwind CSS. It is a demo: there is no backend, no real checkout, and nothing is saved or sent anywhere. The project is still in progress, and this README describes what the code does today.

## What works today

- **Welcome page** with a button that opens the shop. Page switching is done with a `useState` value (`'home'` or `'shop'`), not a router.
- **Five instruments** stored as an array of objects in `src/Data/products.js`: HP Violin, Solace Classical Guitar, Lumen Kalimba, Sora Bamboo Flute, and Nocturne Handpan.
- **Instrument switching** from the header. Choosing an instrument updates the specs panel (category, name, price, description, spec list).
- **Buy and Ship form** as its own component (`PaymentDetails`). The fields are visible but not yet connected to state.
- Clicking the **Orpheus** title in the header returns to the welcome page.

## Not built yet

- The **Picture** and **Sound Sample** boxes are placeholders.
- The **cart** exists as state in `App.jsx`, but there is no add-to-cart, quantity, or total logic yet.
- The **buy form** has no state, validation, or submit handling, and the shipping and payment selects are not controlled.
- No Supabase connection. Products come from the local data file.

## Known issue

`src/Components/Specs.jsx` calls `formatMoney(...)`, but that function is not defined or imported anywhere. The home page loads, but the shop page fails to render (blank screen, console error `formatMoney is not defined`) until it is added. Fix: create `src/utils/formatMoney.js` with

```js
export function formatMoney(amount) {
    return `$ ${amount.toLocaleString()}`
}
```

and add `import { formatMoney } from "../utils/formatMoney.js"` at the top of `Specs.jsx`.

## Stack

| Area | Tools |
| --- | --- |
| Framework | React 19, Vite 8, JavaScript/JSX |
| Styling | Tailwind CSS 3.4 with PostCSS and Autoprefixer |
| Tooling | ESLint 10 with `eslint-plugin-react-hooks`, React Compiler (via `babel-plugin-react-compiler`) |
| Planned | Supabase (instrument data), Web Audio for sound samples |

## Structure

```text
Orpheus-main/
├── public/                    # Favicon and icons
├── src/
│   ├── assets/                # Starter assets from the Vite template
│   ├── Components/
│   │   ├── Home.jsx           # Welcome page
│   │   ├── Header.jsx         # Title and instrument buttons
│   │   ├── Body.jsx           # Two-column shop layout
│   │   ├── Specs.jsx          # Selected instrument details
│   │   └── PaymentDetails.jsx # Buy and Ship form
│   ├── CSS/
│   │   ├── index.css          # Tailwind directives
│   │   └── App.css
│   ├── Data/products.js       # The five instruments
│   ├── App.jsx                # Page, cart, and selected-instrument state
│   ├── main.jsx
│   └── output.css             # Generated stylesheet (see Notes)
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── eslint.config.js
└── package.json
```

### How the pieces fit

`App.jsx` holds the state and passes it down as props:

| State | Purpose |
| --- | --- |
| `page` | `'home'` or `'shop'`; decides which screen is shown |
| `selectedProduct` | id of the instrument on screen; `currentProduct` is looked up from it |
| `cart` | array of item objects; currently one sample item |

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

## Notes

- `index.html` links `./output.css`, which duplicates what Vite already builds from `src/CSS/index.css`, and the path does not resolve (404 in the browser console). The line can be removed.
- `src/CSS/App.css` is not imported anywhere.

## Status check

Checked on 18 October 2026 with Node 22.22.0 and npm 10.9.4:

- `npm run build` succeeds, but the shop page crashes at runtime because of the `formatMoney` issue above.
- `npm run lint` reports 5 errors: the missing `formatMoney`, plus unused variables (`setCart` in `App.jsx`, and `useEffect`, `paymentDetails`, `setPaymentDetails` in `PaymentDetails.jsx`). Only the first affects behavior; the others will clear once the cart and form state are used.

## Next steps

1. Define `formatMoney` so the shop page renders.
2. Add add-to-cart, quantity, and a combined total, using immutable updates on the `cart` array.
3. Connect the Buy and Ship form to state and show it only after "Buy now".
4. Fill the Picture and Sound Sample boxes.
5. Move the product data to Supabase.

# MiniStore

A small e-commerce practice project: a **Next.js** storefront backed by a **Laravel** REST API.
I built it to practise the full-stack flow end to end: database, API, server-rendered pages,
client-side state and a shopping cart.

## Features

- Product catalogue with live search and category filter
- Product detail pages (dynamic routes, per-page titles, proper 404 page)
- Shopping cart: add, change quantity (capped at stock), remove, clear, running total
- Cart persists across page reloads (`localStorage`)
- REST API with validation, filtering and API resources
- Automated API tests (PHPUnit)
- The frontend falls back to built-in sample data if the API isn't running

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), React, plain CSS |
| Backend | PHP, Laravel, Eloquent ORM |
| Database | SQLite by default (MySQL works by changing `.env`) |

## Project structure

```
frontend/                 Next.js app
  src/app/                Routes: / , /products/[id], /cart, /api/health
  src/components/         Header, ProductGrid, ProductCard, AddToCartButton
  src/context/            CartContext (Context + useReducer + localStorage)
  src/lib/                API client, formatting helpers, sample data
backend-overlay/          Laravel code (model, migration, controller, routes, seeder, tests)
```

## Running it

You need Node.js 20+; for the backend also PHP 8.3+ and Composer.

**Frontend only** (uses the sample data):

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

**With the Laravel backend:** follow [`backend-overlay/README.md`](backend-overlay/README.md) to
create and start the API on port 8000, then run the frontend as above. The banner about sample
data disappears once the API is reachable. If the API runs on a different address, copy
`frontend/.env.example` to `frontend/.env.local` and edit `API_URL`.

## API

| Method | URL | Description |
|---|---|---|
| GET | `/api/products` | List products (`?search=`, `?category=`) |
| GET | `/api/products/{id}` | Single product |
| POST | `/api/products` | Create a product |
| PUT/PATCH | `/api/products/{id}` | Update a product |
| DELETE | `/api/products/{id}` | Delete a product |

## Known limitations / next steps

- No user accounts or authentication yet (planned: Laravel Sanctum, with write routes protected)
- Checkout and orders are not implemented; the cart lives in the browser only
- No pagination on the product list
- No product images (category icons are used instead)
- No frontend tests yet

## Screenshots

_Add a screenshot of the shop and the cart here after running the app._

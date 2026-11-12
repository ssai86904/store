import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";

// Server Component: `async` + `await` directly in the component.
// Data is fetched on the server, so the browser receives ready-made HTML (good for SEO).
export default async function HomePage() {
  const { products, source } = await getProducts();

  return (
    <>
      <section className="hero">
        <h1>Everyday essentials, delivered.</h1>
        <p className="muted">Browse the catalogue, search, and build your cart.</p>
      </section>

      {source === "sample" && (
        <p className="notice">
          Showing built-in sample data because the Laravel API is not reachable. Start the backend
          with <code>php artisan serve</code> to load products from the database.
        </p>
      )}

      <ProductGrid products={products} />
    </>
  );
}

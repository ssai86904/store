"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

// A Client Component: it needs useState for the search box and category filter.
// The products arrive as a prop from the Server Component (app/page.js).
export default function ProductGrid({ products }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

  // Derived data: filtered list is computed from state, not stored in state.
  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(term)
    );
  }, [products, search, category]);

  return (
    <section>
      <div className="filters">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <p className="muted empty">No products match your search.</p>
      ) : (
        <div className="grid">
          {/* `key` lets React track each item between renders */}
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

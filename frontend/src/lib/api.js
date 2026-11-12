// Talks to the Laravel API. Only used from Server Components, so it runs on the
// Next.js server (not in the browser).
//
// API_URL has no NEXT_PUBLIC_ prefix on purpose: variables with that prefix are
// bundled into browser JavaScript, and this one only needs to exist on the server.

import { connection } from "next/server";
import { sampleProducts } from "./sampleProducts";

const API_URL = process.env.API_URL || "http://localhost:8000/api";

function apiFetch(path) {
  return fetch(`${API_URL}${path}`, {
    // "no-store" = never cache, so every request renders fresh data (SSR).
    // Swap for `next: { revalidate: 60 }` to get ISR (cached, refreshed every 60s).
    cache: "no-store",
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(3000),
  });
}

export async function getProducts() {
  // Opt this request into dynamic (per-request) rendering. Called outside try/catch
  // so Next.js can use it as a signal without our fallback logic swallowing it.
  await connection();

  try {
    const res = await apiFetch("/products");
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    const json = await res.json(); // Laravel API Resources wrap lists in { data: [...] }
    return { products: json.data, source: "api" };
  } catch (error) {
    console.warn("[api] Laravel API unavailable, using sample data:", error.message);
    return { products: sampleProducts, source: "sample" };
  }
}

export async function getProduct(id) {
  await connection();

  try {
    const res = await apiFetch(`/products/${encodeURIComponent(id)}`);
    if (res.status === 404) return { product: null, source: "api" };
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    const json = await res.json();
    return { product: json.data, source: "api" };
  } catch (error) {
    console.warn("[api] Laravel API unavailable, using sample data:", error.message);
    const product = sampleProducts.find((p) => String(p.id) === String(id)) ?? null;
    return { product, source: "sample" };
  }
}

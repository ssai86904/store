"use client";

// Global cart state shared by the header, product cards and cart page.
//   Context     -> makes the cart available anywhere without prop drilling
//   useReducer  -> all cart changes go through one function (cartReducer)
//   useEffect   -> loads the cart from localStorage on mount and saves it on change

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "mini-store-cart";

function cartReducer(items, action) {
  switch (action.type) {
    case "hydrate":
      return action.items;

    case "add": {
      const { id, name, price, stock, category } = action.product;
      const existing = items.find((item) => item.id === id);
      if (existing) {
        // Never allow more than the available stock.
        return items.map((item) =>
          item.id === id ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) } : item
        );
      }
      return [...items, { id, name, price, stock, category, quantity: 1 }];
    }

    case "setQuantity": {
      if (action.quantity <= 0) return items.filter((item) => item.id !== action.id);
      return items.map((item) =>
        item.id === action.id ? { ...item, quantity: Math.min(action.quantity, item.stock) } : item
      );
    }

    case "remove":
      return items.filter((item) => item.id !== action.id);

    case "clear":
      return [];

    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  // The server renders an empty cart, so we only read localStorage after mounting.
  // Reading it during the first render would cause a hydration mismatch.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(saved)) dispatch({ type: "hydrate", items: saved });
    } catch {
      // Corrupt or unavailable storage: start with an empty cart.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return; // don't overwrite saved data with the initial empty array
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or blocked: the cart still works for this session.
    }
  }, [items, hydrated]);

  // useMemo: the context value only changes when the cart changes,
  // so consumers don't re-render needlessly.
  const value = useMemo(
    () => ({
      items,
      hydrated,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addItem: (product) => dispatch({ type: "add", product }),
      setQuantity: (id, quantity) => dispatch({ type: "setQuantity", id, quantity }),
      removeItem: (id) => dispatch({ type: "remove", id }),
      clearCart: () => dispatch({ type: "clear" }),
    }),
    [items, hydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}

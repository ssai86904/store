"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  // Reset the "Added" label after 1.2s. The cleanup function cancels the timer
  // if the component unmounts or the button is clicked again first.
  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 1200);
    return () => clearTimeout(timer);
  }, [justAdded]);

  const outOfStock = product.stock <= 0;

  function handleClick() {
    addItem(product);
    setJustAdded(true);
  }

  return (
    <button className="btn btn--primary" onClick={handleClick} disabled={outOfStock}>
      {outOfStock ? "Out of stock" : justAdded ? "Added ✓" : "Add to cart"}
    </button>
  );
}

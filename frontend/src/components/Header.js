"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems, hydrated } = useCart();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link href="/" className="brand">
          Mini<span>Store</span>
        </Link>
        <nav>
          <Link href="/">Shop</Link>
          <Link href="/cart" className="cart-link">
            Cart
            {/* Hide the badge until localStorage has been read, to avoid a flash of "0". */}
            {hydrated && totalItems > 0 && <span className="badge">{totalItems}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

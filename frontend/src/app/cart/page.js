"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

// Client Component: the cart lives in the browser (context + localStorage).
export default function CartPage() {
  const { items, hydrated, totalItems, totalPrice, setQuantity, removeItem, clearCart } = useCart();

  if (!hydrated) return <p className="muted">Loading your cart...</p>;

  if (items.length === 0) {
    return (
      <div className="empty">
        <h1>Your cart is empty</h1>
        <p className="muted">Add something from the shop to get started.</p>
        <Link href="/" className="btn btn--primary">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1>Your cart</h1>
      <ul className="cart">
        {items.map((item) => (
          <li key={item.id} className="cart__row">
            <div>
              <Link href={`/products/${item.id}`}>
                <strong>{item.name}</strong>
              </Link>
              <div className="muted">{formatPrice(item.price)} each</div>
            </div>
            <div className="qty">
              <button className="btn" onClick={() => setQuantity(item.id, item.quantity - 1)} aria-label={`Decrease ${item.name}`}>
                −
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn"
                onClick={() => setQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                aria-label={`Increase ${item.name}`}
              >
                +
              </button>
            </div>
            <strong className="cart__subtotal">{formatPrice(item.price * item.quantity)}</strong>
            <button className="btn btn--link" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="summary">
        <div>
          <div className="muted">{totalItems} item(s)</div>
          <div className="total">Total: {formatPrice(totalPrice)}</div>
        </div>
        <div className="summary__actions">
          <button className="btn" onClick={clearCart}>
            Clear cart
          </button>
          <button className="btn btn--primary" disabled title="Checkout is not implemented in this demo">
            Checkout (demo)
          </button>
        </div>
      </div>
    </>
  );
}

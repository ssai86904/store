import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { categoryEmoji, formatPrice } from "@/lib/format";

// Props flow one way: the parent passes `product` down, and this component
// never modifies it. It has no state of its own, so it needs no "use client".
export default function ProductCard({ product }) {
  return (
    <article className="card">
      <Link href={`/products/${product.id}`} className="card__image" aria-label={product.name}>
        {categoryEmoji(product.category)}
      </Link>
      <div className="card__body">
        <span className="tag">{product.category}</span>
        <h3>
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="muted">{product.description}</p>
        <div className="card__footer">
          <strong>{formatPrice(product.price)}</strong>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { getProduct } from "@/lib/api";
import { categoryEmoji, formatPrice } from "@/lib/format";

// Dynamic route: the folder name [id] becomes params.id (/products/4 -> id = "4").
// In current Next.js versions `params` is a Promise, so it must be awaited.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const { product } = await getProduct(id);
  return { title: product ? product.name : "Product not found" };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const { product } = await getProduct(id);

  if (!product) notFound(); // renders app/not-found.js with a 404 status

  return (
    <article className="detail">
      <div className="detail__image">{categoryEmoji(product.category)}</div>
      <div>
        <Link href="/" className="muted">
          ← Back to shop
        </Link>
        <span className="tag">{product.category}</span>
        <h1>{product.name}</h1>
        <p className="muted">{product.description}</p>
        <p className="price">{formatPrice(product.price)}</p>
        <p className={product.stock > 0 ? "stock stock--in" : "stock stock--out"}>
          {product.stock > 0 ? `${product.stock} in stock` : "Currently unavailable"}
        </p>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}

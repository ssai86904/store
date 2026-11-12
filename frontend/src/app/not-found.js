import Link from "next/link";

export default function NotFound() {
  return (
    <div className="empty">
      <h1>Page not found</h1>
      <p className="muted">We couldn&apos;t find what you were looking for.</p>
      <Link href="/" className="btn btn--primary">
        Back to shop
      </Link>
    </div>
  );
}

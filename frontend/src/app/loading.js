// Shown automatically while a Server Component is waiting for data.
// Next.js wraps the page in a React <Suspense> boundary with this as the fallback.
export default function Loading() {
  return <p className="muted">Loading...</p>;
}

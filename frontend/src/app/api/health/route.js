// Route Handler: a backend endpoint inside Next.js (GET /api/health).
// Handy for checking that the frontend server is up.
export function GET() {
  return Response.json({ status: "ok", service: "mini-store-frontend" });
}

import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

// Root layout: wraps every page and persists across navigation.
// It is a Server Component; it can still render Client Components (Header, CartProvider).
export const metadata = {
  title: {
    default: "MiniStore",
    template: "%s | MiniStore",
  },
  description: "A small e-commerce practice project built with Next.js and Laravel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="container">{children}</main>
          <footer className="footer">
            <div className="container">Practice project: Next.js + Laravel</div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

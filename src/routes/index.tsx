import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { CartProvider } from "@/lib/cart";
import { Header, Hero, Process, Collection, Subscription, Contact, Footer } from "@/components/kroma/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KROMA Roasters — Single-Origin Specialty Coffee" },
      { name: "description", content: "Small-batch, direct-trade specialty coffee roasted in micro-lots and shipped within 48 hours. Shop single origins, subscribe, or book the Brew Lab." },
      { property: "og:title", content: "KROMA Roasters — Specialty Coffee for Purists" },
      { property: "og:description", content: "Single-origin beans, small-batch roasted and delivered within 48 hours of roasting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Set to a Spline / PeachWeb embed URL to replace the built-in 3D cup.
const HERO_EMBED_URL: string | undefined = undefined;

function Index() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero embedUrl={HERO_EMBED_URL} />
        <Process />
        <Collection />
        <Subscription />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" } }} />
    </CartProvider>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { getRoastRecommendation } from "@/lib/recommend.functions";
import { useCart } from "@/lib/cart";

const FLAVORS = ["Fruity", "Floral", "Citrus", "Chocolate", "Nutty", "Caramel", "Berry", "Smoky", "Bold", "Bright"];
const METHODS = ["Pour-Over", "Espresso", "Aeropress", "French Press", "Moka Pot", "Cold Brew", "Drip Machine"];

type Rec = { product: string; headline: string; reason: string; brewTip: string };

export function RoastFinder() {
  const [flavors, setFlavors] = useState<string[]>([]);
  const [method, setMethod] = useState("Pour-Over");
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(false);
  const [rec, setRec] = useState<Rec | null>(null);
  const [error, setError] = useState<string | null>(null);
  const recommend = useServerFn(getRoastRecommendation);
  const { add } = useCart();

  const toggle = (f: string) => setFlavors((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));

  async function submit() {
    setLoading(true);
    setError(null);
    setRec(null);
    try {
      const r = await recommend({ data: { flavors, method, extra: extra.trim() } });
      if (r.ok) setRec(r.rec);
      else setError(r.error);
    } catch {
      setError("Couldn't get a recommendation right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition-colors ${active ? "border-primary bg-primary/15 text-primary-glow" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`;

  return (
    <section id="roast-finder" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary-glow">AI Sommelier</div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Find your perfect roast.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Tell us what you love in a cup and how you brew — our AI-powered sommelier will match you with a coffee from our collection.</p>
        </div>

        <div className="glass grid gap-10 rounded-3xl p-8 md:grid-cols-2 md:p-10">
          <div className="space-y-8">
            <div>
              <div className="mb-3 text-sm font-medium">Flavors you love</div>
              <div className="flex flex-wrap gap-2">
                {FLAVORS.map((f) => (
                  <button key={f} type="button" onClick={() => toggle(f)} className={chip(flavors.includes(f))}>{f}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-3 text-sm font-medium">How you brew</div>
              <div className="flex flex-wrap gap-2">
                {METHODS.map((m) => (
                  <button key={m} type="button" onClick={() => setMethod(m)} className={chip(method === m)}>{m}</button>
                ))}
              </div>
            </div>
            <textarea value={extra} onChange={(e) => setExtra(e.target.value)} maxLength={300} rows={3} placeholder="Anything else? e.g. I take it with oat milk" className="w-full resize-none rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm outline-none focus:border-primary" />
            <button type="button" onClick={submit} disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:bg-primary-glow disabled:opacity-60">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Tasting notes brewing…" : "Recommend My Roast"}
            </button>
          </div>

          <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-border bg-background/30 p-6">
            <AnimatePresence mode="wait">
              {rec ? (
                <motion.div key="rec" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full space-y-4">
                  <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary-glow">Your match</div>
                  <h3 className="font-display text-3xl">{rec.product}</h3>
                  <p className="text-lg text-foreground/90">{rec.headline}</p>
                  <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  <p className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm"><span className="text-primary-glow">Brew tip: </span>{rec.brewTip}</p>
                  <button type="button" onClick={() => { add(1); toast.success(`${rec.product} added to your Tasting Box`); }} className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm text-primary-glow hover:bg-primary/15">
                    <ShoppingBag className="h-4 w-4" /> Add to Tasting Box
                  </button>
                </motion.div>
              ) : (
                <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`text-center text-sm ${error ? "text-destructive" : "text-muted-foreground"}`}>
                  {error ?? (loading ? "Our sommelier is considering your palate…" : "Your personalized recommendation will appear here.")}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

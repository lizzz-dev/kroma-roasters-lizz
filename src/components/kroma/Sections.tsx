import { lazy, Suspense, useState, type ReactNode, type MouseEvent } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast } from "sonner";
import {
  ShoppingBag, ArrowRight, Play, Plus, Minus, Mountain, Leaf, Award, Copy, MapPin, Clock, Phone, Mail,
  Instagram, Youtube, Twitter, Loader2, Droplets, Timer, Scale,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart, subscriptionPrice } from "@/lib/cart";
import yirgaImg from "@/assets/yirgacheffe.jpg";
import geishaImg from "@/assets/geisha.jpg";
import espressoImg from "@/assets/espresso.jpg";
import sourcingImg from "@/assets/sourcing.jpg";

const HeroCoffee3D = lazy(() => import("./HeroCoffee3D"));

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-amber-gradient px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110 disabled:opacity-60";
const btnGlass =
  "glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition hover:border-primary/50";
const eyebrow = "font-mono text-[11px] uppercase tracking-[0.3em] text-primary-glow";
const field =
  "w-full rounded-xl border border-input bg-cacao px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-primary-glow";

function LazyImg({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-none bg-secondary" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

/* ---------------- Header ---------------- */
const NAV = [
  ["Signature Blends", "#blends"],
  ["Roasting Process", "#process"],
  ["Subscription", "#subscription"],
  ["Brew Lab / Contact", "#contact"],
];

export function Header() {
  const { count } = useCart();
  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold tracking-tight">
            KROMA <span className="text-primary-glow">//</span> ROASTERS
          </span>
          <span className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground sm:inline">
            EST. 2026
          </span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="text-sm text-muted-foreground transition hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#blends" className="hidden rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition hover:bg-primary-glow sm:inline-flex">
            Order Tasting Box
          </a>
          <a href="#blends" aria-label="Shopping bag" className="relative rounded-full p-2 transition hover:bg-secondary">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary-glow px-1 text-[10px] font-bold text-primary-foreground"
              >
                {count}
              </motion.span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
export function Hero({ embedUrl }: { embedUrl?: string | undefined }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  return (
    <section id="top" className="grain relative overflow-hidden pt-28 pb-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs text-primary-glow shadow-glow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-glow" />
            Fresh Roast Batch #418 — Shipping Today
          </span>
          <h1 className="mt-6 text-5xl font-medium leading-[1.02] md:text-7xl">
            Artisanal Coffee <em className="text-amber-gradient font-normal">Engineered</em> For Purists.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            Single-origin beans ethically sourced at high altitudes, small-batch roasted in micro-lots, and delivered to your doorstep within 48 hours of roasting.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#blends" className={btnPrimary}>
              Explore Single Origins <ArrowRight className="h-4 w-4" />
            </a>
            <button onClick={() => toast("The roasting film premieres soon.")} className={btnGlass}>
              <Play className="h-4 w-4" /> Watch Roasting Film
            </button>
          </div>
        </motion.div>
        <motion.div style={{ y }} className="relative h-[420px] md:h-[540px]">
          <div className="absolute inset-10 rounded-full bg-primary/20 blur-[100px]" />
          <ClientOnly fallback={<Skeleton className="h-full w-full rounded-3xl bg-secondary/40" />}>
            <Suspense fallback={<Skeleton className="h-full w-full rounded-3xl bg-secondary/40" />}>
              <HeroCoffee3D embedUrl={embedUrl} />
            </Suspense>
          </ClientOnly>
        </motion.div>
      </div>
      <div className="mx-auto mt-14 max-w-7xl px-5">
        <div className="glass grid grid-cols-1 divide-y divide-border rounded-2xl sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["88.5+ SCA", "Cup Quality Score"],
            ["1,850m", "Average Grown Elevation"],
            ["100% Direct-Trade", "Sourced From Farmers"],
          ].map(([v, l]) => (
            <div key={v} className="px-6 py-5">
              <div className="font-display text-2xl">{v}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process (Bento) ---------------- */
const ROASTS = [
  { name: "Light Roast", bean: "oklch(0.55 0.09 60)", notes: ["Jasmine", "Bergamot", "Stone Fruit"], brew: "Pour-Over", radar: [9, 4, 7, 9] },
  { name: "Medium Roast", bean: "oklch(0.4 0.08 50)", notes: ["Caramel", "Red Apple", "Milk Chocolate"], brew: "Aeropress", radar: [6, 7, 8, 7] },
  { name: "Dark Roast", bean: "oklch(0.25 0.04 40)", notes: ["Dark Chocolate", "Toffee", "Smoke"], brew: "Espresso", radar: [3, 9, 6, 8] },
];

function Radar({ values }: { values: number[] }) {
  const labels = ["Acidity", "Body", "Sweetness", "Aroma"];
  const pt = (i: number, r: number) => {
    const a = (Math.PI / 2) * i - Math.PI / 2;
    return [100 + Math.cos(a) * r, 100 + Math.sin(a) * r];
  };
  const poly = values.map((v, i) => pt(i, v * 8).join(",")).join(" ");
  return (
    <svg viewBox="0 0 200 200" className="mx-auto w-full max-w-[240px]">
      {[2, 4, 6, 8, 10].map((r) => (
        <polygon key={r} points={[0, 1, 2, 3].map((i) => pt(i, r * 8).join(",")).join(" ")} fill="none" stroke="var(--border)" />
      ))}
      <motion.polygon
        animate={{ points: poly }}
        transition={{ duration: 0.6 }}
        points={poly}
        fill="color-mix(in oklab, var(--primary-glow) 30%, transparent)"
        stroke="var(--primary-glow)"
        strokeWidth="1.5"
      />
      {labels.map((l, i) => {
        const [x, y] = pt(i, 94);
        return (
          <text key={l} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="var(--muted-foreground)" className="font-mono uppercase">
            {l}
          </text>
        );
      })}
    </svg>
  );
}

function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [t, setT] = useState({ x: 0, y: 0 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -8, y: ((e.clientX - r.left) / r.width - 0.5) * 8 });
  };
  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

export function Process() {
  const [roast, setRoast] = useState(0);
  const r = ROASTS[roast];
  return (
    <section id="process" className="mx-auto max-w-7xl px-5 py-24">
      <motion.div {...reveal} className="mb-12 max-w-2xl">
        <p className={eyebrow}>The Roasting Process</p>
        <h2 className="mt-3 text-4xl md:text-5xl">From mountain cherry to your morning ritual.</h2>
      </motion.div>
      <div className="grid gap-5 md:grid-cols-6">
        <motion.div {...reveal} className="md:col-span-4 md:row-span-2">
          <TiltCard className="glass group relative h-full min-h-[420px] overflow-hidden rounded-3xl">
            <LazyImg src={sourcingImg} alt="Farmer holding ripe coffee cherries" className="absolute inset-0 transition duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <p className={eyebrow}>01 — The Sourcing Story</p>
              <h3 className="mt-2 text-3xl">Grown above the clouds.</h3>
              <p className="mt-3 max-w-md text-sm text-muted-foreground">
                Direct-trade partnerships with family farms in Yirgacheffe, Ethiopia and Huila, Colombia — paying up to 3× fair-trade minimums for hand-picked, perfectly ripe cherries.
              </p>
              <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Mountain className="h-3.5 w-3.5 text-primary-glow" /> 1,850–2,200m</span>
                <span className="flex items-center gap-1"><Leaf className="h-3.5 w-3.5 text-primary-glow" /> 14 partner farms</span>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div {...reveal} className="md:col-span-2">
          <div className="glass h-full rounded-3xl p-6">
            <p className={eyebrow}>02 — Roast Explorer</p>
            <div className="mt-5 flex items-center gap-5">
              <motion.div
                animate={{ backgroundColor: r.bean }}
                transition={{ duration: 0.6 }}
                className="relative h-20 w-14 shrink-0 rounded-[50%] shadow-card"
              >
                <span className="absolute left-1/2 top-2 bottom-2 w-[2px] -translate-x-1/2 rounded bg-background/60" />
              </motion.div>
              <div>
                <div className="font-display text-xl">{r.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">{r.notes.join(" · ")}</div>
                <div className="mt-2 text-xs text-primary-glow">Brew: {r.brew}</div>
              </div>
            </div>
            <input
              type="range" min={0} max={2} step={1} value={roast}
              onChange={(e) => setRoast(Number(e.target.value))}
              aria-label="Roast level"
              className="mt-6 w-full accent-[var(--primary-glow)]"
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] uppercase text-muted-foreground">
              <span>Light</span><span>Medium</span><span>Dark</span>
            </div>
          </div>
        </motion.div>

        <motion.div {...reveal} className="md:col-span-2">
          <div className="glass h-full rounded-3xl p-6">
            <p className={eyebrow}>03 — Flavor Radar</p>
            <Radar values={r.radar} />
            <p className="text-center text-xs text-muted-foreground">Move the roast slider to reshape the cup.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Collection ---------------- */
const PRODUCTS = [
  { name: "Ethiopian Yirgacheffe G1", img: yirgaImg, price: 22, notes: ["White Peach", "Jasmine Blossom", "Meyer Lemon"], origin: "Gedeb, Ethiopia · Washed · 2,100m", grind: "Medium-fine (sea salt)", ratio: "1 : 16 — 20g to 320g", temp: "94°C", steps: ["Rinse filter and preheat vessel.", "Bloom with 50g water for 40 seconds.", "Pour in slow spirals to 320g by 2:00.", "Drawdown finishes around 3:00."] },
  { name: "Colombian Geisha Reserva", img: geishaImg, price: 26, notes: ["Wild Blackberry", "Cocoa Nib", "Cane Sugar"], origin: "Huila, Colombia · Natural · 1,850m", grind: "Medium (table salt)", ratio: "1 : 15 — 18g to 270g", temp: "93°C", steps: ["Add coffee to Aeropress, inverted.", "Pour 270g water, stir 3 times.", "Steep for 1:45.", "Flip and press gently for 30 seconds."] },
  { name: "Midnight Velvet Espresso", img: espressoImg, price: 20, notes: ["Dark Cacao", "Smoked Vanilla", "Crushed Hazelnut"], origin: "House blend · Brazil & Guatemala", grind: "Fine (powdered sugar)", ratio: "1 : 2 — 18g to 36g", temp: "92°C", steps: ["Dose 18g and distribute evenly.", "Tamp level with firm pressure.", "Extract 36g in 27–30 seconds.", "Swirl and enjoy within a minute."] },
];

export function Collection() {
  const { add } = useCart();
  const [open, setOpen] = useState<number | null>(null);
  const p = open !== null ? PRODUCTS[open] : null;
  const quickAdd = (i: number, e?: MouseEvent) => {
    e?.stopPropagation();
    add();
    toast.success(`${PRODUCTS[i].name} added to your Tasting Box`);
  };
  return (
    <section id="blends" className="bg-cacao py-24">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div {...reveal} className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={eyebrow}>Signature Collection</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Three origins. Zero compromise.</h2>
          </div>
          <p className="max-w-sm text-sm text-muted-foreground">Roasted every Tuesday and Friday in 12kg micro-batches. Tap any bag for its brew guide.</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {PRODUCTS.map((prod, i) => (
            <motion.div key={prod.name} {...reveal} transition={{ ...reveal.transition, delay: i * 0.12 }}>
              <TiltCard className="h-full">
                <article
                  onClick={() => setOpen(i)}
                  className="glass group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl shadow-card"
                >
                  <LazyImg src={prod.img} alt={prod.name} className="aspect-[4/5] transition duration-700 group-hover:scale-[1.03]" />
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl">{prod.name}</h3>
                      <span className="font-display text-xl text-primary-glow">${prod.price}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {prod.notes.map((n) => (
                        <span key={n} className="rounded-full border border-border px-2.5 py-0.5 text-[11px] text-muted-foreground">{n}</span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <span className="text-xs text-muted-foreground underline-offset-4 group-hover:underline">View Tasting Profile & Brew Guide</span>
                      <button onClick={(e) => quickAdd(i, e)} className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background transition hover:bg-primary-glow">
                        <Plus className="h-3.5 w-3.5" /> Quick Add
                      </button>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl border-border bg-popover p-0 sm:rounded-3xl overflow-hidden">
          {p && (
            <div className="grid sm:grid-cols-[1fr_1.3fr]">
              <img src={p.img} alt={p.name} className="hidden h-full w-full object-cover sm:block" />
              <div className="p-7">
                <DialogHeader>
                  <p className={eyebrow}>{p.origin}</p>
                  <DialogTitle className="font-display text-2xl font-medium">{p.name}</DialogTitle>
                  <DialogDescription>{p.notes.join(" · ")}</DialogDescription>
                </DialogHeader>
                <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                  {[[Scale, "Grind", p.grind], [Droplets, "Ratio", p.ratio], [Timer, "Water", p.temp]].map(([Icon, l, v]) => {
                    const I = Icon as typeof Scale;
                    return (
                      <div key={l as string} className="rounded-xl border border-border p-3">
                        <I className="mx-auto h-4 w-4 text-primary-glow" />
                        <div className="mt-1 font-mono text-[9px] uppercase text-muted-foreground">{l as string}</div>
                        <div className="mt-1 text-[11px] leading-tight">{v as string}</div>
                      </div>
                    );
                  })}
                </div>
                <ol className="mt-5 space-y-2">
                  {p.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="font-mono text-primary-glow">0{i + 1}</span>{s}
                    </li>
                  ))}
                </ol>
                <button onClick={() => { quickAdd(open!); setOpen(null); }} className={`${btnPrimary} mt-6 w-full`}>
                  Add to Tasting Box — ${p.price}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ---------------- Subscription ---------------- */
export function Subscription() {
  const { add } = useCart();
  const [cadence, setCadence] = useState<"biweekly" | "monthly">("biweekly");
  const [bags, setBags] = useState(2);
  const price = subscriptionPrice(bags, cadence);
  const setQty = (n: number) => {
    const next = Math.max(1, Math.min(6, n));
    setBags(next);
    toast(`${next} bag${next > 1 ? "s" : ""} · $${subscriptionPrice(next, cadence).toFixed(2)} per delivery`);
  };
  return (
    <section id="subscription" className="grain py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2">
        <motion.div {...reveal}>
          <p className={eyebrow}>The Kroma Coffee Club</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Never brew a stale cup again.</h2>
          <p className="mt-5 text-muted-foreground">A rotating roaster's selection, shipped the day it's roasted. Pause, skip, or cancel any time.</p>
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            {["Free shipping on every delivery", "Members-only micro-lots", "Save up to 15% vs. one-time"].map((t) => (
              <li key={t} className="flex items-center gap-2"><Award className="h-4 w-4 text-primary-glow" />{t}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div {...reveal} className="glass rounded-3xl p-7 shadow-card">
          <div className="grid grid-cols-2 gap-1 rounded-full bg-cacao p-1">
            {([["biweekly", "Every 2 Weeks"], ["monthly", "Monthly"]] as const).map(([v, l]) => (
              <button
                key={v}
                onClick={() => setCadence(v)}
                className={`rounded-full py-2.5 text-sm font-medium transition ${cadence === v ? "bg-amber-gradient text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="mt-7 flex items-center justify-between">
            <div>
              <div className="text-sm">Bags per delivery</div>
              <div className="text-xs text-muted-foreground">250g each</div>
            </div>
            <div className="flex items-center gap-3">
              <button aria-label="Fewer bags" onClick={() => setQty(bags - 1)} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary-glow"><Minus className="h-4 w-4" /></button>
              <span className="w-6 text-center font-display text-2xl">{bags}</span>
              <button aria-label="More bags" onClick={() => setQty(bags + 1)} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary-glow"><Plus className="h-4 w-4" /></button>
            </div>
          </div>
          <div className="mt-7 flex items-end justify-between border-t border-border pt-6">
            <div className="text-xs text-muted-foreground">
              {cadence === "biweekly" ? "15%" : "10%"} member savings applied
            </div>
            <motion.div key={price} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl">
              ${price.toFixed(2)}
            </motion.div>
          </div>
          <button
            onClick={() => { add(bags); toast.success("Welcome to the Coffee Club", { description: `${bags} bags, ${cadence === "biweekly" ? "every 2 weeks" : "monthly"}.` }); }}
            className={`${btnPrimary} mt-6 w-full`}
          >
            Start My Subscription
          </button>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
export function Contact() {
  const [sending, setSending] = useState(false);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Reservation request received. We look forward to hosting you.");
    }, 1400);
  };
  const email = "hello@kromacoffee.com";
  return (
    <section id="contact" className="bg-cacao py-24">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div {...reveal} className="mb-12">
          <p className={eyebrow}>Brew Lab</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Visit The Roastery & Brew Lab</h2>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <motion.form {...reveal} onSubmit={submit} className="glass grid gap-4 rounded-3xl p-7 sm:grid-cols-2">
            <input required name="name" placeholder="Guest Name" className={field} />
            <input required type="email" name="email" placeholder="Email Address" className={field} />
            <select name="type" className={`${field} sm:col-span-2`} defaultValue="Table Reservation / Tasting Session">
              <option>Table Reservation / Tasting Session</option>
              <option>Wholesale Partnership</option>
              <option>General Question</option>
            </select>
            <input type="date" name="date" className={field} />
            <input type="number" min={1} max={12} name="guests" placeholder="Number of Guests" className={field} />
            <textarea name="notes" rows={4} placeholder="Special Requests" className={`${field} sm:col-span-2 resize-none`} />
            <button disabled={sending} className={`${btnPrimary} sm:col-span-2`}>
              {sending ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : "Request Reservation"}
            </button>
          </motion.form>
          <motion.div {...reveal} className="glass flex flex-col gap-5 rounded-3xl p-7">
            <div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 text-primary-glow" /><div><div className="font-medium">KROMA Roastery</div><div className="text-sm text-muted-foreground">418 Ember Lane, Arts District<br />Portland, OR 97209</div></div></div>
            <div className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 text-primary-glow" /><div className="text-sm text-muted-foreground">Open Daily<br /><span className="text-foreground">7:00 AM – 6:00 PM</span></div></div>
            <div className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 text-primary-glow" /><a href="tel:+15035550418" className="text-sm">+1 (503) 555-0418</a></div>
            <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-cacao p-3">
              <span className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-primary-glow" />{email}</span>
              <button
                type="button"
                aria-label="Copy email"
                onClick={() => { navigator.clipboard?.writeText(email); toast("Email copied to clipboard"); }}
                className="rounded-lg p-2 hover:bg-secondary"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3">
        <div>
          <div className="font-display text-lg">KROMA <span className="text-primary-glow">//</span> ROASTERS</div>
          <p className="mt-3 text-sm text-muted-foreground">418 Ember Lane, Portland, OR<br />Open Daily 7:00 AM – 6:00 PM</p>
        </div>
        <p className="text-sm italic leading-relaxed text-muted-foreground">
          “Our Direct-Trade Manifesto: we know every farmer by name, publish every price we pay, and roast only what we can ship fresh.”
        </p>
        <div className="flex gap-3 md:justify-end">
          {[[Instagram, "Instagram"], [Twitter, "X"], [Youtube, "YouTube Brew Guides"]].map(([I, l]) => {
            const Icon = I as typeof Instagram;
            return (
              <a key={l as string} href="#" aria-label={l as string} className="glass grid h-10 w-10 place-items-center rounded-full hover:border-primary-glow">
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
      <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">© 2026 Kroma Roasters · kromacoffee.com</p>
    </footer>
  );
}

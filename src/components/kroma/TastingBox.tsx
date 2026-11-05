import { useState } from "react";
import { CheckCircle2, Minus, Plus, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { BOX_COFFEES, BOX_SIZE, boxCount, boxReady, boxTotal } from "@/lib/tasting-box";

export function TastingBox() {
  const { items, change, clear, open, setOpen } = useCart();
  const [confirmation, setConfirmation] = useState<{ total: number; names: string[] } | null>(null);
  const count = boxCount(items);
  const ready = boxReady(items);
  const total = boxTotal(items);
  return (
    <Sheet open={open} onOpenChange={(value) => { setOpen(value); if (!value) setConfirmation(null); }}>
      <SheetContent className="flex h-dvh w-full flex-col overflow-y-auto border-border bg-popover p-6 sm:max-w-md">
        <SheetHeader className="pr-6 text-left">
          <SheetTitle className="font-display text-3xl">Your Tasting Box</SheetTitle>
          <SheetDescription>{confirmation ? "Simulated checkout complete" : "Three bags. Your perfect mix."}</SheetDescription>
        </SheetHeader>
        {confirmation ? (
          <div className="flex flex-1 flex-col justify-center gap-5 py-8">
            <CheckCircle2 className="h-12 w-12 text-primary-glow" />
            <h3 className="font-display text-2xl">Your box is ready.</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">{confirmation.names.map((name) => <li key={name}>{name}</li>)}</ul>
            <p className="text-lg">${confirmation.total.toFixed(2)} · Free shipping</p>
            <p className="text-sm text-muted-foreground">This was a demo checkout. No payment was taken and no order was placed.</p>
            <Button onClick={() => setConfirmation(null)}>Build another box <ArrowRight /></Button>
          </div>
        ) : (
          <>
            <div className="my-6 space-y-3">
              <div className="flex justify-between text-sm"><span>{count} / {BOX_SIZE} bags</span><span className="flex items-center gap-2 text-primary-glow"><Truck className="h-4 w-4" />{ready ? "Free shipping unlocked" : `${BOX_SIZE - count} to free shipping`}</span></div>
              <div role="progressbar" aria-label="Tasting box progress" aria-valuemin={0} aria-valuemax={3} aria-valuenow={count} className="flex h-2 gap-1 overflow-hidden rounded-full bg-secondary">
                {[1, 2, 3].map((step) => <span key={step} className={`flex-1 transition-colors duration-300 motion-reduce:transition-none ${count >= step ? "bg-primary-glow" : "bg-secondary"}`} />)}
              </div>
            </div>
            <div className="flex-1 divide-y divide-border">
              {BOX_COFFEES.map((coffee) => (
                <div key={coffee.name} className="flex gap-4 py-5 first:pt-0">
                  <img src={coffee.image} alt={coffee.name} className="h-24 w-20 shrink-0 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg leading-snug">{coffee.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{coffee.notes}</p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-sm text-primary-glow">${coffee.price}</span>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" aria-label={`Remove ${coffee.name}`} title={`Remove ${coffee.name}`} disabled={!items[coffee.name]} onClick={() => change(coffee.name, -1)}><Minus /></Button>
                        <span aria-label={`${coffee.name} quantity`} className="w-4 text-center text-sm">{items[coffee.name] ?? 0}</span>
                        <Button variant="outline" size="icon" aria-label={`Add ${coffee.name}`} title={`Add ${coffee.name}`} disabled={ready} onClick={() => change(coffee.name, 1)}><Plus /></Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 border-t border-border pt-5">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-display text-2xl">${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm text-muted-foreground"><span>Shipping</span><span>{ready ? "Free" : "Unlock at 3 bags"}</span></div>
              <Button className="w-full" size="lg" disabled={!ready} onClick={() => { if (!boxReady(items)) return; setConfirmation({ total, names: BOX_COFFEES.filter((coffee) => items[coffee.name]).map((coffee) => `${items[coffee.name]} × ${coffee.name}`) }); clear(); }}>Simulate Checkout <ArrowRight /></Button>
              <p className="text-center text-xs text-muted-foreground">Demo checkout · No payment required</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function FilmModal({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL_RE.test(v) || v.length > 255) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setEmail("");
    setOpen(false);
    toast.success("You're on the VIP screening list.");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg border-border bg-popover/95 p-8 backdrop-blur-xl sm:rounded-3xl">
        <DialogHeader className="space-y-4 text-left">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs text-primary-glow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-glow" />
            Premiere Launching Soon
          </span>
          <DialogTitle className="font-display text-2xl font-medium leading-tight md:text-3xl">
            The Craft of Roasting — Film Premiere
          </DialogTitle>
          <DialogDescription className="leading-relaxed text-muted-foreground">
            A short documentary capturing our high-altitude single-origin harvests in Huila and Yirgacheffe. Official release coming Winter 2026.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} noValidate className="mt-2 space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
              placeholder="Enter your email for private screening access"
              aria-label="Email address"
              aria-invalid={!!error}
              className="h-11 flex-1 rounded-full bg-secondary/50 px-5"
            />
            <button
              type="submit"
              className="h-11 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary-glow"
            >
              Get Notified
            </button>
          </div>
          {error && <p className="px-2 text-xs text-destructive">{error}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}

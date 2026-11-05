import { createContext, useContext, useState, type ReactNode } from "react";
import { BOX_COFFEES, boxCount, changeBox, type BoxItems } from "./tasting-box";

type Ctx = { count: number; add: (n?: number, name?: string) => void; items: BoxItems; change: (name: string, delta: number) => void; clear: () => void; open: boolean; setOpen: (open: boolean) => void };
const CartCtx = createContext<Ctx>({ count: 0, add: () => {}, items: {}, change: () => {}, clear: () => {}, open: false, setOpen: () => {} });

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<BoxItems>({});
  const [open, setOpen] = useState(false);
  const change = (name: string, delta: number) => setItems((current) => changeBox(current, name, delta));
  return (
    <CartCtx.Provider value={{ count: count + boxCount(items), items, change, clear: () => setItems({}), open, setOpen, add: (n = 1, name) => {
      if (name && BOX_COFFEES.some((coffee) => coffee.name === name)) { change(name, n); setOpen(true); }
      else setCount((c) => c + n);
    } }}>
      {children}
    </CartCtx.Provider>
  );
}
export const useCart = () => useContext(CartCtx);

/** Subscription pricing: every-2-weeks saves 15%, monthly saves 10%. */
export const BAG_PRICE = 22;
export function subscriptionPrice(bags: number, cadence: "biweekly" | "monthly") {
  const discount = cadence === "biweekly" ? 0.15 : 0.1;
  return Math.round(bags * BAG_PRICE * (1 - discount) * 100) / 100;
}

import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = { count: number; add: (n?: number) => void };
const CartCtx = createContext<Ctx>({ count: 0, add: () => {} });

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <CartCtx.Provider value={{ count, add: (n = 1) => setCount((c) => c + n) }}>
      {children}
    </CartCtx.Provider>
  );
}
export const useCart = () => useContext(CartCtx);

/** Subscription pricing: base price per bag, 10% off monthly? No — biweekly saves 15%, monthly saves 10%. */
export const BAG_PRICE = 22;
export function subscriptionPrice(bags: number, cadence: "biweekly" | "monthly") {
  const discount = cadence === "biweekly" ? 0.15 : 0.1;
  return Math.round(bags * BAG_PRICE * (1 - discount) * 100) / 100;
}

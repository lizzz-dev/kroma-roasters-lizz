import yirgacheffe from "@/assets/yirgacheffe.jpg";
import geisha from "@/assets/geisha.jpg";
import espresso from "@/assets/espresso.jpg";

export const BOX_SIZE = 3;
export const BOX_COFFEES = [
  { name: "Ethiopian Yirgacheffe G1", price: 22, image: yirgacheffe, notes: "White Peach · Jasmine · Meyer Lemon" },
  { name: "Colombian Geisha Reserva", price: 26, image: geisha, notes: "Blackberry · Cocoa Nib · Cane Sugar" },
  { name: "Midnight Velvet Espresso", price: 20, image: espresso, notes: "Dark Cacao · Vanilla · Hazelnut" },
];
export type BoxItems = Record<string, number>;
export const boxCount = (items: BoxItems) => Object.values(items).reduce((sum, n) => sum + n, 0);
export const boxReady = (items: BoxItems) => boxCount(items) === BOX_SIZE;
export const boxTotal = (items: BoxItems) => BOX_COFFEES.reduce((sum, coffee) => sum + coffee.price * (items[coffee.name] ?? 0), 0);
export function changeBox(items: BoxItems, name: string, delta: number): BoxItems {
  if (!BOX_COFFEES.some((coffee) => coffee.name === name)) return items;
  const quantity = Math.max(0, (items[name] ?? 0) + Math.trunc(delta));
  if (boxCount(items) - (items[name] ?? 0) + quantity > BOX_SIZE) return items;
  return { ...items, [name]: quantity };
}
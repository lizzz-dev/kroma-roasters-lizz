import { describe, expect, it } from "vitest";
import { BOX_COFFEES, boxCount, boxReady, boxTotal, changeBox } from "./tasting-box";

describe("Tasting box rules", () => {
  const first = BOX_COFFEES[0].name;
  it("allows exactly three bags and refuses a fourth", () => {
    const full = changeBox({}, first, 3);
    expect(boxCount(full)).toBe(3);
    expect(boxCount(changeBox(full, BOX_COFFEES[1].name, 1))).toBe(3);
  });
  it("unlocks free shipping and simulated checkout only at three bags", () => {
    expect(boxReady({ [first]: 2 })).toBe(false);
    expect(boxReady({ [first]: 3 })).toBe(true);
    expect(boxReady(changeBox({ [first]: 3 }, first, -1))).toBe(false);
  });
  it("supports a mix of all three coffees with catalog prices", () => {
    const mix = Object.fromEntries(BOX_COFFEES.map((coffee) => [coffee.name, 1]));
    expect(boxCount(mix)).toBe(3);
    expect(boxTotal(mix)).toBe(68);
  });
  it("cannot remove below zero", () => {
    expect(changeBox({}, first, -1)[first]).toBe(0);
  });
});
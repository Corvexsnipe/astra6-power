/** One purchase link per RAM plan (GB). */
export const HYTALE_PLAN_LINKS: Record<number, string> = {
  1: "https://billing.lunarhost.io/hytale/1gb",
  2: "https://billing.lunarhost.io/hytale/2gb",
  3: "https://billing.lunarhost.io/hytale/3gb",
  4: "https://billing.lunarhost.io/hytale/4gb",
  6: "https://billing.lunarhost.io/hytale/6gb",
  8: "https://billing.lunarhost.io/hytale/8gb",
  12: "https://billing.lunarhost.io/hytale/12gb",
  16: "https://billing.lunarhost.io/hytale/16gb",
  24: "https://billing.lunarhost.io/hytale/24gb",
};

export function getHytaleCheckoutUrl(gb: number): string {
  return HYTALE_PLAN_LINKS[gb] ?? "#";
}

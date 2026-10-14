/** One purchase link per RAM plan (GB). */
export const POCKETMINE_PLAN_LINKS: Record<number, string> = {
  1: "https://billing.lunarhost.io/pocketmine/1gb",
  2: "https://billing.lunarhost.io/pocketmine/2gb",
  3: "https://billing.lunarhost.io/pocketmine/3gb",
  4: "https://billing.lunarhost.io/pocketmine/4gb",
  6: "https://billing.lunarhost.io/pocketmine/6gb",
  8: "https://billing.lunarhost.io/pocketmine/8gb",
  12: "https://billing.lunarhost.io/pocketmine/12gb",
  16: "https://billing.lunarhost.io/pocketmine/16gb",
  24: "https://billing.lunarhost.io/pocketmine/24gb",
};

export function getPocketmineCheckoutUrl(gb: number): string {
  return POCKETMINE_PLAN_LINKS[gb] ?? "#";
}

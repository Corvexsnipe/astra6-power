/**
 * Purchase links per RAM plan (GB) and billing cycle.
 * Edit each URL with your real WHMCS / billing link.
 */
export type BillingCycle = "monthly" | "threeMonths" | "sixMonths" | "yearly";

export const MINECRAFT_JAVA_PLAN_LINKS: Record<number, Record<BillingCycle, string>> = {
  1: {
    monthly: "https://billing.lunarhost.io/minecraft-java/1gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-java/1gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-java/1gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-java/1gb-yearly",
  },
  2: {
    monthly: "https://billing.lunarhost.io/minecraft-java/2gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-java/2gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-java/2gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-java/2gb-yearly",
  },
  3: {
    monthly: "https://billing.lunarhost.io/minecraft-java/3gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-java/3gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-java/3gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-java/3gb-yearly",
  },
  4: {
    monthly: "https://billing.lunarhost.io/minecraft-java/4gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-java/4gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-java/4gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-java/4gb-yearly",
  },
  6: {
    monthly: "https://billing.lunarhost.io/minecraft-java/6gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-java/6gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-java/6gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-java/6gb-yearly",
  },
  8: {
    monthly: "https://billing.lunarhost.io/minecraft-java/8gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-java/8gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-java/8gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-java/8gb-yearly",
  },
  12: {
    monthly: "https://billing.lunarhost.io/minecraft-java/12gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-java/12gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-java/12gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-java/12gb-yearly",
  },
  16: {
    monthly: "https://billing.lunarhost.io/minecraft-java/16gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-java/16gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-java/16gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-java/16gb-yearly",
  },
  24: {
    monthly: "https://billing.lunarhost.io/minecraft-java/24gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-java/24gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-java/24gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-java/24gb-yearly",
  },
};

export function getMinecraftJavaCheckoutUrl(gb: number, billingCycle: BillingCycle = "monthly"): string {
  return MINECRAFT_JAVA_PLAN_LINKS[gb]?.[billingCycle] ?? "#";
}

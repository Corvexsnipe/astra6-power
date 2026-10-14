/**
 * Purchase links per RAM plan (GB) and billing cycle.
 * Edit each URL with your real WHMCS / billing link.
 */
export type BillingCycle = "monthly" | "threeMonths" | "sixMonths" | "yearly";

export const MINECRAFT_BEDROCK_PLAN_LINKS: Record<number, Record<BillingCycle, string>> = {
  1: {
    monthly: "https://billing.lunarhost.io/minecraft-bedrock/1gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-bedrock/1gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-bedrock/1gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-bedrock/1gb-yearly",
  },
  2: {
    monthly: "https://billing.lunarhost.io/minecraft-bedrock/2gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-bedrock/2gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-bedrock/2gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-bedrock/2gb-yearly",
  },
  3: {
    monthly: "https://billing.lunarhost.io/minecraft-bedrock/3gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-bedrock/3gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-bedrock/3gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-bedrock/3gb-yearly",
  },
  4: {
    monthly: "https://billing.lunarhost.io/minecraft-bedrock/4gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-bedrock/4gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-bedrock/4gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-bedrock/4gb-yearly",
  },
  6: {
    monthly: "https://billing.lunarhost.io/minecraft-bedrock/6gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-bedrock/6gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-bedrock/6gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-bedrock/6gb-yearly",
  },
  8: {
    monthly: "https://billing.lunarhost.io/minecraft-bedrock/8gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-bedrock/8gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-bedrock/8gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-bedrock/8gb-yearly",
  },
  12: {
    monthly: "https://billing.lunarhost.io/minecraft-bedrock/12gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-bedrock/12gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-bedrock/12gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-bedrock/12gb-yearly",
  },
  16: {
    monthly: "https://billing.lunarhost.io/minecraft-bedrock/16gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-bedrock/16gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-bedrock/16gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-bedrock/16gb-yearly",
  },
  24: {
    monthly: "https://billing.lunarhost.io/minecraft-bedrock/20gb",
    threeMonths: "https://billing.lunarhost.io/minecraft-bedrock/20gb-3months",
    sixMonths: "https://billing.lunarhost.io/minecraft-bedrock/20gb-6months",
    yearly: "https://billing.lunarhost.io/minecraft-bedrock/20gb-yearly",
  },
};

export function getMinecraftBedrockCheckoutUrl(gb: number, billingCycle: BillingCycle = "monthly"): string {
  return MINECRAFT_BEDROCK_PLAN_LINKS[gb]?.[billingCycle] ?? "#";
}

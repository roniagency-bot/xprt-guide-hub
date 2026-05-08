export type DealershipFaqStage = "tofu" | "mofu" | "bofu";

export type DealershipFaq = {
  slug: string;
  question: string;
  shortAnswer: string;
  stage: DealershipFaqStage;
  metaDescription: string;
  paragraphs: string[];
  bullets?: string[];
  whatToPrepare?: string[];
  stateContext?: string;
  goDeeper: string[];
  readyToAct: string;
  mentionsBond?: boolean;
};

const DEFAULT_GO_DEEPER = [
  "what-coverages-does-a-nevada-dealer-need",
  "what-affects-dealership-insurance-cost",
];
const DEFAULT_READY = "how-to-start-a-nevada-dealer-insurance-review";
const ALL_TOFU = [
  "what-is-dealership-insurance",
  "do-i-need-a-nevada-dealer-bond",
  "garage-liability-vs-garagekeepers",
];

export function getRelatedDealershipTofu(slug: string, limit = 2) {
  return ALL_TOFU.filter((s) => s !== slug).slice(0, limit);
}

export const DEALERSHIP_FAQS: DealershipFaq[] = [
  {
    slug: "what-is-dealership-insurance",
    question: "What is dealership insurance?",
    shortAnswer:
      "Dealership insurance is a package of business coverages built for licensed auto dealers — typically including garage liability, dealer's open lot or physical damage, garagekeepers, workers' compensation, and an umbrella. The exact combination depends on the dealership's operations, location, and Nevada licensing requirements.",
    stage: "tofu",
    metaDescription:
      "Learn what dealership insurance includes and how Nevada auto dealers combine garage liability, open lot, garagekeepers, and workers' comp coverages.",
    paragraphs: [
      "Personal auto policies generally exclude vehicles held for sale, customer test drives, and dealer operations. Dealership insurance replaces those gaps with coverages designed for the way a dealer actually operates — selling, displaying, moving, and storing vehicles.",
      "Most Nevada dealers carry several coordinated policies rather than a single product. The right combination depends on whether the dealership is franchise or independent, new or used, on a fixed lot or wholesale, and how many employees and vehicles are involved.",
    ],
    bullets: [
      "Garage liability — for dealer operations, customer injuries, and certain auto-related liability",
      "Dealer's open lot / physical damage — for owned inventory on the lot",
      "Garagekeepers — for customer vehicles in your care, custody, or control",
      "Workers' compensation — required when you have employees in Nevada",
      "Commercial umbrella — additional liability limits over the underlying policies",
    ],
    stateContext:
      "Nevada dealers must satisfy DMV licensing requirements, including a $100,000 dealer surety bond and proof of liability coverage. Coverage limits, eligibility, and pricing depend on the carrier, application details, and dealer classification.",
    goDeeper: DEFAULT_GO_DEEPER,
    readyToAct: DEFAULT_READY,
    mentionsBond: true,
  },
  {
    slug: "do-i-need-a-nevada-dealer-bond",
    question: "Do I need a Nevada dealer bond?",
    shortAnswer:
      "Yes. Nevada licensed vehicle dealers are generally required to maintain a $100,000 surety bond as part of DMV licensing. The bond is separate from your insurance and protects the public — not the dealership.",
    stage: "tofu",
    metaDescription:
      "Find out why Nevada auto dealers need a $100,000 surety bond, how it differs from insurance, and how to quote and purchase a dealer bond online.",
    paragraphs: [
      "A dealer bond is a surety bond required by the Nevada DMV before a dealer license is issued or renewed. It guarantees that the dealer will follow Nevada motor vehicle laws and pay valid claims for unpaid taxes, fees, or fraud.",
      "If a valid bond claim is paid, the dealer is generally responsible for reimbursing the surety. That's why a bond is treated as a credit product, not insurance — it protects the public and the state, while your dealership insurance protects you.",
    ],
    bullets: [
      "Required by Nevada DMV for licensed dealers",
      "Standard amount is $100,000 for most dealer classes",
      "Quoted as a small percentage of the bond amount, not the full $100,000",
      "Separate from garage liability, open lot, garagekeepers, and workers' comp",
      "Many dealers can quote and purchase the bond online",
    ],
    stateContext:
      "Bond approval, pricing, and eligibility vary by surety company, dealer experience, credit, and application details. Issuing a quote does not guarantee approval. Always confirm current Nevada DMV requirements with the licensing agent.",
    goDeeper: ["what-coverages-does-a-nevada-dealer-need", "what-affects-dealership-insurance-cost"],
    readyToAct: DEFAULT_READY,
    mentionsBond: true,
  },
  {
    slug: "garage-liability-vs-garagekeepers",
    question: "What is the difference between garage liability and garagekeepers?",
    shortAnswer:
      "Garage liability covers third-party bodily injury and property damage that arises out of dealer operations. Garagekeepers covers physical damage to customers' vehicles while they're in your care, custody, or control. Most dealers need both.",
    stage: "tofu",
    metaDescription:
      "Compare garage liability and garagekeepers coverage for Nevada auto dealers and learn why most dealerships carry both policies.",
    paragraphs: [
      "Garage liability responds when the dealership is alleged to have caused injury or damage during normal operations — for example, a customer slip-and-fall on the lot or an accident during a test drive. It is the foundation of dealer liability protection.",
      "Garagekeepers is different. It pays for damage to customer vehicles you're holding for service, storage, or any other reason — fire, theft, vandalism, or collision while parked or being moved. It can be written on a legal liability, direct primary, or direct excess basis, which changes when and how it pays.",
    ],
    bullets: [
      "Garage liability — third-party bodily injury and property damage from dealer operations",
      "Garagekeepers — physical damage to customer vehicles in your care",
      "Coverage forms vary (legal liability, direct primary, direct excess)",
      "Limits, deductibles, and exclusions are set per policy and carrier",
    ],
    stateContext:
      "Nevada dealers should confirm that garage liability limits meet DMV minimums and that garagekeepers limits are sized to the typical value of customer vehicles on the lot.",
    goDeeper: ["what-coverages-does-a-nevada-dealer-need", "what-affects-dealership-insurance-cost"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "what-coverages-does-a-nevada-dealer-need",
    question: "What coverages does a Nevada dealer need?",
    shortAnswer:
      "Most Nevada dealers carry garage liability, dealer's open lot or dealer physical damage, garagekeepers, workers' compensation, and a commercial umbrella. The Nevada DMV also requires a $100,000 dealer surety bond before licensing.",
    stage: "mofu",
    metaDescription:
      "See the core coverages most Nevada auto dealers carry, including garage liability, open lot, garagekeepers, workers' comp, umbrella, and the dealer bond.",
    paragraphs: [
      "Each coverage solves a different problem. Liability protects against claims from others, physical damage protects owned inventory, garagekeepers protects customer cars, workers' comp protects employees, and the umbrella adds a layer above everything else.",
      "Dealers should review limits, deductibles, exclusions, and endorsements together rather than in isolation. A gap in any one of these can affect the whole program — for example, a low garagekeepers limit can leave a dealer paying out of pocket after a single lot fire or hailstorm.",
    ],
    bullets: [
      "Garage Liability — dealer operations, premises, and certain auto liability",
      "Open Lot / Dealer Physical Damage — owned inventory on the lot or in transport",
      "Garagekeepers — customer vehicles in the dealership's care",
      "Workers' Compensation — required by Nevada law for most employers",
      "Commercial Umbrella — added limits over the underlying liability policies",
      "Nevada DMV $100,000 Dealer Surety Bond — required for licensing",
    ],
    stateContext:
      "Workers' compensation requirements in Nevada are governed by state law. Coverage availability and pricing vary by carrier, classification codes, payroll, prior losses, and dealer operations.",
    goDeeper: ["garage-liability-vs-garagekeepers", "what-affects-dealership-insurance-cost"],
    readyToAct: DEFAULT_READY,
    mentionsBond: true,
  },
  {
    slug: "what-affects-dealership-insurance-cost",
    question: "What affects dealership insurance cost?",
    shortAnswer:
      "Cost depends on coverages selected, limits, deductibles, lot size, vehicle inventory value, payroll, employee count, prior claims, dealer experience, and underwriting. There is no single \"dealer rate\" — quotes are built from the dealership's actual operations.",
    stage: "mofu",
    metaDescription:
      "Understand the factors that drive dealership insurance pricing in Nevada, from inventory and payroll to claims history and underwriting.",
    paragraphs: [
      "Garage liability premium often considers the number of employees, types of vehicles sold, and any test-drive or service operations. Dealer physical damage and garagekeepers reflect the value of vehicles regularly on the lot. Workers' comp depends on payroll and class codes.",
      "Underwriters also look at claims history, time in business, lot security, and how operations are described on the application. Accurate, complete information helps avoid coverage surprises later — including at the time of a claim.",
    ],
    bullets: [
      "Coverages, limits, and deductibles selected",
      "Lot size, inventory value, and types of vehicles",
      "Number of employees and total payroll",
      "Prior claims and loss history",
      "Time in business and dealer experience",
      "Lot security, alarms, fencing, and storage practices",
    ],
    stateContext:
      "Quotes for Nevada dealers depend on carrier appetite and underwriting. Coverage availability is not guaranteed and can change based on application details and market conditions.",
    goDeeper: ["what-coverages-does-a-nevada-dealer-need", "garage-liability-vs-garagekeepers"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "do-nevada-dealers-need-workers-comp-and-umbrella",
    question: "Do Nevada dealers need workers' compensation and an umbrella?",
    shortAnswer:
      "Most Nevada dealers with employees are required to carry workers' compensation, and many add a commercial umbrella to extend liability limits above garage liability and auto. Both are typically reviewed alongside the rest of the dealership program.",
    stage: "mofu",
    metaDescription:
      "Learn when Nevada auto dealers need workers' compensation and a commercial umbrella, and how those coverages connect to the rest of the dealership program.",
    paragraphs: [
      "Workers' compensation is governed by Nevada law and is generally required for employers. It covers medical expenses and a portion of lost wages for work-related injuries and illnesses, and it helps protect the business from related lawsuits.",
      "A commercial umbrella sits above the underlying liability policies — typically garage liability and any commercial auto. It provides additional limits when a single claim or combined claims exceed what the underlying policies can pay. Eligibility, limits, and pricing depend on the underlying program.",
    ],
    bullets: [
      "Workers' comp generally required for Nevada employers",
      "Premium driven by payroll and class codes",
      "Umbrella sits above underlying liability policies",
      "Umbrella limits typically start at $1M and go up from there",
      "Both should be reviewed with the rest of the dealership program",
    ],
    stateContext:
      "Workers' compensation requirements, exemptions, and class codes are set by Nevada law and the carrier. Always confirm current requirements with a licensed advisor.",
    goDeeper: ["what-coverages-does-a-nevada-dealer-need", "what-affects-dealership-insurance-cost"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "how-to-start-a-nevada-dealer-insurance-review",
    question: "How do I start a Nevada dealer insurance review?",
    shortAnswer:
      "Gather your current declarations pages, dealer license information, employee count and payroll, lot details, and any open claims. An advisor can then walk through coverages, limits, and the dealer bond in one structured review.",
    stage: "bofu",
    metaDescription:
      "See what to bring to a Nevada dealer insurance review and how XPRT Insurance helps coordinate dealership coverages and the dealer surety bond.",
    paragraphs: [
      "A coverage review is a structured walkthrough of what the dealership currently has, what has changed, and where the program may not match the operation anymore. The goal is education first — understanding the program before deciding what, if anything, to change.",
      "Bringing the right information makes the review more useful. The bond can be reviewed at the same time, including whether to quote and purchase online or coordinate with a larger dealership program.",
    ],
    whatToPrepare: [
      "Current declarations pages for garage liability, physical damage, garagekeepers, workers' comp, and umbrella",
      "Nevada DMV dealer license details and renewal date",
      "Number of employees and approximate annual payroll",
      "Average inventory on lot and customer vehicles in care",
      "Any open or recent claims",
      "Bond renewal date and current bond company",
    ],
    stateContext:
      "Dealership insurance is a Nevada-focused offering for XPRT Insurance. Dealer bonds may be quoted in additional states, but a full dealership program review is positioned for Nevada dealers.",
    goDeeper: ["what-coverages-does-a-nevada-dealer-need", "what-affects-dealership-insurance-cost"],
    readyToAct: "how-to-start-a-nevada-dealer-insurance-review",
    mentionsBond: true,
  },
];

export const DEALERSHIP_FAQ_PREVIEWS = DEALERSHIP_FAQS.map((faq) => ({
  id: faq.slug,
  slug: faq.slug,
  question_en: faq.question,
  short_answer_en: faq.shortAnswer,
  funnel_stage: faq.stage,
}));

export function getDealershipFaq(slug: string) {
  return DEALERSHIP_FAQS.find((faq) => faq.slug === slug);
}

export function getDealershipFaqs(slugs: string[]) {
  return slugs.map(getDealershipFaq).filter(Boolean) as DealershipFaq[];
}

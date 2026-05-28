export type HomeownersFaqStage = "tofu" | "mofu" | "bofu";

export type HomeownersFaq = {
  slug: string;
  question: string;
  shortAnswer: string;
  stage: HomeownersFaqStage;
  metaDescription: string;
  paragraphs: string[];
  whatThisMeans?: string[];
  examples?: string[];
  nvCoNote?: string;
  whatToReview?: string[];
  bullets?: string[];
  stateContext?: string;
  goDeeper: string[];
  readyToAct: string;
  relatedTofu?: string[];
};

const DEFAULT_GO_DEEPER = ["replacement-cost-vs-actual-cash-value", "what-endorsements-should-i-add"];
const DEFAULT_READY = "how-to-review-homeowners-policy-with-an-advisor";
const ALL_TOFU = [
  "what-does-homeowners-insurance-cover",
  "what-is-not-covered-by-homeowners-insurance",
  "how-much-homeowners-insurance-do-i-need",
  "does-homeowners-insurance-cover-flood",
  "should-i-review-my-policy-before-renewal",
];

export function getRelatedTofu(slug: string, limit = 2) {
  return ALL_TOFU.filter((s) => s !== slug).slice(0, limit);
}

export const HOMEOWNERS_FAQS: HomeownersFaq[] = [
  {
    slug: "what-does-homeowners-insurance-cover",
    question: "What does homeowners insurance cover?",
    shortAnswer:
      "Homeowners insurance usually helps protect your home, belongings, personal liability, and additional living expenses after a covered loss. The exact protection depends on your policy limits, deductibles, exclusions, endorsements, carrier rules, and underwriting.",
    stage: "tofu",
    metaDescription:
      "Learn what homeowners insurance usually covers, including dwelling, belongings, liability, and loss of use for Nevada and Colorado homeowners.",
    paragraphs: [
      "A standard homeowners policy is designed to help you recover from certain sudden and accidental losses. It is not a maintenance plan, and it does not cover every type of damage, but it can provide several layers of financial protection when a covered claim happens.",
      "Most policies are built around the home itself, other structures, personal belongings, liability, medical payments to others, and loss of use. The declarations page shows your limits, but the policy form and endorsements explain when those limits actually apply.",
    ],
    bullets: [
      "Dwelling coverage for the main structure of the home",
      "Other structures coverage for detached garages, fences, or sheds",
      "Personal property coverage for belongings, subject to limits and exclusions",
      "Loss of use coverage if a covered claim makes the home temporarily unlivable",
      "Personal liability coverage for certain injury or property damage claims against you",
    ],
    stateContext:
      "Nevada homeowners may need to pay close attention to wind, roof age, water backup, and rebuild cost changes. Colorado homeowners often need to review hail, wildfire exposure, roof endorsements, and replacement cost assumptions.",
    goDeeper: DEFAULT_GO_DEEPER,
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "what-is-not-covered-by-homeowners-insurance",
    question: "What is not covered by homeowners insurance?",
    shortAnswer:
      "Homeowners insurance commonly excludes flood, earth movement, wear and tear, neglect, intentional damage, and some high-value property unless additional coverage is added. Exclusions vary by policy, carrier, endorsements, and underwriting.",
    stage: "tofu",
    metaDescription:
      "Understand common homeowners insurance exclusions and what Nevada and Colorado homeowners should review before a claim.",
    paragraphs: [
      "A homeowners policy can be very helpful, but the most expensive surprises often come from what the policy does not cover. Exclusions are usually listed in the policy form, and endorsements can sometimes add back coverage that is missing or limited.",
      "The key is not to assume that every type of damage to the house is covered. A covered loss normally has to fit the policy language, happen during the policy period, and avoid any applicable exclusions or limitations.",
    ],
    bullets: [
      "Flood or surface water unless a separate flood policy or eligible endorsement applies",
      "Earth movement, including earthquake, landslide, or settling in many policies",
      "Wear and tear, deterioration, faulty maintenance, or gradual damage",
      "Sewer or drain backup unless the policy includes that endorsement",
      "Business property or home-based business exposures beyond small policy sublimits",
      "Jewelry, collectibles, firearms, or other valuables above special limits unless scheduled",
    ],
    stateContext:
      "In Las Vegas and other Nevada communities, flash flooding and sewer backup should be reviewed separately. In Denver and the Colorado Front Range, hail, wildfire, roof settlement provisions, and cosmetic damage limitations deserve close attention.",
    goDeeper: ["does-homeowners-insurance-cover-flood", "what-endorsements-should-i-add"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "how-much-homeowners-insurance-do-i-need",
    question: "How much homeowners insurance do I need?",
    shortAnswer:
      "You generally need enough dwelling coverage to rebuild the home, enough personal property coverage to replace belongings, and enough liability coverage to protect your assets and income. Market value and rebuild cost are not the same thing.",
    stage: "tofu",
    metaDescription:
      "Learn how to think about dwelling, personal property, loss of use, and liability limits for homeowners insurance in Nevada and Colorado.",
    paragraphs: [
      "The right amount of homeowners insurance starts with the cost to rebuild, not the price you paid for the property. Land value, neighborhood demand, and mortgage balance can all be different from the actual cost of labor, materials, permits, debris removal, and code upgrades after a major loss.",
      "A complete review should also consider personal belongings, temporary housing needs, liability exposure, deductibles, and endorsements. If the home has been renovated or construction costs have changed, the old dwelling limit may no longer be a good fit.",
    ],
    bullets: [
      "Review dwelling coverage against current rebuild cost, not just market value",
      "Check whether personal property is replacement cost or actual cash value",
      "Confirm loss of use limits are realistic for local rental and hotel costs",
      "Review liability limits based on assets, income, drivers, pets, pools, and rentals",
      "Ask whether inflation guard, extended replacement cost, or ordinance coverage applies",
    ],
    stateContext:
      "Rebuild costs can move quickly in both Nevada and Colorado. Las Vegas growth, Denver-area labor costs, wildfire rebuilding demand, and roof material pricing can all affect whether your current limit is enough.",
    goDeeper: ["replacement-cost-vs-actual-cash-value", "how-much-liability-coverage-do-i-need"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "does-homeowners-insurance-cover-flood",
    question: "Does homeowners insurance cover flood?",
    shortAnswer:
      "Most standard homeowners policies do not cover flood or surface water. Flood protection usually requires a separate flood insurance policy or a specific flood endorsement if available from the carrier.",
    stage: "tofu",
    metaDescription:
      "Find out why flood is usually excluded from homeowners insurance and what Nevada and Colorado homeowners should review.",
    paragraphs: [
      "Flood coverage is one of the most common misunderstandings in homeowners insurance. A policy may cover some sudden internal water damage, such as a burst pipe, while still excluding water that enters from outside at ground level.",
      "Because flood language is technical, homeowners should review the exact policy definitions. Surface water, overflow of a body of water, mudflow, and water that backs up through drains may be treated differently depending on the policy and endorsements.",
    ],
    bullets: [
      "Standard homeowners policies commonly exclude flood and surface water",
      "Flood insurance may be available through a separate policy",
      "Sewer backup is different from flood and may require its own endorsement",
      "Mortgage requirements do not always mean your risk is low if flood insurance is not required",
    ],
    stateContext:
      "Nevada homeowners in Las Vegas, Henderson, and surrounding areas can still face flash-flood exposure even in desert climates. Colorado homeowners should review flood, snowmelt, wildfire burn-scar runoff, and drainage issues, especially near slopes or waterways.",
    goDeeper: ["what-is-not-covered-by-homeowners-insurance", "what-endorsements-should-i-add"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "should-i-review-my-policy-before-renewal",
    question: "Should I review my homeowners policy before renewal?",
    shortAnswer:
      "Yes. Renewal is one of the best times to review dwelling limits, deductibles, roof coverage, endorsements, discounts, and any life changes that could affect your policy.",
    stage: "tofu",
    metaDescription:
      "See why Nevada and Colorado homeowners should review their policy before renewal, especially after renovations, purchases, or local risk changes.",
    paragraphs: [
      "A renewal notice is more than a bill. It is a chance to confirm that the policy still matches the home, your belongings, your liability exposure, and the current insurance market.",
      "Coverage can become outdated after renovations, new purchases, roof changes, short-term rentals, home business activity, new pets, or major cost increases. A renewal review helps you catch those issues before a claim exposes them.",
    ],
    bullets: [
      "Compare the dwelling limit to updated rebuild cost estimates",
      "Review roof settlement terms, deductibles, and wind or hail provisions",
      "Ask whether sewer backup, service line, or equipment breakdown is included",
      "Update scheduled property for jewelry, art, firearms, or collectibles",
      "Check liability limits and whether an umbrella policy should be discussed",
    ],
    stateContext:
      "For Nevada homeowners, renewal reviews often focus on roof age, water backup, and rebuild costs. For Colorado homeowners, hail, wildfire exposure, roof deductibles, and replacement cost terms are especially important to review.",
    goDeeper: ["replacement-cost-vs-actual-cash-value", "what-endorsements-should-i-add"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "replacement-cost-vs-actual-cash-value",
    question: "What is the difference between replacement cost and actual cash value?",
    shortAnswer:
      "Replacement cost generally pays based on the cost to replace covered property with new materials of like kind and quality, while actual cash value subtracts depreciation. The difference can be significant after a roof, contents, or major property claim.",
    stage: "mofu",
    metaDescription:
      "Compare replacement cost and actual cash value in homeowners insurance and why the difference matters in Nevada and Colorado claims.",
    paragraphs: [
      "Replacement cost and actual cash value affect how a covered claim is valued. If a damaged item is depreciated because of age or condition, the claim payment may be lower under actual cash value than under replacement cost coverage.",
      "Some policies apply replacement cost to the dwelling but actual cash value to roofs, personal property, or certain materials unless endorsements are added. This is why the claim settlement section deserves careful review.",
    ],
    bullets: [
      "Replacement cost focuses on what it costs to replace covered property today",
      "Actual cash value usually subtracts depreciation",
      "Roof claims may be handled differently from other property claims",
      "Personal property replacement cost may require a separate endorsement",
    ],
    stateContext:
      "Roof claim valuation matters in both Nevada and Colorado. Colorado hail exposure and Nevada roof age guidelines can make the difference between replacement cost and actual cash value especially important.",
    goDeeper: ["how-much-homeowners-insurance-do-i-need", "what-endorsements-should-i-add"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "what-endorsements-should-i-add",
    question: "What endorsements should I add to my homeowners policy?",
    shortAnswer:
      "Useful endorsements depend on your home, location, carrier, and risk profile. Common options include water backup, service line, equipment breakdown, scheduled personal property, replacement cost for contents, and extended dwelling replacement cost.",
    stage: "mofu",
    metaDescription:
      "Review common homeowners insurance endorsements that may close coverage gaps for Nevada and Colorado homeowners.",
    paragraphs: [
      "Endorsements modify the base policy. Some add coverage, some limit coverage, and some clarify how a claim is handled. A good review looks at what is missing from the base policy before deciding what to add.",
      "The best endorsement list is personal. A newer home, older roof, finished basement, high-value jewelry, pool, home business, or rental exposure can all change which endorsements should be considered.",
    ],
    bullets: [
      "Water backup or sewer and drain backup",
      "Service line coverage for buried utility lines",
      "Equipment breakdown for certain mechanical or electrical systems",
      "Scheduled personal property for high-value items",
      "Replacement cost for personal property",
      "Extended or guaranteed replacement cost where available",
    ],
    stateContext:
      "Nevada homeowners often ask about water backup, service line, and high-value property. Colorado homeowners frequently need to review roof, hail, wildfire, and extended replacement cost endorsements.",
    goDeeper: ["what-is-not-covered-by-homeowners-insurance", "how-much-liability-coverage-do-i-need"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "how-much-liability-coverage-do-i-need",
    question: "How much personal liability coverage do I need?",
    shortAnswer:
      "Your liability limit should reflect what you need to protect, including assets, income, home equity, rental exposure, pets, pools, and other household risks. Many homeowners review whether higher limits or an umbrella policy make sense.",
    stage: "mofu",
    metaDescription:
      "Learn how to think about personal liability limits in homeowners insurance and when to discuss an umbrella policy.",
    paragraphs: [
      "Personal liability coverage can respond to certain claims alleging that you or covered household members caused injury or property damage to others. The right limit is not the same for every household.",
      "A liability review should consider both obvious risks and lifestyle factors. If your exposure is higher than the homeowners policy limit, an umbrella policy may provide an additional layer of protection.",
    ],
    bullets: [
      "Assets and home equity you want to protect",
      "Income and future earnings exposure",
      "Pools, trampolines, dogs, teen drivers, or frequent guests",
      "Rental, short-term rental, or home business activity",
      "Whether an umbrella policy is available and appropriate",
    ],
    stateContext:
      "Nevada and Colorado homeowners should review liability alongside auto, umbrella, and any rental exposures so coverage is not evaluated in isolation.",
    goDeeper: ["how-much-homeowners-insurance-do-i-need", "what-endorsements-should-i-add"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "how-to-review-homeowners-policy-with-an-advisor",
    question: "How do I get my homeowners policy reviewed by an advisor?",
    shortAnswer:
      "Start by gathering your declarations page, renewal notice, current mortgage requirements, and a list of recent home changes. An advisor can help compare limits, exclusions, deductibles, endorsements, and gaps before renewal or a claim.",
    stage: "bofu",
    metaDescription:
      "Learn what to bring to a homeowners coverage review and how XPRT Insurance helps Nevada and Colorado homeowners review policies.",
    paragraphs: [
      "A policy review is a structured walkthrough of what you currently have, what has changed, and where the policy may not match your risk anymore. It is educational first: the goal is to understand the policy before deciding whether changes are needed.",
      "Before the review, collect the documents and updates that affect coverage. The more accurate the information, the more useful the review will be.",
    ],
    bullets: [
      "Current declarations page and renewal offer",
      "Mortgage or lender insurance requirements",
      "Renovations, roof updates, solar, pools, or major purchases",
      "Questions about water backup, flood, roof, liability, or valuables",
      "Any claim concerns or recent carrier notices",
    ],
    stateContext:
      "XPRT Insurance provides educational coverage reviews for homeowners in Nevada and Colorado, including Las Vegas and Denver-area households.",
    goDeeper: ["should-i-review-my-policy-before-renewal", "what-endorsements-should-i-add"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "water-damage-vs-flood-insurance",
    question: "What's the difference between water damage and flood insurance?",
    shortAnswer:
      "Water damage from a sudden internal source (like a burst pipe or a failed water heater) is usually covered by a homeowners policy. Water that enters the home from outside at ground level — overflowing rivers, flash floods, heavy rain runoff, or storm surge — is considered flood and almost always requires a separate flood policy.",
    stage: "mofu",
    metaDescription:
      "Understand the difference between water damage and flood insurance and which one your Nevada or Colorado homeowners policy actually covers.",
    paragraphs: [
      "One of the most expensive misunderstandings in homeowners insurance is assuming that any water-related loss is covered. The policy language draws a sharp line between water damage and flood, and confusing the two can leave a major loss completely uninsured.",
      "Water damage, in policy terms, is generally sudden and accidental water release from inside the home — a pipe bursts in the wall, a washing-machine hose fails, a water heater ruptures, an upstairs bathroom overflows. Most homeowners policies respond to these losses, often subject to mold sublimits and the requirement that the damage was not gradual.",
      "Flood is water that enters the home from outside at ground level. This includes overflowing creeks and rivers, heavy rain that pools and pushes inside, flash floods, mudflow, and storm surge. It is excluded from virtually every standard homeowners policy in the United States. Flood coverage usually comes from a separate NFIP (National Flood Insurance Program) policy or a private flood carrier.",
      "Sewer or drain backup sits in a third category. It is water that comes up through your pipes from a clogged or overwhelmed municipal line. It is also excluded by default, but most carriers offer a water backup endorsement for $5,000 to $25,000 in coverage that you can add to your policy.",
    ],
    bullets: [
      "Burst pipes and appliance failures: usually covered by homeowners",
      "Ground-level outside water (floods, flash floods, mudflow): requires separate flood policy",
      "Sewer or drain backup: requires a water backup endorsement",
      "Gradual leaks and long-term seepage: excluded as wear, tear, or maintenance",
      "Mold from water damage: often capped at $5,000 unless increased",
    ],
    stateContext:
      "In Las Vegas, Henderson, and the Reno valley, flash flooding during monsoon season is a real exposure even for homes far from a designated flood zone. In Colorado, snowmelt, burn-scar runoff after wildfires, and Front Range thunderstorms produce flood losses every year that homeowners assume are covered until they read the denial letter.",
    goDeeper: ["does-homeowners-insurance-cover-flood", "what-endorsements-should-i-add"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "roof-age-and-homeowners-insurance",
    question: "How does my roof's age affect my homeowners insurance?",
    shortAnswer:
      "Roof age is one of the biggest factors in homeowners insurance pricing, eligibility, and claim settlement. Roofs over 15 years old often shift from replacement cost to actual cash value, may carry higher deductibles, and in some cases can make a home harder to insure at all.",
    stage: "mofu",
    metaDescription:
      "Learn how roof age changes homeowners insurance eligibility, pricing, deductibles, and claim payouts for Nevada and Colorado homeowners.",
    paragraphs: [
      "Carriers care about roof age because the roof is the single most expensive component of most claims. A failed roof leads to interior water damage, mold, structural repairs, and contents losses. Older roofs are statistically more likely to fail, so insurers price and underwrite around their condition.",
      "Once a roof passes roughly 15 years, many carriers change how they pay a roof claim. Instead of replacement cost (paying what a new roof costs today), they switch to actual cash value, which subtracts depreciation. On a 20-year-old asphalt shingle roof, that depreciation can be 60-80% — meaning a $25,000 roof claim might pay out $5,000-$10,000.",
      "Some carriers go further. They may require a separate, higher wind/hail deductible (often 1-2% of dwelling coverage instead of a flat dollar amount), refuse to write new business on roofs over 20 years, or non-renew a policy if a roof inspection shows excessive wear. Wood shake and tile roofs have their own underwriting rules.",
      "If your roof is 10+ years old, ask your advisor three questions before renewal: Is the roof still being settled at replacement cost? What's my wind/hail deductible? And if I had a total roof loss tomorrow, what would the carrier actually pay?",
    ],
    bullets: [
      "Under 10 years: typically full replacement cost, standard deductible",
      "10–15 years: still usually replacement cost, watch for deductible changes",
      "15–20 years: often shifts to actual cash value (ACV)",
      "20+ years: harder to place, may require inspection or roof replacement to renew",
      "Wood shake roofs: many carriers will not write at all",
    ],
    stateContext:
      "Colorado homeowners feel this most. Front Range hail damage drives huge claim volume, so carriers in Denver, Aurora, Colorado Springs, and Boulder have tightened roof rules aggressively — 1-2% percentage deductibles and ACV roof settlement are now common. In Nevada, the issue is sun and wind exposure on Las Vegas valley roofs; carriers are starting to apply similar age-based rules.",
    goDeeper: ["replacement-cost-vs-actual-cash-value", "what-endorsements-should-i-add"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "wildfire-coverage-colorado-homes",
    question: "Does homeowners insurance cover wildfire damage in Colorado?",
    shortAnswer:
      "Yes — standard homeowners insurance generally covers wildfire damage to the home, other structures, and personal property, plus loss of use if you have to evacuate. But coverage limits, defensible-space requirements, and carrier availability have all tightened significantly in high-risk Colorado zones.",
    stage: "tofu",
    metaDescription:
      "Find out how Colorado homeowners insurance handles wildfire damage, evacuation costs, and rebuild — and what to review if you live in a high-risk area.",
    paragraphs: [
      "Wildfire is a covered peril on virtually every standard homeowners policy in Colorado. If a fire damages or destroys your home, the policy responds to the dwelling, other structures, personal property, and additional living expenses while you're displaced. This is the baseline.",
      "The real questions are not whether wildfire is covered, but whether your limits are actually high enough. Post-Marshall Fire and Cameron Peak rebuilds revealed that thousands of Front Range homeowners were 20-40% underinsured on dwelling coverage. Labor shortages, building-code upgrades, debris removal, and lot prep after a wildfire all add cost that a pre-fire limit often does not anticipate.",
      "Loss-of-use coverage matters more than people realize. A wildfire evacuation can last weeks, and a total loss rebuild can take 18-36 months. Standard 20% loss-of-use limits on a $600K dwelling give you $120K — which sounds like a lot until you're paying $4,500/month for a comparable rental, plus storage, pet boarding, and increased commuting costs.",
      "In high-risk Colorado zip codes (mountain communities, the wildland-urban interface around Boulder, Colorado Springs, and Estes Park), insurance is also getting harder to keep. Carriers are non-renewing policies, requiring defensible-space inspections, mandating Class A roof materials, and in some cases withdrawing from the market entirely. The Colorado FAIR Plan launched in 2025 as a last-resort option.",
    ],
    bullets: [
      "Wildfire damage: covered as a standard peril",
      "Smoke damage and ash cleanup: usually covered",
      "Evacuation costs (hotels, meals, pet boarding): covered under loss of use",
      "Defensible-space and Class A roof: increasingly required by carriers",
      "Extended replacement cost endorsement: critical in high-rebuild-cost areas",
      "FAIR Plan: last-resort coverage if no carrier will write the home",
    ],
    stateContext:
      "If you live in Boulder County, Larimer County, El Paso County foothills, or any mountain community, an annual coverage review is no longer optional. Confirm dwelling limit, extended replacement cost percentage, loss-of-use limit, debris removal, and ordinance-or-law coverage. Ask whether your carrier has restrictions on roof material, defensible space, or property condition before renewal.",
    goDeeper: ["how-much-homeowners-insurance-do-i-need", "what-endorsements-should-i-add"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "scheduled-personal-property-jewelry",
    question: "Do I need scheduled personal property for jewelry, watches, or art?",
    shortAnswer:
      "Probably yes if you own valuables worth more than the policy's special limits. Standard homeowners policies cap jewelry, watches, and art coverage at $1,500–$2,500 total per loss, and they exclude common causes like mysterious disappearance. Scheduling each item raises the limit, broadens coverage, and removes the deductible.",
    stage: "mofu",
    metaDescription:
      "Learn when to schedule jewelry, watches, art, or firearms on your homeowners policy and how scheduled personal property coverage works.",
    paragraphs: [
      "Every standard homeowners policy includes personal property coverage — usually 50-70% of your dwelling limit — but tucked inside that coverage are 'special limits' that cap certain high-risk categories. Jewelry, watches, and furs are typically capped at $1,500 total for theft. Firearms and silverware have similar sublimits. Fine art, collectibles, and trading cards have their own rules.",
      "Worse than the low limit is what the base policy does not cover at all. Jewelry losses from 'mysterious disappearance' — the diamond falls out of the setting at the gym, the wedding ring goes missing in a hotel — are generally excluded on the base policy. So is breakage of fragile items, damage during travel, and many causes of loss for art.",
      "Scheduling personal property fixes both problems. You provide an appraisal or proof of value, the carrier adds the item to your policy with its own listed limit, and coverage becomes 'open peril' — meaning almost any cause of loss is covered, including mysterious disappearance, breakage, and damage anywhere in the world. Most scheduled-property endorsements also waive the deductible.",
      "What's worth scheduling? As a rule of thumb: any single item worth over $2,500, anything you'd be heartbroken to lose, and anything you travel with regularly. A $12,000 engagement ring, a $20,000 collection of watches, a $40,000 piece of original art, or a $8,000 hunting rifle collection all belong on a schedule rather than buried in personal property.",
    ],
    bullets: [
      "Base policy limit for jewelry theft: usually $1,500 total",
      "Mysterious disappearance: excluded on base policy, covered on schedule",
      "Worldwide coverage: scheduled items travel with you",
      "Appraisal required: typically within the last 3-5 years",
      "Deductible: usually waived on scheduled items",
      "Categories to consider: jewelry, watches, fine art, firearms, silverware, musical instruments, collectibles",
    ],
    stateContext:
      "Travelers from both Nevada and Colorado should pay attention to worldwide coverage. A piece of jewelry stolen from a Las Vegas hotel room or lost on a ski trip in Vail is almost never fully covered under the base policy — scheduling it is what makes the difference. We also see frequent claims for trading cards, sports memorabilia, and firearms collections that exceed sublimits.",
    goDeeper: ["what-endorsements-should-i-add", "what-is-not-covered-by-homeowners-insurance"],
    readyToAct: DEFAULT_READY,
  },
];

export const HOMEOWNERS_FAQ_PREVIEWS = HOMEOWNERS_FAQS.map((faq) => ({
  id: faq.slug,
  slug: faq.slug,
  question_en: faq.question,
  short_answer_en: faq.shortAnswer,
  funnel_stage: faq.stage,
}));

export const REQUESTED_HOMEOWNERS_FAQ_SLUGS = [
  "what-does-homeowners-insurance-cover",
  "what-is-not-covered-by-homeowners-insurance",
  "how-much-homeowners-insurance-do-i-need",
  "does-homeowners-insurance-cover-flood",
  "should-i-review-my-policy-before-renewal",
];

export function getHomeownersFaq(slug: string) {
  return HOMEOWNERS_FAQS.find((faq) => faq.slug === slug);
}

export function getHomeownersFaqs(slugs: string[]) {
  return slugs.map(getHomeownersFaq).filter(Boolean) as HomeownersFaq[];
}

export function isHomeownersFaqSlug(slug: string) {
  return HOMEOWNERS_FAQS.some((faq) => faq.slug === slug);
}
export type BondsFaqStage = "tofu" | "mofu" | "bofu";

export type BondsFaq = {
  slug: string;
  question: string;
  shortAnswer: string;
  stage: BondsFaqStage;
  metaDescription: string;
  paragraphs: string[];
  whatThisMeans?: string[];
  whatToPrepare?: string[];
  bullets?: string[];
  stateContext?: string;
  goDeeper: string[];
  readyToAct: string;
};

const DEFAULT_GO_DEEPER = [
  "what-information-do-i-need-for-a-bond-quote",
  "what-affects-bond-approval-and-pricing",
];
const DEFAULT_READY = "can-i-quote-and-purchase-my-bond-online";
const ALL_TOFU = [
  "what-is-a-surety-bond",
  "why-do-i-need-a-bond",
  "is-a-bond-the-same-as-insurance",
];

export function getRelatedBondsTofu(slug: string, limit = 2) {
  return ALL_TOFU.filter((s) => s !== slug).slice(0, limit);
}

export const BONDS_FAQS: BondsFaq[] = [
  {
    slug: "what-is-a-surety-bond",
    question: "What is a surety bond?",
    shortAnswer:
      "A surety bond is a three-party guarantee between you (the principal), the entity requiring the bond (the obligee), and the surety company that backs it. It protects the obligee or the public — not you — by guaranteeing you'll meet certain obligations.",
    stage: "tofu",
    metaDescription:
      "Learn how surety bonds work, who the principal, obligee, and surety are, and why bonds protect the public rather than the bonded party.",
    paragraphs: [
      "A surety bond is not traditional insurance. Insurance is designed to protect you when something happens to you. A surety bond protects someone else — typically a government agency, court, or member of the public — from financial harm caused by your actions or non-compliance.",
      "Three parties are involved: the principal (you, the person or business buying the bond), the obligee (the entity requiring the bond), and the surety (the company that issues and backs the bond). If a valid claim is paid by the surety, the principal is generally responsible for paying that money back.",
    ],
    bullets: [
      "Principal — the person or business required to be bonded",
      "Obligee — the agency, court, or party that requires the bond",
      "Surety — the company that issues and stands behind the bond",
      "Claims — paid to the obligee, then typically reimbursed by the principal",
    ],
    stateContext:
      "Bond requirements in Nevada and Colorado are set by the obligee (such as a state board, city, county, or court). Two contractors in the same trade may need very different bonds depending on which agency licenses or regulates them.",
    goDeeper: DEFAULT_GO_DEEPER,
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "why-do-i-need-a-bond",
    question: "Why do I need a bond?",
    shortAnswer:
      "You usually need a bond because a state agency, city, court, or contract requires one before you can be licensed, permitted, or trusted to perform an obligation. The bond gives that party a financial guarantee that you'll follow the rules.",
    stage: "tofu",
    metaDescription:
      "Find out why surety bonds are required for licensing, permits, contracts, and compliance in Nevada and Colorado.",
    paragraphs: [
      "Bonds are most often required by law, regulation, or contract. A licensing agency may require a bond before issuing a contractor, dealer, or notary license. A court may require a bond before approving a fiduciary role. A project owner may require a contract bond before allowing a contractor to start work.",
      "Without the required bond, you typically cannot get the license, permit, or contract. The bond is part of the qualification process — it doesn't replace insurance, but it's a precondition for being allowed to operate.",
    ],
    bullets: [
      "License and permit bonds — required to obtain a regulated license",
      "Contractor bonds — required by state contractor boards",
      "Auto dealer bonds — required to operate as a licensed dealer",
      "Notary bonds — required to be commissioned as a notary",
      "Contract bonds — required by project owners on certain jobs",
      "Court and fiduciary bonds — required by judges in specific cases",
    ],
    stateContext:
      "In Nevada, common bond requirements come from the Nevada State Contractors Board, DMV (dealer bonds), Secretary of State (notary), and local cities. In Colorado, bond requirements often come from DORA, the Department of Revenue (auto industry), municipalities, and courts.",
    goDeeper: DEFAULT_GO_DEEPER,
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "is-a-bond-the-same-as-insurance",
    question: "Is a bond the same as insurance?",
    shortAnswer:
      "No. Insurance is designed to protect you. A surety bond is designed to protect the obligee or the public from your non-compliance. If a bond claim is paid, you're typically expected to reimburse the surety.",
    stage: "tofu",
    metaDescription:
      "Understand the key difference between insurance and a surety bond, and why a bond protects the obligee — not the principal.",
    paragraphs: [
      "Insurance is a two-party agreement between you and your insurance company. When a covered event happens to you, the insurance company pays you. You generally do not pay the claim back.",
      "A surety bond is a three-party agreement. When a valid claim is paid, the surety pays the obligee on your behalf — and then looks to you to be repaid. That's why bonds are technically a form of credit, not insurance.",
    ],
    bullets: [
      "Insurance protects the policyholder",
      "A bond protects the obligee or public",
      "Insurance claims are paid to you",
      "Bond claims are paid to the obligee, then reimbursed by you",
      "Both may be required, but they serve different purposes",
    ],
    stateContext:
      "Many Nevada and Colorado business owners need both insurance and bonds — for example, a contractor may need general liability insurance, workers' compensation, and a contractor license bond.",
    goDeeper: DEFAULT_GO_DEEPER,
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "what-information-do-i-need-for-a-bond-quote",
    question: "What information do I need for a bond quote?",
    shortAnswer:
      "For most standard bonds, you'll need the bond type, the obligee, the required bond amount, the principal's legal name and address, and basic personal information. Larger or specialized bonds may require additional financial details.",
    stage: "mofu",
    metaDescription:
      "See what information you need to start a surety bond quote in Nevada or Colorado, from license and permit bonds to contract bonds.",
    paragraphs: [
      "The most important detail is exactly which bond is being required. The obligee usually specifies the bond name, amount, form number, and effective period. Quoting the wrong form can cause delays or rejection at the agency.",
      "Beyond the bond itself, the surety needs to know who is being bonded. For small standard bonds this can be quick. For larger bonds, contractor license bonds, or contract bonds, the surety may also request financial statements, work history, or indemnitor information.",
    ],
    bullets: [
      "Exact bond name, form, and required amount",
      "Obligee (the agency or party requiring the bond)",
      "Principal's legal business name, address, and entity type",
      "Owner / officer information for personal guarantees",
      "License or application number, if applicable",
      "Financial information for larger or contract bonds",
    ],
    stateContext:
      "Nevada and Colorado obligees often publish the exact bond form they require. Bringing that form to the quote saves time and reduces the chance of issuing the wrong bond.",
    goDeeper: ["what-affects-bond-approval-and-pricing", "what-is-a-surety-bond"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "what-affects-bond-approval-and-pricing",
    question: "What affects bond approval and pricing?",
    shortAnswer:
      "Approval and pricing depend on the bond type, the bond amount, the underwriter's view of risk, and the principal's background. Smaller standard bonds may be approved instantly, while larger bonds rely more on credit and financial review.",
    stage: "mofu",
    metaDescription:
      "Learn how surety bond underwriting works and what factors affect approval and pricing for license, contractor, and commercial bonds.",
    paragraphs: [
      "Bond pricing is generally a percentage of the bond amount, not the full amount. The underwriter looks at the bond type and decides how much risk is involved, which influences both approval and the rate.",
      "For many small license and permit bonds, approval is automated and pricing is fixed. For larger bonds — contractor, contract, or specialized commercial bonds — credit history, business experience, financial strength, and the obligee's claim history can all affect the outcome.",
    ],
    bullets: [
      "Bond type and inherent risk to the surety",
      "Bond amount required by the obligee",
      "Personal credit and financial history of the principal",
      "Business experience and time in the industry",
      "Existing claims, judgments, or licensing actions",
      "For contract bonds, work program, working capital, and bonding history",
    ],
    stateContext:
      "Nevada contractor bonds often look at the contractor's monetary limit and license classification. Colorado bonds may consider DORA licensing history or, for auto dealers, Department of Revenue requirements.",
    goDeeper: ["what-information-do-i-need-for-a-bond-quote", "what-is-a-surety-bond"],
    readyToAct: DEFAULT_READY,
  },
  {
    slug: "can-i-quote-and-purchase-my-bond-online",
    question: "Can I quote and purchase my bond online?",
    shortAnswer:
      "Yes — for many common bond types, you can start the quote, complete the application, and purchase your bond online. Larger or specialized bonds may still require an underwriter to review the application before issuance.",
    stage: "bofu",
    metaDescription:
      "Quote and purchase license, permit, contractor, dealer, notary, fidelity, and other surety bonds online in Nevada and Colorado.",
    paragraphs: [
      "For many standard bonds — license and permit, notary, fidelity, smaller contractor bonds, title bonds, and similar — the online tool walks you through the bond type, amount, and applicant details, then gives you a quote you can purchase right away.",
      "Some bonds require additional underwriting. Larger contract bonds, certain commercial bonds, or applications with specific risk factors may pause for review. In those cases, the application moves to an underwriter and you'll be contacted with next steps.",
    ],
    bullets: [
      "Start the quote online with the correct bond type and amount",
      "Complete the application and personal/business details",
      "Get an instant quote for many standard bonds",
      "Pay and receive the bond electronically when approved",
      "Underwriter review applies for larger or specialized bonds",
    ],
    stateContext:
      "The online tool supports many common Nevada and Colorado bond types, including license, permit, contractor, dealer, notary, fidelity, and document preparation / LDA bonds. Completing a quote does not guarantee approval or issuance.",
    goDeeper: ["what-information-do-i-need-for-a-bond-quote", "what-affects-bond-approval-and-pricing"],
    readyToAct: "can-i-quote-and-purchase-my-bond-online",
  },
];

export const BONDS_FAQ_PREVIEWS = BONDS_FAQS.map((faq) => ({
  id: faq.slug,
  slug: faq.slug,
  question_en: faq.question,
  short_answer_en: faq.shortAnswer,
  funnel_stage: faq.stage,
}));

export function getBondsFaq(slug: string) {
  return BONDS_FAQS.find((faq) => faq.slug === slug);
}

export function getBondsFaqs(slugs: string[]) {
  return slugs.map(getBondsFaq).filter(Boolean) as BondsFaq[];
}

export function isBondsFaqSlug(slug: string) {
  return BONDS_FAQS.some((faq) => faq.slug === slug);
}

export const PROPELLER_QUOTE_URL =
  "https://xprtinsurance.propeller.insure/axelerator-public/";

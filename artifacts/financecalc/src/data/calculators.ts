export interface CalculatorMeta {
  slug: string;
  name: string;
  shortName: string;
  category: string; // category slug
  description: string;
  keywords: string[];
}

export const calculators: CalculatorMeta[] = [
  // LOAN
  { slug: "emi-calculator", name: "EMI Calculator", shortName: "EMI", category: "loan-calculators",
    description: "Calculate Equated Monthly Instalment (EMI) for any loan amount, rate and tenure.",
    keywords: ["emi calculator", "loan emi", "monthly instalment", "loan calculator india"] },
  { slug: "home-loan-calculator", name: "Home Loan Calculator", shortName: "Home Loan", category: "loan-calculators",
    description: "Calculate home loan EMI with full amortisation schedule for Indian banks.",
    keywords: ["home loan emi", "housing loan calculator", "home loan india"] },
  { slug: "personal-loan-calculator", name: "Personal Loan Calculator", shortName: "Personal Loan", category: "loan-calculators",
    description: "Find the EMI and total interest on any personal loan instantly.",
    keywords: ["personal loan emi", "personal loan calculator india"] },
  { slug: "car-loan-calculator", name: "Car Loan Calculator", shortName: "Car Loan", category: "loan-calculators",
    description: "Calculate car loan EMI for new and used vehicle financing in India.",
    keywords: ["car loan emi", "auto loan calculator india"] },
  { slug: "loan-eligibility-calculator", name: "Loan Eligibility Calculator", shortName: "Eligibility", category: "loan-calculators",
    description: "Find out the maximum loan amount you can borrow based on your income.",
    keywords: ["loan eligibility calculator", "how much loan can i get"] },
  // INVESTMENT
  { slug: "sip-calculator", name: "SIP Calculator", shortName: "SIP", category: "investment-calculators",
    description: "Calculate the future value of your monthly SIP in mutual funds.",
    keywords: ["sip calculator", "sip return calculator", "mutual fund sip"] },
  { slug: "fd-calculator", name: "FD Calculator", shortName: "FD", category: "investment-calculators",
    description: "Calculate maturity amount on your fixed deposit with quarterly compounding.",
    keywords: ["fd calculator", "fixed deposit calculator india"] },
  { slug: "rd-calculator", name: "RD Calculator", shortName: "RD", category: "investment-calculators",
    description: "Calculate maturity value of a recurring deposit at any bank or post office.",
    keywords: ["rd calculator", "recurring deposit calculator"] },
  { slug: "cagr-calculator", name: "CAGR Calculator", shortName: "CAGR", category: "investment-calculators",
    description: "Find the compound annual growth rate of any investment over time.",
    keywords: ["cagr calculator", "compound annual growth rate"] },
  { slug: "mutual-fund-calculator", name: "Mutual Fund Returns Calculator", shortName: "Mutual Fund", category: "investment-calculators",
    description: "Calculate future value of a lumpsum mutual fund investment.",
    keywords: ["mutual fund calculator", "lumpsum calculator", "mutual fund returns"] },
  // TAX
  { slug: "gst-calculator", name: "GST Calculator", shortName: "GST", category: "tax-calculators",
    description: "Add or remove GST from any amount at 5%, 12%, 18% or 28% rates.",
    keywords: ["gst calculator india", "gst inclusive exclusive"] },
  { slug: "income-tax-calculator-india", name: "Income Tax Calculator India", shortName: "Income Tax", category: "tax-calculators",
    description: "Calculate income tax under new and old regime for FY 2024-25 with side-by-side comparison.",
    keywords: ["income tax calculator india", "new vs old regime", "fy 2024-25 tax"] },
  { slug: "hra-calculator", name: "HRA Calculator", shortName: "HRA", category: "tax-calculators",
    description: "Calculate maximum HRA exemption you can claim under section 10(13A).",
    keywords: ["hra calculator", "hra exemption", "section 10 13a"] },
  { slug: "tds-calculator", name: "TDS Calculator", shortName: "TDS", category: "tax-calculators",
    description: "Estimate the monthly TDS your employer deducts from your salary.",
    keywords: ["tds calculator on salary", "tds deduction"] },
  // SALARY
  { slug: "in-hand-salary-calculator", name: "In-Hand Salary Calculator", shortName: "In-Hand Salary", category: "salary-calculators",
    description: "Convert your CTC to monthly take-home salary after PF, PT and tax.",
    keywords: ["in hand salary calculator", "ctc to in hand", "take home salary"] },
  { slug: "salary-hike-calculator", name: "Salary Hike Calculator", shortName: "Hike", category: "salary-calculators",
    description: "Calculate your new salary after a hike percentage, or back-calculate the percentage.",
    keywords: ["salary hike calculator", "increment percentage"] },
  { slug: "pf-calculator", name: "PF / EPF Calculator", shortName: "EPF", category: "salary-calculators",
    description: "Project your EPF retirement corpus at the current 8.25% interest rate.",
    keywords: ["epf calculator", "pf calculator india", "provident fund calculator"] },
  // PROPERTY
  { slug: "rent-vs-buy-calculator", name: "Rent vs Buy Calculator", shortName: "Rent vs Buy", category: "property-calculators",
    description: "Compare the long-term cost of renting versus buying a home in India.",
    keywords: ["rent vs buy calculator india", "rent or buy home"] },
  { slug: "stamp-duty-calculator", name: "Stamp Duty Calculator", shortName: "Stamp Duty", category: "property-calculators",
    description: "Calculate stamp duty and registration charges for any Indian state.",
    keywords: ["stamp duty calculator", "registration charges india"] },
  { slug: "roi-calculator", name: "ROI Calculator", shortName: "ROI", category: "property-calculators",
    description: "Calculate absolute and annualised return on investment.",
    keywords: ["roi calculator", "return on investment"] },
];

export function getCalculator(slug: string): CalculatorMeta | undefined {
  return calculators.find((c) => c.slug === slug);
}

export function calculatorsByCategory(category: string): CalculatorMeta[] {
  return calculators.filter((c) => c.category === category);
}

export const popularSlugs = [
  "emi-calculator",
  "sip-calculator",
  "income-tax-calculator-india",
  "home-loan-calculator",
  "fd-calculator",
  "gst-calculator",
  "in-hand-salary-calculator",
  "stamp-duty-calculator",
];

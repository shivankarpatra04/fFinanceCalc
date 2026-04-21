import { Banknote, TrendingUp, FileText, Wallet, Home } from "lucide-react";

export interface Category {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  intro: string;
  icon: typeof Banknote;
  color: string;
}

export const categories: Category[] = [
  {
    slug: "loan-calculators",
    name: "Loan Calculators",
    shortName: "Loan",
    description: "Calculate EMI, eligibility and total interest for every kind of loan in India.",
    icon: Banknote,
    color: "from-blue-500 to-blue-700",
    intro:
      "Loan calculators help you make smart borrowing decisions before you sign on the dotted line. Whether you are buying a home, financing a car, taking a personal loan for a wedding or a business, or checking how much you are eligible to borrow, our calculators show you the EMI, total interest payable and the full repayment cost in seconds. We use the standard Indian EMI formula used by banks like SBI, HDFC, ICICI and Axis. All calculators are free, work without sign-up, and update results in real time as you change inputs. Use these tools to compare offers across lenders, decide on tenure vs interest trade-offs, and plan your monthly cash flow with confidence.",
  },
  {
    slug: "investment-calculators",
    name: "Investment Calculators",
    shortName: "Investment",
    description: "SIP, FD, RD, lumpsum and CAGR calculators tuned for Indian investors.",
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-700",
    intro:
      "Investment calculators turn fuzzy goals into concrete numbers. Want to know how much your monthly SIP will grow to in 15 years? How a fixed deposit compounds quarterly? What CAGR your stock returned over 5 years? These tools answer all of that with the exact formulas used by AMCs and banks in India. Plan retirement, your child's education, a down payment, or simply compare a recurring deposit against a SIP in an index fund. Each calculator visualises growth so you can see the power of compounding at work, and the SEO-friendly explanations break down every input for first-time investors.",
  },
  {
    slug: "tax-calculators",
    name: "Tax Calculators",
    shortName: "Tax",
    description: "Income tax (new and old regime), GST, HRA and TDS calculators for FY 2024-25.",
    icon: FileText,
    color: "from-indigo-500 to-indigo-700",
    intro:
      "Indian tax rules change almost every Budget. Our tax calculators are kept current with the latest slabs, rebates and deductions for FY 2024-25 and AY 2025-26. Compare the new tax regime against the old regime side by side, calculate GST on any invoice with the correct add-or-remove logic, find out how much HRA exemption you can legally claim under section 10(13A), and estimate monthly TDS your employer will deduct. Every calculator is built from the official rules in the Income Tax Act, including the Section 87A rebate, the 4% health and education cess and the standard deduction of ₹75,000 in the new regime.",
  },
  {
    slug: "salary-calculators",
    name: "Salary Calculators",
    shortName: "Salary",
    description: "Convert CTC to in-hand, calculate hikes and project your EPF corpus.",
    icon: Wallet,
    color: "from-cyan-500 to-cyan-700",
    intro:
      "A salary offer in India is rarely what lands in your bank account. Between employer PF, professional tax, gratuity and income tax, the gap between CTC and in-hand salary can be 25-40%. Our salary calculators show you the breakdown clearly: net monthly salary after every statutory deduction, the percentage hike on a new offer, and the projected corpus your Employees' Provident Fund (EPF) will build with the latest interest rate of 8.25% per year. Use these tools when negotiating offers, evaluating a switch, or planning long-term retirement savings through your provident fund.",
  },
  {
    slug: "property-calculators",
    name: "Property Calculators",
    shortName: "Property",
    description: "Rent vs buy, stamp duty and ROI calculators for Indian real estate.",
    icon: Home,
    color: "from-amber-500 to-amber-700",
    intro:
      "Real estate is the single biggest financial decision most Indian families ever make. Should you keep renting or finally buy? How much stamp duty and registration will you pay in Maharashtra, Karnataka, Delhi or Tamil Nadu? What is the actual ROI on a rental property after maintenance, taxes and EMI? Our property calculators answer all three questions with realistic Indian assumptions, including state-wise stamp duty rates, female-buyer concessions where applicable, and long-term appreciation versus rent inflation. They are designed to give you a clear, numbers-first verdict, not a glossy brochure.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

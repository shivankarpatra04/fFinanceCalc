export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: string; // markdown-lite: paragraphs separated by \n\n, lines starting with ## are h2, ### are h3, - are list items
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-emi-is-calculated",
    title: "How EMI is Calculated: Formula and Examples",
    description: "Understand the EMI formula used by Indian banks, with worked examples for home, car and personal loans.",
    date: "2025-02-12",
    readTime: "7 min",
    category: "Loans",
    content: `Equated Monthly Instalment, or EMI, is the fixed amount you pay every month towards a loan. It is the same number for the entire tenure, but the split between principal and interest changes month after month. Understanding how this number is calculated puts you in control of your loan, so you can choose tenure intelligently and spot when a bank is overcharging you.

## The standard EMI formula

Every regulated lender in India uses the same reducing-balance EMI formula:

EMI = P × r × (1+r)^n / ((1+r)^n − 1)

Here P is the loan principal, r is the monthly interest rate (annual rate divided by 12 and then by 100), and n is the total number of monthly instalments. The formula assumes interest is charged on the outstanding balance, which is exactly how home, car and personal loans work in India.

## A worked example

Suppose you take a home loan of ₹40,00,000 at 8.5% per year for 20 years. Then P = 40,00,000, r = 8.5/12/100 = 0.007083, and n = 240. Plugging in:

(1+r)^n = (1.007083)^240 ≈ 5.46
EMI = 40,00,000 × 0.007083 × 5.46 / (5.46 − 1) ≈ ₹34,713

Over 240 months you will pay 240 × 34,713 ≈ ₹83,31,000, which means the interest component alone is around ₹43,31,000. That is more than the loan itself.

## Why the early EMIs are mostly interest

In month one, interest is charged on the full ₹40,00,000. So out of your first EMI of ₹34,713, around ₹28,333 is interest and only ₹6,380 reduces the principal. By month 200 the split is reversed because the outstanding balance has shrunk. This is why prepaying early in the tenure has an outsized effect on total interest.

## Tenure has the biggest impact

Doubling the tenure does not double the interest, it triples or quadruples it. The same ₹40 lakh loan at 8.5% costs around ₹43 lakh in interest over 20 years but only ₹18 lakh over 10 years. The EMI is higher (₹49,592 vs ₹34,713) but the long-term savings are enormous. Use our [EMI calculator](/emi-calculator) to compare different tenures side by side before signing.

## When the formula breaks down

The standard formula assumes a fixed interest rate. Indian floating-rate loans (the default for home loans now) reset every quarter or every six months as the repo rate changes. Banks usually keep your EMI constant and adjust the tenure instead, which means your loan can quietly stretch from 20 to 23 years if rates rise. Always ask for a fresh amortisation schedule after every reset.

## Quick checklist before you sign

- Recalculate the EMI yourself using our [EMI calculator](/emi-calculator) and confirm the bank's number matches
- Check whether the rate is fixed or floating, and what the reset frequency is
- Ask for processing fee, prepayment penalty (zero on floating-rate home loans by RBI rule), and insurance bundling
- See if you can prepay 5-10% in the first 3 years; the interest savings are usually worth it

EMI is a simple formula, but it controls one of the largest cash flows in your life. A few minutes of math can save you lakhs of rupees.`,
  },
  {
    slug: "sip-vs-fd-india",
    title: "SIP vs FD in India: Which is Better in 2025?",
    description: "A clear, numbers-first comparison of Systematic Investment Plans versus Fixed Deposits for Indian savers.",
    date: "2025-03-04",
    readTime: "8 min",
    category: "Investing",
    content: `If you have ₹10,000 a month spare, should you start a SIP in an equity mutual fund or open a recurring deposit at your bank? It is one of the oldest debates in Indian personal finance, and the right answer depends entirely on three things: your time horizon, your risk tolerance, and your tax bracket.

## What each one really is

A Fixed Deposit is a contract: you give a bank a sum of money, and the bank promises a fixed interest rate for a fixed period. Your principal is protected up to ₹5 lakh per bank by DICGC insurance. As of 2025, top private banks pay around 7-7.5% on 1-3 year FDs, and small finance banks go up to 8.5%.

A Systematic Investment Plan in a mutual fund is the opposite: you commit to investing a fixed amount every month into a scheme that buys stocks (equity SIP), bonds (debt SIP) or both. Returns are not guaranteed. Equity SIPs in diversified large-cap funds have historically delivered 11-13% per year over 10+ year periods, though any single year can be deeply negative.

## The numbers, side by side

Suppose you invest ₹10,000 per month for 15 years.

- A recurring deposit at 7% will grow to roughly ₹31.7 lakh, with ₹13.7 lakh as interest.
- A SIP in an equity fund at an assumed 12% return will grow to roughly ₹50.5 lakh, with ₹32.5 lakh as gains.

The gap of ₹19 lakh exists because of compounding on a higher base rate. Use our [SIP calculator](/sip-calculator) and [RD calculator](/rd-calculator) to plug in your own numbers.

## Tax treatment matters more than people think

FD interest is fully taxable at your slab rate. If you are in the 30% bracket, an 8% FD gives you a real return of just 5.6% before inflation.

Equity mutual fund gains are taxed at 12.5% above ₹1.25 lakh per year for long-term holdings (more than one year). Even after tax, equity SIPs typically beat FDs over 10+ year horizons by a wide margin.

## When an FD actually wins

- Your goal is less than 3 years away. Equity is too volatile for short horizons.
- You are a senior citizen who needs stable monthly interest income.
- You absolutely cannot tolerate seeing your portfolio drop 30% in a bad year.
- You have already maxed your equity allocation and need debt for balance.

## When a SIP wins

- Your goal is 7+ years away (retirement, child's education, second home)
- You can keep investing through bear markets without panic-selling
- You are in the 20-30% tax bracket and want compounding to do the work
- You want to beat inflation, which has averaged around 6% in India

## The lazy answer most planners give

Do both. Park your emergency fund and short-term goals in FDs. Send your long-term wealth-building money into equity SIPs. The combination gives you safety where you need it and growth where you can afford the volatility.`,
  },
  {
    slug: "best-tax-saving-options-india",
    title: "Best Tax Saving Options in India 2025",
    description: "A complete guide to legal tax-saving instruments under the old regime, ranked by lock-in and post-tax return.",
    date: "2025-01-22",
    readTime: "9 min",
    category: "Tax",
    content: `If you are still on the old tax regime, you have a powerful set of deductions available under Chapter VI-A of the Income Tax Act. Used well, a salaried employee earning ₹15 lakh can legally cut their tax by ₹70,000 to ₹1.2 lakh a year. Here are the options worth knowing in 2025.

## Section 80C — the ₹1.5 lakh anchor

Section 80C is the biggest single deduction at ₹1,50,000 a year. It is a buffet of options:

- ELSS (Equity Linked Saving Schemes) — equity mutual funds with a 3-year lock-in. Highest return potential and shortest lock-in in 80C. Long-term capital gains taxed at 12.5% above ₹1.25 lakh.
- PPF (Public Provident Fund) — 15-year lock-in, currently 7.1% tax-free. Sovereign-guaranteed.
- EPF employee contribution — 12% of basic salary, automatic. Currently earning 8.25%.
- Tax-saving FDs — 5-year lock-in. Interest is fully taxable, so post-tax returns are weak.
- Life insurance premium, principal portion of home loan EMI, NSC, Sukanya Samriddhi, NPS Tier 1 (also under 80CCD)

ELSS plus EPF is the standard combo for most salaried Indians.

## Section 80D — health insurance

You can claim up to ₹25,000 for a self-spouse-children health insurance policy, plus ₹25,000 (₹50,000 if senior citizens) for parents. So a family with senior parents can save tax on ₹75,000 of premium. Health insurance is essential anyway, the deduction is a bonus.

## Section 80CCD(1B) — extra ₹50,000 for NPS

Over and above 80C, you can invest up to ₹50,000 in the National Pension System and claim it under 80CCD(1B). NPS is locked till age 60, with 60% withdrawable as a tax-free lump sum and 40% mandatorily annuitised. Cost ratios are very low (under 0.10%) and you can choose your equity allocation up to 75%.

## Section 24(b) — home loan interest

If you have a home loan on a self-occupied property, the interest portion of your EMI is deductible up to ₹2,00,000 per year under Section 24(b). On a let-out property, the entire interest is deductible (subject to ₹2 lakh loss set-off cap). This is on top of 80C, which covers the principal portion.

## HRA exemption — a quiet giant

If you live in rented accommodation and have HRA in your salary, use Section 10(13A). The exemption is the lowest of: actual HRA received, rent paid minus 10% of basic salary, or 50% of basic salary in metros (40% in non-metros). For someone with a basic of ₹6 lakh living in Mumbai paying ₹25,000 monthly rent, this can easily exempt ₹2-3 lakh from tax. Use our [HRA calculator](/hra-calculator) to compute it precisely.

## Should you switch to the new regime?

The new regime has lower slabs but no deductions (except standard ₹75,000 and employer NPS). For most people earning under ₹15 lakh with no home loan and no major 80C investments beyond EPF, the new regime is now better. For those with home loan + ₹1.5 lakh 80C + ₹50,000 NPS + HRA, the old regime usually still wins. Run both with our [income tax calculator](/income-tax-calculator-india) before filing.

## A quick year-end checklist

- By 31 March, exhaust 80C, 80D and 80CCD(1B)
- Submit rent receipts and home loan interest certificate to your employer in January for accurate TDS
- Don't overpay for life insurance just to fill 80C — ELSS is usually a better option
- Choose between regimes only after running real numbers, not by gut feel`,
  },
  {
    slug: "how-to-improve-credit-score",
    title: "How to Improve Your Credit Score in India",
    description: "Practical, proven steps to raise your CIBIL score from average to excellent within 6-12 months.",
    date: "2025-01-08",
    readTime: "6 min",
    category: "Credit",
    content: `Your credit score, usually measured by CIBIL TransUnion in India, is a three-digit number between 300 and 900 that determines whether banks lend to you, at what rate, and how quickly. A score above 750 unlocks the best home and personal loan rates. Below 650, you may be quietly rejected without a clear reason. Here is how to actually improve it.

## Pay every EMI and credit card bill on time

Payment history accounts for the largest weight in your CIBIL score. A single 30-day delayed payment can drop your score by 50-80 points and stays on your report for years. Set up auto-debit or reminder calendars for every EMI and credit card statement. Pay at least the minimum due even in tight months.

## Keep credit utilisation below 30%

Credit utilisation is the ratio of your outstanding card balance to your total credit limit. If you have a ₹2 lakh card limit and you carry a ₹1.4 lakh balance every month, your utilisation is 70% and your score will suffer even if you pay on time. Aim to keep monthly billed amounts under 30% of your limit. The fastest fix is to ask for a limit increase or get a second card.

## Don't close your oldest credit card

The age of your credit history matters. Closing the very first credit card you opened ten years ago shrinks your average account age and can knock 30-50 points off your score. Keep old cards active with a small recurring purchase like a streaming subscription.

## Maintain a healthy mix

A score built only on credit cards is weaker than one with a card, a personal loan and a home loan. You don't need to take loans you don't need, but if you already have a mix, keep it healthy.

## Check your report quarterly for errors

CIBIL is required to give you one free credit report per year. Errors are common: a closed loan still showing open, an overdue marker on a settled account, identity mix-ups with someone of the same name. Dispute any incorrect entries through CIBIL's online portal; corrections typically reflect within 30-45 days.

## Avoid multiple loan applications in a short period

Every loan or credit card application triggers a hard inquiry on your report. Five applications in a month make you look credit-hungry and can drop your score by 25 points. If you are shopping for a home loan, do all your applications within a 14-day window so they are clubbed as one inquiry.

## Settle is not the same as close

If you are unable to pay a defaulted loan and the bank offers a "settlement" for a smaller amount, your CIBIL report will be tagged with "Settled" or "Written Off". This is worse than a missed payment and stays for 7 years. Wherever possible, pay the full amount and get a "Closed" status.

## Realistic timelines

Going from 600 to 750 typically takes 9-18 months of consistent good behaviour. There is no shortcut. Beware anyone promising to "fix" your score for a fee — only your own payment behaviour over time can do that.`,
  },
  {
    slug: "home-loan-tips-india",
    title: "Home Loan Tips for First-Time Buyers in India",
    description: "Eight things every first-time home buyer in India should know before signing a sanction letter.",
    date: "2025-02-26",
    readTime: "8 min",
    category: "Loans",
    content: `A home loan is usually the largest financial commitment of your life. The difference between a well-negotiated loan and a default offer can be ₹15-20 lakh over 20 years on a ₹50 lakh loan. Here is what first-time buyers should know before signing.

## 1. Negotiate the rate, not just the EMI

Banks publish a "card rate" but lend at much lower spreads to good-profile borrowers. A salaried employee with a ₹1+ lakh CIBIL score, a stable job at a listed company, and a co-applicant can usually get the floor RLLR + spread that the bank advertises. Ask for written confirmation of the spread, not just the current rate, because the rate floats with repo.

## 2. Choose tenure carefully

Banks push 25-30 year tenures because the EMI looks small and they earn more interest. But a 20-year loan instead of 30 years saves you 35-50% in total interest while the EMI is only 15% higher. Use our [home loan calculator](/home-loan-calculator) to compare tenure scenarios.

## 3. Floating rate is now the default

Since October 2019, all new home loans from banks are linked to an external benchmark, typically the RBI repo rate (RLLR). Your rate resets every 3 months. There is zero prepayment penalty on floating-rate loans by RBI rule. NBFC home loans may still be on PLR, where prepayment penalties can apply.

## 4. Don't ignore the processing fee and "other charges"

Processing fee is usually 0.25-1% of the loan amount, often capped. But there are hidden costs: legal verification, technical valuation, stamp duty on the loan agreement, CERSAI charge, and sometimes a "documentation fee". Ask for the full list in writing.

## 5. Insurance bundling is optional, not mandatory

Banks aggressively cross-sell loan-protection insurance, often a single-premium policy that gets added to your loan. RBI has clarified this cannot be made mandatory. A pure-term life insurance policy of equal cover, bought separately, is far cheaper and more transparent.

## 6. Prepay aggressively in the first 7 years

Since interest is front-loaded, every rupee of prepayment in years 1-7 saves much more interest than the same prepayment in year 15. If you get an annual bonus, send 30-50% of it to the loan as a part-prepayment. This single habit can knock 5-7 years off your tenure.

## 7. Tax benefits, but don't optimise only for tax

Home loan interest gives a deduction of up to ₹2 lakh under Section 24(b) and principal up to ₹1.5 lakh under 80C. These reduce the effective cost of borrowing. But never take a larger loan just to maximise tax benefit; the post-tax interest cost still beats any deduction.

## 8. Read the sanction letter cover to cover

The sanction letter spells out the rate, spread, tenure, processing fee, insurance bundling, and conditions for disbursement. Take 24 hours, read every clause, and ask the relationship manager to explain anything in plain language. Once you sign, your leverage to negotiate vanishes.

A home loan well-chosen is just a tool. Poorly chosen, it can quietly drain your peace of mind for two decades.`,
  },
  {
    slug: "gst-explained-simply",
    title: "GST Explained Simply for Indian Consumers",
    description: "What GST really is, how the four rates work, and how to read a GST invoice without confusion.",
    date: "2024-12-18",
    readTime: "5 min",
    category: "Tax",
    content: `Goods and Services Tax replaced a tangle of central excise, service tax, VAT, octroi and entry taxes in July 2017. It is now the single indirect tax on almost everything you buy in India. Here is a plain-English explanation.

## A destination-based tax

GST is charged where the customer consumes the goods or service, not where the seller is located. If a Mumbai company sells software to a Bengaluru customer, the GST goes to Karnataka. This is why every invoice has a "place of supply" line.

## CGST, SGST, IGST — the three components

When you buy something within your own state, the GST is split equally into Central GST and State GST. A ₹1,000 product at 18% GST shows ₹90 CGST and ₹90 SGST.

When you buy across states, there is no split. The whole 18% becomes IGST (Integrated GST). This is just an accounting mechanism — for you the customer the rate is identical.

## The four standard rates

- 5% — essentials and mass-market services like packaged food, footwear under ₹1,000, economy air tickets, restaurant takeaway under ₹7,500/day room tariff
- 12% — processed food, business class tickets, mobile phones (until recently), some chemicals
- 18% — the default rate for most services and goods including soaps, computers, restaurants in 7,500+ rooms, telecom, banking and insurance services
- 28% — luxury and sin goods like cars, ACs, refrigerators, premium hotels, betting, tobacco. A cess on top is added for some categories like cars and tobacco.

A small set of items is exempt — fresh fruit, vegetables, milk, education, healthcare and books are all GST-free.

## Reading a GST invoice

A valid GST invoice for B2C must show: seller's name and GSTIN, buyer's name (above ₹50,000), HSN/SAC code, taxable value, GST rate, GST amount split into CGST/SGST or IGST, and total. Always check the GSTIN format (15 characters: 2 state code + 10 PAN + 1 entity + 1 default + 1 check digit). Use our [GST calculator](/gst-calculator) to extract or add GST from any amount.

## What changed for consumers

For most items the effective tax is roughly the same as before GST. Some categories like white goods became cheaper (cement was 31%, now 28%) and some services became more expensive (telecom and insurance were 15%, now 18%). The bigger gain is supply-chain efficiency: trucks no longer queue at state borders, and businesses can claim input tax credit across states, which over time reduces wholesale prices.

## Common confusions

- MRP includes GST. The MRP printed on packaged goods cannot have tax added on top.
- Restaurants charge 5% GST without input credit (or 18% for fine-dining/AC). Service charge is separate and not mandatory.
- E-commerce platforms collect GST on behalf of the seller and remit it; you don't pay extra.
- Composition dealers (small businesses with turnover under ₹1.5 crore) cannot show GST on the invoice and cannot collect it from you.

GST is not perfect but it has unified India's indirect tax. For consumers, knowing the rate slabs and how to read an invoice is enough.`,
  },
  {
    slug: "personal-loan-guide",
    title: "Complete Personal Loan Guide for India",
    description: "When to take a personal loan, how to compare lenders, and the traps to avoid.",
    date: "2025-03-15",
    readTime: "7 min",
    category: "Loans",
    content: `A personal loan is unsecured, paperwork-light credit. No collateral, no end-use restriction, disbursal often within 24 hours. Convenience comes at a cost: rates are typically 10-22% per year, far higher than home or car loans. Here is when it makes sense and how to not overpay.

## When a personal loan is the right tool

- Medical emergencies where insurance falls short
- Consolidating multiple high-interest credit card balances into one EMI at lower rate
- Genuine home renovation or wedding expenses where you have a clear repayment plan
- Bridging a known cash flow gap (you have an annual bonus coming)

## When it is the wrong tool

- Buying a depreciating asset like the latest phone
- Going on a vacation
- Investing in stocks or crypto (this is the worst possible reason)
- Topping up a down payment because you cannot afford the home loan you wanted

## What lenders look for

- CIBIL score above 720 for the best rates; below 650 most lenders will reject you
- Net monthly income of at least ₹25,000-30,000 for salaried, ₹3-5 lakh annual profit for self-employed
- Total EMI obligations (existing + this new loan) should not exceed 50-55% of your net monthly income
- Stable job — at least 1-2 years in current employment

## How rates are quoted

Lenders quote either reducing balance or flat rate. Always compare on reducing balance. A "flat rate" of 10% is roughly equivalent to 18-19% on reducing balance for a 3-year loan, because flat-rate calculation pretends the principal never reduces. The Annual Percentage Rate (APR) including processing fee is the right number to compare.

## Processing fees and other charges

Processing fee is 1-3% of the loan amount, often non-refundable. Some fintech lenders advertise low rates but bundle a steep processing fee that pushes the effective cost higher. Ask for the APR inclusive of all charges.

## Prepayment

Most banks allow part-prepayment after 6-12 months with a 2-5% penalty. Some new-age lenders allow zero-cost prepayment from day one. If you expect to prepay, choose the second category even if the headline rate is slightly higher.

## Top-up loans

If you already have a home loan in good standing, ask for a top-up instead of a fresh personal loan. Top-up rates are usually 1.5-2% above the home loan rate (so 9.5-10% vs 14-18% for a personal loan), tenure can be longer, and processing is faster. The catch: it adds to your home loan exposure.

## A simple rule

Never take a personal loan to fund consumption you cannot otherwise afford. Calculate the EMI honestly with our [personal loan calculator](/personal-loan-calculator), check that it fits within 30% of your in-hand salary, and have a written prepayment plan before you sign.`,
  },
  {
    slug: "best-sip-for-beginners",
    title: "Best SIP Plans for Beginners in India",
    description: "How a first-time investor should pick mutual fund SIPs, with category guidance and a simple starter portfolio.",
    date: "2025-02-02",
    readTime: "8 min",
    category: "Investing",
    content: `If you are starting your first SIP this year, the good news is you do not need a complex portfolio. Most beginners are far better served by 2-3 well-chosen funds held for 10+ years than by a basket of fifteen "best of 2024" picks. Here is a simple framework.

## Step 1: Choose category before fund

The mistake new investors make is searching "best mutual fund 2025" and picking whichever name appears at the top. Always choose category first based on your goal and risk tolerance:

- Index funds (Nifty 50, Nifty Next 50) — passive, low cost (0.1-0.3% expense ratio), match the market. Good default for beginners.
- Large-cap active funds — invest in top 100 companies. Lower volatility than mid/small. Good core.
- Flexi-cap funds — manager has freedom to invest across market caps. Diversified single-fund option.
- Mid-cap and small-cap funds — higher long-term return potential, much higher short-term volatility. Add only as a small slice once you are comfortable.
- ELSS — equity funds with 3-year lock-in, qualifying for 80C deduction. Useful if you are on the old tax regime.

## Step 2: A simple starter portfolio

For someone investing ₹10,000 a month for 10+ years, a perfectly reasonable starter mix is:

- ₹6,000 in a Nifty 50 index fund (UTI, HDFC, ICICI all offer one)
- ₹3,000 in a flexi-cap or large-and-midcap fund from a top AMC
- ₹1,000 in a Nifty Next 50 index fund

This gives you broad market exposure, low cost, and one growth-tilted slice. No more than 3-4 funds in total. You can always add specialised funds later.

## Step 3: Pick funds with discipline

Do not chase last year's top performer; mean reversion is real in mutual funds. Look for funds that have been around for at least 7-10 years, with the same fund manager for at least 3-5 years, and that consistently rank in the top 30% of their category over rolling 5-year periods. Expense ratio matters more than people think — over 20 years, a 1% lower expense ratio can mean 20% more wealth.

## Step 4: Direct over Regular

Always choose the Direct plan, not Regular. Regular plans pay 0.5-1.0% commission to the distributor every year, paid out of your returns. Direct plans bought through Coin, Groww, Kuvera, MF Central or AMC websites have zero commission. Over 20 years this compounds to 15-20% extra wealth.

## Step 5: Increase the SIP every year

A SIP of ₹10,000 today should be ₹11,000-12,000 next year as your income rises. This step-up SIP can double your final corpus over 20 years compared to a flat SIP. Most platforms let you set up an annual auto-step-up.

## Step 6: Stop checking daily

The biggest predictor of investor returns is behaviour, not fund selection. Investors who check their portfolio weekly underperform those who check it twice a year by 1-2% per year because they panic-sell during corrections. Set up the SIP, configure the auto-debit, and look at the portfolio every six months.

## Use our calculator

Plug your monthly amount, expected return and time horizon into our [SIP calculator](/sip-calculator) to see what your wealth could grow to. A small change in monthly amount or duration creates a huge change in final corpus. That is the power of compounding, and the gift of starting early.`,
  },
  {
    slug: "how-to-save-salary-monthly",
    title: "How to Save Money from Your Monthly Salary",
    description: "A realistic, India-specific framework for saving 20-30% of your salary every month without feeling deprived.",
    date: "2025-03-22",
    readTime: "7 min",
    category: "Personal Finance",
    content: `If you earn ₹60,000 in hand and reach the end of the month with nothing saved, you are not alone — but you also do not need a finance degree to fix it. The principles that work for Indian salaried earners are simple, repeatable and have nothing to do with budgeting apps. Here is a realistic plan.

## Pay yourself first

The single most powerful habit: the day your salary credits, transfer 20-30% to a separate savings account or SIP, before you pay any bill. If you save what is left at month-end, the answer will always be zero. Set up an automatic transfer on the 2nd of every month.

## The 50-30-20 rule, adapted for India

The classic rule says spend 50% on needs, 30% on wants and save 20%. In Indian metros where rent eats 25-35% alone, a more realistic split for someone earning ₹60,000 is:

- 55% on needs (rent, groceries, utilities, transport, insurance premiums)
- 25% on wants (eating out, entertainment, shopping, gadgets)
- 20% on savings and investments (SIP, EPF, FD)

If your needs are over 65%, the only sustainable fix is to reduce rent (move slightly outside the city, find a flatmate) or grow income. Cutting "wants" alone rarely creates lasting savings.

## Build an emergency fund first

Before any equity investment, build 4-6 months of essential expenses in a high-yield savings account or short-term FD. This buffer is what stops one medical bill or job loss from spiralling into credit card debt. A common mistake is starting SIPs before having an emergency fund.

## Automate everything you can

- SIP on the 5th of the month for your equity savings
- EPF is automatic if you are salaried
- Recurring deposit for short-term goals
- Auto-credit your credit card bill in full from your salary account

Automation removes the daily decision of whether to save. The money is gone before you can spend it.

## The biggest leak: lifestyle inflation

When your salary rises from ₹60,000 to ₹80,000, the temptation is to upgrade rent, phone, dining out and weekend trips. If you upgrade everything proportionally, you save the same percentage but never build wealth. The simple rule: when your salary rises, save at least 50% of the increment before you adjust your lifestyle.

## Trim the small recurring leaks

Audit one full bank statement and one credit card statement. Look for: subscriptions you don't use (OTT services, gym memberships), bank charges, expensive insurance bundled with bank accounts, daily ride-hailing for short distances. Small leaks of ₹300-500 add up to ₹4,000-6,000 a month.

## Use tax savings as forced investing

Section 80C investments (ELSS, EPF, PPF) double as savings and tax cuts. A salaried earner in the 20% slab who invests ₹1.5 lakh in ELSS saves ₹30,000 in tax and builds wealth simultaneously.

## Track once a month, not daily

Spend an hour at month-end checking how the previous month went. Did you hit your savings target? Where did unexpected spends come from? This 12-times-a-year review is enough; daily tracking causes burnout.

Use our [in-hand salary calculator](/in-hand-salary-calculator) to first understand exactly what hits your account, then work backwards to your savings target. The amount you save matters far less than the consistency.`,
  },
  {
    slug: "rent-vs-buy-in-india",
    title: "Rent vs Buy a House in India: Complete Guide",
    description: "A clear framework, with real numbers, for deciding whether to keep renting or buy your home.",
    date: "2025-01-28",
    readTime: "9 min",
    category: "Property",
    content: `The "buy a house as soon as possible" advice from older generations is not always right anymore. Indian residential prices in many metros have grown only 4-6% per year over the last decade, while equity SIPs have grown 12-13%. The math is closer than it used to be. Here is how to think about it honestly.

## What renting really costs

If you pay ₹35,000 monthly rent and rent rises 8% per year, over 20 years you will pay roughly ₹1.92 crore in rent. That looks like a frightening number — until you compare with what buying actually costs.

## What buying really costs

For the same house worth ₹1.5 crore today, with a 20% down payment of ₹30 lakh and a ₹1.2 crore home loan at 8.5% for 20 years:

- EMI: ₹1,04,141 per month
- Total EMI over 20 years: ₹2.50 crore
- Stamp duty + registration (≈7%): ₹10.5 lakh
- Maintenance + property tax + insurance over 20 years: ₹25-30 lakh
- Total cash outflow: ₹3.16 crore approx

If the house appreciates at 6% per year, it will be worth ₹4.81 crore in 20 years. So you net roughly ₹1.65 crore (₹4.81 cr minus your ₹3.16 cr outflow), and you owned a roof.

## Now compare the renter who invests

A renter who pays ₹35k rent (rising 8% annually) and invests the difference between EMI and rent into equity at 12% per year:

- Down payment of ₹30 lakh + monthly savings of ~₹70k (EMI minus rent) compounded at 12%
- Final corpus after 20 years: roughly ₹4.3-4.7 crore

In other words, the renter-investor often ends up at roughly the same wealth as the buyer, sometimes slightly more. The difference is non-financial: the buyer has the security and flexibility of a home; the renter has more liquidity and mobility.

## When buying clearly wins

- You are sure you will stay in the same city for 8+ years
- You have a 25-30% down payment ready and the EMI is under 35% of your in-hand salary
- You are buying a home you actually want to live in long-term, not "as an investment"
- The rent for an equivalent house is more than 4% of the property's price (price-to-rent ratio < 25)

## When renting wins

- You are early-career and likely to switch cities or jobs
- The price-to-rent ratio in your city is over 30 (common in Bengaluru, Mumbai, parts of NCR), meaning rent is very cheap relative to price
- You don't have a 20% down payment yet and would have to take a personal loan or stretch tenure
- The home you can afford to buy is far worse than the home you can afford to rent

## The 5% rule shortcut

Calculate 5% of the property's price per year. That is roughly the annual cost of ownership (interest + maintenance + property tax + opportunity cost of down payment). If annual rent for the same house is much lower, renting wins financially. If annual rent is close to or above 5%, buying wins.

For a ₹1.5 crore house, 5% is ₹7.5 lakh per year, or ₹62,500 per month. If the same house rents for ₹35,000, renting is far cheaper financially.

## Use our calculator

Run your specific numbers in our [rent vs buy calculator](/rent-vs-buy-calculator). Adjust the appreciation rate (be conservative, 5-6% is realistic in most Indian cities now) and rent inflation (6-8%). The right answer depends on your city, your job stability, and how much you value the non-financial security of a home.

There is no universally right answer. There is only the right answer for your specific situation, and it deserves more than a 5-minute conversation with a relative.`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

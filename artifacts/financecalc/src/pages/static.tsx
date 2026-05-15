import { Helmet } from "react-helmet-async";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { Mail, Github, Instagram, Linkedin } from "lucide-react";
import { trackEvent } from "@/components/GoogleAnalytics";

function StaticPage({ title, description, slug, children }: { title: string; description: string; slug: string; children: React.ReactNode }) {
  const url = `https://indiancalc.com/${slug}`;

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="IndianCalc" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: title }]))}
        </script>
      </Helmet>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <h1 className="mt-4 text-3xl md:text-4xl font-bold">{title}</h1>
      <div className="mt-6 prose prose-sm md:prose-base max-w-none dark:prose-invert text-foreground/85">
        {children}
      </div>
    </div>
  );
}


export const aboutMetadata = {
  alternates: {
    canonical: 'https://indiancalc.com/about',
  },
};

export function AboutPage() {
  return (
    <StaticPage title="About Us | IndianCalc - India's Trusted Finance Calculator" slug="about" description="Learn about IndianCalc.com - Our mission to provide accurate, free, and transparent financial tools for every Indian.">
      <p>IndianCalc.com was founded in 2024 by a team of Indian financial enthusiasts and software developers who were frustrated by the state of online financial tools. Most "Indian" finance calculators we found were either cluttered with intrusive ads, hidden behind sign-up walls, or used outdated tax slabs and interest rate assumptions.</p>
      
      <h2>Our Mission</h2>
      <p>Our mission is simple: <strong>To provide every Indian with access to accurate, professional-grade financial calculators for free, with zero friction.</strong> We believe that financial literacy begins with clear numbers. Whether you are a fresh graduate trying to understand your first salary slip, a young couple planning their dream home, or a retiree optimizing their FD returns, you deserve tools that are honest, fast, and technically precise.</p>

      <h2>What Makes Us Different?</h2>
      <ul>
        <li><strong>Technical Accuracy:</strong> Our calculators don't just "estimate." We use the exact mathematical formulas used by major Indian banks and NBFCs for EMI and ROI. Our tax engines are meticulously updated for the latest <strong>FY 2025-26 (AY 2026-27)</strong> tax slabs under both the New and Old regimes.</li>
        <li><strong>India-Specific Logic:</strong> We understand the nuances of the Indian financial landscape—from the specific rules of HRA exemptions and the RBI's repo-rate linked lending (EBLR) to the complexities of GST and the Employee Provident Fund (EPF).</li>
        <li><strong>Privacy-First Philosophy:</strong> Financial data is sensitive. That is why every calculation on IndianCalc happens <strong>locally in your browser</strong>. Your salary, loan amounts, and tax details never touch our servers. We don't want your phone number, and we don't sell your leads to banks.</li>
        <li><strong>No Dark Patterns:</strong> You won't find fake "limited time offers" or "talk to an expert" pop-ups here. We provide the tools, and you make the decisions.</li>
      </ul>

      <h2>Editorial Standards</h2>
      <p>Content on IndianCalc.com is researched and written by our in-house editorial team. Every article and calculator formula is fact-checked against official sources including the <strong>Reserve Bank of India (RBI)</strong>, the <strong>Income Tax Department of India</strong>, and the <strong>Association of Mutual Funds in India (AMFI)</strong>. We update our data monthly to reflect changes in the Repo Rate, PF interest rates (currently 8.25%), and statutory changes.</p>

      <h2>Funding & Transparency</h2>
      <p>To keep IndianCalc free for everyone, we use lightweight, non-intrusive display advertisements (Google AdSense). We do not accept payment for "ranking" certain banks or products in our calculators. Our results are strictly mathematical.</p>

      <h2>The Team</h2>
      <p>Based in Bengaluru, India, our team consists of Chartered Accountants, former bankers, and full-stack developers dedicated to building the "Calculator Infrastructure" for Digital India. We are passionate about making complex finance simple for the next billion users.</p>

      <div className="bg-muted p-4 rounded-lg mt-8 text-sm italic">
        <strong>Disclaimer:</strong> While we strive for 100% accuracy, calculators on this site are for informational purposes only. Financial decisions involve risk; please consult a SEBI-registered advisor or a qualified CA before making significant commitments.
      </div>
    </StaticPage>
  );
}

export const contactMetadata = {
  alternates: {
    canonical: 'https://indiancalc.com/contact',
  },
};

export function ContactPage() {
  return (
    <StaticPage title="Contact Us | IndianCalc" slug="contact" description="Get in touch with the IndianCalc team for queries, feedback or support.">
      <p>Found a bug? Want a calculator we don't cover yet? Have a suggestion or correction? We would love to hear from you.</p>
      
      <div className="my-8 p-6 bg-card rounded-lg border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 mt-0">Send us a message</h2>
        <form 
          className="space-y-4" 
          action="https://formsubmit.co/shivankarpatra09@gmail.com" 
          method="POST"
          onSubmit={() => trackEvent("Form", "Submit", "Contact Us")}
        >
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_next" value="https://indiancalc.com/contact" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input type="text" id="name" name="name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Your name" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input type="email" id="email" name="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="your@email.com" required />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
            <input type="text" id="subject" name="subject" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="What is this regarding?" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea id="message" name="message" className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="How can we help you?" required></textarea>
          </div>
          <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full md:w-auto">
            Submit Message
          </button>
        </form>
      </div>

      <h2>Email</h2>
      <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> <a href="mailto:shivankarpatra09@gmail.com" className="hover:underline">shivankarpatra09@gmail.com</a></p>
      <h2>Social</h2>
      <p>Follow us for updates when tax slabs change, new calculators ship, or important RBI notifications affect EMIs.</p>
      <ul>
        <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-primary" /> <a href="https://www.instagram.com/shivankar_patra" target="_blank" rel="noopener noreferrer" className="hover:underline">@shivankar_patra</a></li>
        <li className="flex items-center gap-2"><Linkedin className="h-4 w-4 text-primary" /> <a href="https://www.linkedin.com/in/shivankar-patra/" target="_blank" rel="noopener noreferrer" className="hover:underline">shivankar-patra</a></li>
        <li className="flex items-center gap-2"><Github className="h-4 w-4 text-primary" /> <a href="https://github.com/shivankarpatra04" target="_blank" rel="noopener noreferrer" className="hover:underline">shivankarpatra04</a></li>
      </ul>
      <h2>Response time</h2>
      <p>We aim to reply within 24-48 hours. For urgent corrections (especially around tax calculations), please mark your email as URGENT in the subject line.</p>
    </StaticPage>
  );
}

export const privacyMetadata = {
  alternates: {
    canonical: 'https://indiancalc.com/privacy-policy',
  },
};

export function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy | IndianCalc" slug="privacy-policy" description="Read our privacy policy to understand how IndianCalc collects and uses your data.">
      <p className="text-sm text-muted-foreground mb-6">Last updated: April 25, 2025</p>
      <p>IndianCalc.com respects your privacy. This page explains what we do — and what we don't do — with information when you use our calculators.</p>
      <h2>What we do not collect</h2>
      <p>Every calculation on this site happens entirely in your browser. We never transmit, store, or log your salary, loan amount, investment amount, tax inputs, or any other number you type into a calculator. Once you close the tab, your data is gone.</p>
      <h2>Local storage</h2>
      <p>To make the site convenient, we store your favorite calculators, recently used calculators and dark-mode preference in your browser's local storage. You can clear this any time via your browser settings; we cannot access it.</p>
      <h2>Cookies and analytics</h2>
      <p>We use Google Analytics 4 to understand which pages are popular and where users drop off. Analytics data is anonymous and aggregated. We do not use cookies for advertising tracking ourselves.</p>
      <h2>Advertising</h2>
      <p>This site displays advertisements served by Google AdSense. Google may use cookies to serve ads based on your prior visits to this site or other sites. You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ad Settings</a>.</p>
      <h2>Third-party links</h2>
      <p>Our blog and calculators sometimes link to RBI, Income Tax Department, AMFI and other authoritative sources. We are not responsible for the privacy practices of those sites.</p>
      <h2>Children</h2>
      <p>IndianCalc.com is intended for users above 18. We do not knowingly collect data from minors.</p>
      <h2>Changes</h2>
      <p>If we update this policy, we will revise the "Last updated" date above. Substantial changes will be highlighted on the homepage for two weeks.</p>
      <h2>Contact</h2>
      <p>Questions about privacy? Write to <a href="mailto:shivankarpatra09@gmail.com">shivankarpatra09@gmail.com</a>.</p>
    </StaticPage>
  );
}

export const termsMetadata = {
  alternates: {
    canonical: 'https://indiancalc.com/terms-of-service',
  },
};

export function TermsPage() {
  return (
    <StaticPage title="Terms of Service | IndianCalc" slug="terms-of-service" description="Terms and conditions governing the use of IndianCalc.com finance tools.">
      <p className="text-sm text-muted-foreground mb-6">Last updated: April 25, 2025</p>
      <h2>Acceptance</h2>
      <p>By using IndianCalc.com, you agree to these Terms of Use. If you do not agree, please do not use the site.</p>
      <h2>Use of calculators</h2>
      <p>The calculators on this site are provided as informational tools only. They use widely accepted formulas and the latest published tax rates and rules, but results may differ from those produced by your bank, employer or the Income Tax Department because of rounding, surcharges, special circumstances, or rule interpretations. Always verify with a qualified professional before acting on a calculation.</p>
      <h2>No financial advice</h2>
      <p>Nothing on IndianCalc.com constitutes financial, investment, tax or legal advice. We are not SEBI-registered investment advisers, chartered accountants or lawyers. Use the calculators to inform your thinking, not to replace professional counsel.</p>
      <h2>Intellectual property</h2>
      <p>All content, logos, code, calculators and articles on this site are owned by IndianCalc.com or its licensors. You may share links freely. Republishing full articles or embedding calculators commercially requires written permission.</p>
      <h2>Acceptable use</h2>
      <p>Do not attempt to scrape, reverse-engineer, abuse, or overload the service. Do not use the site to break any law or to impersonate IndianCalc.com.</p>
      <h2>Limitation of liability</h2>
      <p>IndianCalc.com is provided "as is" without warranty of any kind. To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental or consequential losses arising from your use of the site or its calculators.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts at Bangalore, Karnataka.</p>
      <h2>Changes</h2>
      <p>We may update these terms periodically. Continued use of the site constitutes acceptance of the revised terms.</p>
    </StaticPage>
  );
}

export const disclaimerMetadata = {
  alternates: {
    canonical: 'https://indiancalc.com/disclaimer',
  },
};

export function DisclaimerPage() {
  return (
    <StaticPage title="Disclaimer | IndianCalc" slug="disclaimer" description="Financial disclaimer for IndianCalc.com - our tools are for informational purposes only.">
      <p className="text-sm text-muted-foreground mb-6">Last updated: April 25, 2025</p>
      <h2>For information only</h2>
      <p>The calculators, articles, charts and content on IndianCalc.com are provided strictly for general informational and educational purposes. They are not intended as, and shall not be considered, financial, investment, tax, accounting or legal advice.</p>
      <h2>Accuracy</h2>
      <p>We work hard to keep all calculators current — including the FY 2025-26 income tax slabs (new and old regime), the prevailing 8.25% EPF interest rate, and state-wise stamp duty as of March 2025. However, tax rules, interest rates and statutory rates change frequently. Before acting on any number from this site, verify it with the latest notifications from the Reserve Bank of India, the Income Tax Department, your state government and your own financial institution.</p>
      <h2>Professional advice</h2>
      <p>Investment, tax and borrowing decisions are personal and depend on factors unique to you. Consult a SEBI-registered investment adviser, a chartered accountant, or a qualified mortgage broker before making any major financial commitment.</p>
      <h2>No solicitation</h2>
      <p>IndianCalc.com does not promote any specific bank, NBFC, mutual fund house, insurance company or financial product. Display advertisements on the site are served by third parties and do not constitute endorsements.</p>
      <h2>Past performance</h2>
      <p>Investment calculators (SIP, mutual fund, lumpsum, CAGR) require you to enter an expected return assumption. Past returns are not indicative of future performance. Equity and debt markets can be volatile; your actual returns may be materially lower than the assumed rate.</p>
      <h2>External links</h2>
      <p>Our content may include links to RBI, IT Department, AMFI, SEBI and other external sites. We do not endorse and are not responsible for the content, accuracy or privacy practices of those sites.</p>
      <h2>No liability</h2>
      <p>IndianCalc.com and its operators disclaim all liability for any loss, damage or inconvenience arising directly or indirectly from reliance on the information presented on this site.</p>
    </StaticPage>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  }
}

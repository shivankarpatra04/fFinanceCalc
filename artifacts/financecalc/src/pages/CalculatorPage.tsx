import { useRoute } from "wouter";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { calculatorRegistry } from "@/calculators/registry";
import NotFound from "./not-found";

export const metadata = {
  alternates: {
    canonical: 'https://indiancalc.com/fd-calculator',
  },
};


export function CalculatorPage() {
  const [, params] = useRoute("/:slug");
  const slug = params?.slug || "";
  const Comp = calculatorRegistry[slug];
  if (!Comp) return <NotFound />;
  return (
    <CalculatorLayout slug={slug}>
      <Comp />
    </CalculatorLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  }
}

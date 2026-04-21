import { useState } from "react";
import { FieldNumber, ResultRow, CalcGrid, InputCard, ResultCard, formatINR } from "./shared";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { newRegimeTax } from "./tax";

export function InHandSalaryCalculator() {
  const [ctc, setCtc] = useState(1500000);
  const [basicPct, setBasicPct] = useState(40);
  const [pt, setPt] = useState(2400);

  const basic = (ctc * basicPct) / 100;
  const employerPF = Math.min(basic, 1800 * 12 / 0.12) * 0.12;
  const gratuity = basic * 0.0481;
  const grossAnnual = ctc - employerPF - gratuity;
  const employeePF = employerPF;
  const taxable = Math.max(0, ctc - 75000 - employerPF); // new regime simplified
  const tax = newRegimeTax(taxable);
  const cess = tax * 0.04;
  const annualTax = tax + cess;
  const inHandAnnual = grossAnnual - employeePF - pt - annualTax;
  const inHandMonthly = inHandAnnual / 12;

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Annual CTC" value={ctc} onChange={setCtc} prefix="₹" min={100000} max={50000000} step={10000} sliderMin={300000} sliderMax={5000000} />
        <FieldNumber label="Basic Salary % of CTC" value={basicPct} onChange={setBasicPct} suffix="%" min={20} max={60} step={1} sliderMin={30} sliderMax={50} />
        <FieldNumber label="Annual Professional Tax" value={pt} onChange={setPt} prefix="₹" min={0} max={5000} step={100} sliderMin={0} sliderMax={2500} />
      </InputCard>
      <ResultCard>
        <ResultRow label="In-Hand (Monthly)" value={formatINR(inHandMonthly)} highlight />
        <ResultRow label="In-Hand (Annual)" value={formatINR(inHandAnnual)} />
        <ResultRow label="Gross Salary (Annual)" value={formatINR(grossAnnual)} />
        <ResultRow label="Employer PF" value={formatINR(employerPF)} />
        <ResultRow label="Gratuity Accrual" value={formatINR(gratuity)} />
        <ResultRow label="Employee PF" value={formatINR(employeePF)} />
        <ResultRow label="Income Tax (New Regime)" value={formatINR(annualTax)} />
        <p className="text-xs text-muted-foreground mt-3">Uses new tax regime + standard deduction ₹75,000. Switch to old regime in our income tax calculator for full deductions.</p>
      </ResultCard>
    </CalcGrid>
  );
}

export function SalaryHikeCalculator() {
  const [mode, setMode] = useState<"hike" | "percent">("hike");
  const [current, setCurrent] = useState(50000);
  const [hikePct, setHikePct] = useState(20);
  const [newSalary, setNewSalary] = useState(65000);

  const result = mode === "hike"
    ? { newAmt: current * (1 + hikePct / 100), increment: current * (hikePct / 100), pct: hikePct }
    : { newAmt: newSalary, increment: newSalary - current, pct: ((newSalary - current) / current) * 100 };

  return (
    <CalcGrid>
      <InputCard>
        <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hike">Find New Salary</TabsTrigger>
            <TabsTrigger value="percent">Find Hike %</TabsTrigger>
          </TabsList>
        </Tabs>
        <FieldNumber label="Current Salary" value={current} onChange={setCurrent} prefix="₹" min={1000} max={10000000} step={500} sliderMin={10000} sliderMax={500000} />
        {mode === "hike" ? (
          <FieldNumber label="Hike %" value={hikePct} onChange={setHikePct} suffix="%" min={-50} max={200} step={0.5} sliderMin={0} sliderMax={100} />
        ) : (
          <FieldNumber label="New Salary" value={newSalary} onChange={setNewSalary} prefix="₹" min={1000} max={10000000} step={500} sliderMin={10000} sliderMax={500000} />
        )}
      </InputCard>
      <ResultCard>
        <ResultRow label="New Salary" value={formatINR(result.newAmt)} highlight />
        <ResultRow label="Increment Amount" value={formatINR(result.increment)} />
        <ResultRow label="Hike Percentage" value={`${result.pct.toFixed(2)}%`} />
      </ResultCard>
    </CalcGrid>
  );
}

export function PFCalculator() {
  const [basic, setBasic] = useState(50000);
  const [age, setAge] = useState(25);
  const [retire, setRetire] = useState(58);
  const [growth, setGrowth] = useState(7);
  const [rate, setRate] = useState(8.25);
  const [current, setCurrent] = useState(0);

  const years = Math.max(0, retire - age);
  let balance = current;
  let salary = basic;
  for (let y = 0; y < years; y++) {
    const annualContrib = salary * 12 * 0.24; // employee 12% + employer 12% (simplified)
    balance = (balance + annualContrib) * (1 + rate / 100);
    salary *= 1 + growth / 100;
  }

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Current Monthly Basic + DA" value={basic} onChange={setBasic} prefix="₹" min={1000} max={500000} step={500} sliderMin={5000} sliderMax={150000} />
        <FieldNumber label="Current Age" value={age} onChange={setAge} suffix="years" min={18} max={60} step={1} sliderMin={18} sliderMax={60} />
        <FieldNumber label="Retirement Age" value={retire} onChange={setRetire} suffix="years" min={40} max={70} step={1} sliderMin={50} sliderMax={70} />
        <FieldNumber label="Annual Salary Growth" value={growth} onChange={setGrowth} suffix="%" min={0} max={20} step={0.5} sliderMin={0} sliderMax={15} />
        <FieldNumber label="EPF Interest Rate" value={rate} onChange={setRate} suffix="%" min={5} max={12} step={0.05} sliderMin={6} sliderMax={10} />
        <FieldNumber label="Current EPF Balance" value={current} onChange={setCurrent} prefix="₹" min={0} max={100000000} step={1000} sliderMin={0} sliderMax={5000000} />
      </InputCard>
      <ResultCard>
        <ResultRow label="EPF Corpus at Retirement" value={formatINR(balance)} highlight />
        <ResultRow label="Years to Retirement" value={`${years} years`} />
        <ResultRow label="Total Contributions" value={formatINR((balance > current ? balance - current : 0) * 0.5)} />
        <p className="text-xs text-muted-foreground mt-3">Simplified projection assuming 24% combined contribution on full basic. Actual EPS allocation reduces lump sum but adds monthly pension.</p>
      </ResultCard>
    </CalcGrid>
  );
}

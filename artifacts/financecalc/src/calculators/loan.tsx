import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { FieldNumber, ResultRow, CalcGrid, InputCard, ResultCard, emi, formatINR } from "./shared";

const COLORS = ["hsl(221 83% 53%)", "hsl(160 84% 39%)"];

function PieView({ principal, interest }: { principal: number; interest: number }) {
  const data = [
    { name: "Principal", value: principal },
    { name: "Interest", value: interest },
  ];
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip formatter={(v: number) => formatINR(v)} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm" style={{background: COLORS[0]}} /> Principal</div>
        <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm" style={{background: COLORS[1]}} /> Interest</div>
      </div>
    </div>
  );
}

function LoanForm({ defaults }: { defaults: { p: number; r: number; t: number; pMax?: number; rMax?: number } }) {
  const [p, setP] = useState(defaults.p);
  const [r, setR] = useState(defaults.r);
  const [t, setT] = useState(defaults.t);

  const months = t * 12;
  const monthly = useMemo(() => emi(p, r, months), [p, r, months]);
  const total = monthly * months;
  const interest = total - p;

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Loan Amount" value={p} onChange={setP} prefix="₹" min={10000} max={defaults.pMax ?? 100000000} step={10000} sliderMin={50000} sliderMax={defaults.pMax ?? 50000000} />
        <FieldNumber label="Interest Rate (p.a.)" value={r} onChange={setR} suffix="%" min={1} max={defaults.rMax ?? 30} step={0.05} sliderMin={1} sliderMax={defaults.rMax ?? 24} />
        <FieldNumber label="Tenure" value={t} onChange={setT} suffix="years" min={1} max={30} step={1} sliderMin={1} sliderMax={30} />
      </InputCard>
      <ResultCard>
        <ResultRow label="Monthly EMI" value={formatINR(monthly)} highlight />
        <ResultRow label="Principal" value={formatINR(p)} />
        <ResultRow label="Total Interest" value={formatINR(interest)} />
        <ResultRow label="Total Payment" value={formatINR(total)} />
        <PieView principal={p} interest={interest} />
      </ResultCard>
    </CalcGrid>
  );
}

export function EMICalculator() {
  return <LoanForm defaults={{ p: 1000000, r: 9, t: 5 }} />;
}
export function HomeLoanCalculator() {
  return <LoanForm defaults={{ p: 5000000, r: 8.5, t: 20, pMax: 100000000 }} />;
}
export function PersonalLoanCalculator() {
  return <LoanForm defaults={{ p: 500000, r: 14, t: 4, pMax: 4000000, rMax: 28 }} />;
}
export function CarLoanCalculator() {
  return <LoanForm defaults={{ p: 800000, r: 9.5, t: 5, pMax: 5000000, rMax: 18 }} />;
}

export function LoanEligibilityCalculator() {
  const [income, setIncome] = useState(100000);
  const [existing, setExisting] = useState(0);
  const [foir, setFoir] = useState(50);
  const [r, setR] = useState(8.5);
  const [t, setT] = useState(20);

  const maxEmi = Math.max(0, (income * foir) / 100 - existing);
  const months = t * 12;
  const rMonth = r / 12 / 100;
  const maxLoan = rMonth === 0 ? maxEmi * months : (maxEmi * (Math.pow(1 + rMonth, months) - 1)) / (rMonth * Math.pow(1 + rMonth, months));

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Net Monthly Income" value={income} onChange={setIncome} prefix="₹" min={10000} max={2000000} step={1000} sliderMin={20000} sliderMax={500000} />
        <FieldNumber label="Existing Monthly EMIs" value={existing} onChange={setExisting} prefix="₹" min={0} max={500000} step={500} sliderMin={0} sliderMax={100000} />
        <FieldNumber label="FOIR (% of income for EMIs)" value={foir} onChange={setFoir} suffix="%" min={20} max={70} step={1} sliderMin={20} sliderMax={70} />
        <FieldNumber label="Interest Rate" value={r} onChange={setR} suffix="%" min={5} max={20} step={0.1} sliderMin={5} sliderMax={20} />
        <FieldNumber label="Tenure" value={t} onChange={setT} suffix="years" min={1} max={30} step={1} sliderMin={1} sliderMax={30} />
      </InputCard>
      <ResultCard>
        <ResultRow label="Max Loan Eligibility" value={formatINR(maxLoan)} highlight />
        <ResultRow label="Max Monthly EMI" value={formatINR(maxEmi)} />
        <ResultRow label="Income Used for EMI" value={`${foir}%`} />
        <p className="mt-4 text-xs text-muted-foreground">
          Banks typically use FOIR of 50-55% for higher incomes, 35-45% for lower brackets. Adding a co-applicant or reducing existing EMIs can boost eligibility significantly.
        </p>
      </ResultCard>
    </CalcGrid>
  );
}

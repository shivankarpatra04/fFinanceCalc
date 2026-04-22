import { useState, useMemo } from "react";
import { FieldNumber, ResultRow, CalcGrid, InputCard, ResultCard, formatINR } from "./shared";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function GSTCalculator() {
  const [mode, setMode] = useState<"add" | "remove">("add");
  const [amount, setAmount] = useState(1000);
  const [rate, setRate] = useState(18);

  const { base, gst, total, cgst, sgst } = useMemo(() => {
    if (mode === "add") {
      const gst = (amount * rate) / 100;
      return { base: amount, gst, total: amount + gst, cgst: gst / 2, sgst: gst / 2 };
    } else {
      const base = (amount * 100) / (100 + rate);
      const gst = amount - base;
      return { base, gst, total: amount, cgst: gst / 2, sgst: gst / 2 };
    }
  }, [mode, amount, rate]);

  return (
    <CalcGrid>
      <InputCard>
        <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">Add GST</TabsTrigger>
            <TabsTrigger value="remove">Remove GST</TabsTrigger>
          </TabsList>
        </Tabs>
        <FieldNumber label={mode === "add" ? "Base Amount" : "Total Amount (incl. GST)"} value={amount} onChange={setAmount} prefix="₹" min={1} max={100000000} step={100} sliderMin={100} sliderMax={1000000} />
        <div className="space-y-2">
          <Label className="text-sm font-medium">GST Rate</Label>
          <div className="flex gap-2">
            {[5, 12, 18, 28].map((r) => (
              <button key={r} type="button" onClick={() => setRate(r)} className={`flex-1 py-2 rounded-md border text-sm font-medium ${rate === r ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>{r}%</button>
            ))}
          </div>
        </div>
      </InputCard>
      <ResultCard>
        <ResultRow label={mode === "add" ? "Total (incl. GST)" : "Base (excl. GST)"} value={formatINR(mode === "add" ? total : base)} highlight />
        <ResultRow label="Base Amount" value={formatINR(base)} />
        <ResultRow label="GST Amount" value={formatINR(gst)} />
        <ResultRow label="CGST (intra-state)" value={formatINR(cgst)} />
        <ResultRow label="SGST (intra-state)" value={formatINR(sgst)} />
        <ResultRow label="IGST (inter-state)" value={formatINR(gst)} />
      </ResultCard>
    </CalcGrid>
  );
}

function newRegimeTax(taxable: number): number {
  // FY 2025-26 (post Budget 2024) slabs
  let tax = 0;
  const slabs: [number, number][] = [
    [400000, 0], [400000, 0.05], [400000, 0.10], [400000, 0.15], [400000, 0.20], [400000, 0.25],
  ];
  let remaining = taxable;
  for (const [limit, rate] of slabs) {
    if (remaining <= 0) break;
    const portion = Math.min(remaining, limit);
    tax += portion * rate;
    remaining -= portion;
  }
  if (remaining > 0) tax += remaining * 0.30;
  // 87A rebate (up to ₹25,000 for income up to ₹7L)
  if (taxable <= 700000) tax = Math.max(0, tax - 25000);
  if (tax < 0) tax = 0;
  return tax;
}

function oldRegimeTax(taxable: number): number {
  let tax = 0;
  if (taxable > 250000) tax += Math.min(taxable - 250000, 250000) * 0.05;
  if (taxable > 500000) tax += Math.min(taxable - 500000, 500000) * 0.20;
  if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
  // Section 87A rebate (old regime): up to ₹12,500 if taxable ≤ ₹5L
  if (taxable <= 500000) tax = Math.max(0, tax - 12500);
  if (tax < 0) tax = 0;
  return tax;
}

export function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1500000);
  const [d80c, setD80c] = useState(150000);
  const [d80d, setD80d] = useState(25000);
  const [dNps, setDNps] = useState(50000);
  const [hra, setHra] = useState(0);
  const [homeLoan, setHomeLoan] = useState(0);

  const newTaxable = Math.max(0, income - 75000);
  const newTax = newRegimeTax(newTaxable);
  const newCess = newTax * 0.04;
  const newTotal = newTax + newCess;

  const oldTaxable = Math.max(0, income - 50000 - d80c - d80d - dNps - hra - Math.min(homeLoan, 200000));
  const oldTax = oldRegimeTax(oldTaxable);
  const oldCess = oldTax * 0.04;
  const oldTotal = oldTax + oldCess;

  const winner = newTotal < oldTotal ? "New" : "Old";
  const savings = Math.abs(newTotal - oldTotal);

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Annual Salary (Gross)" value={income} onChange={setIncome} prefix="₹" min={100000} max={50000000} step={10000} sliderMin={300000} sliderMax={5000000} />
        <FieldNumber label="80C Investments (PPF, ELSS, EPF)" value={d80c} onChange={setD80c} prefix="₹" min={0} max={150000} step={1000} sliderMin={0} sliderMax={150000} />
        <FieldNumber label="80D Health Insurance" value={d80d} onChange={setD80d} prefix="₹" min={0} max={100000} step={500} sliderMin={0} sliderMax={75000} />
        <FieldNumber label="80CCD(1B) NPS" value={dNps} onChange={setDNps} prefix="₹" min={0} max={50000} step={500} sliderMin={0} sliderMax={50000} />
        <FieldNumber label="HRA Exemption" value={hra} onChange={setHra} prefix="₹" min={0} max={1000000} step={1000} sliderMin={0} sliderMax={500000} />
        <FieldNumber label="Home Loan Interest (24b)" value={homeLoan} onChange={setHomeLoan} prefix="₹" min={0} max={500000} step={1000} sliderMin={0} sliderMax={200000} />
      </InputCard>
      <ResultCard>
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-3 mb-3">
          <div className="text-xs text-muted-foreground">Recommended</div>
          <div className="text-base font-bold text-emerald-700 dark:text-emerald-400">{winner} Regime — saves {formatINR(savings)}</div>
        </div>
        <h3 className="text-sm font-semibold mt-2 mb-1">New Regime (FY 2025-26)</h3>
        <ResultRow label="Taxable Income" value={formatINR(newTaxable)} />
        <ResultRow label="Tax + 4% Cess" value={formatINR(newTotal)} />
        <h3 className="text-sm font-semibold mt-3 mb-1">Old Regime</h3>
        <ResultRow label="Taxable Income" value={formatINR(oldTaxable)} />
        <ResultRow label="Tax + 4% Cess" value={formatINR(oldTotal)} />
      </ResultCard>
    </CalcGrid>
  );
}

export function HRACalculator() {
  const [basic, setBasic] = useState(600000);
  const [hraReceived, setHraReceived] = useState(300000);
  const [rentPaid, setRentPaid] = useState(240000);
  const [metro, setMetro] = useState("yes");

  const a = hraReceived;
  const b = Math.max(0, rentPaid - 0.1 * basic);
  const c = (metro === "yes" ? 0.5 : 0.4) * basic;
  const exempt = Math.min(a, b, c);
  const taxable = Math.max(0, hraReceived - exempt);

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Annual Basic Salary" value={basic} onChange={setBasic} prefix="₹" min={10000} max={20000000} step={1000} sliderMin={100000} sliderMax={3000000} />
        <FieldNumber label="HRA Received (annual)" value={hraReceived} onChange={setHraReceived} prefix="₹" min={0} max={10000000} step={1000} sliderMin={0} sliderMax={1500000} />
        <FieldNumber label="Annual Rent Paid" value={rentPaid} onChange={setRentPaid} prefix="₹" min={0} max={10000000} step={1000} sliderMin={0} sliderMax={1500000} />
        <div className="space-y-2">
          <Label className="text-sm font-medium">Living in metro? (Delhi/Mumbai/Kolkata/Chennai)</Label>
          <Select value={metro} onValueChange={setMetro}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes — Metro (50%)</SelectItem>
              <SelectItem value="no">No — Non-metro (40%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </InputCard>
      <ResultCard>
        <ResultRow label="HRA Exemption" value={formatINR(exempt)} highlight />
        <ResultRow label="Taxable HRA" value={formatINR(taxable)} />
        <p className="text-xs text-muted-foreground mt-3 mb-2">Least of three is exempt:</p>
        <ResultRow label="Actual HRA received" value={formatINR(a)} />
        <ResultRow label="Rent − 10% of basic" value={formatINR(b)} />
        <ResultRow label={`${metro === "yes" ? "50" : "40"}% of basic`} value={formatINR(c)} />
      </ResultCard>
    </CalcGrid>
  );
}

export function TDSCalculator() {
  const [income, setIncome] = useState(1200000);
  const [regime, setRegime] = useState<"new" | "old">("new");
  const [d80c, setD80c] = useState(0);

  const taxable = regime === "new"
    ? Math.max(0, income - 75000)
    : Math.max(0, income - 50000 - Math.min(d80c, 150000));
  const tax = regime === "new" ? newRegimeTax(taxable) : oldRegimeTax(taxable);
  const cess = tax * 0.04;
  const annual = tax + cess;
  const monthly = annual / 12;

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Annual Salary" value={income} onChange={setIncome} prefix="₹" min={100000} max={50000000} step={10000} sliderMin={300000} sliderMax={5000000} />
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tax Regime</Label>
          <Select value={regime} onValueChange={(v) => setRegime(v as any)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New (FY 2025-26)</SelectItem>
              <SelectItem value="old">Old</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {regime === "old" && (
          <FieldNumber label="80C Deductions" value={d80c} onChange={setD80c} prefix="₹" min={0} max={150000} step={1000} sliderMin={0} sliderMax={150000} />
        )}
      </InputCard>
      <ResultCard>
        <ResultRow label="Monthly TDS" value={formatINR(monthly)} highlight />
        <ResultRow label="Annual Tax" value={formatINR(annual)} />
        <ResultRow label="Taxable Income" value={formatINR(taxable)} />
        <ResultRow label="Income Tax" value={formatINR(tax)} />
        <ResultRow label="4% Cess" value={formatINR(cess)} />
      </ResultCard>
    </CalcGrid>
  );
}

export { newRegimeTax, oldRegimeTax };

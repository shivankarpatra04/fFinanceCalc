import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { FieldNumber, ResultRow, CalcGrid, InputCard, ResultCard, formatINR } from "./shared";

const DONUT_COLORS = ["hsl(221 83% 53%)", "hsl(160 84% 39%)"];

function Donut({ a, b, labelA, labelB }: { a: number; b: number; labelA: string; labelB: string }) {
  const total = a + b;
  const fracA = total > 0 ? a / total : 0;
  const angA = fracA * 360;
  const r = 70, ir = 45, cx = 100, cy = 100;
  const arc = (start: number, end: number) => {
    const s = (start - 90) * Math.PI / 180;
    const e = (end - 90) * Math.PI / 180;
    const large = end - start > 180 ? 1 : 0;
    const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s);
    const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
    const x3 = cx + ir * Math.cos(e), y3 = cy + ir * Math.sin(e);
    const x4 = cx + ir * Math.cos(s), y4 = cy + ir * Math.sin(s);
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${ir} ${ir} 0 ${large} 0 ${x4} ${y4} Z`;
  };
  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <svg viewBox="0 0 200 200" width="200" height="200">
          {total > 0 && <path d={arc(0, angA)} fill={DONUT_COLORS[0]} />}
          {total > 0 && <path d={arc(angA, 360)} fill={DONUT_COLORS[1]} />}
        </svg>
      </div>
      <div className="flex items-center justify-center gap-4 text-xs mt-2">
        <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm" style={{background: DONUT_COLORS[0]}} /> {labelA}</div>
        <div className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm" style={{background: DONUT_COLORS[1]}} /> {labelB}</div>
      </div>
    </div>
  );
}

function GrowthChart({ data }: { data: { year: number; invested: number; value: number }[] }) {
  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ left: -10, right: 10, top: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis tickFormatter={(v) => v >= 1e7 ? (v/1e7).toFixed(1)+"Cr" : (v/1e5).toFixed(1)+"L"} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v: number) => formatINR(v)} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="invested" name="Invested" stroke="hsl(221 83% 53%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="value" name="Value" stroke="hsl(160 84% 39%)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SIPCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);

  const { fv, invested, gain, data } = useMemo(() => {
    const i = rate / 12 / 100;
    const n = years * 12;
    const fv = i === 0 ? monthly * n : monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = monthly * n;
    const data = [];
    for (let y = 1; y <= years; y++) {
      const m = y * 12;
      const v = i === 0 ? monthly * m : monthly * ((Math.pow(1 + i, m) - 1) / i) * (1 + i);
      data.push({ year: y, invested: monthly * m, value: Math.round(v) });
    }
    return { fv, invested, gain: fv - invested, data };
  }, [monthly, years, rate]);

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Monthly Investment" value={monthly} onChange={setMonthly} prefix="₹" min={500} max={500000} step={500} sliderMin={1000} sliderMax={100000} />
        <FieldNumber label="Investment Period" value={years} onChange={setYears} suffix="years" min={1} max={40} step={1} sliderMin={1} sliderMax={40} />
        <FieldNumber label="Expected Return Rate" value={rate} onChange={setRate} suffix="% p.a." min={1} max={30} step={0.5} sliderMin={4} sliderMax={20} />
      </InputCard>
      <ResultCard>
        <ResultRow label="Future Value" value={formatINR(fv)} highlight />
        <ResultRow label="Invested Amount" value={formatINR(invested)} />
        <ResultRow label="Wealth Gained" value={formatINR(gain)} />
        <Donut a={invested} b={gain} labelA="Invested" labelB="Returns" />
        <GrowthChart data={data} />
      </ResultCard>
    </CalcGrid>
  );
}

export function FDCalculator() {
  const [p, setP] = useState(500000);
  const [r, setR] = useState(7.25);
  const [t, setT] = useState(5);
  const [n, setN] = useState(4); // compounding/year

  const A = r === 0 ? p : p * Math.pow(1 + r / 100 / n, n * t);
  const interest = A - p;
  const annualInterest = interest / Math.max(t, 1);
  const tdsApplies = annualInterest > 40000;
  const tds = tdsApplies ? interest * 0.10 : 0;
  const netMaturity = A - tds;

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Deposit Amount" value={p} onChange={setP} prefix="₹" min={1000} max={10000000} step={1000} sliderMin={10000} sliderMax={2000000} />
        <FieldNumber label="Interest Rate" value={r} onChange={setR} suffix="% p.a." min={1} max={15} step={0.05} sliderMin={3} sliderMax={10} />
        <FieldNumber label="Tenure" value={t} onChange={setT} suffix="years" min={0.5} max={20} step={0.5} sliderMin={1} sliderMax={15} />
        <FieldNumber label="Compounding (per year)" value={n} onChange={setN} min={1} max={12} step={1} slider sliderMin={1} sliderMax={12} />
      </InputCard>
      <ResultCard>
        <ResultRow label="Maturity Amount" value={formatINR(A)} highlight />
        <ResultRow label="Principal" value={formatINR(p)} />
        <ResultRow label="Total Interest" value={formatINR(interest)} />
        <ResultRow label="Effective Annual Yield" value={`${(((Math.pow(1 + r/100/n, n) - 1) * 100)).toFixed(2)}%`} />
        <div className="mt-3 rounded-lg border border-border bg-background/50 p-3 space-y-1">
          <div className="text-xs font-semibold">After TDS</div>
          <ResultRow label="Net Maturity (post TDS)" value={formatINR(netMaturity)} />
          <ResultRow label={`TDS @ 10% ${tdsApplies ? "(applied)" : "(not applicable)"}`} value={formatINR(tds)} />
          <p className="text-[11px] text-muted-foreground mt-1">TDS @ 10% applies only if annual interest exceeds ₹40,000 (₹50,000 for senior citizens). Submit Form 15G/H if your total income is below the taxable limit.</p>
        </div>
      </ResultCard>
    </CalcGrid>
  );
}

export function RDCalculator() {
  const [p, setP] = useState(5000);
  const [r, setR] = useState(7);
  const [t, setT] = useState(5);

  const i = r / 4 / 100;
  const n = t * 4;
  // RD maturity formula
  const M = p * (Math.pow(1 + i, n) - 1) / (1 - Math.pow(1 + i, -1/3));
  const total = p * t * 12;
  const interest = M - total;

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Monthly Deposit" value={p} onChange={setP} prefix="₹" min={100} max={500000} step={100} sliderMin={500} sliderMax={50000} />
        <FieldNumber label="Interest Rate" value={r} onChange={setR} suffix="% p.a." min={1} max={12} step={0.05} sliderMin={3} sliderMax={10} />
        <FieldNumber label="Tenure" value={t} onChange={setT} suffix="years" min={0.5} max={10} step={0.5} sliderMin={1} sliderMax={10} />
      </InputCard>
      <ResultCard>
        <ResultRow label="Maturity Value" value={formatINR(M)} highlight />
        <ResultRow label="Total Deposited" value={formatINR(total)} />
        <ResultRow label="Interest Earned" value={formatINR(interest)} />
      </ResultCard>
    </CalcGrid>
  );
}

export function CAGRCalculator() {
  const [start, setStart] = useState(100000);
  const [end, setEnd] = useState(200000);
  const [years, setYears] = useState(5);

  const cagr = (Math.pow(end / start, 1 / years) - 1) * 100;
  const absolute = ((end - start) / start) * 100;

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Initial Value" value={start} onChange={setStart} prefix="₹" min={100} max={100000000} step={1000} sliderMin={10000} sliderMax={5000000} />
        <FieldNumber label="Final Value" value={end} onChange={setEnd} prefix="₹" min={100} max={100000000} step={1000} sliderMin={10000} sliderMax={10000000} />
        <FieldNumber label="Period" value={years} onChange={setYears} suffix="years" min={0.5} max={50} step={0.5} sliderMin={1} sliderMax={30} />
      </InputCard>
      <ResultCard>
        <ResultRow label="CAGR (Annualised)" value={`${cagr.toFixed(2)}%`} highlight />
        <ResultRow label="Absolute Return" value={`${absolute.toFixed(2)}%`} />
        <ResultRow label="Absolute Gain" value={formatINR(end - start)} />
      </ResultCard>
    </CalcGrid>
  );
}

export function MutualFundCalculator() {
  const [p, setP] = useState(500000);
  const [r, setR] = useState(12);
  const [t, setT] = useState(15);

  const fv = p * Math.pow(1 + r / 100, t);
  const data = [];
  for (let y = 0; y <= t; y++) {
    data.push({ year: y, invested: p, value: Math.round(p * Math.pow(1 + r / 100, y)) });
  }

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Lumpsum Investment" value={p} onChange={setP} prefix="₹" min={1000} max={50000000} step={1000} sliderMin={10000} sliderMax={5000000} />
        <FieldNumber label="Expected Return" value={r} onChange={setR} suffix="% p.a." min={1} max={30} step={0.5} sliderMin={5} sliderMax={20} />
        <FieldNumber label="Holding Period" value={t} onChange={setT} suffix="years" min={1} max={40} step={1} sliderMin={1} sliderMax={30} />
      </InputCard>
      <ResultCard>
        <ResultRow label="Future Value" value={formatINR(fv)} highlight />
        <ResultRow label="Invested" value={formatINR(p)} />
        <ResultRow label="Wealth Gained" value={formatINR(fv - p)} />
        <GrowthChart data={data} />
      </ResultCard>
    </CalcGrid>
  );
}

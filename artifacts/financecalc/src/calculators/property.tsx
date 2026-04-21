import { useState } from "react";
import { FieldNumber, ResultRow, CalcGrid, InputCard, ResultCard, emi, formatINR } from "./shared";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const STAMP_DUTY: Record<string, { male: number; female: number; reg: number; cap?: number }> = {
  Maharashtra: { male: 6, female: 5, reg: 1, cap: 30000 },
  Karnataka: { male: 5, female: 5, reg: 1 },
  Delhi: { male: 6, female: 4, reg: 1 },
  TamilNadu: { male: 7, female: 7, reg: 4 },
  Telangana: { male: 5, female: 5, reg: 0.5 },
  Gujarat: { male: 4.9, female: 3.9, reg: 1 },
  Rajasthan: { male: 6, female: 5, reg: 1 },
  UttarPradesh: { male: 7, female: 6, reg: 1 },
  WestBengal: { male: 6, female: 6, reg: 1 },
  Kerala: { male: 8, female: 8, reg: 2 },
  Punjab: { male: 7, female: 5, reg: 1 },
  Haryana: { male: 7, female: 5, reg: 1 },
};

export function StampDutyCalculator() {
  const [price, setPrice] = useState(8000000);
  const [state, setState] = useState("Maharashtra");
  const [gender, setGender] = useState<"male" | "female">("male");

  const s = STAMP_DUTY[state];
  const dutyRate = s[gender];
  const stampDuty = (price * dutyRate) / 100;
  const regRaw = (price * s.reg) / 100;
  const reg = s.cap ? Math.min(regRaw, s.cap) : regRaw;
  const total = stampDuty + reg;

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Property Value" value={price} onChange={setPrice} prefix="₹" min={500000} max={500000000} step={50000} sliderMin={1000000} sliderMax={50000000} />
        <div className="space-y-2">
          <Label className="text-sm font-medium">State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.keys(STAMP_DUTY).map((k) => (
                <SelectItem key={k} value={k}>{k.replace(/([A-Z])/g, " $1").trim()}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Buyer Gender</Label>
          <div className="grid grid-cols-2 gap-2">
            {(["male", "female"] as const).map((g) => (
              <button key={g} type="button" onClick={() => setGender(g)} className={`py-2 rounded-md border text-sm font-medium capitalize ${gender === g ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>{g}</button>
            ))}
          </div>
        </div>
      </InputCard>
      <ResultCard>
        <ResultRow label="Total Charges" value={formatINR(total)} highlight />
        <ResultRow label={`Stamp Duty (${dutyRate}%)`} value={formatINR(stampDuty)} />
        <ResultRow label={`Registration (${s.reg}%${s.cap ? `, capped` : ""})`} value={formatINR(reg)} />
        <ResultRow label="As % of Property" value={`${(total/price*100).toFixed(2)}%`} />
        {gender === "male" && s.male !== s.female && (
          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-3">
            Tip: registering in female name saves {formatINR((s.male - s.female) / 100 * price)} in this state.
          </p>
        )}
      </ResultCard>
    </CalcGrid>
  );
}

export function ROICalculator() {
  const [start, setStart] = useState(200000);
  const [end, setEnd] = useState(340000);
  const [years, setYears] = useState(4);

  const absolute = ((end - start) / start) * 100;
  const annualised = (Math.pow(end / start, 1 / years) - 1) * 100;

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Initial Investment" value={start} onChange={setStart} prefix="₹" min={100} max={1000000000} step={1000} sliderMin={10000} sliderMax={5000000} />
        <FieldNumber label="Final Value" value={end} onChange={setEnd} prefix="₹" min={100} max={1000000000} step={1000} sliderMin={10000} sliderMax={10000000} />
        <FieldNumber label="Holding Period" value={years} onChange={setYears} suffix="years" min={0.25} max={50} step={0.25} sliderMin={1} sliderMax={30} />
      </InputCard>
      <ResultCard>
        <ResultRow label="Annualised ROI (CAGR)" value={`${annualised.toFixed(2)}%`} highlight />
        <ResultRow label="Absolute Return" value={`${absolute.toFixed(2)}%`} />
        <ResultRow label="Total Gain" value={formatINR(end - start)} />
      </ResultCard>
    </CalcGrid>
  );
}

export function RentVsBuyCalculator() {
  const [price, setPrice] = useState(15000000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [rent, setRent] = useState(35000);
  const [rentInflate, setRentInflate] = useState(8);
  const [appreciate, setAppreciate] = useState(6);
  const [equityReturn, setEquityReturn] = useState(12);
  const [horizon, setHorizon] = useState(20);

  const down = (price * downPct) / 100;
  const loan = price - down;
  const monthlyEMI = emi(loan, rate, tenure * 12);
  const stampDuty = price * 0.07;
  const annualMaint = price * 0.005;

  // Buy: cash outflow over horizon
  const totalEMI = monthlyEMI * 12 * Math.min(horizon, tenure);
  const totalMaint = annualMaint * horizon;
  const buyOut = down + stampDuty + totalEMI + totalMaint;
  const propertyValue = price * Math.pow(1 + appreciate / 100, horizon);
  const buyNet = propertyValue - buyOut;

  // Rent: invest down + monthly surplus
  const eqMonthly = equityReturn / 12 / 100;
  let invested = down;
  let totalRent = 0;
  let currentRent = rent;
  for (let m = 0; m < horizon * 12; m++) {
    invested = invested * (1 + eqMonthly) + Math.max(0, monthlyEMI - currentRent);
    totalRent += currentRent;
    if ((m + 1) % 12 === 0) currentRent *= 1 + rentInflate / 100;
  }
  const rentNet = invested - totalRent;

  const winner = rentNet > buyNet ? "Rent" : "Buy";
  const gap = Math.abs(rentNet - buyNet);

  return (
    <CalcGrid>
      <InputCard>
        <FieldNumber label="Property Price" value={price} onChange={setPrice} prefix="₹" min={1000000} max={500000000} step={100000} sliderMin={2000000} sliderMax={100000000} />
        <FieldNumber label="Down Payment %" value={downPct} onChange={setDownPct} suffix="%" min={5} max={100} step={1} sliderMin={10} sliderMax={50} />
        <FieldNumber label="Loan Rate" value={rate} onChange={setRate} suffix="% p.a." min={5} max={15} step={0.1} sliderMin={6} sliderMax={12} />
        <FieldNumber label="Loan Tenure" value={tenure} onChange={setTenure} suffix="years" min={5} max={30} step={1} sliderMin={5} sliderMax={30} />
        <FieldNumber label="Monthly Rent (equivalent house)" value={rent} onChange={setRent} prefix="₹" min={1000} max={1000000} step={500} sliderMin={5000} sliderMax={200000} />
        <FieldNumber label="Annual Rent Increase" value={rentInflate} onChange={setRentInflate} suffix="%" min={0} max={20} step={0.5} sliderMin={0} sliderMax={15} />
        <FieldNumber label="Property Appreciation" value={appreciate} onChange={setAppreciate} suffix="% p.a." min={0} max={20} step={0.5} sliderMin={0} sliderMax={15} />
        <FieldNumber label="Equity Return Assumption" value={equityReturn} onChange={setEquityReturn} suffix="% p.a." min={4} max={20} step={0.5} sliderMin={6} sliderMax={18} />
        <FieldNumber label="Time Horizon" value={horizon} onChange={setHorizon} suffix="years" min={3} max={30} step={1} sliderMin={5} sliderMax={30} />
      </InputCard>
      <ResultCard>
        <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 p-3 mb-3">
          <div className="text-xs text-muted-foreground">Verdict</div>
          <div className="text-base font-bold text-emerald-700 dark:text-emerald-400">{winner} wins by {formatINR(gap)}</div>
        </div>
        <h3 className="text-sm font-semibold mt-2 mb-1">Buying</h3>
        <ResultRow label="Total Outflow" value={formatINR(buyOut)} />
        <ResultRow label="Property Value (year {horizon})" value={formatINR(propertyValue)} />
        <ResultRow label="Net Wealth" value={formatINR(buyNet)} />
        <h3 className="text-sm font-semibold mt-3 mb-1">Renting + Investing</h3>
        <ResultRow label="Total Rent Paid" value={formatINR(totalRent)} />
        <ResultRow label="Investment Corpus" value={formatINR(invested)} />
        <ResultRow label="Net Wealth" value={formatINR(rentNet)} />
      </ResultCard>
    </CalcGrid>
  );
}

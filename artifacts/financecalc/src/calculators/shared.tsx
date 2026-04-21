import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { formatINR } from "@/lib/format";

export function FieldNumber({
  label, value, onChange, min, max, step = 1, prefix, suffix, slider = true, sliderMin, sliderMax,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  slider?: boolean;
  sliderMin?: number;
  sliderMax?: number;
}) {
  const sMin = sliderMin ?? min ?? 0;
  const sMax = sliderMax ?? max ?? (value * 4 || 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-1">
          {prefix && <span className="text-xs text-muted-foreground">{prefix}</span>}
          <Input
            type="number"
            value={Number.isFinite(value) ? value : 0}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-32 h-8 text-right text-sm"
          />
          {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
        </div>
      </div>
      {slider && (
        <Slider
          min={sMin}
          max={sMax}
          step={step}
          value={[value]}
          onValueChange={([v]) => onChange(v)}
          className="w-full"
        />
      )}
    </div>
  );
}

export function ResultRow({ label, value, highlight }: { label: string; value: ReactNode; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-2 ${highlight ? "" : "border-b border-border"}`}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-emerald-600 text-base" : ""}`}>{value}</span>
    </div>
  );
}

export function CalcGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-6 md:grid-cols-2">{children}</div>;
}

export function InputCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5">
      <h2 className="font-semibold">Inputs</h2>
      {children}
    </div>
  );
}

export function ResultCard({ children, title = "Results" }: { children: ReactNode; title?: string }) {
  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-emerald-500/5 p-5">
      <h2 className="font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}

export function emi(p: number, annualRate: number, months: number): number {
  if (months <= 0 || p <= 0) return 0;
  if (annualRate === 0) return p / months;
  const r = annualRate / 12 / 100;
  const f = Math.pow(1 + r, months);
  return (p * r * f) / (f - 1);
}

export { formatINR };

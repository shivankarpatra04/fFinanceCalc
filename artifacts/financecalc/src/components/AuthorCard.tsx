import { CheckCircle } from "lucide-react";

interface AuthorCardProps {
  date: string;
}

export function AuthorCard({ date }: AuthorCardProps) {
  return (
    <div className="my-8 p-6 rounded-xl border border-border bg-muted/30 flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <span className="text-2xl font-bold text-primary">IC</span>
      </div>
      <div>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
          <span className="font-bold text-lg text-foreground">IndianCalc Editorial Team</span>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-200 dark:border-green-800">
            <CheckCircle className="h-3 w-3" /> Fact-checked
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Our team of finance writers and CAs review every article for accuracy against current SEBI, RBI, and Income Tax Department guidelines. We ensure all formulas and tax slabs are updated for the latest financial year (FY 2025-26).
        </p>
        <div className="mt-3 text-xs text-muted-foreground">
          Last reviewed: <span className="font-medium">{date}</span>
        </div>
      </div>
    </div>
  );
}

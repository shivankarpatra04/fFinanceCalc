export function AdSlot({ size = "leaderboard", className = "" }: { size?: "leaderboard" | "rectangle" | "skyscraper"; className?: string }) {
  const dims = {
    leaderboard: "min-h-[90px] md:min-h-[90px]",
    rectangle: "min-h-[250px] md:min-h-[250px]",
    skyscraper: "min-h-[600px]",
  }[size];
  return (
    <div className={`my-6 flex items-center justify-center rounded-lg border border-dashed border-border bg-secondary/30 px-4 py-6 text-xs text-muted-foreground ${dims} ${className}`}>
      <span>Advertisement</span>
    </div>
  );
}

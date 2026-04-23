import { useEffect } from "react";

export function AdSlot({ size = "leaderboard", className = "", adSlot = "3849597358" }: { size?: "leaderboard" | "rectangle" | "skyscraper"; className?: string; adSlot?: string; }) {
  const dims = {
    leaderboard: "min-h-[90px] md:min-h-[90px]",
    rectangle: "min-h-[250px] md:min-h-[250px]",
    skyscraper: "min-h-[600px]",
  }[size];

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`my-6 flex items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-secondary/30 text-xs text-muted-foreground ${dims} ${className}`}>
      <ins
        className="adsbygoogle w-full h-full flex justify-center items-center relative before:absolute before:content-['Advertisement'] before:z-[-1]"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1969804515928924"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

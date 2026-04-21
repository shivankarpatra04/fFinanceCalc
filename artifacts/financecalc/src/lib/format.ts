export function formatINR(n: number, opts?: { decimals?: number; compact?: boolean }): string {
  const decimals = opts?.decimals ?? 0;
  if (!isFinite(n)) return "₹0";
  if (opts?.compact) {
    if (Math.abs(n) >= 1e7) return "₹" + (n / 1e7).toFixed(2) + " Cr";
    if (Math.abs(n) >= 1e5) return "₹" + (n / 1e5).toFixed(2) + " L";
    if (Math.abs(n) >= 1e3) return "₹" + (n / 1e3).toFixed(1) + "K";
  }
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}

export function formatNumber(n: number, decimals = 0): string {
  if (!isFinite(n)) return "0";
  return n.toLocaleString("en-IN", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
}

export function formatPercent(n: number, decimals = 2): string {
  return n.toFixed(decimals) + "%";
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function safeNum(v: string | number, fallback = 0): number {
  const n = typeof v === "number" ? v : parseFloat(v);
  return isFinite(n) ? n : fallback;
}

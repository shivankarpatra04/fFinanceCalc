import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButtons({ title, url }: { title: string; url?: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const enc = (s: string) => encodeURIComponent(s);

  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${enc(title + " " + shareUrl)}` },
    { name: "Twitter", href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(shareUrl)}` },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(shareUrl)}` },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  async function nativeShare() {
    if (navigator.share) {
      try { await navigator.share({ title, url: shareUrl }); } catch {}
    } else {
      copy();
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm" variant="outline" onClick={nativeShare} className="gap-1.5">
        <Share2 className="h-3.5 w-3.5" /> Share
      </Button>
      {links.map((l) => (
        <a
          key={l.name}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs px-3 py-1.5 rounded-md border border-border hover:bg-secondary transition-colors"
        >
          {l.name}
        </a>
      ))}
      <Button size="sm" variant="outline" onClick={copy} className="gap-1.5">
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy link"}
      </Button>
    </div>
  );
}

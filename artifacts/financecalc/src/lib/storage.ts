const FAV_KEY = "fc:favorites";
const RECENT_KEY = "fc:recent";
const RECENT_MAX = 8;

function read(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function write(key: string, value: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("fc:storage", { detail: { key } }));
  } catch {}
}

export function getFavorites(): string[] {
  return read(FAV_KEY);
}

export function isFavorite(slug: string): boolean {
  return read(FAV_KEY).includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  const list = read(FAV_KEY);
  const idx = list.indexOf(slug);
  if (idx >= 0) list.splice(idx, 1);
  else list.unshift(slug);
  write(FAV_KEY, list);
  return idx < 0;
}

export function getRecent(): string[] {
  return read(RECENT_KEY);
}

export function pushRecent(slug: string) {
  const list = read(RECENT_KEY).filter((s) => s !== slug);
  list.unshift(slug);
  write(RECENT_KEY, list.slice(0, RECENT_MAX));
}

export function onStorageChange(cb: () => void) {
  const handler = () => cb();
  window.addEventListener("fc:storage", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("fc:storage", handler);
    window.removeEventListener("storage", handler);
  };
}

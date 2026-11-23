/* Bestaande fbq/gtag/hj-aanroepen mogen nooit stuklopen als de meetscripts
   nog niet geladen zijn (geen keuze, of "Alleen noodzakelijk"). */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    hj?: (...args: unknown[]) => void;
  }
}

export function safeGtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  gtag(...args);
}

export function safeFbq(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const fbq = window.fbq;
  if (typeof fbq !== "function") return;
  fbq(...args);
}

export function safeHj(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const hj = window.hj;
  if (typeof hj !== "function") return;
  hj(...args);
}

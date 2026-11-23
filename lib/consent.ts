/* Cookietoestemming, dezelfde afspraak als op www.crossfitleiden.com.

   De keuze staat in localStorage onder "cookieConsent" ("accepted" of
   "rejected"). Meetscripts laden alleen bij "accepted". Zonder keuze laadt
   er niets. Vercel Analytics staat daar los van: die is cookieloos. */

export const CONSENT_KEY = "cookieConsent";
/** Vuurt op window zodra de keuze verandert. */
export const CONSENT_EVENT = "cfl:cookie-consent";
/** Vuur dit op window om de cookiemelding opnieuw te tonen (link in de footer). */
export const CONSENT_OPEN_EVENT = "cfl:cookie-open";

export type ConsentChoice = "accepted" | "rejected";

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    // localStorage geblokkeerd (privémodus): behandelen als "geen keuze"
    return null;
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* niet op te slaan: de keuze geldt dan alleen voor deze pagina */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

// Google Analytics/Ads, Meta, Hotjar, GymOps-tracking en de OpenAI-pixel.
const TRACKING_COOKIE =
  /^(_ga|_gid|_gcl_|_fbp|_fbc|lc_session_tk_|_hj|__oppref|__obref)/;

export function isTrackingCookie(name: string) {
  return TRACKING_COOKIE.test(name);
}

/** Domeinen waarop deze site (en Google Ads) cookies kan hebben gezet. */
export function cookieDomainAttributesFor(host: string): string[] {
  const attributes = new Set<string>([
    "",
    `; domain=${host}`,
    `; domain=.${host}`,
  ]);
  // www.crossfitleiden.com wist ook .crossfitleiden.com. Deze subdomain
  // doet hetzelfde: de Ads-config zet de klik-cookie op het ouderdomein.
  const bare = host.replace(/^www\./, "");
  attributes.add(`; domain=.${bare}`);
  const labels = bare.split(".").filter(Boolean);
  if (labels.length >= 3) {
    const parent = labels.slice(1).join(".");
    attributes.add(`; domain=${parent}`);
    attributes.add(`; domain=.${parent}`);
  }
  return Array.from(attributes);
}

function cookieDomainAttributes(): string[] {
  return cookieDomainAttributesFor(window.location.hostname);
}

/** Ruimt de cookies van de meetscripts op als iemand zijn toestemming intrekt. */
export function clearTrackingCookies() {
  const domains = cookieDomainAttributes();
  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0]?.trim();
    if (!name || !isTrackingCookie(name)) return;
    domains.forEach((domain) => {
      const base = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
      document.cookie = base;
      // Secure-cookies (zoals __oppref op https) gaan alleen weg mét Secure.
      document.cookie = `${base}; Secure`;
    });
  });
}

/** Zet de OpenAI-pixel op consent false en wist daarna de meetcookies. */
export function revokeMeasurementConsent() {
  if (typeof window.oaiq === "function") {
    window.oaiq("consent", false);
  }
  clearTrackingCookies();
}

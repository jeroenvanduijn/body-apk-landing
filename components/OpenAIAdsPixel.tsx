/**
 * ChatGPT Ads-pixel (OpenAI).
 *
 * Alleen laden nadat de bezoeker "Accepteer alles" heeft gekozen. Het snippet
 * komt via een script-element in <head>, synchroon, zodat oaiq meteen bestaat
 * en een ?oppref= in de URL kan oppikken zonder paginareload.
 *
 * Specificatie: https://developers.openai.com/ads/measurement-pixel
 */
import { readConsent } from "@/lib/consent";

const OPENAI_ADS_PIXEL_ID = "DQhdTBAoda8N2Ldd5YXue4";

const OPENAI_ADS_PIXEL_SNIPPET = `(function (w, d, s, u) {
  if (w.oaiq) return;
  var q = function () { q.q.push(arguments); };
  q.q = []; w.oaiq = q;
  var js = d.createElement(s); js.async = true; js.src = u;
  var f = d.getElementsByTagName(s)[0]; f.parentNode.insertBefore(js, f);
})(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");
oaiq("init", { pixelId: "${OPENAI_ADS_PIXEL_ID}" });
oaiq("consent", true);`;

export function loadOpenAIAdsPixel() {
  if (typeof window === "undefined") return;
  if (typeof window.oaiq === "function") return;
  const script = document.createElement("script");
  script.id = "oaiq-pixel";
  script.text = OPENAI_ADS_PIXEL_SNIPPET;
  document.head.appendChild(script);
}

export type OpenAIMeasureEvent = "lead_created" | "appointment_scheduled";

/** Vuurt alleen bij toestemming "accepted" en een geladen oaiq-functie. */
export function measureOpenAI(event: OpenAIMeasureEvent) {
  if (typeof window === "undefined") return;
  if (readConsent() !== "accepted") return;
  if (typeof window.oaiq !== "function") return;
  window.oaiq("measure", event, { type: "customer_action" });
}

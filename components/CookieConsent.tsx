"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_OPEN_EVENT,
  readConsent,
  revokeMeasurementConsent,
  writeConsent,
} from "@/lib/consent";

const PRIVACY_URL = "https://www.crossfitleiden.com/nl/privacy";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    if (!readConsent()) {
      timer = window.setTimeout(() => setShowBanner(true), 1000);
    }
    const reopen = () => setShowBanner(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
    };
  }, []);

  const handleAccept = () => {
    writeConsent("accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    const hadAccepted = readConsent() === "accepted";
    writeConsent("rejected");
    setShowBanner(false);
    // Toestemming ingetrokken: pixel stoppen, cookies opruimen en opnieuw
    // laden zodat de al geladen meetscripts stoppen.
    if (hadAccepted) {
      revokeMeasurementConsent();
      window.location.reload();
    }
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookies"
      className="fixed bottom-0 left-0 right-0 z-[160] bg-white border-t border-[#E8E2D9] shadow-[0_-8px_24px_rgba(44,40,37,.10)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="max-w-6xl mx-auto px-5 py-3 md:py-3.5">
        <div className="flex flex-col md:flex-row md:items-center gap-2.5 md:gap-6">
          <p className="flex-1 text-[13.5px] md:text-sm leading-snug text-[#55504A]">
            We gebruiken cookies om de site te verbeteren en te meten.{" "}
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              aria-expanded={showDetails}
              className="underline underline-offset-2 font-medium text-[#2C2825] hover:text-[#C4321F]"
            >
              {showDetails ? "Verberg uitleg" : "Meer info"}
            </button>
          </p>
          <div className="flex gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleReject}
              className="flex-1 md:flex-none h-10 px-4 rounded-lg text-sm font-medium border border-[#CFC8BE] text-[#2C2825] hover:bg-[#FFF7EE] transition-colors whitespace-nowrap"
            >
              Alleen noodzakelijk
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="flex-1 md:flex-none h-10 px-4 rounded-lg text-sm font-medium bg-[#C4321F] text-white hover:bg-[#A82A19] transition-colors whitespace-nowrap"
            >
              Accepteer alles
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="mt-3 pt-3 border-t border-[#E8E2D9] grid gap-3 md:grid-cols-3 text-[13px] leading-snug text-[#55504A] max-h-[40vh] overflow-y-auto">
            <div>
              <h4 className="font-medium text-[#2C2825] mb-0.5">Functionele cookies (altijd aan)</h4>
              <p>Nodig om de website te laten werken. Deze kun je niet uitzetten.</p>
            </div>
            <div>
              <h4 className="font-medium text-[#2C2825] mb-0.5">Analytische cookies</h4>
              <p>Laten ons zien hoe bezoekers de website gebruiken, zodat we hem kunnen verbeteren.</p>
            </div>
            <div>
              <h4 className="font-medium text-[#2C2825] mb-0.5">Marketing cookies</h4>
              <p>
                Voor relevante advertenties en om te meten wat een campagne oplevert. Lees meer in ons{" "}
                <a
                  href={PRIVACY_URL}
                  className="underline underline-offset-2 font-medium text-[#2C2825] hover:text-[#C4321F]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacybeleid
                </a>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

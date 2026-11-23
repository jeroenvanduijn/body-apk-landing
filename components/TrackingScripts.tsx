"use client";

/* Alle meetscripts op één plek, en alleen na toestemming.

   Meta Pixel, GA4, Google Ads, Hotjar, GymOps/GHL external tracking en de
   ChatGPT Ads-pixel laden pas als de bezoeker "Accepteer alles" kiest.
   Kiest iemand dat halverwege een bezoek, dan laden de scripts meteen,
   zonder de pagina opnieuw te laden.

   De Meta-<noscript>-pixel staat hier bewust niet: zonder JavaScript is er
   geen manier om de keuze in localStorage te lezen, en dan zou die afbeelding
   alsnog een pageview sturen.

   Niet hier: Vercel Analytics (<Analytics /> in app/layout.tsx). Die werkt
   zonder cookies. Er is geen Content-Security-Policy in next.config.js of
   elders in deze site, dus er is geen CSP-regel om bij te werken. */

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";
import { loadOpenAIAdsPixel } from "@/components/OpenAIAdsPixel";

const GA4_ID = "G-FS179SBCT4";
const ADS_ID = "AW-972965006";
const META_PIXEL_ID = "34572054022438510";
const GHL_TRACKING_ID = "tk_348787a4c93a414996dc9d11481a3c1c";

export default function TrackingScripts() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => {
      const ok = readConsent() === "accepted";
      setGranted(ok);
      // Zelfde klik als "Accepteer alles": oaiq staat meteen, vóór de
      // volgende paint, zodat ?oppref= niet op een reload hoeft te wachten.
      if (ok) loadOpenAIAdsPixel();
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!granted) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted'
          });
          gtag('js', new Date());
          gtag('config', '${GA4_ID}');
          gtag('config', '${ADS_ID}');
        `}
      </Script>

      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      <Script id="hotjar" strategy="afterInteractive">
        {`
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:6668577,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>

      <Script
        src="https://links.gymops.nl/js/external-tracking.js"
        data-tracking-id={GHL_TRACKING_ID}
        strategy="afterInteractive"
      />
    </>
  );
}

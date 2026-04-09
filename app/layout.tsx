import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata: Metadata = {
  title: 'Rugpijn die steeds terugkomt? | Body-APK | CrossFit Leiden',
  description: 'Ontdek waar je rugpijn écht vandaan komt. De Body-APK is een diepgaande bewegingsanalyse die laat zien waarom klachten blijven terugkomen.',
  keywords: ['body-apk', 'rugpijn', 'bewegingsanalyse', 'CrossFit Leiden', 'rugklachten', 'nekklachten', 'houdingsproblemen'],
  openGraph: {
    title: 'Rugpijn die steeds terugkomt? | Body-APK',
    description: 'Ontdek waar je rugpijn écht vandaan komt. De Body-APK is een diepgaande bewegingsanalyse die laat zien waarom klachten blijven terugkomen.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://bodyapk.crossfitleiden.com',
    siteName: 'CrossFit Leiden',
    images: [
      {
        url: '/images/body-apk-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Body-APK bij CrossFit Leiden',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rugpijn die steeds terugkomt? | Body-APK',
    description: 'Ontdek waar je rugpijn écht vandaan komt. De Body-APK laat zien waarom klachten blijven terugkomen.',
    images: ['/images/body-apk-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://bodyapk.crossfitleiden.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={dmSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={`${dmSans.className} antialiased`}>
        {/* Meta Pixel */}
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
            fbq('init', '34572054022438510');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=34572054022438510&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Google Analytics / GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FS179SBCT4"
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FS179SBCT4');
          `}
        </Script>

        {/* Hotjar */}
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

        {/* GHL Tracking */}
        <Script
          src="https://links.gymops.nl/js/external-tracking.js"
          data-tracking-id="tk_348787a4c93a414996dc9d11481a3c1c"
          strategy="afterInteractive"
        />

        {children}
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import CookieConsent from '@/components/CookieConsent';
import TrackingScripts from '@/components/TrackingScripts';
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
        {/* Meetscripts (Meta, GA4, Google Ads, Hotjar, GHL, ChatGPT Ads) laden
            pas na "Accepteer alles". De Ads-config zet de klik-cookie op
            .crossfitleiden.com. De conversie "Intro geboekt" zelf wordt geteld
            op /kennismaking zodra de agenda een boeking meldt. */}
        <TrackingScripts />
        {children}
        <CookieConsent />
        {/* Cookieloos, net als op www.crossfitleiden.com. */}
        <Analytics />
      </body>
    </html>
  );
}

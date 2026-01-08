import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Body-APK | Diepgaande houding- en bewegingsanalyse | CrossFit Leiden',
  description: 'Begrijp waar je klachten écht vandaan komen met een Body-APK bij CrossFit Leiden. Persoonlijke 1-op-1 sessie met houding-, ademhaling- en bewegingsanalyse. Geen lidmaatschap nodig.',
  keywords: ['body-apk', 'houdingsanalyse', 'bewegingsanalyse', 'CrossFit Leiden', 'rugklachten', 'nekklachten', 'blessurepreventie'],
  openGraph: {
    title: 'Body-APK | Diepgaande houding- en bewegingsanalyse',
    description: 'Begrijp waar je klachten écht vandaan komen. Persoonlijke 1-op-1 sessie met houding-, ademhaling- en bewegingsanalyse bij CrossFit Leiden.',
    type: 'website',
    locale: 'nl_NL',
    url: 'https://crossfitleiden.nl/body-apk',
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
    title: 'Body-APK | Diepgaande houding- en bewegingsanalyse',
    description: 'Begrijp waar je klachten écht vandaan komen. Persoonlijke 1-op-1 sessie bij CrossFit Leiden.',
    images: ['/images/body-apk-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://crossfitleiden.nl/body-apk',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={inter.variable}>
      <head>
        {/* Meta Pixel Base Code (placeholder - add your Pixel ID) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              // fbq('init', 'YOUR_PIXEL_ID');
              // fbq('track', 'PageView');
            `,
          }}
        />

        {/* Google Analytics / GA4 (placeholder - add your GA4 ID) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              // gtag('config', 'YOUR_GA4_ID');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

'use client';

import Script from 'next/script';
import Link from 'next/link';

// ============================================================================
// ICONS
// ============================================================================
const ArrowLeftIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const ClockIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="10" cy="10" r="8" />
    <path d="M10 5v5l3 3" strokeLinecap="round" />
  </svg>
);

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function KennismakingPage() {
  return (
    <>
      {/* HighLevel Calendar Script */}
      <Script src="https://links.gymops.nl/js/form_embed.js" strategy="lazyOnload" />

      {/* Grid Pattern Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, #000 1px, transparent 1px),
            linear-gradient(-45deg, #000 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <main className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Terug naar Body-APK</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#0CBABA]/10 text-[#0CBABA] px-4 py-2 rounded-full text-sm font-medium mb-6">
              <CheckIcon className="w-4 h-4" />
              Stap 2 van 2
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Plan je korte telefonische kennismaking
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We bellen je kort (5-10 minuten) om je situatie te bespreken en samen te bepalen of de Body-APK passend is. Daarna plannen we de analyse in de gym.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gray-50 p-6 rounded-lg flex items-start gap-4">
              <div className="text-[#0CBABA]">
                <PhoneIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Telefonisch gesprek</h3>
                <p className="text-gray-600 text-sm">We bespreken je klacht of vraag en kijken of de Body-APK bij je past.</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex items-start gap-4">
              <div className="text-[#F7CB15]">
                <ClockIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">5-10 minuten</h3>
                <p className="text-gray-600 text-sm">Kort en doelgericht. Geen verplichtingen.</p>
              </div>
            </div>
          </div>

          {/* Calendar Embed */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold">Kies een moment dat je uitkomt</h2>
            </div>
            <div className="p-6">
              <iframe
                src="https://links.gymops.nl/widget/booking/shoFMv6aUldZKsGsUxfm"
                style={{ width: '100%', minHeight: '600px', border: 'none' }}
                scrolling="no"
                id="hh0GVELEMQIRSCwsLFcf_1770396624673"
                title="Plan je telefonische kennismaking"
              />
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Lukt het niet om een moment te vinden?{' '}
              <a
                href="mailto:info@crossfitleiden.nl"
                className="text-[#EF4C37] hover:underline"
              >
                Stuur ons een bericht
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black text-white py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="font-semibold">CrossFit Leiden</p>
                <p className="text-gray-400 text-sm">Marie Diebenplaats 108, 2324 NG Leiden</p>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400">
                <a href="/privacy" className="hover:text-white transition-colors">
                  Privacyvoorwaarden
                </a>
                <span>© {new Date().getFullYear()} CrossFit Leiden</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

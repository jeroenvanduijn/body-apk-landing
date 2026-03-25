'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

// ============================================================================
// TRACKING UTILITIES
// ============================================================================
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    hj?: (...args: unknown[]) => void;
    Vimeo?: {
      Player: new (element: HTMLIFrameElement) => VimeoPlayer;
    };
  }
}

interface VimeoPlayer {
  on: (event: string, callback: (data?: { percent?: number; seconds?: number; duration?: number }) => void) => void;
  off: (event: string) => void;
  destroy: () => void;
}

const trackCTAClick = (location: string) => {
  if (typeof window !== 'undefined') {
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'cta_click', cta_location: location });
    }
    if (window.hj) {
      window.hj('event', 'formulier_knop_geklikt');
    }
  }
};

// ============================================================================
// ICONS (inline SVGs)
// ============================================================================
const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const XIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const StarIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const VideoIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="12" height="12" rx="1" />
    <path d="M14 8l4-2v8l-4-2" />
  </svg>
);

const CameraIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="5" width="16" height="12" rx="2" />
    <circle cx="10" cy="11" r="3" />
    <path d="M6 5V4a1 1 0 011-1h6a1 1 0 011 1v1" />
  </svg>
);

const ClipboardIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="3" width="12" height="15" rx="1" />
    <path d="M8 2h4v2H8z" />
    <path d="M7 9h6M7 12h4" />
  </svg>
);

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const QuoteIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" opacity="0.15">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z"/>
  </svg>
);

// ============================================================================
// COMPONENTS
// ============================================================================

const CTAButton = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  location = 'unknown'
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
  location?: string;
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer rounded-lg";

  const variants = {
    primary: "bg-[#EF4C37] text-white px-8 py-4 hover:bg-[#d9442f] focus:ring-[#EF4C37] shadow-lg hover:shadow-xl",
    secondary: "border-2 border-black text-black px-8 py-4 hover:bg-black hover:text-white focus:ring-black",
    white: "bg-white text-black px-8 py-4 hover:bg-gray-100 focus:ring-white shadow-lg"
  };

  const handleClick = () => {
    trackCTAClick(location);
    onClick();
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const SectionWrapper = ({
  children,
  className = '',
  id
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => (
  <section id={id} className={`py-16 md:py-24 ${className}`}>
    <div className="max-w-3xl mx-auto px-6">
      {children}
    </div>
  </section>
);

const FAQItem = ({
  question,
  answer
}: {
  question: string;
  answer: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-5 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium pr-4">{question}</span>
        <ChevronDownIcon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-[500px] pb-5' : 'max-h-0'}`}
        aria-hidden={!isOpen}
      >
        <div className="text-gray-600 leading-relaxed">{answer}</div>
      </div>
    </div>
  );
};

// ============================================================================
// MODAL COMPONENT
// ============================================================================

const COUNTRY_CODES = [
  { code: '+31', label: '\u{1F1F3}\u{1F1F1} +31', country: 'NL' },
  { code: '+32', label: '\u{1F1E7}\u{1F1EA} +32', country: 'BE' },
  { code: '+49', label: '\u{1F1E9}\u{1F1EA} +49', country: 'DE' },
  { code: '+44', label: '\u{1F1EC}\u{1F1E7} +44', country: 'UK' },
  { code: '+33', label: '\u{1F1EB}\u{1F1F7} +33', country: 'FR' },
];

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/Arta9mf7m9NTEPdznlsP/webhook-trigger/fe487f3f-d283-4529-a366-a4f5c5a92c31';

const FormModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+31');
  const [telefoon, setTelefoon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setNaam('');
      setEmail('');
      setTelefoon('');
      setCountryCode('+31');
      setError('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!naam.trim() || !email.trim() || !telefoon.trim()) {
      setError('Vul alle velden in.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Vul een geldig e-mailadres in.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          naam,
          email,
          telefoon: `${countryCode}${telefoon}`,
          bron: 'Body-APK Landingspagina'
        })
      });
      router.push('/kennismaking');
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Sluiten"
        >
          <CloseIcon />
        </button>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-2">Help me van mijn klachten af</h2>
          <p className="text-gray-600 mb-6">
            Vul hieronder je gegevens in. Na het invullen kun je een gratis kennismaking plannen met Coach Jari om te bepalen of hij je kan helpen.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="naam" className="block text-sm font-medium text-gray-700 mb-1">Voornaam</label>
              <input
                id="naam"
                type="text"
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4C37] focus:border-transparent"
                placeholder="Je voornaam"
              />
            </div>

            <div>
              <label htmlFor="email-a" className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
              <input
                id="email-a"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4C37] focus:border-transparent"
                placeholder="je@email.nl"
              />
            </div>

            <div>
              <label htmlFor="telefoon-a" className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4C37] focus:border-transparent bg-white text-sm"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
                <input
                  id="telefoon-a"
                  type="tel"
                  value={telefoon}
                  onChange={(e) => setTelefoon(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4C37] focus:border-transparent"
                  placeholder="612345678"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-[#EF4C37] text-white font-semibold py-4 rounded-lg hover:bg-[#d9442f] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Even geduld...' : 'Ja, plan mijn kennismaking \u2192'}
            </button>

            <p className="text-xs text-gray-400 text-center">
              Geen spam. Je kunt je altijd uitschrijven.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// VIDEO TRACKING HOOK
// ============================================================================

const useVimeoTracking = (
  iframeRef: React.RefObject<HTMLIFrameElement | null>,
  videoId: string,
  videoTitle: string
) => {
  const progressMilestones = useRef(new Set<number>());

  const pushEvent = useCallback((event: string, extra?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event, video_id: videoId, video_title: videoTitle, ...extra });
    }
  }, [videoId, videoTitle]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || typeof window === 'undefined') return;

    let player: VimeoPlayer | null = null;
    let retries = 0;
    const maxRetries = 20;

    const initPlayer = () => {
      if (!window.Vimeo?.Player) {
        if (retries < maxRetries) {
          retries++;
          setTimeout(initPlayer, 500);
        }
        return;
      }

      try {
        player = new window.Vimeo.Player(iframe);
        progressMilestones.current = new Set();

        player.on('play', () => {
          pushEvent('video_start');
        });

        player.on('ended', () => {
          pushEvent('video_complete');
        });

        player.on('timeupdate', (data) => {
          if (!data?.percent) return;
          const pct = Math.floor(data.percent * 100);
          for (const milestone of [25, 50, 75]) {
            if (pct >= milestone && !progressMilestones.current.has(milestone)) {
              progressMilestones.current.add(milestone);
              pushEvent('video_progress', { video_percent: milestone });
            }
          }
        });
      } catch {
        // iframe not ready yet
      }
    };

    initPlayer();

    return () => {
      if (player) {
        try { player.destroy(); } catch { /* ignore */ }
      }
    };
  }, [iframeRef, pushEvent]);
};

// ============================================================================
// VIDEO TESTIMONIAL COMPONENT
// ============================================================================

const VideoTestimonial = ({ videoId, title }: { videoId: string; title: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useVimeoTracking(iframeRef, videoId, title);

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gray-100" style={{ paddingTop: '177.78%' }}>
      <iframe
        ref={iframeRef}
        src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
        frameBorder="0"
        allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        title={title}
      />
    </div>
  );
};

// ============================================================================
// JARI INTRO VIDEO COMPONENT (with tracking)
// ============================================================================

const JariIntroVideo = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useVimeoTracking(iframeRef, '1162594482', 'Body APK intro - Jari stelt zich voor');

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gray-100" style={{ paddingTop: '177.78%' }}>
      <iframe
        ref={iframeRef}
        src="https://player.vimeo.com/video/1162594482?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&texttrack=nl"
        frameBorder="0"
        allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        title="Body APK intro - Jari stelt zich voor"
      />
    </div>
  );
};

// ============================================================================
// FLOATING WHATSAPP BUTTON
// ============================================================================

const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/31712340285?text=Hoi%2C%20ik%20heb%20een%20vraag%20over%20de%20Body-APK"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-20 md:bottom-6 right-4 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-[#20bd5a] transition-all group"
    aria-label="Stel je vraag via WhatsApp"
  >
    <WhatsAppIcon className="w-6 h-6" />
    <span className="hidden md:inline text-sm font-medium">Stel je vraag via WhatsApp</span>
  </a>
);

// ============================================================================
// TESTIMONIAL DATA
// ============================================================================

const testimonials = [
  {
    name: 'Diana (40)',
    location: 'Rijnsburg',
    complaint: 'Dubbele hernia + verschoven wervel',
    videoId: '1176722336',
    summary: 'Kon geen 100 meter lopen. Het ziekenhuis zei: opereren, drie wervels vastzetten met schroeven. Nu loopt ze 10.000 stappen per dag en is de hernia niet meer te zien op foto\'s.',
  },
  {
    name: 'Angelique (40)',
    location: 'Leiderdorp',
    complaint: 'Pijn overal, geen vertrouwen in haar lichaam',
    videoId: '1176722243',
    summary: 'Was 4-5 dagen ziek van spierpijn na een workout. Durfde niet meer naar de sportles. Had al honderd dingen geprobeerd. Nu pijnvrij en vertrouwt haar lichaam weer.',
  },
  {
    name: 'Willem (56)',
    location: 'Katwijk',
    complaint: 'Zenuwpijn in been',
    videoId: '1176722175',
    summary: 'Drie maanden uit zijn werk door zenuwpijn. Huisarts zei: rust. Na een paar weken bij Jari weer aan het werk. Nu 100% klachtenvrij.',
  },
  {
    name: 'Erica',
    location: 'Leiden',
    complaint: 'Heupblessure',
    videoId: '1176722280',
    summary: 'Drie fysio\'s, drie diagnoses, niks hielp. Kon niet meer hardlopen en sliep niet van de pijn. Nu rent ze 7,5 km pijnvrij en deed ze de Hyrox.',
  },
  {
    name: 'Marieke (30)',
    location: 'Leiden',
    complaint: 'Achillespees/kuit',
    videoId: '1176722373',
    summary: 'Drie jaar lang elke ochtend stijf alsof ze 80 was. Steeds dezelfde cirkel: fysio, even beter, dan weer terug. Nu al een half jaar compleet pijnvrij.',
  },
  {
    name: 'Job (28)',
    location: 'Leiden',
    complaint: 'Nek- en rugklachten',
    videoId: '1176722201',
    summary: 'Brandweerman. Kon geen 20 minuten achter een computer zitten. Fysio en chiropractor hielpen alleen de dag erna. Nu pijnvrij en weet precies hoe hij zijn houding moet aanpassen.',
  },
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function BodyAPKPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Vimeo Player Script */}
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />

      {/* Form Modal */}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 md:hidden z-50">
        <CTAButton onClick={openModal} variant="primary" className="w-full text-center" location="sticky-mobile">
          Help me van mijn klachten af
        </CTAButton>
      </div>

      <main className="relative pb-24 md:pb-0">
        {/* ================================================================ */}
        {/* HERO SECTION */}
        {/* ================================================================ */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://oehoqgwhk6gydfz3.public.blob.vercel-storage.com/pictures/Scherm%C2%ADafbeelding%202026-02-06%20om%2017.01.53.png')`
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Je auto laat je keuren.<br />Je lichaam niet?
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-4 max-w-xl mx-auto">
              De Body-APK laat je letterlijk zien waar je lichaam vastloopt. Geen giswerk. Geen standaard oefeningen. Wel antwoorden.
            </p>

            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Voor mensen met terugkerende rugpijn, nekklachten of houdingsproblemen die al van alles hebben geprobeerd.
            </p>

            <CTAButton onClick={openModal} variant="white" className="text-lg" location="hero">
              Help me van mijn klachten af
            </CTAButton>
          </div>
        </section>

        {/* ================================================================ */}
        {/* TRUST SECTION */}
        {/* ================================================================ */}
        <section className="bg-white py-6 border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex flex-col items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-[#0CBABA]">{'\u2713'}</span>
                <span>Geen lidmaatschap nodig</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0CBABA]">{'\u2713'}</span>
                <span>Geen verplicht vervolg</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-[#F7CB15]">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <span>270+ Google reviews</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION: HERKEN JE DIT? */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Herken je dit?</h2>
          </div>

          <ul className="space-y-4 max-w-lg mx-auto mb-10">
            {[
              'Je wordt \'s ochtends wakker en je eerste stappen doen al pijn',
              'Je kunt niet lang zitten, staan of lopen zonder klachten',
              'Je sport, maar dezelfde pijn blijft terugkomen',
              'Je denkt: dit hoort vast bij het ouder worden. Of erger: dit gaat niet meer weg.'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-lg">
                <span className="w-2 h-2 bg-[#EF4C37] rounded-full mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="text-center">
            <CTAButton onClick={openModal} variant="primary" location="problem-section">
              Ja, dit herken ik
            </CTAButton>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* SECTION: DIT ZIJN MENSEN ZOALS JIJ (6 klantverhalen) */}
        {/* ================================================================ */}
        <SectionWrapper>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dit zijn mensen zoals jij</h2>
            <p className="text-lg text-gray-600">
              Ze hadden allemaal lang last. Ze hadden allemaal al van alles geprobeerd. Dit is wat er veranderde.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
                <VideoTestimonial videoId={t.videoId} title={`${t.name} - ${t.complaint}`} />
                <div className="p-4">
                  <p className="font-semibold text-lg">{t.name}</p>
                  <p className="text-sm text-gray-500 mb-2">{t.location} · {t.complaint}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{t.summary}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <CTAButton onClick={openModal} variant="primary" location="testimonials">
              Help me van mijn klachten af
            </CTAButton>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* SECTION: WAT IS DE BODY-APK? */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Wat is de Body-APK?</h2>
            <p className="text-xl text-gray-600">
              Een diepgaande lichaamsanalyse waarbij we kijken naar:
            </p>
          </div>

          <ul className="space-y-4 max-w-lg mx-auto mb-10">
            {[
              'Je houding: hoe je staat en zit',
              'Je ademhaling: hoe je ademt in rust en onder belasting',
              'Je beweging: lopen of rennen in slow motion'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-lg">
                <CheckIcon className="w-6 h-6 text-[#0CBABA] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-lg text-gray-600 text-center">
            Het doel: snappen waarom je klachten blijven terugkomen, ook als je al van alles hebt geprobeerd.
          </p>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* SECTION: WIE BEGELEIDT DE BODY-APK? (JARI) */}
        {/* ================================================================ */}
        <SectionWrapper>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Wie begeleidt de Body-APK?</h2>
          </div>

          {/* Video */}
          <div className="w-full max-w-md mx-auto mb-8">
            <JariIntroVideo />
          </div>

          {/* Text */}
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              De Body-APK wordt begeleid door Jari.
            </h3>

            <div className="space-y-4 text-gray-600 leading-relaxed max-w-lg mx-auto">
              <p>
                Jari is bewegingsspecialist bij CrossFit Leiden.
              </p>
              <p>
                Hij is gespecialiseerd in houding, ademhaling en bewegingsanalyse. Hij kijkt niet alleen naar waar je klachten voelt, maar vooral naar hoe je lichaam als geheel beweegt.
              </p>
              <p>
                Geen standaard protocollen, maar kijken wat jouw lichaam laat zien.
              </p>
              <p className="font-medium text-black">
                Zonder haast. Zonder oordeel.
              </p>
            </div>

            {/* Schaarste-element */}
            <div className="mt-8 inline-block bg-[#F7CB15]/15 border border-[#F7CB15]/30 rounded-lg px-6 py-3">
              <p className="text-sm font-medium text-gray-800">
                Jari doet maximaal 4 Body-APK&apos;s per week.
              </p>
            </div>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* SECTION: AL VAN ALLES GEPROBEERD? */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-black text-white">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Al van alles geprobeerd?</h2>
          </div>

          <ul className="space-y-4 max-w-lg mx-auto mb-10">
            {[
              'Je bent bij de fysio geweest (misschien wel drie verschillende), maar de klacht komt steeds terug',
              'Je hebt oefeningen gekregen die even helpen, maar na een paar maanden ben je weer terug bij af',
              'Je chiropractor lost het op voor een dag, maar niet voor de lange termijn',
              'Je hebt misschien zelfs gehoord dat een operatie de enige oplossing is',
              'Je hebt misschien al honderd dingen geprobeerd en denkt: waarom zou dit anders zijn?',
              'Je wilt eindelijk weten waar het probleem \u00e9cht vandaan komt'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-lg">
                <span className="w-2 h-2 bg-[#EF4C37] rounded-full mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="text-center max-w-lg mx-auto">
            <p className="text-xl text-white font-semibold mb-2">
              De Body-APK is geen symptoombestrijding.
            </p>
            <p className="text-xl text-gray-300">
              We zoeken de oorzaak.
            </p>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* SECTION: WAT IS HET VERSCHIL MET EEN FYSIO? (NIEUW) */}
        {/* ================================================================ */}
        <SectionWrapper>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Wat is het verschil met een fysio?</h2>
          </div>

          <div className="space-y-6 max-w-lg mx-auto mb-10">
            <p className="text-lg text-gray-600 leading-relaxed">
              Bij een fysio wordt vaak gekeken naar de plek waar het pijn doet. De Body-APK kijkt naar hoe je hele lichaam beweegt.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Jari kijkt niet naar je klacht. Hij kijkt naar je houding, je looppatroon, je ademhaling. Op slow motion video. Met foto&apos;s van voor en na.
            </p>
            <p className="text-lg font-semibold text-black">
              Het verschil? Een fysio behandelt waar het pijn doet. De Body-APK zoekt uit waarom het pijn doet.
            </p>
          </div>

          {/* Quote blocks */}
          <div className="space-y-4 max-w-lg mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 relative">
              <QuoteIcon className="w-8 h-8 absolute top-4 left-4" />
              <p className="text-gray-700 italic pl-6">
                &ldquo;Drie fysio&apos;s gaven drie verschillende diagnoses. Jari heeft gewoon gekeken naar hoe ik beweeg.&rdquo;
              </p>
              <p className="text-sm text-gray-500 mt-2 pl-6 font-medium">Erica</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 relative">
              <QuoteIcon className="w-8 h-8 absolute top-4 left-4" />
              <p className="text-gray-700 italic pl-6">
                &ldquo;Ik ging filmpjes kijken hoe een oefening moet. Maar bij mij gingen de juiste spieren niet aan op die manier. Jari ging net zo lang zoeken totdat ik het w&eacute;l op de juiste plek voelde.&rdquo;
              </p>
              <p className="text-sm text-gray-500 mt-2 pl-6 font-medium">Angelique</p>
            </div>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* SECTION: WAT LEVERT HET OP? */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Wat levert het op?</h2>
          </div>

          <ul className="space-y-4 max-w-lg mx-auto mb-10">
            {[
              'We brengen exact in kaart waar jouw lichaam vastloopt',
              'Je begrijpt waarom klachten blijven terugkomen',
              'Je weet welke stap logisch is om vooruit te komen'
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-lg">
                <CheckIcon className="w-6 h-6 text-[#0CBABA] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Deliverables */}
          <div className="space-y-3 max-w-lg mx-auto border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 mb-4 text-center">Je ontvangt:</p>
            {[
              { icon: <VideoIcon className="w-5 h-5" />, text: "Slow-motion video's van je beweging" },
              { icon: <CameraIcon className="w-5 h-5" />, text: "Houdingsfoto's" },
              { icon: <VideoIcon className="w-5 h-5" />, text: 'Korte uitlegvideo' },
              { icon: <ClipboardIcon className="w-5 h-5" />, text: 'Samenvatting met concrete vervolgstappen' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-lg">
                <span className="text-[#0CBABA]">{item.icon}</span>
                <span className="text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* SECTION: ZO WERKT HET */}
        {/* ================================================================ */}
        <SectionWrapper>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Zo werkt het</h2>
          </div>

          <div className="space-y-8 max-w-lg mx-auto">
            {[
              {
                step: '1',
                title: 'Kennismaking',
                description: 'We bellen je kort (5-10 min) om je situatie te bespreken. Geen verkooppraatje.',
                color: 'bg-[#F7CB15]'
              },
              {
                step: '2',
                title: 'Analyse in de gym',
                description: 'Tijdens de sessie (60-90 min) analyseren we je houding, ademhaling en beweging.',
                color: 'bg-[#0CBABA]'
              },
              {
                step: '3',
                title: 'Uitleg en vervolgstap',
                description: 'Je krijgt beelden, uitleg en een heldere samenvatting.',
                color: 'bg-[#EF4C37]'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`${item.color} text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}>
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <CTAButton onClick={openModal} variant="primary" location="process-section">
              Help me van mijn klachten af
            </CTAButton>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* SECTION: TWIJFELS? DIE HADDEN ZIJ OOK. (NIEUW) */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Twijfels? Die hadden zij ook.</h2>
          </div>

          <div className="max-w-lg mx-auto space-y-8">
            {/* Over de investering */}
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">Over de investering</p>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 relative">
                  <QuoteIcon className="w-8 h-8 absolute top-4 left-4" />
                  <p className="text-gray-700 italic pl-6">
                    &ldquo;Ik heb goed over het prijskaartje nagedacht. Maar het is me al het geld waard, omdat ik nu weer pijnvrij alles kan doen.&rdquo;
                  </p>
                  <p className="text-sm text-gray-500 mt-2 pl-6 font-medium">Marieke, achillespees/kuit</p>
                </div>
                <div className="bg-white rounded-xl p-6 relative">
                  <QuoteIcon className="w-8 h-8 absolute top-4 left-4" />
                  <p className="text-gray-700 italic pl-6">
                    &ldquo;Het is een groot bedrag. Maar ik dacht: wat is het mij waard om me weer zeker te voelen?&rdquo;
                  </p>
                  <p className="text-sm text-gray-500 mt-2 pl-6 font-medium">Angelique, Leiderdorp</p>
                </div>
              </div>
            </div>

            {/* Over "gaat dit wel werken?" */}
            <div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-4">Over &ldquo;gaat dit wel werken?&rdquo;</p>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 relative">
                  <QuoteIcon className="w-8 h-8 absolute top-4 left-4" />
                  <p className="text-gray-700 italic pl-6">
                    &ldquo;Ik loop er al zo lang mee. Hoe kan iemand het dan oplossen binnen een paar maanden? Maar het werkte.&rdquo;
                  </p>
                  <p className="text-sm text-gray-500 mt-2 pl-6 font-medium">Marieke</p>
                </div>
                <div className="bg-white rounded-xl p-6 relative">
                  <QuoteIcon className="w-8 h-8 absolute top-4 left-4" />
                  <p className="text-gray-700 italic pl-6">
                    &ldquo;Je denkt: gaat dit het wel zijn? Zeker na een half jaar fysio. Maar in de loop der weken merkte ik: dit is het.&rdquo;
                  </p>
                  <p className="text-sm text-gray-500 mt-2 pl-6 font-medium">Job, nek- en rugklachten</p>
                </div>
                <div className="bg-white rounded-xl p-6 relative">
                  <QuoteIcon className="w-8 h-8 absolute top-4 left-4" />
                  <p className="text-gray-700 italic pl-6">
                    &ldquo;Ik heb misschien al honderd dingen geprobeerd. Maar voor mij is dit het laatste wat ik hoefde te proberen.&rdquo;
                  </p>
                  <p className="text-sm text-gray-500 mt-2 pl-6 font-medium">Angelique</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <CTAButton onClick={openModal} variant="primary" location="twijfels-section">
              Help me van mijn klachten af
            </CTAButton>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* SECTION: VOOR WIE IS DIT GESCHIKT? */}
        {/* ================================================================ */}
        <SectionWrapper>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Voor wie is dit geschikt?</h2>
          </div>

          <div className="space-y-6 max-w-lg mx-auto">
            {/* Suitable */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-green-700">
                <CheckIcon className="w-5 h-5" />
                Wel geschikt als je...
              </h3>
              <ul className="space-y-3">
                {[
                  'Terugkerende klachten hebt',
                  'Klaar bent met pleisters plakken',
                  'Bereid bent om zelf aan de slag te gaan',
                  'Openstaat voor een eerlijk gesprek'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Suitable */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-500">
                <XIcon className="w-5 h-5" />
                Niet geschikt als je...
              </h3>
              <ul className="space-y-3 text-gray-600">
                {[
                  'Acute pijn hebt en medische hulp nodig hebt',
                  'Op zoek bent naar een snelle fix',
                  'Een offici\u00eble diagnose verwacht'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XIcon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* SECTION: VEELGESTELDE VRAGEN */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Veelgestelde vragen</h2>
          </div>

          <div className="max-w-lg mx-auto">
            <FAQItem
              question="Is dit fysiotherapie?"
              answer="Nee. We stellen geen medische diagnoses en behandelen niet. De Body-APK is een analyse die je helpt begrijpen wat er speelt."
            />
            <FAQItem
              question="Wat is het verschil met een fysio?"
              answer="Een fysio kijkt vaak naar de plek waar het pijn doet. Wij kijken naar hoe je hele lichaam beweegt: je houding, je looppatroon, je ademhaling. Alles op video en in foto's. Het doel is de oorzaak vinden, niet het symptoom behandelen."
            />
            <FAQItem
              question="Wat als mijn fysio of arts zegt dat het niet te verhelpen is zonder operatie?"
              answer="De Body-APK vervangt geen medisch advies. Maar we zien regelmatig dat mensen die te horen kregen dat bewegen niet zou helpen, toch grote stappen maken. We kijken op een andere manier naar je lichaam. Dat begint met de analyse."
            />
            <FAQItem
              question="Heb ik een verwijzing nodig?"
              answer="Nee. Je kunt direct een afspraak maken."
            />
            <FAQItem
              question="Wat als ik niet kan rennen?"
              answer={
                <div className="space-y-3">
                  <p>We passen de analyse aan op wat voor jou mogelijk is.</p>
                  <p>Belangrijk: als je geen paar minuten pijnvrij kunt lopen, is de Body-APK waarschijnlijk nog niet de juiste stap.</p>
                </div>
              }
            />
            <FAQItem
              question="Hoe bereid ik me voor?"
              answer="Je ontvangt vooraf een korte vragenlijst. Neem sportkleding mee waarin je goed kunt bewegen."
            />
            <FAQItem
              question="Waar vindt het plaats?"
              answer="Bij CrossFit Leiden, Marie Diebenplaats 108, 2324 NG Leiden."
            />
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* SECTION: AFSLUITENDE CTA */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-black text-white">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Klaar om te weten wat er speelt?</h2>

            {/* Resultaten-strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/90 text-sm">
                  <span className="font-semibold">Diana</span> kon geen 100 meter lopen. Nu doet ze 10.000 stappen per dag.
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/90 text-sm">
                  <span className="font-semibold">Willem</span> was 3 maanden uit zijn werk. Nu is hij 100% klachtenvrij.
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/90 text-sm">
                  <span className="font-semibold">Marieke</span> was 3 jaar lang elke ochtend stijf. Nu een half jaar pijnvrij.
                </p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/90 text-sm">
                  <span className="font-semibold">Angelique</span> had al honderd dingen geprobeerd. Dit was het laatste wat ze hoefde te proberen.
                </p>
              </div>
            </div>

            <CTAButton onClick={openModal} variant="white" className="text-lg" location="final-cta">
              Help me van mijn klachten af
            </CTAButton>
            <p className="mt-4 text-sm text-gray-300">
              We beginnen met een kort, vrijblijvend telefoongesprek.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              400+ leden bij CrossFit Leiden
            </p>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* FOOTER */}
        {/* ================================================================ */}
        <footer className="bg-black text-white py-10 border-t border-gray-800">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="font-semibold text-lg mb-2">CrossFit Leiden</p>
            <p className="text-gray-400 mb-6">Marie Diebenplaats 108, 2324 NG Leiden</p>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacyvoorwaarden
              </a>
              <span>&copy; {new Date().getFullYear()} CrossFit Leiden</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

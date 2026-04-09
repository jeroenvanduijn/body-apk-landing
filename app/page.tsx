'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
    if (window.gtag) {
      window.gtag('event', 'cta_click', { cta_location: location });
    }
    if (window.hj) {
      window.hj('event', 'formulier_knop_geklikt');
    }
  }
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
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, { video_id: videoId, video_title: videoTitle, ...extra });
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
// WHATSAPP ICON
// ============================================================================

const WhatsAppIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ============================================================================
// FORM MODAL (2-step)
// ============================================================================

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/Arta9mf7m9NTEPdznlsP/webhook-trigger/fe487f3f-d283-4529-a366-a4f5c5a92c31';

const FormModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [naam, setNaam] = useState('');
  const [email, setEmail] = useState('');
  const [telefoon, setTelefoon] = useState('');
  const [tijdstip, setTijdstip] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setNaam('');
      setEmail('');
      setTelefoon('');
      setTijdstip('');
      setError('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const submitStep1 = async () => {
    if (!naam.trim() || !email.trim()) {
      setError('Vul je voornaam en e-mailadres in.');
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
          bron: 'Body-APK Rugpijn LP - Stap 1'
        })
      });

      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'Body-APK Rugpijn Info Request',
          content_category: 'rugpijn'
        });
      }
      if (window.gtag) {
        window.gtag('event', 'generate_lead', { method: 'form_step1' });
      }
      if (window.hj) {
        window.hj('event', 'variant_b_stap_1');
      }

      setStep(2);
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitStep2 = async () => {
    if (!telefoon.trim()) {
      setError('Vul je telefoonnummer in.');
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
          telefoon,
          voorkeur_tijdstip: tijdstip,
          bron: 'Body-APK Rugpijn LP - Stap 2'
        })
      });

      if (window.gtag) {
        window.gtag('event', 'schedule_callback', { method: 'form_step2' });
      }

      setStep(3);
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSuccess = () => setStep(3);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-5"
      style={{ backdropFilter: 'blur(4px)' }}>
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-[420px] max-h-[90vh] overflow-y-auto"
        style={{ padding: '36px 28px' }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
          aria-label="Sluiten"
        >
          &times;
        </button>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div className="flex gap-2 mb-6">
              <div className="w-8 h-1 rounded-sm bg-[#EF4C37]" />
              <div className="w-8 h-1 rounded-sm bg-gray-200" />
            </div>
            <h3 className="font-heading text-[22px] font-bold mb-2">Meer weten over de Body-APK?</h3>
            <p className="text-[15px] text-gray-600 mb-6">
              Vul je gegevens in en we sturen je meer informatie over hoe de Body-APK je kan helpen bij je rugpijn.
            </p>
            <div className="mb-4">
              <label htmlFor="fname" className="block text-sm font-semibold text-gray-700 mb-1.5">Voornaam</label>
              <input
                id="fname"
                type="text"
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
                className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-[#EF4C37] transition-colors"
                placeholder="Je voornaam"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">E-mailadres</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-[#EF4C37] transition-colors"
                placeholder="je@email.nl"
              />
            </div>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button
              onClick={submitStep1}
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#EF4C37] text-white rounded-full font-bold text-base cursor-pointer hover:bg-[#d93d29] transition-colors disabled:opacity-50 mt-2"
            >
              {isSubmitting ? 'Even geduld...' : 'Ja, stuur me meer info \u2192'}
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <div className="flex gap-2 mb-6">
              <div className="w-8 h-1 rounded-sm bg-[#EF4C37]" />
              <div className="w-8 h-1 rounded-sm bg-[#EF4C37]" />
            </div>
            <h3 className="font-heading text-[22px] font-bold mb-2">Wil je ook een gratis belafspraak?</h3>
            <p className="text-[15px] text-gray-600 mb-6">
              Een kort gesprek van 5-10 minuten om je rugklachten te bespreken. Geen verkooppraatje.
            </p>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">Telefoonnummer</label>
              <input
                id="phone"
                type="tel"
                value={telefoon}
                onChange={(e) => setTelefoon(e.target.value)}
                className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-[#EF4C37] transition-colors"
                placeholder="06 12345678"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="timepref" className="block text-sm font-semibold text-gray-700 mb-1.5">Voorkeur tijdstip</label>
              <select
                id="timepref"
                value={tijdstip}
                onChange={(e) => setTijdstip(e.target.value)}
                className="w-full px-3.5 py-3 border-[1.5px] border-gray-200 rounded-lg text-[15px] focus:outline-none focus:border-[#EF4C37] transition-colors bg-white"
              >
                <option value="">Kies een tijdstip</option>
                <option value="ochtend">Ochtend (9:00 - 12:00)</option>
                <option value="middag">Middag (12:00 - 17:00)</option>
                <option value="avond">Avond (17:00 - 20:00)</option>
              </select>
            </div>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button
              onClick={submitStep2}
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#EF4C37] text-white rounded-full font-bold text-base cursor-pointer hover:bg-[#d93d29] transition-colors disabled:opacity-50 mt-2"
            >
              {isSubmitting ? 'Even geduld...' : 'Plan mijn belafspraak'}
            </button>
            <button
              onClick={showSuccess}
              className="block w-full text-center mt-3 text-sm text-gray-400 underline cursor-pointer bg-transparent border-none"
            >
              Nee bedankt, alleen de informatie
            </button>
          </div>
        )}

        {/* Success */}
        {step === 3 && (
          <div className="text-center py-5">
            <div className="w-14 h-14 bg-[#0CBABA] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-heading text-[22px] font-bold mb-2">Top, je hoort van ons!</h3>
            <p className="text-[15px] text-gray-600">
              We sturen je meer informatie over de Body-APK. Heb je in de tussentijd vragen? Stuur ons een{' '}
              <a href="https://wa.me/31712340285" className="text-[#EF4C37] font-semibold hover:underline" target="_blank" rel="noopener noreferrer">
                WhatsApp-berichtje
              </a>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// STORY DATA
// ============================================================================

const stories = [
  {
    name: 'Diana (40)',
    location: 'Rijnsburg',
    complaint: 'Dubbele hernia + verschoven wervel',
    videoId: '1176722336',
    before: 'Kon geen 100 meter lopen. Niet staan koken. Niet met de kinderen weg. Het ziekenhuis zei: opereren. De onderste drie wervels vastzetten met schroeven en pennen. Diana vroeg of bewegen een optie was. Het antwoord: nee.',
    transition: 'Na de Body-APK + Unlock Motion Small Group',
    after: 'Loopt nu 10.000 stappen per dag. Hernia niet meer te zien op foto\u2019s. Verschoven wervel zit recht. Zonder operatie. Zonder schroeven.',
    featured: true,
  },
  {
    name: 'Willem (56)',
    location: 'Katwijk',
    complaint: 'Zenuwpijn in been',
    videoId: '1176722175',
    before: 'Drie maanden uit zijn werk door zenuwpijn. Huisarts zei: rust.',
    transition: 'Na een paar weken bij Jari',
    after: 'Weer aan het werk. Nu 100% klachtenvrij.',
  },
  {
    name: 'Job (28)',
    location: 'Leiden',
    complaint: 'Nek- en rugklachten',
    videoId: '1176722201',
    before: 'Brandweerman. Kon geen 20 minuten achter een computer zitten. Fysio en chiropractor hielpen alleen de dag erna.',
    transition: 'Na de Body-APK',
    after: 'Pijnvrij. Weet precies hoe hij zijn houding moet aanpassen.',
  },
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function BodyAPKPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (location: string) => {
    trackCTAClick(location);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Vimeo Player Script */}
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />

      {/* Form Modal */}
      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/31712340285?text=Hoi%2C%20ik%20heb%20een%20vraag%20over%20de%20Body-APK%20voor%20rugpijn"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center z-[100] hover:scale-110 transition-transform"
        style={{ boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      <main>
        {/* ── Top Bar ── */}
        <div className="bg-[#1a1a1a] text-white text-center py-2.5 px-5 text-[13px] font-medium tracking-wide">
          CrossFit Leiden &middot; Marie Diebenplaats 108, Leiden
        </div>

        {/* ── Hero ── */}
        <section className="py-12 md:py-16 text-center"
          style={{ background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)' }}>
          <div className="max-w-[680px] mx-auto px-5">
            <span className="inline-block bg-[#EF4C37] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Rugpijn
            </span>
            <h1 className="font-heading font-extrabold leading-[1.15] mb-4 tracking-tight"
              style={{ fontSize: 'clamp(28px, 7vw, 42px)' }}>
              Rugpijn die steeds <span className="text-[#EF4C37]">terugkomt?</span>
            </h1>
            <p className="text-[17px] text-gray-600 max-w-[500px] mx-auto mb-8 leading-relaxed">
              De Body-APK laat je zien waar het echt vandaan komt. Geen giswerk. Geen standaard oefeningen. Wel antwoorden.
            </p>
            <button
              onClick={() => openModal('hero')}
              className="inline-block bg-[#EF4C37] text-white font-bold text-base px-9 py-4 rounded-full cursor-pointer hover:bg-[#d93d29] hover:-translate-y-px transition-all"
              style={{ boxShadow: '0 4px 16px rgba(239,76,55,0.3)' }}
            >
              Ontdek of de Body-APK bij je past
            </button>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-600">
              <span className="flex items-center gap-1.5"><span className="text-[#0CBABA] font-bold">{'\u2713'}</span> Geen lidmaatschap nodig</span>
              <span className="flex items-center gap-1.5"><span className="text-[#0CBABA] font-bold">{'\u2713'}</span> Geen verplicht vervolg</span>
              <span className="flex items-center gap-1.5"><span className="text-[#0CBABA] font-bold">{'\u2713'}</span> 270+ Google reviews</span>
            </div>
          </div>
        </section>

        {/* ── Herken je dit? ── */}
        <section className="py-14 bg-[#fafafa]">
          <div className="max-w-[680px] mx-auto px-5">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#EF4C37] mb-3">Herken je dit?</p>
            <h2 className="font-heading font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(24px, 5.5vw, 32px)' }}>
              Je hebt rugpijn. En het gaat niet weg.
            </h2>
            <ul className="my-6">
              {[
                'Je wordt \u2019s ochtends wakker en je rug is al stijf',
                'Je kunt niet lang zitten of staan zonder pijn',
                'Je bent al bij de fysio geweest, maar de klacht komt steeds terug',
                'Je denkt: dit hoort vast bij het ouder worden',
                'Je hebt misschien zelfs gehoord dat een operatie de enige oplossing is',
              ].map((item, i) => (
                <li key={i} className="py-3.5 border-b border-gray-200 last:border-b-0 text-base text-gray-700 flex items-start gap-3 leading-relaxed">
                  <div className="flex-shrink-0 w-6 h-6 bg-[#EF4C37] rounded-full flex items-center justify-center mt-0.5">
                    <svg viewBox="0 0 12 12" fill="none" width="12" height="12"><path d="M2 6h8" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => openModal('herken-je-dit')}
              className="inline-block bg-[#EF4C37] text-white font-bold text-base px-9 py-4 rounded-full cursor-pointer hover:bg-[#d93d29] hover:-translate-y-px transition-all"
              style={{ boxShadow: '0 4px 16px rgba(239,76,55,0.3)' }}
            >
              Ja, dit herken ik
            </button>
          </div>
        </section>

        {/* ── Member Stories (text cards + videos) ── */}
        <section className="py-14">
          <div className="max-w-[680px] mx-auto px-5">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#EF4C37] mb-3">Zij hadden hetzelfde</p>
            <h2 className="font-heading font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(24px, 5.5vw, 32px)' }}>
              Rugpijn. Al van alles geprobeerd. Dit veranderde alles.
            </h2>

            {/* Story cards */}
            {stories.map((s, i) => (
              <div key={i} className={`rounded-xl mb-5 relative overflow-hidden ${
                s.featured
                  ? 'bg-[#fafafa] border-2 border-[#EF4C37] p-7 md:p-8'
                  : 'bg-white border border-gray-200 p-7'
              }`}>
                {!s.featured && <div className="absolute top-0 left-0 w-1 h-full bg-[#EF4C37]" />}

                {/* Video */}
                <div className="mb-5 max-w-sm mx-auto">
                  <VideoTestimonial videoId={s.videoId} title={`${s.name} - ${s.complaint}`} />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-[17px]">{s.name}</span>
                  <span className="text-sm text-gray-400">{s.location}</span>
                </div>
                <span className="inline-block bg-[#EF4C37]/[0.08] text-[#EF4C37] text-[13px] font-semibold px-3 py-1 rounded-full mb-3.5">
                  {s.complaint}
                </span>
                <p className="text-[15px] text-gray-700 leading-relaxed mb-3">{s.before}</p>
                <div className="flex items-center gap-2 font-bold text-sm text-[#0CBABA] mb-3">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M8 14l4-4M8 14l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  {s.transition}
                </div>
                <p className="text-[15px] font-medium text-[#1a1a1a] leading-relaxed">{s.after}</p>
              </div>
            ))}

            {/* Angelique quote block */}
            <div className="bg-[#1a1a1a] text-white p-10 rounded-xl my-8 text-center">
              <blockquote className="text-[19px] italic leading-relaxed mb-3">
                &ldquo;Ik heb misschien al honderd dingen geprobeerd. Maar voor mij is dit het laatste wat ik hoefde te proberen.&rdquo;
              </blockquote>
              <cite className="not-italic text-sm text-gray-400">Angelique (40), Leiderdorp</cite>
            </div>

            {/* More video testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
              {[
                { name: 'Erica', location: 'Leiden', complaint: 'Heupblessure', videoId: '1176722280' },
                { name: 'Marieke (30)', location: 'Leiden', complaint: 'Achillespees/kuit', videoId: '1176722373' },
                { name: 'Angelique (40)', location: 'Leiderdorp', complaint: 'Pijn overal', videoId: '1176722243' },
              ].map((t, i) => (
                <div key={i} className="bg-[#fafafa] rounded-xl overflow-hidden">
                  <VideoTestimonial videoId={t.videoId} title={`${t.name} - ${t.complaint}`} />
                  <div className="p-3">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location} &middot; {t.complaint}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Al van alles geprobeerd ── */}
        <section className="py-14 bg-[#fafafa]">
          <div className="max-w-[680px] mx-auto px-5">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#EF4C37] mb-3">Klinkt bekend?</p>
            <h2 className="font-heading font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(24px, 5.5vw, 32px)' }}>
              Al van alles geprobeerd voor je rug?
            </h2>
            <ul className="my-5">
              {[
                'Fysiotherapie \u2014 even beter, daarna weer terug bij af',
                'Chiropractor \u2014 helpt voor een dag, niet voor de lange termijn',
                'Oefeningen van YouTube \u2014 maar je weet niet of je ze goed doet',
                'Rust \u2014 maar zodra je weer beweegt is het terug',
                'Misschien zelfs het advies: opereren',
              ].map((item, i) => (
                <li key={i} className="py-2.5 text-[15px] text-gray-700 flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[#EF4C37] font-bold flex-shrink-0">{'\u2715'}</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 font-medium text-base">De Body-APK is geen symptoombestrijding. We zoeken de oorzaak.</p>
          </div>
        </section>

        {/* ── Wat is de Body-APK ── */}
        <section className="py-14">
          <div className="max-w-[680px] mx-auto px-5">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#EF4C37] mb-3">De aanpak</p>
            <h2 className="font-heading font-bold leading-tight mb-5"
              style={{ fontSize: 'clamp(24px, 5.5vw, 32px)' }}>
              Wat is de Body-APK?
            </h2>
            <p className="text-base text-gray-700 mb-6 leading-relaxed">
              Een diepgaande analyse van hoe je lichaam beweegt. Niet alleen waar het pijn doet, maar waarom het pijn doet.
            </p>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {[
                { emoji: '\uD83D\uDCD0', title: 'Houding', desc: 'Hoe je staat en zit. Waar je lichaam compenseert.' },
                { emoji: '\uD83D\uDCA8', title: 'Ademhaling', desc: 'Hoe je ademt in rust en onder belasting.' },
                { emoji: '\uD83C\uDFA5', title: 'Beweging', desc: 'Lopen of rennen in slow motion. Tot in detail geanalyseerd.' },
              ].map((item, i) => (
                <div key={i} className="bg-[#fafafa] rounded-lg p-5">
                  <h4 className="font-bold text-[15px] mb-1.5 flex items-center gap-2">
                    <span>{item.emoji}</span> {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Verschil met fysio */}
            <h3 className="text-lg font-bold mt-8 mb-3">Verschil met een fysio</h3>
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-[13px] uppercase tracking-wide text-gray-400 px-3 py-2.5 border-b-2 border-gray-200">Fysio</th>
                    <th className="text-left text-[13px] uppercase tracking-wide text-gray-400 px-3 py-2.5 border-b-2 border-gray-200">Body-APK</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Kijkt naar waar het pijn doet', 'Kijkt naar hoe je hele lichaam beweegt'],
                    ['Behandelt het symptoom', 'Zoekt de oorzaak'],
                    ['Standaard protocol', 'Analyse op maat met video en foto'],
                  ].map(([fysio, apk], i) => (
                    <tr key={i}>
                      <td className="px-3 py-3 text-[15px] border-b border-gray-100 text-gray-600 align-top leading-relaxed">{fysio}</td>
                      <td className="px-3 py-3 text-[15px] border-b border-gray-100 font-medium align-top leading-relaxed">{apk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Jari ── */}
        <section className="py-14 bg-[#fafafa]">
          <div className="max-w-[680px] mx-auto px-5">
            <div className="bg-white rounded-xl p-7 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#EF4C37] mb-3">Je begeleider</p>
              <h3 className="font-heading text-xl font-bold mb-3">Jari, bewegingsspecialist</h3>

              {/* Jari video */}
              <div className="max-w-xs mx-auto mb-5">
                <JariIntroVideo />
              </div>

              <p className="text-[15px] text-gray-700 mb-3 leading-relaxed">
                Jari kijkt niet naar je klacht. Hij kijkt naar je houding, je looppatroon, je ademhaling. Op slow motion video. Met foto&apos;s van voor en na.
              </p>
              <p className="text-[15px] text-gray-700 mb-4 leading-relaxed">
                Geen standaard protocollen, maar kijken wat jouw lichaam laat zien. Zonder haast. Zonder oordeel.
              </p>
              <span className="inline-block bg-[#F7CB15]/15 text-gray-800 text-[13px] font-semibold px-3.5 py-1.5 rounded-full">
                Max. 4 Body-APK&apos;s per week
              </span>
            </div>
          </div>
        </section>

        {/* ── Wat levert het op ── */}
        <section className="py-14">
          <div className="max-w-[680px] mx-auto px-5">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#EF4C37] mb-3">Wat je krijgt</p>
            <h2 className="font-heading font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(24px, 5.5vw, 32px)' }}>
              Na de Body-APK weet je precies wat er speelt
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: '\uD83C\uDFAC', text: 'Slow-motion video\u2019s van je beweging' },
                { emoji: '\uD83D\uDCF8', text: 'Houdingsfoto\u2019s voor en na' },
                { emoji: '\uD83C\uDFA5', text: 'Korte uitleg-video' },
                { emoji: '\uD83D\uDCCB', text: 'Samenvatting met concrete vervolgstappen' },
              ].map((item, i) => (
                <div key={i} className="bg-[#fafafa] rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <p className="text-[13px] text-gray-600 leading-snug">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Zo werkt het ── */}
        <section className="py-14 bg-[#fafafa]">
          <div className="max-w-[680px] mx-auto px-5">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#EF4C37] mb-3">Het proces</p>
            <h2 className="font-heading font-bold leading-tight mb-7"
              style={{ fontSize: 'clamp(24px, 5.5vw, 32px)' }}>
              Zo werkt het
            </h2>

            <div className="mt-7">
              {[
                { num: '1', title: 'Kennismaking', desc: 'We bellen je kort (5-10 min) om je rugklachten te bespreken. Geen verkooppraatje.' },
                { num: '2', title: 'Analyse in de gym', desc: 'Tijdens de sessie (60-90 min) analyseren we je houding, ademhaling en beweging.' },
                { num: '3', title: 'Uitleg en vervolgstap', desc: 'Je krijgt beelden, uitleg en een heldere samenvatting van wat we vinden.' },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 mb-7 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#EF4C37] text-white rounded-full flex items-center justify-center font-heading font-bold text-base">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1">{step.title}</h4>
                    <p className="text-[15px] text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-2">
              <button
                onClick={() => openModal('zo-werkt-het')}
                className="inline-block bg-[#EF4C37] text-white font-bold text-base px-9 py-4 rounded-full cursor-pointer hover:bg-[#d93d29] hover:-translate-y-px transition-all"
                style={{ boxShadow: '0 4px 16px rgba(239,76,55,0.3)' }}
              >
                Ontdek of de Body-APK bij je past
              </button>
            </div>
          </div>
        </section>

        {/* ── Twijfels ── */}
        <section className="py-14">
          <div className="max-w-[680px] mx-auto px-5">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#EF4C37] mb-3">Twijfels?</p>
            <h2 className="font-heading font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(24px, 5.5vw, 32px)' }}>
              Die hadden zij ook.
            </h2>

            {[
              { quote: 'Ik loop er al zo lang mee. Hoe kan iemand het dan oplossen binnen een paar maanden? Maar het werkte.', cite: 'Marieke, achillespees/kuit' },
              { quote: 'Je denkt: gaat dit het wel zijn? Zeker na een half jaar fysio. Maar in de loop der weken merkte ik: dit is het.', cite: 'Job, nek- en rugklachten' },
              { quote: 'Ik heb goed over het prijskaartje nagedacht. Maar het is me al het geld waard, omdat ik nu weer pijnvrij alles kan doen.', cite: 'Marieke' },
            ].map((d, i) => (
              <div key={i} className="bg-[#fafafa] rounded-lg p-5 mb-3">
                <blockquote className="text-[15px] italic text-gray-700 leading-relaxed mb-2">
                  &ldquo;{d.quote}&rdquo;
                </blockquote>
                <cite className="not-italic text-[13px] text-gray-400">{d.cite}</cite>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="bg-[#1a1a1a] text-white text-center py-14">
          <div className="max-w-[680px] mx-auto px-5">
            <h2 className="font-heading font-bold leading-tight mb-6 text-white"
              style={{ fontSize: 'clamp(24px, 5.5vw, 32px)' }}>
              Klaar om te weten waar je rugpijn vandaan komt?
            </h2>
            <p className="text-[15px] text-gray-400 mb-2 leading-relaxed"><strong className="text-white">Diana</strong> kon geen 100 meter lopen. Nu doet ze 10.000 stappen per dag.</p>
            <p className="text-[15px] text-gray-400 mb-2 leading-relaxed"><strong className="text-white">Willem</strong> was 3 maanden uit zijn werk. Nu 100% klachtenvrij.</p>
            <p className="text-[15px] text-gray-400 mb-2 leading-relaxed"><strong className="text-white">Job</strong> kon niet achter zijn computer zitten. Nu pijnvrij.</p>
            <button
              onClick={() => openModal('final-cta')}
              className="inline-block bg-[#EF4C37] text-white font-bold text-base px-9 py-4 rounded-full cursor-pointer hover:bg-[#d93d29] hover:-translate-y-px transition-all mt-8"
              style={{ boxShadow: '0 4px 16px rgba(239,76,55,0.3)' }}
            >
              Ontdek of de Body-APK bij je past
            </button>
            <p className="mt-4 text-sm text-gray-400">We beginnen met een kort, vrijblijvend telefoongesprek.</p>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="text-center py-8 px-5 text-[13px] text-gray-400">
          <p>CrossFit Leiden &middot; Marie Diebenplaats 108, 2324 NG Leiden</p>
          <p className="mt-2">
            <a href="/privacy" className="text-gray-400 hover:text-gray-600 transition-colors">Privacyvoorwaarden</a>
            {' '}&middot; &copy; {new Date().getFullYear()} CrossFit Leiden
          </p>
        </footer>
      </main>
    </>
  );
}

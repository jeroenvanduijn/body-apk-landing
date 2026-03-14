'use client';

import { useState, useEffect, useRef } from 'react';
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
  }
}

const trackCTAClick = (location: string) => {
  if (typeof window !== 'undefined') {
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'cta_click', cta_location: location, variant: 'B' });
    }
    if (window.hj) {
      window.hj('event', 'formulier_knop_geklikt');
    }
  }
};

const trackStep = (step: number) => {
  if (typeof window !== 'undefined') {
    if (window.dataLayer) {
      window.dataLayer.push({ event: `variant_b_step_${step}`, variant: 'B' });
    }
    if (window.hj) {
      window.hj('event', `variant_b_stap_${step}`);
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
// 2-STEP MICRO-COMMITMENT MODAL
// ============================================================================

const COUNTRY_CODES = [
  { code: '+31', label: '🇳🇱 +31', country: 'NL' },
  { code: '+32', label: '🇧🇪 +32', country: 'BE' },
  { code: '+49', label: '🇩🇪 +49', country: 'DE' },
  { code: '+44', label: '🇬🇧 +44', country: 'UK' },
  { code: '+33', label: '🇫🇷 +33', country: 'FR' },
];

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/Arta9mf7m9NTEPdznlsP/webhook-trigger/fe487f3f-d283-4529-a366-a4f5c5a92c31';

const MicroCommitmentModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [voornaam, setVoornaam] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+31');
  const [telefoon, setTelefoon] = useState('');
  const [voorkeurTijdstip, setVoorkeurTijdstip] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setVoornaam('');
      setEmail('');
      setTelefoon('');
      setCountryCode('+31');
      setVoorkeurTijdstip('');
      setError('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const submitStep1 = async () => {
    if (!voornaam.trim() || !email.trim()) {
      setError('Vul je voornaam en e-mail in.');
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
          naam: voornaam,
          email,
          bron: 'Body-APK Landingspagina - Variant B - Stap 1'
        })
      });
      trackStep(1);
      setStep(2);
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitStep2 = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          naam: voornaam,
          email,
          telefoon: telefoon ? `${countryCode}${telefoon}` : '',
          voorkeur_tijdstip: voorkeurTijdstip,
          bron: 'Body-APK Landingspagina - Variant B - Stap 2'
        })
      });
      trackStep(2);
      router.push('/kennismaking');
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw.');
      setIsSubmitting(false);
    }
  };

  const skipStep2 = () => {
    router.push('/kennismaking');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div ref={formRef} className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Sluiten"
        >
          <CloseIcon />
        </button>

        <div className="p-6 md:p-8">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Ontdek of de Body-APK bij je past</h2>
              <p className="text-gray-600 mb-6">
                Laat je gegevens achter, dan sturen we je meer informatie.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="voornaam-b" className="block text-sm font-medium text-gray-700 mb-1">Voornaam</label>
                  <input
                    id="voornaam-b"
                    type="text"
                    value={voornaam}
                    onChange={(e) => setVoornaam(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4C37] focus:border-transparent"
                    placeholder="Je voornaam"
                  />
                </div>

                <div>
                  <label htmlFor="email-b" className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
                  <input
                    id="email-b"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4C37] focus:border-transparent"
                    placeholder="je@email.nl"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  onClick={submitStep1}
                  disabled={isSubmitting}
                  className="w-full bg-[#EF4C37] text-white font-semibold py-4 rounded-lg hover:bg-[#d9442f] transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Even geduld...' : 'Ja, stuur me meer info →'}
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4 text-center">
                Geen spam. Je kunt je altijd uitschrijven.
              </p>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckIcon className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-bold mb-1">Gelukt, {voornaam}!</h2>
                <p className="text-gray-600">Je ontvangt meer informatie per mail.</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2">Wil je ook een gratis belafspraak van 10 minuten?</h3>
                <p className="text-gray-600 text-sm mb-4">
                  We bespreken kort je situatie en kijken of de Body-APK bij je past.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="telefoon-b" className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer <span className="text-gray-400">(optioneel)</span></label>
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
                        id="telefoon-b"
                        type="tel"
                        value={telefoon}
                        onChange={(e) => setTelefoon(e.target.value)}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4C37] focus:border-transparent"
                        placeholder="612345678"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="tijdstip-b" className="block text-sm font-medium text-gray-700 mb-1">Voorkeur tijdstip</label>
                    <select
                      id="tijdstip-b"
                      value={voorkeurTijdstip}
                      onChange={(e) => setVoorkeurTijdstip(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EF4C37] focus:border-transparent bg-white"
                    >
                      <option value="">Kies een moment</option>
                      <option value="ochtend">Ochtend</option>
                      <option value="middag">Middag</option>
                      <option value="avond">Avond</option>
                    </select>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    onClick={submitStep2}
                    disabled={isSubmitting}
                    className="w-full bg-[#EF4C37] text-white font-semibold py-4 rounded-lg hover:bg-[#d9442f] transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Even geduld...' : 'Ja, plan mijn belafspraak'}
                  </button>

                  <button
                    onClick={skipStep2}
                    className="w-full text-gray-500 text-sm hover:text-gray-700 py-2 cursor-pointer"
                  >
                    Nee, bedankt
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// VIDEO TESTIMONIAL COMPONENT (Full Width)
// ============================================================================

const VideoTestimonial = ({ videoId, title }: { videoId: string; title: string }) => (
  <div className="relative w-full rounded-xl overflow-hidden bg-gray-100" style={{ paddingTop: '177.78%' }}>
    <iframe
      src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
      frameBorder="0"
      allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media"
      referrerPolicy="strict-origin-when-cross-origin"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      title={title}
    />
  </div>
);

// ============================================================================
// MAIN PAGE COMPONENT - VARIANT B
// ============================================================================

export default function BodyAPKPageVariantB() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Vimeo Player Script */}
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />

      {/* 2-Step Modal */}
      <MicroCommitmentModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 md:hidden z-50">
        <CTAButton onClick={openModal} variant="primary" className="w-full text-center" location="sticky-mobile">
          Ontdek of het bij je past
        </CTAButton>
      </div>

      <main className="relative pb-24 md:pb-0">
        {/* ================================================================ */}
        {/* HERO SECTION */}
        {/* ================================================================ */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://oehoqgwhk6gydfz3.public.blob.vercel-storage.com/pictures/Scherm%C2%ADafbeelding%202026-02-06%20om%2017.01.53.png')`
            }}
          />
          <div className="absolute inset-0 bg-black/55" />

          <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Je auto laat je keuren.<br />Je lichaam niet?
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-4 max-w-xl mx-auto">
              De Body-APK laat je letterlijk zien waar je lichaam vastloopt. Geen giswerk. Geen standaard oefeningen. Wel antwoorden.
            </p>

            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Voor mensen bij wie klachten steeds blijven terugkomen.
            </p>

            <CTAButton onClick={openModal} variant="white" className="text-lg" location="hero">
              Ontdek of de Body-APK bij je past
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
                <span className="text-[#0CBABA]">✓</span>
                <span>Geen lidmaatschap nodig</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0CBABA]">✓</span>
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
        {/* PROBLEM RECOGNITION */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Herken je dit?</h2>
          </div>

          <ul className="space-y-4 max-w-lg mx-auto mb-10">
            {[
              'Het schiet in je rug bij een kleine beweging',
              'Je voelt dat je houding niet klopt, maar je weet niet wat je moet doen',
              'Je sport, maar dezelfde klacht blijft terugkomen',
              'Je denkt: dit hoort vast bij het ouder worden'
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
        {/* MEMBER STORY 1 - CHANTAL */}
        {/* ================================================================ */}
        <SectionWrapper>
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Een voorbeeld uit de praktijk:</p>
            <p className="text-xl text-gray-600">Dit is geen uitzondering.</p>
          </div>

          <div className="w-full max-w-md mx-auto">
            <p className="text-gray-600 mb-4 text-center">
              Chantal had al jaren rugklachten en had van alles geprobeerd.
            </p>
            <div className="relative w-full rounded-xl overflow-hidden bg-gray-100" style={{ paddingTop: '177.78%' }}>
              <iframe
                src="https://player.vimeo.com/video/1169864962?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="Member Story Chantal"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-semibold text-lg">Chantal</p>
              <p className="text-gray-500">Ondernemer uit Leiden · Rugklachten</p>
            </div>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* WHAT IS THE BODY-APK */}
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
        {/* COACH INTRODUCTION - JARI */}
        {/* ================================================================ */}
        <SectionWrapper>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Wie begeleidt de Body-APK?</h2>
          </div>

          <div className="w-full max-w-md mx-auto mb-8">
            <div className="relative w-full rounded-xl overflow-hidden bg-gray-100" style={{ paddingTop: '177.78%' }}>
              <iframe
                src="https://player.vimeo.com/video/1162594482?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&texttrack=nl"
                frameBorder="0"
                allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="Body APK intro - Jari stelt zich voor"
              />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              De Body-APK wordt begeleid door Jari.
            </h3>

            <div className="space-y-4 text-gray-600 leading-relaxed max-w-lg mx-auto">
              <p>Jari is bewegingsspecialist bij CrossFit Leiden.</p>
              <p>Hij is gespecialiseerd in houding, ademhaling en bewegingsanalyse. Hij kijkt niet alleen naar waar je klachten voelt, maar vooral naar hoe je lichaam als geheel beweegt.</p>
              <p>Geen standaard protocollen, maar kijken wat jouw lichaam laat zien.</p>
              <p className="font-medium text-black">Zonder haast. Zonder oordeel.</p>
            </div>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* DIFFERENTIATION */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-black text-white">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Al van alles geprobeerd?</h2>
          </div>

          <ul className="space-y-4 max-w-lg mx-auto mb-10">
            {[
              'Je bent bij de fysio geweest, maar de klacht komt terug',
              'Je hebt oefeningen gekregen die niet werken',
              'Je bent het zat om steeds hetzelfde verhaal te vertellen',
              'Je wilt eindelijk weten waar het probleem vandaan komt'
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
        {/* WHAT YOU GET */}
        {/* ================================================================ */}
        <SectionWrapper>
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

          <div className="space-y-3 max-w-lg mx-auto border-t border-gray-100 pt-8">
            <p className="text-sm text-gray-500 mb-4 text-center">Je ontvangt:</p>
            {[
              { icon: <VideoIcon className="w-5 h-5" />, text: "Slow-motion video's van je beweging" },
              { icon: <CameraIcon className="w-5 h-5" />, text: "Houdingsfoto's" },
              { icon: <VideoIcon className="w-5 h-5" />, text: 'Korte uitlegvideo' },
              { icon: <ClipboardIcon className="w-5 h-5" />, text: 'Samenvatting met concrete vervolgstappen' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                <span className="text-[#0CBABA]">{item.icon}</span>
                <span className="text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* PROCESS */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Zo werkt het</h2>
          </div>

          <div className="space-y-8 max-w-lg mx-auto">
            {[
              {
                step: '1',
                title: 'Belafspraak',
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
              Ontdek of het bij je past
            </CTAButton>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* MORE MEMBER STORIES */}
        {/* ================================================================ */}
        <SectionWrapper>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Meer ervaringen</h2>
            <p className="text-gray-600">Meer mensen met rugklachten.</p>
          </div>

          <div className="space-y-12">
            <div className="w-full max-w-md mx-auto">
              <VideoTestimonial videoId="1162593462" title="Pieter Bas - Rugklachten" />
              <div className="mt-4 text-center">
                <p className="font-semibold text-lg">Pieter Bas</p>
                <p className="text-gray-500">Rugklachten</p>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto">
              <VideoTestimonial videoId="1162592944" title="Steph - Rugklachten / hernia" />
              <div className="mt-4 text-center">
                <p className="font-semibold text-lg">Steph</p>
                <p className="text-gray-500">Rugklachten / hernia</p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* WHO IS IT FOR */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Voor wie is dit geschikt?</h2>
          </div>

          <div className="space-y-6 max-w-lg mx-auto">
            <div className="bg-white p-6 rounded-xl">
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

            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-500">
                <XIcon className="w-5 h-5" />
                Niet geschikt als je...
              </h3>
              <ul className="space-y-3 text-gray-600">
                {[
                  'Acute pijn hebt en medische hulp nodig hebt',
                  'Op zoek bent naar een snelle fix',
                  'Een officiële diagnose verwacht'
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
        {/* FAQ */}
        {/* ================================================================ */}
        <SectionWrapper>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Veelgestelde vragen</h2>
          </div>

          <div className="max-w-lg mx-auto">
            <FAQItem
              question="Is dit fysiotherapie?"
              answer="Nee. We stellen geen medische diagnoses en behandelen niet. De Body-APK is een analyse die je helpt begrijpen wat er speelt."
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
        {/* FINAL CTA */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-black text-white">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Klaar om te weten wat er speelt?</h2>
            <p className="text-lg text-gray-300 mb-8">
              We beginnen met een kort, vrijblijvend telefoongesprek.
            </p>
            <CTAButton onClick={openModal} variant="white" className="text-lg" location="final-cta">
              Ontdek of de Body-APK bij je past
            </CTAButton>
            <p className="mt-6 text-sm text-gray-400">
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
              <span>© {new Date().getFullYear()} CrossFit Leiden</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

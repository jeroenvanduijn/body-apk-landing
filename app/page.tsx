'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';

// ============================================================================
// TRACKING UTILITIES
// ============================================================================
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const trackLead = () => {
  // GA4 DataLayer
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event: 'lead' });
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead');
  }

  // GA4 gtag
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead');
  }
};

const trackCTAClick = (location: string) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event: 'cta_click', cta_location: location });
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

const ClockIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="10" cy="10" r="8" />
    <path d="M10 5v5l3 3" strokeLinecap="round" />
  </svg>
);

const EyeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 4C5 4 1.5 10 1.5 10s3.5 6 8.5 6 8.5-6 8.5-6-3.5-6-8.5-6z" />
    <circle cx="10" cy="10" r="3" />
  </svg>
);

const FileIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 3h8l4 4v10a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
    <path d="M12 3v4h4" />
  </svg>
);

const StarIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const UsersIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="6" r="3" />
    <path d="M1 17v-1a4 4 0 014-4h4a4 4 0 014 4v1" />
    <circle cx="14" cy="6" r="2.5" />
    <path d="M14 12h2a3 3 0 013 3v2" />
  </svg>
);

const HeartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);

const ChevronDownIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
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
  href,
  variant = 'primary',
  className = '',
  location = 'unknown'
}: {
  children: React.ReactNode;
  href: string;
  variant?: 'primary' | 'secondary' | 'text';
  className?: string;
  location?: string;
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-[#EF4C37] text-white px-8 py-4 rounded hover:bg-[#d9442f] focus:ring-[#EF4C37]",
    secondary: "border-2 border-black text-black px-8 py-4 rounded hover:bg-black hover:text-white focus:ring-black",
    text: "text-[#EF4C37] hover:underline underline-offset-4 focus:ring-[#EF4C37]"
  };

  const handleClick = () => {
    trackCTAClick(location);
  };

  return (
    <a
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={handleClick}
    >
      {children}
    </a>
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
    <div className="max-w-6xl mx-auto px-6">
      {children}
    </div>
  </section>
);

const FAQItem = ({
  question,
  answer
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#EF4C37] focus:ring-inset"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium pr-4">{question}</span>
        <ChevronDownIcon className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
        aria-hidden={!isOpen}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// ============================================================================
// FORM COMPONENT
// ============================================================================

type FormData = {
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  klacht: string;
  toelichting: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const LeadForm = () => {
  const [formData, setFormData] = useState<FormData>({
    voornaam: '',
    achternaam: '',
    email: '',
    telefoon: '',
    klacht: '',
    toelichting: '',
    consent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const klachtOptions = [
    { value: '', label: 'Selecteer je situatie' },
    { value: 'rug', label: 'Rug' },
    { value: 'nek-schouder', label: 'Nek / Schouder' },
    { value: 'heup-knie', label: 'Heup / Knie' },
    { value: 'anders', label: 'Anders' },
    { value: 'preventief', label: 'Preventief (geen klachten)' }
  ];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.voornaam.trim()) newErrors.voornaam = 'Voornaam is verplicht';
    if (!formData.achternaam.trim()) newErrors.achternaam = 'Achternaam is verplicht';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is verplicht';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Vul een geldig emailadres in';
    }
    if (!formData.telefoon.trim()) newErrors.telefoon = 'Telefoonnummer is verplicht';
    if (!formData.klacht) newErrors.klacht = 'Selecteer je situatie';
    if (!formData.consent) newErrors.consent = 'Je moet akkoord gaan met de privacyvoorwaarden';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Submission failed');

      trackLead();
      setIsSuccess(true);
    } catch {
      setSubmitError('Er ging iets mis. Probeer het opnieuw of neem direct contact met ons op.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (hasError: boolean) =>
    `w-full px-4 py-3 border rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#EF4C37] ${
      hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
    }`;

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Bedankt!</h3>
        <p className="text-green-700">We nemen binnen 1 werkdag contact met je op.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="voornaam" className="block text-sm font-medium mb-2">
            Voornaam <span className="text-[#EF4C37]">*</span>
          </label>
          <input
            type="text"
            id="voornaam"
            name="voornaam"
            value={formData.voornaam}
            onChange={(e) => setFormData({ ...formData, voornaam: e.target.value })}
            className={inputClasses(!!errors.voornaam)}
            aria-invalid={!!errors.voornaam}
            aria-describedby={errors.voornaam ? 'voornaam-error' : undefined}
          />
          {errors.voornaam && (
            <p id="voornaam-error" className="text-red-600 text-sm mt-1">{errors.voornaam}</p>
          )}
        </div>

        <div>
          <label htmlFor="achternaam" className="block text-sm font-medium mb-2">
            Achternaam <span className="text-[#EF4C37]">*</span>
          </label>
          <input
            type="text"
            id="achternaam"
            name="achternaam"
            value={formData.achternaam}
            onChange={(e) => setFormData({ ...formData, achternaam: e.target.value })}
            className={inputClasses(!!errors.achternaam)}
            aria-invalid={!!errors.achternaam}
            aria-describedby={errors.achternaam ? 'achternaam-error' : undefined}
          />
          {errors.achternaam && (
            <p id="achternaam-error" className="text-red-600 text-sm mt-1">{errors.achternaam}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-[#EF4C37]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses(!!errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="telefoon" className="block text-sm font-medium mb-2">
            Telefoon <span className="text-[#EF4C37]">*</span>
          </label>
          <input
            type="tel"
            id="telefoon"
            name="telefoon"
            value={formData.telefoon}
            onChange={(e) => setFormData({ ...formData, telefoon: e.target.value })}
            className={inputClasses(!!errors.telefoon)}
            aria-invalid={!!errors.telefoon}
            aria-describedby={errors.telefoon ? 'telefoon-error' : undefined}
          />
          {errors.telefoon && (
            <p id="telefoon-error" className="text-red-600 text-sm mt-1">{errors.telefoon}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="klacht" className="block text-sm font-medium mb-2">
          Waar gaat het om? <span className="text-[#EF4C37]">*</span>
        </label>
        <select
          id="klacht"
          name="klacht"
          value={formData.klacht}
          onChange={(e) => setFormData({ ...formData, klacht: e.target.value })}
          className={inputClasses(!!errors.klacht)}
          aria-invalid={!!errors.klacht}
          aria-describedby={errors.klacht ? 'klacht-error' : undefined}
        >
          {klachtOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.klacht && (
          <p id="klacht-error" className="text-red-600 text-sm mt-1">{errors.klacht}</p>
        )}
      </div>

      <div>
        <label htmlFor="toelichting" className="block text-sm font-medium mb-2">
          Korte toelichting <span className="text-gray-400">(optioneel)</span>
        </label>
        <textarea
          id="toelichting"
          name="toelichting"
          rows={3}
          value={formData.toelichting}
          onChange={(e) => setFormData({ ...formData, toelichting: e.target.value })}
          className={inputClasses(false)}
          placeholder="Vertel kort wat je ervaart of wat je doel is..."
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
          className="mt-1 w-5 h-5 rounded border-gray-300 text-[#EF4C37] focus:ring-[#EF4C37]"
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
        />
        <label htmlFor="consent" className="text-sm text-gray-600">
          Ik ga akkoord met de{' '}
          <a href="/privacy" className="text-[#EF4C37] hover:underline" target="_blank" rel="noopener noreferrer">
            privacyvoorwaarden
          </a>
          . <span className="text-[#EF4C37]">*</span>
        </label>
      </div>
      {errors.consent && (
        <p id="consent-error" className="text-red-600 text-sm -mt-4">{errors.consent}</p>
      )}

      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#EF4C37] text-white px-8 py-4 rounded font-medium text-lg transition-all duration-200 hover:bg-[#d9442f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EF4C37] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Bezig met versturen...' : 'Plan mijn Body-APK'}
      </button>
    </form>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function BodyAPKPage() {
  return (
    <>
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <CTAButton href="#form" variant="primary" className="w-full text-center" location="sticky-mobile">
          Plan mijn Body-APK
        </CTAButton>
      </div>

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

      <main className="relative z-10 pb-24 md:pb-0">
        {/* ================================================================ */}
        {/* HERO SECTION */}
        {/* ================================================================ */}
        <section className="min-h-[90vh] flex items-center py-12 md:py-24">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Body-APK: diepgaande houding- en bewegingsanalyse
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  Begrijp waar je klachten écht vandaan komen. Eerst helderheid, daarna pas een plan.
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <ClockIcon className="w-6 h-6 text-[#0CBABA] flex-shrink-0 mt-0.5" />
                    <span className="text-lg">1-op-1 sessie van 60 tot 90 minuten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <EyeIcon className="w-6 h-6 text-[#0CBABA] flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Houding, ademhaling, lopen of rennen in slow motion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FileIcon className="w-6 h-6 text-[#0CBABA] flex-shrink-0 mt-0.5" />
                    <span className="text-lg">Je gaat naar huis met beelden, samenvatting en een duidelijke vervolgstap</span>
                  </li>
                </ul>

                <div className="space-y-4">
                  <CTAButton href="#form" variant="primary" className="text-lg" location="hero">
                    Plan mijn Body-APK
                  </CTAButton>
                  <p className="text-sm text-gray-500">
                    Geen lidmaatschap nodig. Geen verplicht vervolg.
                  </p>
                </div>

                <p className="text-sm text-gray-400 mt-12 border-t border-gray-100 pt-6">
                  Persoonlijk. Rustig uitgelegd. Zonder medische claims.
                </p>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden relative">
                  <Image
                    src="/images/body-apk-hero.jpg"
                    alt="Body-APK sessie bij CrossFit Leiden"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Decorative accent */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#F7CB15] rounded opacity-80 -z-10" />
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#0CBABA] rounded opacity-60 -z-10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* TRUST STRIP */}
        {/* ================================================================ */}
        <section className="bg-gray-50 py-8 border-y border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex text-[#F7CB15]">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <span>4.8/5 Google reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5 text-[#7B6D8D]" />
                <span>400+ members bij CFL</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-[#EF4C37]" />
                <span>Warmste community in Leiden</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* PROBLEM SECTION */}
        {/* ================================================================ */}
        <SectionWrapper>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Herken je dit?</h2>

            <ul className="space-y-4 mb-10">
              {[
                'Terugkerende rugklachten',
                'Stijve nek of schouders',
                'Spit dat blijft terugkomen',
                "Je lichaam voelt 'vast' door veel zitten",
                'Je sport, maar dezelfde blessure blijft terugkomen'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-lg">
                  <span className="w-2 h-2 bg-[#EF4C37] rounded-full mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <CTAButton href="#form" variant="text" location="problem-section">
              Ja, dit herken ik → plan mijn Body-APK
            </CTAButton>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* WHAT IS IT SECTION */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Wat is de Body-APK?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl">
            De Body-APK is geen training, geen fysiotherapie en geen standaard intake. Het is een beslismoment.
            We nemen de tijd om te kijken, te testen en te begrijpen wat er speelt. Zodat je daarna wéét
            wat de volgende stap is.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <EyeIcon className="w-8 h-8" />,
                title: 'Het hele systeem',
                text: 'We kijken naar het hele systeem, niet één plek.'
              },
              {
                icon: <ClipboardIcon className="w-8 h-8" />,
                title: 'Patronen en compensaties',
                text: 'We zoeken compensaties en patronen die je misschien nooit opvielen.'
              },
              {
                icon: <CheckIcon className="w-8 h-8" />,
                title: 'Duidelijkheid en richting',
                text: 'Je krijgt duidelijkheid en richting. Geen vage conclusies.'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-[#0CBABA] mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* WHO IS IT FOR SECTION */}
        {/* ================================================================ */}
        <SectionWrapper>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Voor wie is dit bedoeld?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <CheckIcon className="w-6 h-6 text-green-600" />
                Wel geschikt als je...
              </h3>
              <ul className="space-y-3">
                {[
                  'Terugkerende klachten hebt en wilt weten waar het vandaan komt',
                  'Wilt begrijpen hoe je beweegt en wat je kunt verbeteren',
                  'Preventief inzicht wilt in je houding en bewegingspatronen',
                  'Openstaat voor een eerlijk gesprek over wat er speelt',
                  'Bereid bent om zelf aan de slag te gaan met de uitkomst'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <XIcon className="w-6 h-6 text-gray-400" />
                Niet geschikt als je...
              </h3>
              <ul className="space-y-3 text-gray-600">
                {[
                  'Acute zorg of medische hulp nodig hebt',
                  'Op zoek bent naar een snelle fix zonder eigen inzet',
                  'Een officiële diagnose of verwijzing verwacht',
                  'Verwacht dat wij je pijn direct laten verdwijnen'
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
        {/* PROCESS SECTION */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-black text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Zo verloopt het</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Vooraf',
                description: 'Je vult een korte vragenlijst in over slaap, stress, lifestyle en trainingsgeschiedenis. Zo kunnen we gericht starten.',
                color: 'bg-[#F7CB15]'
              },
              {
                step: '2',
                title: 'Tijdens',
                description: 'We analyseren je ademhaling, houding en loop- of renpatroon. We doen alleen tests die passen bij jouw situatie en belastbaarheid.',
                color: 'bg-[#0CBABA]'
              },
              {
                step: '3',
                title: 'Na afloop',
                description: "Je krijgt video's, foto's en een korte uitleg. Plus een samenvatting met de belangrijkste bevindingen en vervolgstappen.",
                color: 'bg-[#EF4C37]'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className={`${item.color} text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-6`}>
                  {item.step}
                </div>
                <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-400 text-sm mt-12 pt-8 border-t border-gray-800">
            We doen alleen wat past bij jouw belastbaarheid.
          </p>

          <div className="mt-12">
            <CTAButton href="#form" variant="primary" location="process-section">
              Plan mijn Body-APK
            </CTAButton>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* WHAT YOU GET SECTION */}
        {/* ================================================================ */}
        <SectionWrapper>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Wat krijg je mee naar huis?</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
            <ul className="space-y-4">
              {[
                { icon: <VideoIcon className="w-6 h-6" />, text: 'Slow-motion video\'s (lopen of rennen)' },
                { icon: <CameraIcon className="w-6 h-6" />, text: 'Houdingsfoto\'s' }
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                  <span className="text-[#0CBABA]">{item.icon}</span>
                  <span className="text-lg">{item.text}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-4">
              {[
                { icon: <FileIcon className="w-6 h-6" />, text: 'Uitlegvideo met tekeningen' },
                { icon: <ClipboardIcon className="w-6 h-6" />, text: 'Kort rapport: samenvatting, oorzaken, vervolgstappen' }
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                  <span className="text-[#0CBABA]">{item.icon}</span>
                  <span className="text-lg">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-500 mt-8 text-lg">Geen dik rapport. Wel duidelijkheid.</p>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* PROMISE SECTION */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Wat belooft het wel en niet?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg border-l-4 border-[#0CBABA]">
              <h3 className="font-semibold text-lg mb-6 text-[#0CBABA]">Wel</h3>
              <ul className="space-y-4">
                {[
                  'Inzicht in oorzaken',
                  'Begrip van samenhang',
                  'Duidelijke volgende stap',
                  'Meer vertrouwen in bewegen'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-[#0CBABA]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg border-l-4 border-gray-300">
              <h3 className="font-semibold text-lg mb-6 text-gray-500">Niet</h3>
              <ul className="space-y-4 text-gray-600">
                {[
                  'Geen garantie pijnvrij',
                  'Geen snelle fix zonder inzet',
                  'Geen medische diagnose'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <XIcon className="w-5 h-5 text-gray-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* NEXT STEPS SECTION */}
        {/* ================================================================ */}
        <SectionWrapper>
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">En wat nu?</h2>
            <p className="text-xl text-gray-600 mb-8">
              De Body-APK staat op zichzelf. Je bent nergens aan gebonden. Maar als je wél verder wilt,
              zijn er opties.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#F7CB15] rounded-full mt-2.5" />
                <div>
                  <span className="font-medium">1-op-1 trajecten</span>
                  <span className="text-gray-600 block text-sm">Persoonlijke begeleiding afgestemd op jouw situatie</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#0CBABA] rounded-full mt-2.5" />
                <div>
                  <span className="font-medium">Kleine groepen (semi-private)</span>
                  <span className="text-gray-600 block text-sm">Training in groepen van maximaal 4 personen</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">
                <strong className="text-black">Geen verplicht vervolg.</strong> Als je wél verder wilt:
                een persoonlijke route die past bij jouw lijf.
              </p>
            </div>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* FAQ SECTION */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Veelgestelde vragen</h2>

          <div className="max-w-3xl">
            <FAQItem
              question="Is dit fysiotherapie?"
              answer="Nee. We stellen geen medische diagnoses en behandelen niet. De Body-APK is een analyse die je helpt begrijpen wat er speelt. Soms is de conclusie dat je wél naar een fysiotherapeut of arts moet. Dat adviseren we dan ook."
            />
            <FAQItem
              question="Heb ik een verwijzing nodig?"
              answer="Nee, je kunt direct een afspraak maken. Je hebt geen verwijzing van een arts of specialist nodig."
            />
            <FAQItem
              question="Kan ik dit ook doen zonder klachten?"
              answer="Zeker. Veel mensen doen de Body-APK preventief. Om inzicht te krijgen in hun houding en bewegingspatronen voordat er klachten ontstaan."
            />
            <FAQItem
              question="Wat als ik niet kan rennen?"
              answer="Geen probleem. We passen de analyse aan op wat voor jou mogelijk is. Als lopen of rennen niet gaat, kijken we naar andere bewegingen."
            />
            <FAQItem
              question="Hoe bereid ik me voor?"
              answer="Je ontvangt vooraf een korte vragenlijst. Neem comfortabele sportkleding mee waarin je goed kunt bewegen. Schoenen zijn optioneel, we analyseren ook vaak op blote voeten."
            />
            <FAQItem
              question="Krijg ik oefeningen mee?"
              answer="Je krijgt advies en vervolgstappen. Soms zijn dat specifieke oefeningen, soms is het advies om eerst iets anders te doen. Dat hangt af van wat we vinden."
            />
            <FAQItem
              question="Waar vindt het plaats?"
              answer="Bij CrossFit Leiden, Langegracht 70, 2312 NV Leiden. Makkelijk bereikbaar met de auto en openbaar vervoer."
            />
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* FORM SECTION */}
        {/* ================================================================ */}
        <SectionWrapper id="form" className="bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan je Body-APK</h2>
              <p className="text-xl text-gray-600">
                Laat je gegevens achter. We nemen contact op om de afspraak te plannen.
              </p>
            </div>

            <div className="bg-gray-50 p-8 md:p-12 rounded-lg">
              <LeadForm />
            </div>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* FOOTER */}
        {/* ================================================================ */}
        <footer className="bg-black text-white py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="font-semibold text-lg">CrossFit Leiden</p>
                <p className="text-gray-400">Langegracht 70, 2312 NV Leiden</p>
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

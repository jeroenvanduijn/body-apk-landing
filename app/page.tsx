'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

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

const CloseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
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

const PhoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const LocationIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 18s-7-5.686-7-10a7 7 0 1114 0c0 4.314-7 10-7 10z" />
    <circle cx="10" cy="8" r="2" />
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
  variant?: 'primary' | 'secondary' | 'text';
  className?: string;
  location?: string;
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variants = {
    primary: "bg-[#EF4C37] text-white px-8 py-4 rounded hover:bg-[#d9442f] focus:ring-[#EF4C37]",
    secondary: "border-2 border-black text-black px-8 py-4 rounded hover:bg-black hover:text-white focus:ring-black",
    text: "text-[#EF4C37] hover:underline underline-offset-4 focus:ring-[#EF4C37]"
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
  answer: React.ReactNode;
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
        className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-[500px] pb-6' : 'max-h-0'}`}
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

const FormModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Sluiten"
        >
          <CloseIcon />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-2">Plan je Body-APK</h2>
          <p className="text-gray-600 mb-6">
            Laat je gegevens achter. Daarna plan je direct een kort telefoongesprek (5-10 min).
          </p>

          {/* HighLevel Form Embed */}
          <div className="min-h-[500px]">
            <iframe
              src="https://links.gymops.nl/widget/form/1d5IBAx42RiZJVuf5jqr"
              style={{ width: '100%', height: '500px', border: 'none', borderRadius: '3px' }}
              id="inline-1d5IBAx42RiZJVuf5jqr"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Website Form - Body APK Landingspagina"
              data-height="492"
              data-layout-iframe-id="inline-1d5IBAx42RiZJVuf5jqr"
              data-form-id="1d5IBAx42RiZJVuf5jqr"
              title="Website Form - Body APK Landingspagina"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// VIDEO TESTIMONIAL COMPONENT
// ============================================================================

const VideoTestimonial = ({ videoId, title }: { videoId: string; title: string }) => (
  <div className="relative w-full" style={{ paddingTop: '177.78%' }}>
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
// MEMBER STORY COMPONENT
// ============================================================================

const MemberStory = ({
  videoId,
  name,
  problem
}: {
  videoId: string;
  name: string;
  problem: string;
}) => (
  <div className="max-w-sm">
    <div className="rounded-lg overflow-hidden bg-gray-100">
      <VideoTestimonial videoId={videoId} title={`${name} - ${problem}`} />
    </div>
    <div className="mt-4">
      <p className="font-semibold text-lg">{name}</p>
      <p className="text-gray-500">{problem}</p>
    </div>
  </div>
);

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

      {/* HighLevel Form Script */}
      <Script src="https://links.gymops.nl/js/form_embed.js" strategy="lazyOnload" />

      {/* Form Modal */}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <CTAButton onClick={openModal} variant="primary" className="w-full text-center" location="sticky-mobile">
          Plan een belafspraak
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
                  Je auto laat je keuren. Je lichaam niet?
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  De Body-APK laat je letterlijk zien waar je lichaam compenseert. Geen giswerk. Geen standaard oefeningen. Wel antwoorden.
                </p>

                <p className="text-lg text-gray-600 mb-8">
                  Dit is geen training en geen fysiotherapie. Het is een diepgaande analyse van je houding, ademhaling en beweging in slow motion. Zodat je eindelijk snapt waarom die klacht blijft terugkomen.
                </p>

                <div className="space-y-4">
                  <CTAButton onClick={openModal} variant="primary" className="text-lg" location="hero">
                    Plan een belafspraak
                  </CTAButton>
                  <p className="text-sm text-gray-500">
                    Geen lidmaatschap nodig. Geen verplicht vervolg.
                  </p>
                </div>

                {/* Social Proof */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-8 pt-6 border-t border-gray-100 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="flex text-[#F7CB15]">
                      <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                    </div>
                    <span>270+ Google reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-[#7B6D8D]" />
                    <span>400+ leden bij CrossFit Leiden</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HeartIcon className="w-5 h-5 text-[#EF4C37]" />
                    <span>Warmste community in Leiden</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://oehoqgwhk6gydfz3.public.blob.vercel-storage.com/pictures/Scherm%C2%ADafbeelding%202026-02-06%20om%2017.01.53.png"
                    alt="Body-APK sessie bij CrossFit Leiden"
                    className="object-cover w-full h-full"
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
        {/* PROBLEM RECOGNITION SECTION */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Herken je dit?</h2>

            <ul className="space-y-4 mb-10">
              {[
                'Het schiet in je rug bij een kleine beweging',
                'Je voelt dat je houding niet klopt, maar je weet niet wat je moet doen',
                'Je sport, maar dezelfde rugklacht blijft terugkomen',
                'Je denkt: dit hoort vast bij het ouder worden'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-lg">
                  <span className="w-2 h-2 bg-[#EF4C37] rounded-full mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <CTAButton onClick={openModal} variant="text" location="problem-section">
              Ja, dit herken ik
            </CTAButton>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* MEMBER STORY 1 - CHANTAL */}
        {/* ================================================================ */}
        <SectionWrapper>
          <p className="text-xl text-gray-600 mb-8">Dit is geen uitzondering.</p>

          {/* VIDEO PLACEHOLDER - Chantal */}
          <MemberStory
            videoId="1162593587"
            name="Chantal"
            problem="Rugklachten"
          />
        </SectionWrapper>

        {/* ================================================================ */}
        {/* WHAT IS THE BODY-APK */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Wat is de Body-APK?</h2>
          <div className="max-w-3xl">
            <p className="text-xl text-gray-600 mb-6">
              Een diepgaande lichaamsanalyse waarbij we kijken naar:
            </p>

            <ul className="space-y-4 mb-8">
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

            <p className="text-lg text-gray-600">
              Het doel: begrijpen waarom je klachten blijven terugkomen. Niet raden, maar zien.
            </p>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* COACH INTRODUCTION SECTION */}
        {/* ================================================================ */}
        <SectionWrapper>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Wie begeleidt de Body-APK?</h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Video Column */}
            <div className="max-w-sm">
              <div className="relative w-full rounded-lg overflow-hidden bg-gray-100" style={{ paddingTop: '177.78%' }}>
                <iframe
                  src="https://player.vimeo.com/video/1162594482?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&texttrack=nl"
                  frameBorder="0"
                  allow="fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  title="Body APK intro - Jari stelt zich voor"
                />
              </div>
              <p className="text-sm text-gray-500 mt-4">
                In deze video stelt Jari zich voor en zie je hoe een Body-APK verloopt.
              </p>
            </div>

            {/* Text Column */}
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-6">
                De Body-APK wordt begeleid door Jari.
              </h3>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Jari is coach bij CrossFit Leiden en gespecialiseerd in houding, ademhaling en bewegingsanalyse. Hij kijkt niet alleen naar waar je klachten voelt, maar vooral naar hoe je lichaam als geheel beweegt.
                </p>

                <p>
                  Zonder haast. Zonder oordeel.
                </p>

                <p>
                  Het doel is niet om iets meteen te &quot;fixen&quot;, maar om te begrijpen wat er speelt. Soms betekent dat trainen. Soms juist even niet. Je krijgt een eerlijk beeld van wat logisch is als volgende stap.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* DIFFERENTIATION - WHY THIS IS DIFFERENT */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-black text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Al van alles geprobeerd?</h2>

          <div className="max-w-3xl">
            <ul className="space-y-4 mb-10">
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

            <p className="text-xl text-gray-300">
              De Body-APK is geen symptoombestrijding. We zoeken de oorzaak. En laten je zien wat er aan de hand is.
            </p>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* WHAT THE BODY-APK DELIVERS */}
        {/* ================================================================ */}
        <SectionWrapper>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Wat levert de Body-APK op?</h2>

          <div className="max-w-3xl">
            <ul className="space-y-4 mb-10">
              {[
                'We brengen exact in kaart waar jouw lichaam vastloopt',
                'Je begrijpt waarom klachten blijven terugkomen',
                'Je weet welke stap logisch is om vooruit te komen',
                'Geen symptoombestrijding, maar werken aan de oorzaak'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-lg">
                  <CheckIcon className="w-6 h-6 text-[#0CBABA] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            {[
              { icon: <VideoIcon className="w-6 h-6" />, text: "Slow-motion video's van je beweging" },
              { icon: <CameraIcon className="w-6 h-6" />, text: "Houdingsfoto's" },
              { icon: <VideoIcon className="w-6 h-6" />, text: 'Korte uitlegvideo' },
              { icon: <ClipboardIcon className="w-6 h-6" />, text: 'Samenvatting met concrete vervolgstappen' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                <span className="text-[#0CBABA]">{item.icon}</span>
                <span className="text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* WHO IS IT FOR SECTION */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Voor wie is dit geschikt?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <CheckIcon className="w-6 h-6 text-green-600" />
                Wel geschikt als je...
              </h3>
              <ul className="space-y-3">
                {[
                  'Terugkerende klachten hebt en wilt weten waar het vandaan komt',
                  'Klaar bent met pleisters plakken en de oorzaak wilt aanpakken',
                  'Bereid bent om zelf aan de slag te gaan met de uitkomst',
                  'Openstaat voor een eerlijk gesprek over wat er speelt'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg">
              <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                <XIcon className="w-6 h-6 text-gray-400" />
                Niet geschikt als je...
              </h3>
              <ul className="space-y-3 text-gray-600">
                {[
                  'Acute pijn hebt en medische hulp nodig hebt',
                  'Verwacht dat wij je pijn laten verdwijnen',
                  'Op zoek bent naar een snelle fix zonder eigen inzet',
                  'Een officiële diagnose of verwijzing verwacht'
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Zo werkt het</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Belafspraak',
                description: 'We bellen je kort (5-10 minuten) om je situatie te bespreken. Zo weten we of de Body-APK bij je past.',
                color: 'bg-[#F7CB15]'
              },
              {
                step: '2',
                title: 'Analyse in de gym',
                description: 'Tijdens de sessie (60-90 min) analyseren we je houding, ademhaling en beweging. Alles afgestemd op wat jij aankan.',
                color: 'bg-[#0CBABA]'
              },
              {
                step: '3',
                title: 'Uitleg en vervolgstap',
                description: 'Je krijgt beelden, uitleg en een heldere samenvatting. Plus een concrete volgende stap.',
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

          <div className="mt-12">
            <CTAButton onClick={openModal} variant="primary" location="process-section">
              Plan een belafspraak
            </CTAButton>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* MEMBER STORIES 2 & 3 */}
        {/* ================================================================ */}
        <SectionWrapper>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meer ervaringen</h2>
          <p className="text-xl text-gray-600 mb-12">Zo ziet dat er in de praktijk uit.</p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* VIDEO PLACEHOLDER - Pieter Bas */}
            <MemberStory
              videoId="1162593462"
              name="Pieter Bas"
              problem="Rugklachten"
            />

            {/* VIDEO PLACEHOLDER - Steph */}
            <MemberStory
              videoId="1162592944"
              name="Steph"
              problem="Rugklachten / hernia"
            />
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* NEXT STEPS SECTION */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-gray-50">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">En daarna?</h2>
            <p className="text-xl text-gray-600 mb-8">
              De Body-APK staat op zichzelf. Je bent nergens aan gebonden. Wil je verder, dan begeleiden we je graag.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#F7CB15] rounded-full mt-2.5" />
                <div>
                  <span className="font-medium">1-op-1 begeleiding</span>
                  <span className="text-gray-600 block text-sm">Persoonlijk traject afgestemd op jouw situatie</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#0CBABA] rounded-full mt-2.5" />
                <div>
                  <span className="font-medium">Kleine groepen (max 4 personen)</span>
                  <span className="text-gray-600 block text-sm">Gericht werken aan kracht, controle en belastbaarheid. Altijd afgestemd op jouw lichaam.</span>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* FAQ SECTION */}
        {/* ================================================================ */}
        <SectionWrapper>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Veelgestelde vragen</h2>

          <div className="max-w-3xl">
            <FAQItem
              question="Is dit fysiotherapie?"
              answer="Nee. We stellen geen medische diagnoses en behandelen niet. De Body-APK is een analyse die je helpt begrijpen wat er speelt. Soms is de conclusie dat je wél naar een fysiotherapeut of arts moet. Dat adviseren we dan ook."
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
                  <p>Belangrijk: als je geen paar minuten pijnvrij kunt lopen, is de Body-APK waarschijnlijk nog niet de juiste stap. Dat bespreken we eerlijk vooraf in het telefoongesprek.</p>
                </div>
              }
            />
            <FAQItem
              question="Hoe bereid ik me voor?"
              answer="Je ontvangt vooraf een korte vragenlijst. Neem sportkleding mee waarin je goed kunt bewegen. Schoenen zijn optioneel."
            />
            <FAQItem
              question="Krijg ik oefeningen mee?"
              answer="Je krijgt een concrete vervolgstap. Soms zijn dat oefeningen, soms is het advies om eerst iets anders te doen. Dat hangt af van wat we vinden."
            />
            <FAQItem
              question="Waar vindt het plaats?"
              answer="Bij CrossFit Leiden, Marie Diebenplaats 108, 2324 NG Leiden."
            />
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* FINAL CTA SECTION */}
        {/* ================================================================ */}
        <SectionWrapper className="bg-black text-white">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Klaar om te weten wat er speelt?</h2>
            <p className="text-xl text-gray-300 mb-8">
              We beginnen met een kort telefoongesprek. Vrijblijvend.
            </p>
            <CTAButton onClick={openModal} variant="primary" className="text-lg" location="final-cta">
              Plan een belafspraak
            </CTAButton>
          </div>
        </SectionWrapper>

        {/* ================================================================ */}
        {/* FOOTER */}
        {/* ================================================================ */}
        <footer className="bg-black text-white py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <p className="font-semibold text-lg">CrossFit Leiden</p>
                <p className="text-gray-400">Marie Diebenplaats 108</p>
                <p className="text-gray-400">2324 NG Leiden</p>
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

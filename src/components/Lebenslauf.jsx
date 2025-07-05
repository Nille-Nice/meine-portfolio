import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { FaBaby, FaChild, FaMusic, FaPlaneDeparture, FaGraduationCap, FaHome, FaBriefcase, FaUsers, FaLaptopCode, FaSearch } from 'react-icons/fa';

// Keine ScrollTrigger mehr für diese Komponente, da wir eine manuelle Navigation haben

const journeyEvents = [
  {
    title: 'Geburt',
    period: '15.06.1989',
    description: 'Geboren im schönen Flensburg in Schleswig-Holstein.',
    icon: <FaBaby />,  
    imageSrc: '/images/Kinderwagen.png'
  },
  {
    title: 'Jugend',
    period: 'Frühe Jahre',
    description: 'Sportlich aktiv: Fußball war die größte Leidenschaft',
    icon: <FaChild />,
    imageSrc: '/images/fubanille2.png'
  },
  {
    title: 'Teenagerzeit',
    period: 'Spätere Jugend',
    description: 'Skateboarding war nun angesagt. Das Editieren von den dazugehörigen Videos war mein erstes "Hobby am Computer".',
    icon: <FaMusic />,
    imageSrc: '/images/skatenille.png'
  },
  {
    title: 'Australien',
    period: '2008',
    description: 'Mit 19 ging es raus von zu Hause ans andere Ende der Welt: Australien. Die Welt wurde größer und Englisch sehr wichtig für mein Leben.',
    icon: <FaPlaneDeparture />,
    imageSrc: '/images/backpacker.jpg'
  },
  {
    title: 'Abitur',
    period: '2012',
    description: 'Abitur nachgeholt mit Schwerpunkt auf Englisch und Psychologie. Nebenbei im Sneakers-Shop gejobbt',
    icon: <FaGraduationCap />,
    imageSrc: '/images/abitur.jpeg'
  },
  {
    title: 'Hamburg',
    period: '2014',
    description: 'Umzug in meine heutige Heimatstadt Hamburg.',
    icon: <FaHome />,
    imageSrc: '/images/hafen.jpeg'
  },
  {
    title: 'Berufserfahrung',
    period: '2014-2021',
    description: 'Diverse Jobs: Barkeeper, Einzelhandel, Bühnenbau, Corona-Stationsarbeit (nicht illegal!). In meiner Freizeit wuchs zuerst das Interresse an digitaler Musikproduktion und dann das Interesse am Programmieren.',
    icon: <FaBriefcase />,
    imageSrc: '/images/studionille.png'
  },
  {
    title: 'Gorillas',
    period: '2021-2023',
    description: 'Zuletzt Teamleiter im Start-up Gorillas. Viel Spaß mit internationalen Kollegen und Einblicke in ein scheiterndes E-Commerce Unternehmen',
    icon: <FaUsers />,
    imageSrc: '/images/gorillas2.png'
  },
  {
    title: 'Umschulung',
    period: '2023',
    description: 'Umschulung zum Fachinformatiker für Anwendungsentwicklung.',
    icon: <FaLaptopCode />,
    imageSrc: '/images/umschulung.jpeg'
  },
  {
    title: 'Neustart',
    period: 'Aktuell',
    description: 'Erfolgreicher Abschluss und nun suche ich nach DIR (diese Seite dient zum Bewerben).',
    icon: <FaSearch />,
    imageSrc: '/images/hireme2.png'
  },
];

export default function Lebenslauf() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentRotateDegree, setCurrentRotateDegree] = useState(0); // Zustand für zufällige Rotation

  const currentPhase = journeyEvents[currentPhaseIndex];

  const updateRotation = () => {
    const newDegree = Math.floor(Math.random() * 10) - 5; // Zufallswert zwischen -5 und 4
    setCurrentRotateDegree(newDegree);
  };

  const handlePrev = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      x: 50, // Animate out to the right
      duration: 0.3,
      onComplete: () => {
        setCurrentPhaseIndex((prevIndex) =>
          prevIndex === 0 ? journeyEvents.length - 1 : prevIndex - 1
        );
        updateRotation(); // Rotation aktualisieren
        gsap.fromTo(contentRef.current,
          { opacity: 0, x: -50 }, // Animate in from the left
          { opacity: 1, x: 0, duration: 0.5 }
        );
      }
    });
  };

  const handleNext = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      x: -50, // Animate out to the left
      duration: 0.3,
      onComplete: () => {
        setCurrentPhaseIndex((prevIndex) =>
          prevIndex === journeyEvents.length - 1 ? 0 : prevIndex + 1
        );
        updateRotation(); // Rotation aktualisieren
        gsap.fromTo(contentRef.current,
          { opacity: 0, x: 50 }, // Animate in from the right
          { opacity: 1, x: 0, duration: 0.5 }
        );
      }
    });
  };

  useEffect(() => {
    // Initial animation for the first phase
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
    updateRotation(); // Setze die initiale Rotation
  }, []); // Run once on mount

  return (
    <section ref={sectionRef} name="resume" className="bg-black py-20 px-6 md:px-16 text-white font-mono relative overflow-hidden">
      {/* ✨ Shooting Stars Hintergrund */}
      <div className="night absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          return (
            <div
              key={i}
              className="shooting_star"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                animationDelay: `${delay}s`
              }}
            />
          );
        })}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-widest text-neon animate-neon-flicker relative z-10">
        MEINE REISE
      </h2>

      <div className="max-w-6xl mx-auto flex items-center justify-center relative z-10">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="absolute left-0 md:left-[-50px] z-20 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-pink-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Content Area (Image and Text) */}
        <div 
          ref={contentRef} 
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full max-w-4xl px-12 md:px-0 z-10"
        >
          {/* Image */}
          <div 
            className="w-full md:w-1/2 flex justify-center items-center p-4 bg-white rounded-lg shadow-xl transform hover:rotate-0 transition-transform duration-300 z-10"
            style={{ '--tw-rotate': `${currentRotateDegree}deg` }}
          >
            <img
              src={currentPhase.imageSrc}
              alt={currentPhase.title}
              className="w-full max-w-xs md:max-w-sm object-contain"
              loading="lazy"
            />
          </div>

          {/* Text Description */}
          <div className="w-full md:w-1/2 text-center md:text-left z-10">
            <h3 className="text-2xl font-bold mb-2 text-sky-400">{currentPhase.title}</h3>
            <p className="text-base text-gray-300 mb-4">{currentPhase.period}</p>
            <p className="text-gray-300 leading-relaxed">{currentPhase.description}</p>

            {currentPhase.title === 'Neustart' && (
              <div className="flex justify-center md:justify-start mt-8">
                <a
                  href="#kontakt"
                  className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-base shadow-[0_0_16px_2px_rgba(56,189,248,0.7)] transition-all duration-300 hover:from-pink-500 hover:to-yellow-400 hover:scale-105 hover:shadow-[0_0_32px_6px_rgba(236,72,153,0.7)] focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615A2.25 2.25 0 012.25 6.993V6.75" />
                  </svg>
                  Kontakt aufnehmen
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="absolute right-0 md:right-[-50px] z-20 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </section>
  );
} 
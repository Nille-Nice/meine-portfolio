import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

function KontaktModal({ open, onClose }) {
  if (!open) return null;
  const email = ['nilsnarten', 'yahoo', 'de'].join('@').replace('@yahoo@', '@yahoo.');
  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-black">Kontakt</h2>
        <div className="text-black text-sm space-y-2">
          <div><span className="font-semibold">Name:</span> Nils Narten</div>
          <div><span className="font-semibold">E-Mail:</span> <span className="underline">{email}</span></div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const welcomeRef = useRef(null);
  const splitTextRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [showKontakt, setShowKontakt] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split the text into characters
      splitTextRef.current = new SplitText(welcomeRef.current, { type: "chars" });
      const chars = splitTextRef.current.chars;

      // Define distributors for scale and position
      const scaleDistributor = gsap.utils.distribute({
        base: 0.2,
        amount: 1.5,
        from: "center",
        ease: "power1"
      });

      const distanceDistributor = gsap.utils.distribute({
        base: -200,
        amount: 400,
        ease: "none"
      });

      // Create a timeline linked to scroll
      gsap.from(chars, {
        scrollTrigger: {
          trigger: welcomeRef.current,
          start: "top 80%", // Start animation when the top of the h1 hits 80% of viewport
          end: "bottom 20%", // End animation when the bottom of the h1 hits 20% of viewport
          scrub: true, // Link animation progress to scroll progress
          // markers: true // Optional: adds markers to visualize trigger points
        },
        scale: scaleDistributor,
        x: distanceDistributor,
        opacity: 0,
        stagger: {
          each: 0.01,
          from: "center"
        }
      });

      // Bild von links einfliegen
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, {
          x: '-100vw',
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          }
        });
      }
      // Text von rechts einfliegen
      if (textRef.current) {
        gsap.fromTo(textRef.current, {
          x: '100vw',
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          }
        });
      }
    }, [imageRef]);

    // Cleanup function
    return () => {
      if (splitTextRef.current) {
        splitTextRef.current.revert(); // Revert SplitText changes
      }
      ctx.revert(); // Revert all GSAP animations created in the context
    };

  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (

<section className="bg-background text-primaryDark py-24 px-8 md:px-16 lg:px-24 relative overflow-hidden">

      {/* Flackernder Neon-Schriftzug */}
      <h1
        ref={welcomeRef}
        className="text-5xl md:text-6xl tracking-widest text-center mb-16 font-kinddaily z-10 relative text-primaryDark"
      >
        WELCOME
      </h1>

      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-16 z-10 relative">
        
        {/* Bildbereich */}
        <div ref={imageRef} className="w-full md:w-1/2 max-w-[420px] mx-auto transform transition-all duration-300 ease-out hover:-translate-y-8 hover:shadow-2xl relative z-10">
          <div className="rounded-lg overflow-hidden">
            <img
              src="/images/figur3.png"
              alt="Starter Pack"
              className="w-full h-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Textbereich */}
        <div ref={textRef} className="w-full md:max-w-[480px] md:w-1/2 text-lg font-mono bg-accent1 p-6 hover:shadow-lg transition-shadow duration-500 relative z-10">
          <h2 className="text-3xl font-bold mb-4 text-primaryDark">Über mich</h2>
          <p className="mb-4 text-primaryDark">
            Hi, ich bin <span className="text-green-400">Nils</span> – ein ambitionierter <span className="text-pink-400">Webentwickler</span> aus <span className="text-blue-400">Hamburg</span>. Ich bin ausgebildeter Fachinformatiker für Anwendugsentwicklung. Kreative Desings und bewegende Animationen liegen mir besonders am Herzen.
          </p>
          <p className="text-primaryDark">
            Diese <span className="text-green-400">Website</span>  dient als mein Port-Folio, im Grunde genommen <span className="text-blue-400"> meine Bewerbung</span> für meinen Traumjob in <span className="text-pink-400">deiner Firma!</span> 
          </p>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowKontakt(true)}
              className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-background text-primaryDark font-bold text-base shadow transition-all duration-300 hover:bg-accent1 hover:scale-105 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615A2.25 2.25 0 012.25 6.993V6.75" />
              </svg>
              Kontakt aufnehmen
            </button>
          </div>
        </div>
      </div>

      {/* Papierflieger Animation */}
      {/* Die alte Papierflieger-Animation wird entfernt, da sie durch das UFO in ScrollAnimation.jsx ersetzt wurde. */}
      {/* Hier war zuvor der Code für die Papierflieger-Animation. */}
      <KontaktModal open={showKontakt} onClose={() => setShowKontakt(false)} />
    </section>
  );
}
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Hilfsfunktion zum Wrappen der Buchstaben (aktuell nicht verwendet)
// function GlitchHeadline({ text }) {
//   return (
//     <span className="headline-glitch-group">
//       {text.split('').map((char, i) => (
//         <span key={i} className="relative inline-block">
//           <span className="headline-glitch-char z-10 relative">{char === ' ' ? '\u00A0' : char}</span>
//         </span>
//       ))}
//     </span>
//   );
// }

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

export default function Hero() {
  const heroHeadlineRef = useRef(null);
  const splitTextRef = useRef(null);
  const descriptionRef = useRef(null);
  const splitDescriptionRef = useRef(null);
  const portraitRef = useRef(null);
  const [showKontakt, setShowKontakt] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split the text into characters for headline
      splitTextRef.current = new SplitText(heroHeadlineRef.current, { type: "chars" });
      const chars = splitTextRef.current.chars;

      // Define distributors for end position (falling apart)
      const endXDistributor = gsap.utils.distribute({
        base: -150,
        amount: 300,
        ease: "none"
      });

      const endYDistributor = gsap.utils.distribute({
        base: 50,
        amount: 150,
        from: "random",
        ease: "none"
      });

      // Create the animation for headline
      gsap.to(chars, {
        scrollTrigger: {
          trigger: heroHeadlineRef.current,
          start: "top top",
          end: "+=900",
          scrub: true,
        },
        x: endXDistributor,
        y: endYDistributor,
        opacity: 0,
        rotate: "random(-180, 180)",
        scale: "random(0.7, 1.5)",
        ease: "power1.out",
        stagger: {
          each: 0.01,
          from: "random"
        }
      });

      // SplitText-Animation für den Untertitel im About-Stil
      splitDescriptionRef.current = new SplitText(descriptionRef.current, { type: "chars" });
      const descChars = splitDescriptionRef.current.chars;

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

      gsap.from(descChars, {
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        scale: scaleDistributor,
        x: distanceDistributor,
        opacity: 0,
        stagger: {
          each: 0.01,
          from: "center"
        }
      });

      // Portrait-Bild nach rechts rausgleiten lassen
      if (portraitRef.current && heroHeadlineRef.current) {
        gsap.to(portraitRef.current, {
          x: '100vw',
          ease: 'power1.in',
          scrollTrigger: {
            trigger: heroHeadlineRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        });
      }

    }, heroHeadlineRef);

    // Cleanup function
    return () => {
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
      if (splitDescriptionRef.current) {
        splitDescriptionRef.current.revert();
      }
      ctx.revert();
    };

  }, []);

  return (
    <section name="home" className="relative min-h-screen bg-background text-primaryDark overflow-hidden">

      {/* Layout-Container */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-24">
        
        {/* Textbereich */}
        <div className="relative z-10 max-w-2xl group">
          
          <motion.h1
            ref={heroHeadlineRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-hype leading-[1] tracking-widest text-accent3 z-50 relative w-full max-w-2xl md:max-w-xl lg:max-w-2xl mx-0 pt-16"
          >
            <div className="flex justify-between w-full">
              {"NILS".split("").map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </div>
            <div className="flex justify-between w-full">
              {"NARTEN".split("").map((char, i) => (
                <span key={i}>{char}</span>
              ))}
            </div>
          </motion.h1>

          {/* Kontakt-Button */}
          <div className="flex justify-center mt-16 mb-3">
            <button
              onClick={() => setShowKontakt(true)}
              className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primaryDark text-background font-nasa text-base shadow transition-all duration-300 hover:bg-accent3 hover:text-background focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615A2.25 2.25 0 012.25 6.993V6.75" />
              </svg>
              Kontakt aufnehmen
            </button>
          </div>


          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-textDark mt-6 mb-10"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-lg md:text-xl max-w-xl text-primaryDark font-mono bg-accent1 p-6 group"
          >
            <h2
              ref={descriptionRef}
              className="font-mono text-center text-2xl md:text-3xl lg:text-4xl tracking-wider"
            >
              Kreativer Softwareentwickler mit Fokus auf modernen Web-Apps.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Bildbereich mit RGB-Glitch bei Hover */}
      <div className="absolute bottom-0 w-[70vw] max-w-[700px] group select-none transition-transform duration-700 ease-out hover:scale-[1.08] hover:rotate-2 shrink-0 right-[-5%] lg:right-12 z-10">
        <div className="relative w-full h-auto">
          {/* Hauptbild */}
          <img
            ref={portraitRef}
            src="/images/portrait.png"
            alt="Portrait"
            className="w-full h-auto relative z-20"
            loading="lazy"
          />
        </div>
        {/* Overlay mit Code */}
        <div className="absolute top-[85%] left-[20%] inset-x-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 z-20 transition-all duration-500 pointer-events-none mix-blend-screen animate-code-flicker">
          <pre className="text-green-400 font-mono text-sm md:text-base leading-tight p-4 whitespace-pre-wrap">
{`> const name = "Nils Narten";
> const role = "Creative Web Developer";
> const focus = ["Creation", "Design", "Animation"];
> function codeLikeAPro() { return true; }`}
          </pre>
        </div>
      </div>
      <KontaktModal open={showKontakt} onClose={() => setShowKontakt(false)} />
    </section>
  );
}

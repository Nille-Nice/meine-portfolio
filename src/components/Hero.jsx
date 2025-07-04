import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import TypingText from './TypingText';
import AnimatedLetters from './AnimatedLetters';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Hilfsfunktion zum Wrappen der Buchstaben
function GlitchHeadline({ text }) {
  return (
    <span className="headline-glitch-group">
      {text.split('').map((char, i) => (
        <span key={i} className="relative inline-block">
          <span className="headline-glitch-char z-10 relative">{char === ' ' ? '\u00A0' : char}</span>
          {/* Ghost-Layer cyan */}
          <span aria-hidden className="headline-glitch-ghost ghost-cyan absolute left-0 top-0 z-0 pointer-events-none">{char === ' ' ? '\u00A0' : char}</span>
          {/* Ghost-Layer magenta */}
          <span aria-hidden className="headline-glitch-ghost ghost-magenta absolute left-0 top-0 z-0 pointer-events-none">{char === ' ' ? '\u00A0' : char}</span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const heroHeadlineRef = useRef(null);
  const splitTextRef = useRef(null);
  const descriptionRef = useRef(null);
  const splitDescriptionRef = useRef(null);
  const portraitRef = useRef(null);
  const [typingDone, setTypingDone] = useState(false);

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
    <section name="home" className="relative min-h-screen bg-black text-textDark overflow-hidden">
      
      {/* ✨ Shooting Stars Hintergrund */}
      <div className="night">
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

      {/* Layout-Container */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-24">
        
        {/* Textbereich */}
        <div className="relative z-10 max-w-2xl group">
          
          <motion.h1
            ref={heroHeadlineRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-black leading-[1] text-neon tracking-widest text-left animate-neon-flicker headline-glitch-group"
          >
            <GlitchHeadline text={"NILS"} />
            <br />
            <GlitchHeadline text={"NARTEN"} />
          </motion.h1>

          {/* Scroll Down Hinweis */}
          <div className="flex flex-col items-center mt-10 mb-8">
            <span className="text-xs text-gray-400 tracking-widest uppercase mb-1">Scroll down</span>
            <span className="animate-bounce text-gray-400">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </span>
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
            className="text-lg md:text-xl max-w-xl text-white font-mono bg-black/30 p-6 group"
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
      <div className="absolute bottom-0 w-[70vw] max-w-[700px] group select-none transition-transform duration-700 ease-out hover:scale-[1.08] hover:rotate-2 shrink-0 right-[-5%] lg:right-12">
        <div className="relative w-full h-auto">
          {/* Schwarzer Hintergrund gegen durchscheinende Sterne */}
          <div className="absolute inset-0 bg-black/90 rounded-2xl z-10 pointer-events-none" />
          {/* Hauptbild */}
          <img
            ref={portraitRef}
            src="/images/portrait.png"
            alt="Portrait"
            className="w-full h-auto relative z-20 group-hover:filter-chaos"
          />
          {/* Red-Glitch */}
          <img
            src="/images/portrait.png"
            alt="Glitch Red"
            className="w-full h-auto absolute top-0 left-0 z-30 opacity-0 group-hover:opacity-60 filter invert-[30%] sepia-[100%] saturate-[800%] hue-rotate-[330deg] brightness-[150%] contrast-[150%] animate-chaos-glitch pointer-events-none"
          />
          {/* Blue-Glitch */}
          <img
            src="/images/portrait.png"
            alt="Glitch Blue"
            className="w-full h-auto absolute top-0 left-0 z-30 opacity-0 group-hover:opacity-60 filter invert-[30%] sepia-[100%] saturate-[800%] hue-rotate-[190deg] brightness-[150%] contrast-[150%] animate-chaos-glitch pointer-events-none"
          />
          {/* Green-Glitch */}
          <img
            src="/images/portrait.png"
            alt="Glitch Green"
            className="w-full h-auto absolute top-0 left-0 z-30 opacity-0 group-hover:opacity-40 filter hue-rotate-[90deg] brightness-[180%] contrast-[120%] animate-chaos-glitch2 pointer-events-none"
          />
          {/* Pink-Glitch */}
          <img
            src="/images/portrait.png"
            alt="Glitch Pink"
            className="w-full h-auto absolute top-0 left-0 z-30 opacity-0 group-hover:opacity-40 filter hue-rotate-[300deg] brightness-[180%] contrast-[120%] animate-chaos-glitch3 pointer-events-none"
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
    </section>
  );
}

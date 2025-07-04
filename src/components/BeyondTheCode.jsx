import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function BeyondTheCode() {
  const sectionRef = useRef(null);
  const beachRef = useRef(null);
  const figureRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animation für den Strand
    gsap.fromTo(beachRef.current,
      {
        x: '-100vw',
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 81%',
          end: 'top 40%',
          scrub: true
        }
      }
    );

    // Animation für die Figur
    gsap.fromTo(figureRef.current,
      {
        x: '100vw',
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'top 20%',
          scrub: true
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} name="beyond-the-code" className="bg-black py-20 px-6 md:px-16 text-white font-mono relative overflow-hidden">
      {/* ✨ Shooting Stars Hintergrund */}
      <div className="night absolute inset-0 z-0 opacity-10 pointer-events-none">
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
        BEYOND THE CODE
      </h2>

      <div className="max-w-6xl mx-auto relative flex flex-col items-center z-10">
        {/* Beach Hintergrund */}
        <div ref={beachRef} className="relative w-full max-w-md">
          <img 
            src="/images/beach.png" 
            alt="Beach Background" 
            className="w-full h-auto object-contain z-10"
            loading="lazy"
          />
          
          {/* Figur am Strand */}
          <div ref={figureRef} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
            <img 
              src="/images/urlaub2.png" 
              alt="Figure at the beach" 
              className="w-48 h-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* Beschreibungstext */}
        <div className="w-full max-w-4xl mt-12 text-sm md:text-base z-10">
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300"
            >
              Wenn ich gerade nicht vor dem Bildschirm sitze und codiere, lebe ich meine anderen Leidenschaften aus: <span className="text-pink-400">Musik produzieren</span> und <span className="text-blue-400">Basketball spielen</span> gehören ganz klar zu meinen Favoriten.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-300"
            >
              Wann immer es die Zeit erlaubt, packe ich meinen Rucksack und erkunde neue Orte – ich hatte das Glück, schon jeden <span className="text-green-400">Kontinent zu bereisen</span> und dabei viele großartige Menschen kennenzulernen.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
} 
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const leftTVRef = useRef(null);
  const rightTVRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animation für den linken Fernseher
    gsap.fromTo(leftTVRef.current,
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
          start: 'top 80%',
          end: 'top 40%',
          scrub: true
        }
      }
    );

    // Animation für den rechten Fernseher
    gsap.fromTo(rightTVRef.current,
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
          start: 'top 80%',
          end: 'top 40%',
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
    <section ref={sectionRef} name="projects" className="bg-black py-20 px-6 md:px-16 text-white font-mono flex flex-col justify-center items-center relative overflow-hidden">
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
        LATEST PROJECTS
      </h2>

      <div className="flex flex-col gap-0 justify-center items-center w-full max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full">
          {/* Erster Fernseher mit Video */}
          <a
            href="https://www.ulmg-music.com"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full max-w-xl z-10 block group cursor-pointer"
            ref={leftTVRef}
            style={{ textDecoration: 'none' }}
          >
            <img src="/images/tv.png" alt="Projekt Fernseher 1" className="w-full h-auto relative z-10" />
            <video
              src="/images/homeclip.mp4"
              loop
              muted
              autoPlay
              playsInline
              className="absolute top-[19%] left-[20%] w-[60%] h-[48%] object-cover z-20"
            >
              Your browser does not support the video tag.
            </video>
            {/* Optional: Overlay für Klick-Hinweis */}
            <span className="absolute inset-0 z-30 pointer-events-none group-hover:bg-black/10 transition" />
          </a>

          {/* Zweiter Fernseher */}
          <div ref={rightTVRef} className="relative w-full max-w-xl z-10">
            <img src="/images/tv.png" alt="Projekt Fernseher 2" className="w-full h-auto relative z-10" />
            <video
              src="/images/tv3.mp4"
              loop
              muted
              autoPlay
              playsInline
              className="absolute top-[19%] left-[20%] w-[60%] h-[48%] object-cover z-20"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Tastatur Bild */}
        <div className="w-full max-w-[300px] -mt-12 relative z-10">
          <img src="/images/tastatur.png" alt="Tastatur" className="w-full h-auto" />
        </div>

        {/* Projektbeschreibungen */}
        <div className="w-full max-w-4xl mx-auto mt-8 text-sm md:text-base bg-black/30 p-6 rounded-lg backdrop-blur-md hover:shadow-lg transition-shadow duration-500 relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 mb-4"
          >
            <span className="text-neon font-bold">Projekt 1:</span><br />
            In meiner Freizeit bastle ich an einem Projekt aus meinem musikalischen Umfeld. Für das <span className="text-green-400">Indie-Label ULMG music</span> entwickle ich eine Website mit integriertem <span className="text-pink-400">Shopify-Shop</span> für Merch. Die Seite funktioniert gleichzeitig als <span className="text-blue-400">Landingpage</span>, über die man direkt zu den Videos und <span className="text-neon">Spotify-Profilen</span> der einzelnen Künstler gelangt. Online ist das Ganze unter <a
              href="https://ulmg-music.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon underline hover:text-pink-400 transition-colors"
            >
              ulmg-music.com
            </a> zu finden.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-gray-300"
          >
            <span className="text-neon font-bold">Projekt 2:</span><br />
            Mein zweites aktuelles Projekt dreht sich um die Webpräsenz eines <span className="text-blue-400">Informatik-Dozenten</span>, der für Unternehmen und Bildungsträger unterrichtet. Hier kümmere ich mich komplett um das <span className="text-pink-400">Frontend</span>. Noch wird fleißig an einer integrierten <span className="text-green-400">Lernplattform</span> gearbeitet – sobald die steht, geht die Seite live.
          </motion.p>
        </div>
      </div>
    </section>
  );
} 
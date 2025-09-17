import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaHtml5, FaCss3Alt, FaReact, FaPython, FaPhp
} from 'react-icons/fa';
import {
  SiTailwindcss, SiMysql, SiShopify
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: <FaHtml5 />, label: 'HTML', color: 'text-orange-400', description: 'Ich habe solide Kenntnisse im Aufbau strukturierter und barrierefreier Webseiten.' },
  { icon: <FaCss3Alt />, label: 'CSS', color: 'text-blue-400', description: 'Ich bin erfahren im Design responsiver und ansprechender Benutzeroberflächen.' },
  { icon: <SiTailwindcss />, label: 'TailwindCSS', color: 'text-cyan-400', description: 'Mein Lieblings-Framework zur individuellen Entwicklung von UIs' },
  { icon: <FaReact />, label: 'React', color: 'text-sky-400', description: 'Meine neueste Erungenschaft: Diese Website habe ich mit React entwickelt' },
  { icon: <SiShopify />, label: 'Shopify', color: 'text-emerald-400', description: 'Ich habe Erfahrung mit der Einbindung Spotify-shops in Websites' },
  { icon: <FaPython />, label: 'Python', color: 'text-yellow-300', description: 'In Python habe ich Basis Kentnisse aus meiner Berufsschule' },
  { icon: <SiMysql />, label: 'MySQL', color: 'text-white', description: 'In mMySQL wurden wir durch Berufsschule und Abschlussprüfung vorbereitet' },
  { icon: <FaPhp />, label: 'PHP', color: 'text-purple-300', description: 'In PHP habe ich Basiskenntnisse aus meinem Praktikum' },
];

export default function TechStack() {
  const sectionRef = useRef(null);

  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      skills.forEach((_, index) => {
        const element = cardRefs.current[index];
        if (!element) return; // Guard: Ref ist noch nicht gesetzt

        const isFromLeft = index % 2 === 0;

        gsap.set(element, {
          x: isFromLeft ? '-100vw' : '100vw',
          opacity: 0
        });
      });

        gsap.to(element, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          }
        });
      });
    }, section);

    return () => {
      // Clean up GSAP/ScrollTrigger Instanzen beim Unmount
      context.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} name="tech-stack" className="bg-background py-20 px-6 md:px-16 text-primaryDark font-mono">
              <h2 className="text-3xl md:text-4xl font-kinddaily text-center mb-12 tracking-widest text-primaryDark">
        TECH STACK
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto auto-rows-fr">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            ref={el => cardRefs.current[idx] = el}
            className="tech-card group bg-white/30 backdrop-blur-md border border-black/10 p-4 rounded-lg text-center flex flex-col items-center justify-center aspect-square overflow-hidden relative
              hover:border-black/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]"

          >
            {/* Glänzender Overlay-Effekt */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </div>

            {/* Icon und Label - immer sichtbar */}
            <div className="flex flex-col items-center justify-center">
              <div className={`text-5xl mb-3 ${skill.color} transition-transform duration-300 group-hover:scale-110`}>
              {skill.icon}
              </div>
              <p className="text-base text-primaryDark transition-transform duration-300 group-hover:scale-105">
                {skill.label}
              </p>
            </div>

            {/* Beschreibung - erscheint beim Hover */}
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm text-primaryDark">{skill.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
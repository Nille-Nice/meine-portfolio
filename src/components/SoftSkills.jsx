import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
// Keine Icons mehr benötigt, da wir nur das Bild verwenden
// import { FaHeart, FaLightbulb, FaUsers, FaComments, FaRocket, FaHandshake } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const softSkills = [
  {
    // Element für die Dartscheibe (Bild)
    isImage: true,
    imageSrc: '/images/dart.png', // Pfad zum Dartscheiben-Bild
    title: 'Zielstrebigkeit',
    description: 'Ich verfolge meine Ziele konsequent und lasse mich nicht ablenken.',
    position: 'top-[30%] left-[70%]' // Position höher und weiter rechts angepasst
  },

  {
    // Element für die pokale (Bild)
    isImage: true,
    imageSrc: '/images/wandbild.png', // Pfad zum Dartscheiben-Bild
    title: 'Zuverlässigkeit',
    description: 'Auf mich kann man sich verlassen.',
    position: 'top-[30%] left-[25%]' // Position höher und weiter rechts angepasst
  },

  {
    // Element für die keyboard (Bild)
    isImage: true,
    imageSrc: '/images/keyboard.png', // Pfad zum Dartscheiben-Bild
    title: 'Kreativität',
    description: 'Ich habe ständig neue Ideen',
    position: 'top-[80%] left-[62%]', // Position höher und weiter rechts angepasst
    rotationClass: 'rotate-[-82]' // Rotation nur für das Keyboard
  },

  {
    // Element für den Globus (Bild)
    isImage: true,
    imageSrc: '/images/globus.png', // Pfad zum Globus-Bild
    title: 'Weltoffenheit',
    description: 'Ich bin schon viel gereißt und habe internationale Arbeitserfahrungen',
    position: 'top-[70%] left-[30%]' // Beispielposition auf der Couch
  },

  {
    // Element für den mic (Bild)
    isImage: true,
    imageSrc: '/images/mic.png', // Pfad zum Globus-Bild
    title: 'Kummunikation',
    description: 'Ich kommuniziere freundlich und direkt ',
    position: 'top-[70%] left-[45%]' // Beispielposition auf der Couch
  },

  {
    // Neues Element für das Wörterbuch (Bild)
    isImage: true,
    imageSrc: '/images/dictionary.png', // Pfad zum Wörterbuch-Bild
    title: '2-Sprachig', // Beispiel Titel
    description: 'Ich habe Erfahrung mit internationalen Firmen in denen Englisch geprochen wird', // Beispiel Beschreibung
    position: 'top-[58%] left-[39%]' // Beispielposition auf der Couch (kann angepasst werden)
  },

  {
    // Neues Element für das basketball (Bild)
    isImage: true,
    imageSrc: '/images/basketball.png', // Pfad zum Wörterbuch-Bild
    title: 'Teamplayer', // Beispiel Titel
    description: 'Privat und im Beruf liebe ich es im Team zu arbeiten', // Beispiel Beschreibung
    position: 'top-[60%] left-[57%]' // Beispielposition auf der Couch (kann angepasst werden)
  },
  
];

export default function SoftSkills() {
  const sectionRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const skillItemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Animation für die Soft Skills Items (Bilder)
    softSkills.forEach((_, index) => {
      const isFromLeft = index % 2 === 0;
      
      // Initiale Position setzen
      gsap.set(skillItemsRef.current[index], {
        x: isFromLeft ? '-100vw' : '100vw',
        opacity: 0
      });

      // Animation mit ScrollTrigger
      gsap.to(skillItemsRef.current[index], {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 40%',
          scrub: true,
          // markers: true, // Optional: zum Debuggen
        }
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-20 px-6 md:px-16 text-white font-mono relative overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-widest text-neon animate-neon-flicker">
        SOFT SKILLS
      </h2>

      <div className="max-w-6xl mx-auto relative flex flex-col items-center">
        {/* ✨ Shooting Stars Hintergrund */}
        <div className="night absolute inset-0 z-0">
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

        {/* Sofa Bild */}
        <div
          className="sofa relative w-full max-w-[960px] h-[480px] bg-contain bg-center z-10"
          style={{ backgroundImage: 'url(/images/aufcouch.png)', backgroundRepeat: 'no-repeat' }}
        >
          {/* Soft Skills als animierte Objekte auf dem Sofa */}
          {softSkills.map((skill, idx) => (
            <div
              key={idx}
              ref={el => skillItemsRef.current[idx] = el}
              className={`skill-item absolute ${skill.position} transform -translate-x-1/2 -translate-y-1/2
                transition-all duration-300 cursor-pointer group z-20`}
              onMouseEnter={() => setHoveredSkill(idx)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Rendering des Bildes */}
              {skill.isImage && (
                <img
                  src={skill.imageSrc}
                  alt={skill.title}
                  className={`object-contain transform transition-all duration-300 ${skill.rotationClass || ''}
                    ${skill.imageSrc === '/images/dictionary.png' ? 'w-24 h-24' : skill.imageSrc === '/images/basketball.png' ? 'w-32 h-32' : 'w-48 h-48'}
                    ${hoveredSkill === idx ? 'scale-125' : 'scale-100'}`}
                />
              )}

              {/* Beschreibung beim Hover */}
              {hoveredSkill === idx && (
                <div className={`absolute left-1/2 transform -translate-x-1/2 mt-2
                  transition-all duration-300 opacity-0 group-hover:opacity-100
                  bg-black/80 p-3 rounded-lg w-48 text-sm`}>
                  <h3 className="font-bold mb-1">{skill.title}</h3>
                  <p className="text-gray-300">{skill.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Beschreibungstext */}
        <div className="w-full max-w-4xl mt-12 text-sm md:text-base">
          <div className="space-y-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300"
            >
              <span className="text-neon font-bold">Was man über mich wissen sollte:</span><br />
              Auf mich ist <span className="text-green-400">Verlass</span>. Wenn ich etwas anfange, ziehe ich es durch – <span className="text-blue-400">zielgerichtet</span> und mit klarem Fokus.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-300"
            >
              Dabei arbeite ich am liebsten im <span className="text-pink-400">Team</span>. Ob im Job oder privat: Ich liebe es, gemeinsam Ideen zu entwickeln und umzusetzen.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-300"
            >
              <span className="text-neon">Kreativität</span> spielt dabei für mich eine zentrale Rolle – ich bringe ständig frische Impulse ein und denke gerne auch mal um die Ecke.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-300"
            >
              Ich bin offen für Neues, was sich nicht zuletzt in meiner <span className="text-blue-400">internationalen Erfahrung</span> widerspiegelt – durch Arbeit und Freundschaften über Grenzen hinweg.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
              className="text-gray-300"
            >
              <span className="text-pink-400">Kommunikation</span> ist für mich der Schlüssel: direkt, aber immer respektvoll und freundlich.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="text-gray-300"
            >
              Und weil ich <span className="text-green-400">nahezu bilingual</span> bin, fühle ich mich in Meetings auf Englisch genauso wohl wie auf Deutsch.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
} 
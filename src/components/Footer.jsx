import React, { useEffect, useRef, useState } from 'react';

function ImpressumModal({ open, onClose }) {
  if (!open) return null;
  // E-Mail per JS zusammensetzen
  const email = ['nilsnarten', 'yahoo', 'de'].join('@').replace('@yahoo@', '@yahoo.');
  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl">&times;</button>
        <h2 className="text-xl font-bold mb-4 text-black">Impressum</h2>
        <div className="text-black text-sm space-y-2">
          <div><span className="font-semibold">Name:</span> Nils Narten</div>
          <div><span className="font-semibold">Adresse:</span> Jahnring 5, 22297 Hamburg</div>
          <div><span className="font-semibold">E-Mail:</span> <span className="underline">{email}</span></div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const rocketRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1
      }
    );

    if (rocketRef.current) {
      observer.observe(rocketRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="relative w-full h-[300px] bg-black flex flex-col justify-end items-center overflow-hidden">
      
      {/* ✨ Shooting Stars Hintergrund */}
      <div className="night absolute inset-0 z-0 pointer-events-none">
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
                animationDelay: `${delay}s`,
                position: 'absolute'
              }}
            />
          );
        })}
      </div>

      {/* 🚀 Rakete */}
      <img 
        ref={rocketRef}
        src="/images/rocket.png"
        alt="Rakete"
        className={`absolute bottom-[130px] left-[65%] w-24 h-auto z-[99999] transition-all duration-1000 ${
          isVisible ? 'animate-rocket-fly' : 'opacity-0'
        }`}
      />

      {/* 🌕 Mond-Horizont */}
      <div 
        className="absolute bottom-0 w-full h-[250px] z-10"
        style={{
          backgroundImage: 'url(/images/mond2.png)',
          backgroundPositionY: 'bottom',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0'
        }}
      ></div>
        
      {/* 📄 Footer Content */}
      <div className="relative z-20 text-gray-900 text-center p-6 font-['NASA']">
        <button onClick={() => setShowImpressum(true)} className="text-lg font-bold mb-4 hover:underline focus:outline-none">Impressum</button>
        <ul className="text-sm space-y-2 mb-4">
          <li><a href="#" className="hover:text-gray-700 transition-colors duration-200">Datenschutz</a></li>
          <li><a href="#" className="hover:text-gray-700 transition-colors duration-200">Rechtliches</a></li>
          <li><a href="#" className="hover:text-gray-700 transition-colors duration-200">Kontakt</a></li>
        </ul>
        <p className="text-xs mt-6 text-gray-600">&copy; {new Date().getFullYear()} Nils Narten. All rights reserved.</p>
      </div>

      {/* 🪐 Dekorative Sterne */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute w-6 h-6 bg-gray-600 rounded-full blur-sm opacity-60 animate-float-1" style={{ top: '10%', left: '15%' }}></div>
        <div className="absolute w-4 h-4 bg-gray-500 rounded-full blur-sm opacity-50 animate-float-2" style={{ top: '25%', right: '10%' }}></div>
        <div className="absolute w-8 h-8 bg-gray-700 rounded-full blur-sm opacity-70 animate-float-3" style={{ top: '5%', left: '80%' }}></div>
      </div>
      <ImpressumModal open={showImpressum} onClose={() => setShowImpressum(false)} />
    </footer>
  );
}

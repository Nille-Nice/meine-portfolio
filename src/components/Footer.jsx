import React, { useEffect, useRef, useState } from 'react';

export default function Footer() {
  const rocketRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
        <p className="text-lg font-bold mb-4">Impressum</p>
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
    </footer>
  );
}

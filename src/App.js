import './index.css';
import Hero from './components/Hero';
import About from './components/About';
import ScrollAnimation from './components/ScrollAnimation';
import TechStack from './components/TechStack';
import SoftSkills from './components/SoftSkills';
import Lebenslauf from './components/Lebenslauf';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import BeyondTheCode from './components/BeyondTheCode';
import Footer from './components/Footer';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP ScrollTrigger registrieren
gsap.registerPlugin(ScrollTrigger);

function NoiseSVGFilter() {
  return (
    <svg className="noise-svg-filter">
      <filter id="noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="2" result="turb"/>
        <feDisplacementMap in2="turb" in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G"/>
        <animate attributeName="seed" values="2;20;2" dur="0.5s" repeatCount="indefinite" />
      </filter>
    </svg>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.08, // optional: wie "weich" das Scrollen ist
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []); 

  return (
    <>
      <NoiseSVGFilter />
      <div className="relative bg-background">
        <Navbar />
        {/* Inhalt */}
        <Hero />
        <About />
        <ScrollAnimation />
        <TechStack />
        <SoftSkills />
        <ScrollAnimation />
        <Projects />
        <BeyondTheCode />
        <ScrollAnimation />
        <Lebenslauf />
        <Footer />
      </div>
    </>
  );
}

export default App;

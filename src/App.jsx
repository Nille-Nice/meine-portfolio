import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SoftSkills from './components/SoftSkills';
import BeyondTheCode from './components/BeyondTheCode';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Projects />
      <SoftSkills />
      <BeyondTheCode />
      <Contact />
    </div>
  );
}

export default App; 
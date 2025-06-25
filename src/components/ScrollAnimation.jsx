import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import paper from '../assets/ufo3.png';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ScrollAnimation() {
  const planeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(planeRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        ease: 'power1.inOut',
        duration: 3,
        motionPath: {
          path: [
            { x: 0, y: 50 },
            { x: 300, y: -50 },
            { x: 400, y: -100 },
            { x: 500, y: 0 },     // Looping beginnt
            { x: 550, y: 100 },
            { x: 600, y: 0 },     // Looping endet
            { x: window.innerWidth, y: -150 },
          ],
          curviness: 2,
          autoRotate: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[10vh] overflow-visible z-10">
      <img
        ref={planeRef}
        src={paper}
        className="absolute w-20 z-20"
        alt="UFO"
      />
    </div>
  );
}

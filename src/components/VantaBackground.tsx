import React, { useRef, useState, useEffect } from 'react';
import CELLS from 'vanta/dist/vanta.cells.min';
import * as THREE from 'three';

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      const effect = CELLS({
        el: vantaRef.current,
        THREE: THREE,
        color1: 0x2c1674,
        color2: 0x070985,
        size: 1.5,
        speed: 1,
        scale: 1,
        minHeight: window.innerHeight,
        minWidth: window.innerWidth,
      });
      setVantaEffect(effect);
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    const handleResize = () => {
      if (vantaEffect) {
        vantaEffect.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [vantaEffect]);

  return <div ref={vantaRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, opacity: 0.8, width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }} />;
};

export default VantaBackground;

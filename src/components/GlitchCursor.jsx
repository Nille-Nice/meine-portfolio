import React, { useEffect, useRef } from 'react';

const GlitchCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

export default GlitchCursor; 
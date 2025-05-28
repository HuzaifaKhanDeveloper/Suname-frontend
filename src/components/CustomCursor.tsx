import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [cursorVariant, setCursorVariant] = useState('default');

  const cursorX = useSpring(x, { stiffness: 800, damping: 40, mass: 0.3 });
  const cursorY = useSpring(y, { stiffness: 800, damping: 40, mass: 0.3 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', () => setCursorVariant('clicked'));
    window.addEventListener('mouseup', () => setCursorVariant('default'));

    const setHover = () => setCursorVariant('hover');
    const clearHover = () => setCursorVariant('default');

    const applyHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', setHover);
        el.addEventListener('mouseleave', clearHover);
      });
    };

    applyHoverListeners();

    const observer = new MutationObserver(applyHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, [x, y]);

  const styles: Record<string, React.CSSProperties> = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: 'rgba(139, 92, 246, 0.15)',
      border: '1px solid rgba(139, 92, 246, 0.5)',
    },
    hover: {
      height: 48,
      width: 48,
      backgroundColor: 'rgba(139, 92, 246, 0.2)',
      border: '1px solid rgba(139, 92, 246, 0.8)',
    },
    clicked: {
      height: 24,
      width: 24,
      backgroundColor: 'rgba(139, 92, 246, 0.4)',
      border: '1px solid rgba(139, 92, 246, 1)',
    },
  };

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        ...styles[cursorVariant],
        mixBlendMode: 'difference',
        position: 'fixed',
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  );
};

export default CustomCursor;

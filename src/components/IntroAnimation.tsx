import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

const IntroAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [stage, setStage] = useState<'buildup' | 'explosion' | 'fade'>('buildup');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shockwaveRadius, setShockwaveRadius] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const shockwaveRef = useRef(0);
  const lastFrameTime = useRef(0);

  // Pre-calculate colors for better performance
  const particleColors = ['#ff6b35', '#f7931e', '#ffd23f', '#ee4035', '#7bc043'];

  // Optimized particle creation
  const createParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Reduced particle count for optimal performance
    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80;
      const velocity = 1.5 + Math.random() * 5;
      const size = 1.5 + Math.random() * 3;

      newParticles.push({
        id: i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        life: 180,
        maxLife: 180
      });
    }
    
    particlesRef.current = newParticles;
    setParticles(newParticles);
  }, []);

  // Optimized particle animation with delta time
  const animateParticles = useCallback((deltaTime: number) => {
    const timeScale = deltaTime / 16.67; // Normalize for 60fps
    
    particlesRef.current = particlesRef.current.map(particle => ({
      ...particle,
      x: particle.x + particle.vx * timeScale,
      y: particle.y + particle.vy * timeScale,
      vy: particle.vy + 0.06 * timeScale,
      life: particle.life - 1.5 * timeScale,
      size: particle.size * (1 - 0.008 * timeScale)
    })).filter(particle => particle.life > 0);

    shockwaveRef.current += 8 * timeScale;
    setShockwaveRadius(shockwaveRef.current);
  }, []);

  // Optimized canvas rendering
  useEffect(() => {
    if (stage === 'explosion') {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Optimization: disable image smoothing for better performance
      ctx.imageSmoothingEnabled = false;

      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastFrameTime.current;
        lastFrameTime.current = currentTime;

        // Clear canvas efficiently
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.max(canvas.width, canvas.height) * 0.6;

        // Draw shockwave with improved performance
        if (shockwaveRef.current < maxRadius) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, shockwaveRef.current, 0, Math.PI * 2);
          const opacity = Math.max(0, 1 - shockwaveRef.current / maxRadius);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Batch particle rendering for better performance
        ctx.save();
        particlesRef.current.forEach(particle => {
          const opacity = particle.life / particle.maxLife;
          
          ctx.globalAlpha = opacity;
          ctx.fillStyle = particle.color;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();

        animateParticles(deltaTime);
        animationRef.current = requestAnimationFrame(animate);
      };

      lastFrameTime.current = performance.now();
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [stage, animateParticles]);

  // Main animation sequence
  useEffect(() => {
    const explosionTimer = setTimeout(() => {
      setStage('explosion');
      createParticles();
    }, 2500);

    const fadeTimer = setTimeout(() => {
      setStage('fade');
    }, 4000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5200);

    return () => {
      clearTimeout(explosionTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete, createParticles]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden"
        style={{
          background: stage === 'buildup'
            ? 'radial-gradient(circle at center, #ff4757, #2f1b14, #000000)'
            : stage === 'explosion'
              ? 'radial-gradient(circle at center, #ffffff, #ff6b35, #ee4035, #000000)'
              : 'linear-gradient(45deg, #000000, #1a1a1a)',
          willChange: 'background' // Optimize for animation
        }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* Canvas for particles and effects */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{ 
            opacity: stage === 'explosion' ? 1 : 0,
            willChange: 'opacity' // Optimize for animation
          }}
        />

        {/* Central orb with optimized animations */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: stage === 'buildup' ? 1 : stage === 'explosion' ? 0 : 0,
              rotate: stage === 'buildup' ? 360 : 0
            }}
            transition={{
              duration: stage === 'buildup' ? 2.5 : 0.4,
              ease: "easeInOut",
              rotate: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
            style={{ willChange: 'transform' }}
          >
            {/* Outer glow layer */}
            <motion.div
              className="absolute w-40 h-40 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), #ff6b35, #ee4035)',
                filter: 'blur(3px)',
                willChange: 'transform, opacity'
              }}
              animate={{
                scale: stage === 'buildup' ? [0.9, 1.2, 0.9] : 1,
                opacity: stage === 'buildup' ? [0.4, 0.7, 0.4] : 0
              }}
              transition={{
                duration: 1.5,
                repeat: stage === 'buildup' ? Infinity : 0,
                ease: "easeInOut"
              }}
            />

            {/* Main orb */}
            <motion.div
              className="w-32 h-32 rounded-full relative z-10"
              style={{
                background: 'radial-gradient(circle at 30% 30%, #ffffff, #ffd23f, #ff6b35)',
                willChange: 'transform, opacity, box-shadow'
              }}
              animate={{
                scale: stage === 'buildup' ? [1, 1.15, 1] : stage === 'explosion' ? 12 : 1,
                opacity: stage === 'explosion' ? 0 : 1,
                boxShadow: stage === 'buildup'
                  ? [
                    '0 0 40px #ff6b35, inset 0 0 40px rgba(255,255,255,0.3)',
                    '0 0 80px #ff6b35, 0 0 120px #ee4035, inset 0 0 40px rgba(255,255,255,0.6)',
                    '0 0 40px #ff6b35, inset 0 0 40px rgba(255,255,255,0.3)'
                  ]
                  : '0 0 200px #ffffff'
              }}
              transition={{
                duration: stage === 'buildup' ? 1.2 : 0.25,
                repeat: stage === 'buildup' ? Infinity : 0,
                ease: stage === 'explosion' ? "easeOut" : "easeInOut"
              }}
            />

            {/* Optimized energy rings */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border-2"
                style={{
                  width: `${180 + i * 40}px`,
                  height: `${180 + i * 40}px`,
                  left: `${-90 - i * 20}px`,
                  top: `${-90 - i * 20}px`,
                  borderColor: `rgba(255, 107, 53, ${0.4 - i * 0.15})`,
                  filter: 'blur(1px)',
                  willChange: 'transform, opacity'
                }}
                animate={{
                  scale: stage === 'buildup' ? [0.6, 1.3, 0.6] : 0,
                  opacity: stage === 'buildup' ? [0, 0.5, 0] : 0
                }}
                transition={{
                  duration: 1.6 + i * 0.3,
                  repeat: stage === 'buildup' ? Infinity : 0,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Optimized screen flash effect */}
        {stage === 'explosion' && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ 
              duration: 0.2, 
              times: [0, 0.15, 1],
              ease: "easeOut"
            }}
            style={{ willChange: 'opacity' }}
          />
        )}

        {/* Fade overlay */}
        {stage === 'fade' && (
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ willChange: 'opacity' }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;
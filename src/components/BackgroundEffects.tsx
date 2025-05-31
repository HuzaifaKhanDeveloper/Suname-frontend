import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectsProps {
  isDarkRealm: boolean;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ isDarkRealm }) => {
  const [showLightning, setShowLightning] = useState(false);
  const [prevMode, setPrevMode] = useState(isDarkRealm);
  const [showBirds, setShowBirds] = useState(false);
  const [modeTransitioning, setModeTransitioning] = useState(false);

  const [showTsunami, setShowTsunami] = useState(false);

  const backgroundGradients = useMemo(
    () => ({
      dark: 'linear-gradient(180deg, #000005 0%, #020510 20%, #080c1f 40%, #151a30 60%, #202840 80%, #080c1f 100%)',
      light: 'linear-gradient(180deg, #ff8c00 0%, #ff6f00 25%, #ff4f00 50%, #ff2a00 75%, #ff0000 100%)',
      beachWaveLine: `
        linear-gradient(to top,
          rgba(255, 180, 80, 0.4) 0%,
          rgba(255, 120, 30, 0.2) 30%,
          transparent 100%
        )
      `,
      beachWaveLineDark: `
        linear-gradient(to top,
          rgba(5, 5, 10, 0.1) 0%,
          rgba(2, 2, 5, 0.05) 30%,
          transparent 100%
        )
      `
    }),
    []
  );

  const atmosphericHazeGradients = useMemo(
    () => ({
      dark: 'radial-gradient(ellipse at center top, rgba(30, 40, 60, 0.25), rgba(40, 50, 70, 0.18), transparent 75%)',
      light: 'radial-gradient(ellipse at center top, rgba(255, 165, 0, 0.4), rgba(255, 140, 0, 0.3), transparent 85%)',
    }),
    []
  );

  const sunMoonGradients = useMemo(
    () => ({
      dark: 'radial-gradient(circle at 30% 30%, #f5f8ff 5%, #e6efff 25%, #d0e0ff 50%, #b3c7ff 75%, #94a5ff 100%)',
      light: 'radial-gradient(circle at 35% 35%, #fffbe6 0%, #fff0b3 20%, #ffd700 60%, #ffa500 100%)',
    }),
    []
  );

  const sunMoonShadows = useMemo(
    () => ({
      dark: '0 0 clamp(35px, 7vw, 75px) rgba(200, 210, 220, 0.8), inset -7px -7px 18px rgba(150, 170, 190, 0.5)',
      light: '0 0 clamp(70px, 14vw, 180px) rgba(255, 215, 0, 0.9), 0 0 clamp(120px, 20vw, 300px) rgba(255, 165, 0, 0.6), inset -5px -5px 12px rgba(255, 165, 0, 0.4)',
    }),
    []
  );

  const sunMoonHaloGradients = useMemo(
    () => ({
      dark: 'radial-gradient(circle, transparent 40%, rgba(150, 170, 190, 0.1) 50%, transparent 80%)',
      light: 'radial-gradient(circle, transparent 30%, rgba(255, 140, 0, 0.35) 45%, rgba(255, 165, 0, 0.25) 70%, transparent 90%)',
    }),
    []
  );

  const horizonLineGradients = useMemo(
    () => ({
      dark: 'linear-gradient(90deg, transparent 0%, rgba(100, 110, 120, 0.7) 20%, rgba(120, 130, 140, 0.85) 50%, rgba(100, 110, 120, 0.7) 80%, transparent 100%)',
      light: 'linear-gradient(90deg, transparent 0%, rgba(255, 250, 245, 0.95) 20%, rgba(255, 240, 220, 1) 50%, rgba(255, 250, 245, 0.95) 80%, transparent 100%)',
    }),
    []
  );

  const oceanGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to top,
          rgba(0, 0, 5, 0.98) 0%,
          rgba(5, 5, 15, 0.9) 15%,
          rgba(10, 10, 25, 0.8) 30%,
          rgba(15, 15, 35, 0.7) 45%,
          rgba(20, 20, 45, 0.6) 60%,
          rgba(25, 25, 55, 0.5) 75%,
          rgba(30, 30, 65, 0.3) 90%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to top,
          rgba(100, 50, 0, 0.9) 0%,
          rgba(200, 80, 0, 0.7) 25%,
          rgba(255, 150, 50, 0.4) 50%,
          rgba(80, 0, 20, 0.2) 75%,
          rgba(0, 50, 100, 0.1) 90%,
          transparent 100%
        )
      `,
    }),
    []
  );

  const waterWaveGradients1 = useMemo(
    () => ({
      dark: `
        repeating-linear-gradient(90deg,
          transparent,
          transparent clamp(30px, 6vw, 80px),
          rgba(30, 50, 80, 0.3) clamp(30px, 6vw, 80px),
          rgba(30, 50, 80, 0.3) clamp(70px, 14vw, 150px),
          transparent clamp(70px, 14vw, 150px),
          transparent clamp(110px, 22vw, 230px)
        )
      `,
      light: `
        repeating-linear-gradient(90deg,
          transparent,
          transparent clamp(40px, 8vw, 100px),
          rgba(255, 100, 30, 0.35) clamp(40px, 8vw, 100px),
          rgba(255, 100, 30, 0.35) clamp(80px, 16vw, 200px)
        )
      `,
    }),
    []
  );

  const waterWaveGradients2 = useMemo(
    () => ({
      dark: `
        repeating-linear-gradient(45deg,
          transparent,
          transparent clamp(15px, 3vw, 50px),
          rgba(50, 80, 120, 0.25) clamp(15px, 3vw, 50px),
          rgba(50, 80, 120, 0.25) clamp(35px, 7vw, 100px)
        )
      `,
      light: `
        repeating-linear-gradient(45deg,
          transparent,
          transparent clamp(20px, 4vw, 60px),
          rgba(255, 150, 60, 0.3) clamp(20px, 4vw, 60px),
          rgba(255, 150, 60, 0.3) clamp(40px, 8vw, 120px)
        )
      `,
    }),
    []
  );

  const reflectionGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to bottom,
          transparent 0%,
          rgba(50, 60, 80, 0.4) 10%,
          rgba(70, 80, 100, 0.6) 30%,
          rgba(90, 100, 120, 0.5) 50%,
          rgba(110, 120, 140, 0.4) 70%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to bottom,
          transparent 0%,
          rgba(255, 100, 0, 0.65) 20%,
          rgba(255, 50, 0, 0.55) 50%,
          rgba(255, 20, 0, 0.45) 80%,
          transparent 100%
        )
      `,
    }),
    []
  );

  const beachSandGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to top,
          rgba(15, 20, 25, 0.98) 0%,
          rgba(25, 30, 35, 0.9) 20%,
          rgba(40, 45, 50, 0.8) 40%,
          rgba(60, 65, 70, 0.65) 60%,
          rgba(75, 80, 85, 0.5) 80%,
          transparent 100%
        )
      `,
      light: `
        linear-gradient(to top,
          rgba(210, 150, 80, 1) 0%,
          rgba(230, 180, 120, 0.92) 15%,
          rgba(240, 190, 130, 0.84) 30%,
          rgba(250, 210, 160, 0.72) 50%,
          rgba(255, 220, 170, 0.6) 70%,
          rgba(255, 240, 200, 0.45) 85%,
          transparent 100%
        )
      `,
    }),
    []
  );

  const sandTextureGradients = useMemo(
    () => ({
      dark: `
        radial-gradient(circle at 25% 30%, rgba(30, 35, 40, 0.3) 1px, transparent 1px),
        radial-gradient(circle at 75% 70%, rgba(40, 45, 50, 0.2) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(50, 55, 60, 0.25) 1px, transparent 1px),
        radial-gradient(circle at 30% 80%, rgba(45, 50, 55, 0.15) 1px, transparent 1px),
        radial-gradient(circle at 80% 20%, rgba(55, 60, 65, 0.2) 1px, transparent 1px)
      `,
      light: `
        radial-gradient(circle at 25% 30%, rgba(180, 120, 60, 0.5) 1px, transparent 1px),
        radial-gradient(circle at 75% 70%, rgba(200, 140, 80, 0.4) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(220, 160, 100, 0.45) 1px, transparent 1px),
        radial-gradient(circle at 30% 80%, rgba(230, 170, 110, 0.4) 1px, transparent 1px),
        radial-gradient(circle at 80% 20%, rgba(240, 180, 120, 0.35) 1px, transparent 1px)
      `,
    }),
    []
  );

  const wetSandEdgeGradients = useMemo(
    () => ({
      dark: 'linear-gradient(90deg, transparent 0%, rgba(40, 50, 60, 0.3) 15%, rgba(60, 70, 80, 0.4) 35%, rgba(80, 90, 100, 0.5) 50%, rgba(60, 70, 80, 0.4) 65%, rgba(40, 50, 60, 0.3) 85%, transparent 100%)',
      light: 'linear-gradient(90deg, transparent 0%, rgba(255, 220, 180, 0.6) 15%, rgba(255, 200, 150, 0.7) 35%, rgba(255, 180, 120, 0.8) 50%, rgba(255, 200, 150, 0.7) 65%, rgba(255, 220, 180, 0.6) 85%, transparent 100%)',
    }),
    []
  );

  const tsunamiWaveGradients = useMemo(
    () => ({
      dark: `
        linear-gradient(to right,
          rgba(0, 0, 15, 0.95) 0%,
          rgba(10, 10, 30, 0.9) 20%,
          rgba(20, 20, 50, 0.85) 40%,
          rgba(30, 30, 70, 0.8) 60%,
          rgba(40, 40, 80, 0.75) 80%,
          rgba(50, 50, 90, 0.7) 100%
        )
      `,
      light: `
        linear-gradient(to right,
          rgba(100, 40, 0, 0.95) 0%,
          rgba(180, 60, 0, 0.9) 20%,
          rgba(220, 80, 0, 0.85) 40%,
          rgba(255, 100, 0, 0.8) 60%,
          rgba(255, 120, 20, 0.75) 80%,
          rgba(255, 140, 40, 0.7) 100%
        )
      `,
    }),
    []
  );

  const waveSprayGradients = useMemo(
    () => ({
      dark: 'radial-gradient(ellipse at bottom, rgba(180, 190, 200, 0.8) 0%, rgba(130, 150, 170, 0.6) 30%, rgba(80, 100, 120, 0.4) 60%, transparent 100%)',
      light: 'radial-gradient(ellipse at bottom, rgba(255, 255, 255, 0.9) 0%, rgba(255, 220, 180, 0.7) 30%, rgba(255, 180, 120, 0.5) 60%, transparent 100%)',
    }),
    []
  );

  const waveFoamGradients = useMemo(
    () => ({
      dark: `
        radial-gradient(circle at 50% 100%,
          rgba(180, 190, 200, 0.7) 0%,
          rgba(140, 150, 160, 0.5) 30%,
          transparent 70%
        ),
        linear-gradient(to right,
          transparent 0%,
          rgba(150, 160, 170, 0.4) 10%,
          rgba(170, 180, 190, 0.6) 50%,
          rgba(150, 160, 170, 0.4) 90%,
          transparent 100%
        )
      `,
      light: `
        radial-gradient(circle at 50% 100%,
          rgba(255, 255, 255, 0.95) 0%,
          rgba(255, 240, 220, 0.8) 30%,
          transparent 70%
        ),
        linear-gradient(to right,
          transparent 0%,
          rgba(255, 250, 240, 0.6) 10%,
          rgba(255, 255, 255, 0.9) 50%,
          rgba(255, 250, 240, 0.6) 90%,
          transparent 100%
        )
      `,
    }),
    []
  );

  const oceanRippleGradients = useMemo(
    () => ({
      dark: `
        repeating-radial-gradient(circle at 50% 50%,
          rgba(255, 255, 255, 0.03) 0.5px,
          transparent 1.5px,
          rgba(255, 255, 255, 0.02) 2px,
          transparent 3px
        )
      `,
      light: `
        repeating-radial-gradient(circle at 50% 50%,
          rgba(255, 255, 255, 0.1) 0.5px,
          transparent 1.5px,
          rgba(255, 255, 255, 0.07) 2px,
          transparent 3px
        )
      `,
    }),
    []
  );

  useEffect(() => {
    if (prevMode !== isDarkRealm) {
      setShowLightning(true);
      const timer = setTimeout(() => {
        setShowLightning(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isDarkRealm, prevMode]);

  useEffect(() => {
    if (prevMode !== isDarkRealm) {
      setModeTransitioning(true);
      setShowBirds(false);

      const timer = setTimeout(() => {
        setModeTransitioning(false);
        if (!isDarkRealm) {
          setShowBirds(true);
        }
      }, 200);

      setPrevMode(isDarkRealm);
      return () => clearTimeout(timer);
    } else if (!isDarkRealm && !modeTransitioning && !showBirds) {
      setShowBirds(true);
    }
  }, [isDarkRealm, prevMode, modeTransitioning]);

  useEffect(() => {
    const tsunamiInterval = setInterval(() => {
      setShowTsunami(true);
      setTimeout(() => {
        setShowTsunami(false);
      }, 8000);
    }, 25000);

    return () => clearInterval(tsunamiInterval);
  }, []);

  return (
    <>
      {/* Main background gradient */}
      <motion.div
        className="fixed inset-0"
        style={{ zIndex: -21 }}
        animate={{
          background: isDarkRealm ? backgroundGradients.dark : backgroundGradients.light,
        }}
        transition={{ duration: 1.0, ease: 'easeInOut' }}
      />

      {/* Atmospheric haze */}
      <motion.div
        className="fixed inset-0"
        style={{
          zIndex: -20,
          background: isDarkRealm ? atmosphericHazeGradients.dark : atmosphericHazeGradients.light,
        }}
        animate={{
          opacity: [0.6, 0.95, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Lightning effects */}
      {showLightning && (
        <>
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={`lightning-main-${index}`}
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0] }}
              transition={{
                duration: 0.05 + Math.random() * 0.08,
                delay: Math.random() * 0.3,
                ease: 'linear',
              }}
              style={{
                background: `radial-gradient(at ${Math.random() * 100}% ${Math.random() * 40}%, rgba(255, 255, 255, 0.95) 5%, transparent 15%),
                               radial-gradient(at ${Math.random() * 100}% ${Math.random() * 40}%, rgba(255, 255, 255, 0.8) 5%, transparent 15%)`,
                mixBlendMode: 'screen',
                zIndex: -3,
                pointerEvents: 'none',
              }}
            />
          ))}
          {[...Array(2)].map((_, index) => (
            <motion.div
              key={`lightning-secondary-${index}`}
              className="fixed inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7 + Math.random() * 0.2, 0] }}
              transition={{
                duration: 0.08 + Math.random() * 0.1,
                delay: 0.1 + Math.random() * 0.4,
                ease: 'linear',
              }}
              style={{
                background: `radial-gradient(at ${Math.random() * 100}% ${Math.random() * 60}%, rgba(190, 225, 240, 0.75) 8%, transparent 20%)`,
                mixBlendMode: 'screen',
                zIndex: -3,
                pointerEvents: 'none',
              }}
            />
          ))}
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.25, 0] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              zIndex: -2,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Sun/Moon */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -18,
          width: 'clamp(70px, 12vw, 150px)',
          height: 'clamp(70px, 12vw, 150px)',
          borderRadius: '50%',
          background: isDarkRealm ? sunMoonGradients.dark : sunMoonGradients.light,
          top: 'clamp(10vh, 14vh, 18vh)',
          right: 'clamp(14vw, 18vw, 22vw)',
          filter: isDarkRealm ? 'blur(0.6px)' : 'blur(0.3px)',
          boxShadow: isDarkRealm ? sunMoonShadows.dark : sunMoonShadows.light,
        }}
        animate={{
          scale: [1, 1.07, 1],
          opacity: [0.9, 1, 0.9],
          rotate: isDarkRealm ? [0, 5, 0] : [0, 360],
        }}
        transition={{
          scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          rotate: {
            duration: isDarkRealm ? 60 : 200,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      />

      {/* Sun/Moon Halo */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -19,
          width: 'clamp(100px, 18vw, 220px)',
          height: 'clamp(100px, 18vw, 220px)',
          borderRadius: '50%',
          background: isDarkRealm ? sunMoonHaloGradients.dark : sunMoonHaloGradients.light,
          top: 'clamp(8vh, 12vh, 16vh)',
          right: 'clamp(11vw, 15vw, 19vw)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Birds (Light Realm) */}
      {!isDarkRealm && showBirds && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`bird-${i}`}
              className="absolute"
              style={{
                left: Math.random() * 70 + 5 + '%',
                top: Math.random() * 40 + 15 + '%',
                width: 'clamp(24px, 4vw, 48px)',
                height: 'clamp(12px, 2vw, 24px)',
                filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
                transform: `scaleX(${Math.random() > 0.5 ? 1 : -1})`,
              }}
              initial={{ opacity: 0 }}
              animate={{
                x: [0, 200 + Math.random() * 300, 400 + Math.random() * 400],
                y: [0, -40 + Math.random() * 80, -30 + Math.random() * 60],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 25 + Math.random() * 15,
                repeat: Infinity,
                delay: Math.random() * 12,
                ease: 'linear',
              }}
            >
              <motion.svg
                viewBox="0 0 100 40"
                fill="currentColor"
                className={isDarkRealm ? 'text-gray-700' : 'text-black/70'}
              >
                <motion.path
                  d="M 10,20 Q 25,10 35,20 Q 45,30 55,20 Q 65,10 80,20 Q 65,25 55,20 Q 45,15 35,20 Q 25,25 10,20"
                  animate={{
                    d: [
                      "M 10,20 Q 25,10 35,20 Q 45,30 55,20 Q 65,10 80,20 Q 65,25 55,20 Q 45,15 35,20 Q 25,25 10,20",
                      "M 10,20 Q 25,15 35,20 Q 45,25 55,20 Q 65,15 80,20 Q 65,20 55,20 Q 45,20 35,20 Q 25,20 10,20",
                      "M 10,20 Q 25,10 35,20 Q 45,30 55,20 Q 65,10 80,20 Q 65,25 55,20 Q 45,15 35,20 Q 25,25 10,20"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Stars and Shooting Stars (Dark Realm) */}
      {isDarkRealm && (
        <div className="fixed inset-0" style={{ zIndex: -17 }}>
          {[...Array(120)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `clamp(1px, ${Math.random() * 0.3 + 0.15}vw, 4px)`,
                height: `clamp(1px, ${Math.random() * 0.3 + 0.15}vw, 4px)`,
                background: `hsl(${220 + Math.random() * 40}, 100%, ${90 + Math.random() * 10}%)`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 70 + '%',
                boxShadow: '0 0 clamp(4px, 0.9vw, 10px) rgba(255, 255, 255, 0.9)',
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: 'easeInOut',
              }}
            />
          ))}

          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`shooting-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: 'clamp(2px, 0.4vw, 5px)',
                height: 'clamp(2px, 0.4vw, 5px)',
                background: 'white',
                left: '-10%',
                top: `${10 + i * 25}%`,
                boxShadow: '0 0 clamp(15px, 3vw, 30px) #ffffff, 2px 0 clamp(25px, 4.5vw, 50px) rgba(255, 255, 255, 0.8)',
              }}
              animate={{
                x: ['-10%', '110%'],
                y: [`${10 + i * 25}%`, `${35 + i * 25}%`],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 15 + Math.random() * 10,
                delay: i * 7,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Horizon Line - REMOVED */}
      {/* <motion.div
        className="fixed left-0 right-0"
        style={{
          zIndex: -16,
          height: 'clamp(1.2px, 0.25vw, 3.5px)',
          background: isDarkRealm ? horizonLineGradients.dark : horizonLineGradients.light,
          top: `calc(100% - clamp(25vh, 32vh, 35vh))`,
          filter: 'blur(clamp(0.6px, 0.2vw, 2px))',
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scaleX: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      /> */}

      {/* Ocean */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -15,
          height: 'clamp(25vh, 32vh, 35vh)',
          background: isDarkRealm ? oceanGradients.dark : oceanGradients.light,
        }}
        animate={{
          opacity: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Ocean Ripples */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14.8,
          height: 'clamp(25vh, 32vh, 35vh)',
          background: isDarkRealm ? oceanRippleGradients.dark : oceanRippleGradients.light,
          backgroundSize: 'clamp(5px, 1vw, 15px) clamp(5px, 1vw, 15px)',
          mixBlendMode: 'overlay',
          filter: 'blur(0.5px)',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Water Waves Layer 1 */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -14,
          height: 'clamp(20vh, 28vh, 32vh)',
          background: isDarkRealm ? waterWaveGradients1.dark : waterWaveGradients1.light,
          backgroundSize: '100% 100%',
          filter: 'blur(0.8px)',
        }}
        animate={{
          x: [0, -200, 0],
          y: [0, -5, 0],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Water Waves Layer 2 */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -13,
          height: 'clamp(15vh, 22vh, 28vh)',
          background: isDarkRealm ? waterWaveGradients2.dark : waterWaveGradients2.light,
          backgroundSize: '100% 100%',
          filter: 'blur(1.2px)',
        }}
        animate={{
          x: [100, -100, 100],
          y: [0, 8, 0],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Reflection */}
      <motion.div
        className="fixed"
        style={{
          zIndex: -12,
          width: 'clamp(40px, 8vw, 80px)',
          height: 'clamp(120px, 25vh, 250px)',
          background: isDarkRealm ? reflectionGradients.dark : reflectionGradients.light,
          right: 'clamp(16vw, 21vw, 26vw)',
          bottom: '0',
          filter: 'blur(clamp(1px, 0.5vw, 3px))',
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scaleY: [1, 1.15, 1],
          scaleX: [1, 1.1, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Beach Sand Layer */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -11,
          height: 'clamp(12vh, 18vh, 22vh)', /* Adjusted height */
          background: isDarkRealm ? beachSandGradients.dark : beachSandGradients.light,
        }}
      />

      {/* Sand Texture Layer */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -10,
          height: 'clamp(10vh, 16vh, 20vh)', /* Adjusted height */
          background: isDarkRealm ? sandTextureGradients.dark : sandTextureGradients.light,
          backgroundSize: `
            clamp(25px, 5vw, 60px) clamp(25px, 5vw, 60px),
            clamp(35px, 7vw, 80px) clamp(35px, 7vw, 80px),
            clamp(30px, 6vw, 70px) clamp(30px, 6vw, 70px),
            clamp(40px, 8vw, 90px) clamp(40px, 8vw, 90px),
            clamp(28px, 5.5vw, 65px) clamp(28px, 5.5vw, 65px)
          `,
          filter: 'blur(0.3px)',
        }}
        animate={{
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Beach Wave Line 1 */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9.5,
          height: 'clamp(5vh, 7vh, 9vh)',
          top: `calc(100% - clamp(12vh, 18vh, 22vh) + clamp(0px, 0.5vw, 5px))`, /* Adjusted top */
          background: isDarkRealm ? backgroundGradients.beachWaveLineDark : backgroundGradients.beachWaveLine,
          opacity: 0.7,
          filter: 'blur(2px)', /* Increased blur */
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 90%, transparent 100%)', /* Softened mask */
        }}
        animate={{
          y: ['0%', '-5%', '0%'],
          scaleX: [1, 1.05, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Beach Wave Line 2 */}
      <motion.div
        className="fixed bottom-0 left-0 right-0"
        style={{
          zIndex: -9.4,
          height: 'clamp(4vh, 6vh, 8vh)',
          top: `calc(100% - clamp(12vh, 18vh, 22vh) + clamp(1.5vh, 2vw, 20px))`, /* Adjusted top */
          background: isDarkRealm ? backgroundGradients.beachWaveLineDark : backgroundGradients.beachWaveLine,
          opacity: 0.5,
          filter: 'blur(2.5px)', /* Increased blur */
          borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
        animate={{
          y: ['0%', '7%', '0%'],
          scaleX: [1, 1.03, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Footprints and Shells Container */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(10vh, 15vh, 18vh)', zIndex: -8 }}> {/* Adjusted height */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`footprint-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(6px, 1.1vw, 18px)`,
              height: `clamp(3px, 0.6vw, 10px)`,
              background: isDarkRealm
                ? 'rgba(50, 60, 75, 0.6)'
                : 'rgba(160, 80, 0, 0.55)',
              left: Math.random() * 85 + 5 + '%',
              top: Math.random() * 70 + 15 + '%',
              filter: 'blur(clamp(0.3px, 0.1vw, 1px))',
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
            }}
            animate={{
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: 'easeInOut',
            }}
          />
        ))}

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`shell-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(3px, 0.8vw, 12px)`,
              height: `clamp(2px, 0.6vw, 8px)`,
              background: isDarkRealm
                ? `hsl(${220 + Math.random() * 20}, 15%, ${80 + Math.random() * 15}%)`
                : `hsl(${30 + Math.random() * 10}, ${50 + Math.random() * 20}%, ${70 + Math.random() * 15}%)`,
              left: Math.random() * 90 + 4 + '%',
              top: Math.random() * 60 + 20 + '%',
              borderRadius: Math.random() > 0.5 ? '50%' : '35% 65% 65% 35% / 35% 35% 65% 65%',
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Beach Sparkles Container */}
      <div className="fixed bottom-0 left-0 right-0" style={{ height: 'clamp(15vh, 20vh, 25vh)', zIndex: -5 }}> {/* Adjusted height to be consistent with new sand height */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`beach-sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`,
              height: `clamp(1px, ${Math.random() * 0.4 + 0.2}vw, 5px)`,
              background: isDarkRealm
                ? `hsl(${210 + Math.random() * 30}, ${30 + Math.random() * 30}%, ${80 + Math.random() * 15}%)`
                : `hsl(${40 + Math.random() * 20}, ${60 + Math.random() * 30}%, ${85 + Math.random() * 10}%)`,
              left: Math.random() * 95 + '%',
              top: Math.random() * 85 + 5 + '%',
              boxShadow: isDarkRealm
                ? `0 0 clamp(4px, 1vw, 10px) rgba(200, 215, 230, 0.8)`
                : `0 0 clamp(6px, 1.2vw, 12px) rgba(255, 220, 50, 0.9)`,
            }}
            animate={{
              opacity: [0.4, 0.98, 0.4],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;

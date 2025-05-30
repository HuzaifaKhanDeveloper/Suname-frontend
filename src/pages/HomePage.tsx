import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useReducedMotion } from 'framer-motion';
import { FaSoundcloud, FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaSpotify, FaApple } from 'react-icons/fa';
import { biography } from '../data/biography';

const AudioVisualizer = lazy(() => import('../components/AudioVisualizer'));
const ParticleSystem = lazy(() => import('../components/ParticleSystem'));

interface HomePageProps {
  isDarkRealm: boolean;
}

const lightModeImages = [
  { src: "/images/artist_main.jpg", alt: "SUNAME Main Artist" },
  { src: "/images/artist_beachball.jpg", alt: "SUNAME Beachball Headshot" },
  { src: "/images/artist_orange.jpg", alt: "SUNAME Orange Full Body" },
];

const darkModeImages = [
  { src: "/images/darkPhoto1.jpg", alt: "SUNAME Dark Realm 1" },
  { src: "/images/darkPhoto2.jpg", alt: "SUNAME Dark Realm 2" },
  { src: "/images/darkPhoto3.jpg", alt: "SUNAME Dark Realm 3" },
];

const imagesToAdjust = [
  "/images/artist_orange.jpg",
  "/images/darkPhoto1.jpg",
  "/images/darkPhoto3.jpg",
];

const HomePage: React.FC<HomePageProps> = React.memo(({ isDarkRealm }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousDarkRealm, setPreviousDarkRealm] = useState(isDarkRealm);
  const heroRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", prefersReducedMotion ? "0%" : "15%"]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [3, -3]);
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);

  const heroImages = isDarkRealm ? darkModeImages : lightModeImages;
  const galleryImages = isDarkRealm ? darkModeImages : lightModeImages;

  useEffect(() => {
    const imagesToPreload = new Set<string>();
    heroImages.forEach((image) => imagesToPreload.add(image.src));
    galleryImages.forEach((image) => imagesToPreload.add(image.src));

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    if (previousDarkRealm !== isDarkRealm) {
      setCurrentImageIndex(0);
      setPreviousDarkRealm(isDarkRealm);
    }
  }, [isDarkRealm, previousDarkRealm, heroImages, galleryImages]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length, prefersReducedMotion]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }, [x, y, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    x.set(0);
    y.set(0);
  }, [x, y, prefersReducedMotion]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const heroReveal = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion ? { duration: 0.5 } : {
        duration: 1.2,
        ease: [0.2, 0.8, 0.2, 1],
        staggerChildren: 0.1,
        delayChildren: 0.4
      },
    },
  };

  const sectionHeadingReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0.5 } : {
        duration: 1.0,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

  const sunameCharReveal = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion ? { duration: 0.4 } : {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

  const sunameActiveTextAnimation = {
    animate: prefersReducedMotion ? {} : (isDarkRealm
      ? {
          color: ['#E0BBE4', '#FFFFFF', '#E0BBE4'],
          textShadow: [
            '0 0 10px rgba(139,92,246,0.8), 0 0 20px rgba(139,92,246,0.6), 0 0 30px rgba(139,92,246,0.4)',
            '0 0 15px rgba(139,92,246,1), 0 0 25px rgba(139,92,246,0.8), 0 0 35px rgba(139,92,246,0.6)'
          ],
          transition: {
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut",
            repeatType: "mirror" as const
          }
        }
      : {
          color: ['#FFDDC1', '#FFFFFF', '#FFDDC1'],
          textShadow: [
            '0 0 12px rgba(255,165,0,0.9), 0 0 22px rgba(255,165,0,0.7), 0 0 32px rgba(255,165,0,0.5)',
            '0 0 18px rgba(255,165,0,1), 0 0 28px rgba(255,165,0,0.8), 0 0 38px rgba(255,165,0,0.6)'
          ],
          transition: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            repeatType: "mirror" as const
          }
        })
  };

  const taglineActiveTextAnimation = {
    animate: prefersReducedMotion ? {} : (isDarkRealm
      ? {
          color: ['#FFFFFF', '#B39DDB', '#FFFFFF'],
          textShadow: [
            '0 0 4px rgba(179,157,219,0.5)',
            '0 0 8px rgba(179,157,219,0.8)',
            '0 0 4px rgba(179,157,219,0.5)'
          ],
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "mirror" as const, delay: 0.1 }
        }
      : {
          color: ['#FFC074', '#FFAA66', '#FFC074'],
          textShadow: [
            '0 0 5px rgba(255,165,0,0.4)',
            '0 0 10px rgba(255,165,0,0.6)',
            '0 0 5px rgba(255,165,0,0.4)'
          ],
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "mirror" as const, delay: 0.1 }
        })
  };

  const taglineWordReveal = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0.4 } : {
        duration: 0.7,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

  const quoteActiveTextAnimation = {
    animate: prefersReducedMotion ? {} : (isDarkRealm
      ? {
          color: ['#FFFFFF', 'rgba(179,157,219,0.9)', '#FFFFFF'],
          textShadow: ['0 0 5px rgba(139,92,246,0.3)', '0 0 10px rgba(139,92,246,0.6)', '0 0 5px rgba(139,92,246,0.3)'],
          transition: {
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            repeatType: "mirror" as const
          }
        }
      : {
          color: ['#3A404F', '#2A2E3D', '#3A404F'],
          textShadow: [
            '0 0 2px rgba(0,0,0,0.1)', '0 0 4px rgba(0,0,0,0.2)', '0 0 2px rgba(0,0,0,0.1)'
          ],
          transition: {
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
            repeatType: "mirror" as const
          }
        })
  };

  const quoteLineReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? { duration: 0.5 } : {
        duration: 1.0,
        ease: [0.2, 0.8, 0.2, 1]
      },
    },
  };

  const getDynamicWhiteTextStyle = (isDark: boolean) => {
    return {
      textShadow: isDark
        ? '0 0 8px rgba(255,255,255,0.1), 0 0 10px rgba(139,92,246,0.1)'
        : '0 0 5px rgba(255,165,0,0.4), 0 0 8px rgba(255,165,0,0.2)'
    };
  };

  const splitTagline = biography.tagline?.split(" ") ?? [];
  const quoteTagline = "WITHIN EVERY DARK REALM, THERE IS LIGHT – SUNAME";

  const darkModeTransition = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0.3 } : {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      transition: prefersReducedMotion ? { duration: 0.2 } : {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const footerTextAnimation = {
    animate: prefersReducedMotion ? {} : (isDarkRealm
      ? {
          color: ['#FFFFFF', '#8B5CF6', '#FFFFFF'],
          textShadow: ['0 0 3px rgba(139,92,246,0.4)', '0 0 6px rgba(139,92,246,0.7)', '0 0 3px rgba(139,92,246,0.4)'],
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "mirror" as const }
        }
      : {
          color: ['#1A202C', '#FF7043', '#1A202C'],
          textShadow: ['0 0 2px rgba(255,112,67,0.3)', '0 0 4px rgba(255,112,67,0.6)', '0 0 2px rgba(255,112,67,0.3)'],
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut", repeatType: "mirror" as const }
        })
  };

  return (
    <motion.div
      className="min-h-screen overflow-hidden relative"
      key={isDarkRealm ? 'dark' : 'light'}
      variants={darkModeTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Suspense fallback={null}>
        <ParticleSystem
          isDarkRealm={isDarkRealm}
          customColors={isDarkRealm ? ['#303F9F', '#42A5F5', '#8B5CF6'] : ['#FFD180', '#FFA07A', '#FF7043']}
        />
      </Suspense>

      <motion.svg
        className="absolute bottom-0 left-0 w-full h-80 md:h-96 z-0"
        viewBox="0 0 350 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 1.0, delay: 0.5 } : { duration: 2.5, delay: 1 }}
        style={{
          fill: isDarkRealm ? 'rgba(48,63,159,0.4)' : 'rgba(255,165,0,0.2)'
        }}
      >
        {isMounted && !prefersReducedMotion && (
          <motion.path
            d="M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z"
            animate={{
              d: [
                "M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z",
                "M0 70 C 150 120 250 20 350 80 L 350 100 L 0 100 Z",
                "M0 50 C 80 0 220 110 300 60 L 300 100 L 0 100 Z",
                "M0 65 C 120 20 230 90 350 50 L 350 100 L 0 100 Z",
                "M0 60 C 100 10 200 100 300 40 L 300 100 L 0 100 Z"
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.svg>

      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 z-10 overflow-hidden perspective-1000">
        <motion.div
          className="container mx-auto text-center relative z-20"
          initial="hidden"
          animate={isMounted ? "visible" : "hidden"}
          variants={heroReveal}
        >
          <motion.div
            className="relative w-80 h-80 mx-auto mb-10 cursor-grab active:cursor-grabbing rounded-full overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={prefersReducedMotion ? {} : { rotateX, rotateY, scale: 1 }}
            animate={prefersReducedMotion ? {} : { rotate: [0, 10, -10, 5, -5, 0] }}
            transition={prefersReducedMotion ? {} : {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={prefersReducedMotion ? {} : {
                background: isDarkRealm
                  ? ['linear-gradient(0deg, rgba(48,63,159,0.6), transparent)',
                    'linear-gradient(90deg, rgba(48,63,159,0.6), transparent)',
                    'linear-gradient(180deg, rgba(48,63,159,0.6), transparent)',
                    'linear-gradient(270deg, rgba(48,63,159,0.6), transparent)']
                  : ['linear-gradient(0deg, rgba(255,165,0,0.6), transparent)',
                    'linear-gradient(90deg, rgba(255,165,0,0.6), transparent)',
                    'linear-gradient(180deg, rgba(255,165,0,0.6), transparent)',
                    'linear-gradient(270deg, rgba(255,165,0,0.6), transparent)']
              }}
              transition={prefersReducedMotion ? {} : { duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <AnimatePresence mode="sync" initial={false}>
              <motion.img
                key={`${isDarkRealm ? 'dark' : 'light'}-${currentImageIndex}`}
                src={heroImages?.[currentImageIndex]?.src}
                alt={heroImages?.[currentImageIndex]?.alt}
                className="w-full h-full object-cover rounded-full border-4 absolute"
                initial={{
                  opacity: 0,
                  scale: 1.05
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95
                }}
                transition={prefersReducedMotion ? { duration: 0.3 } : {
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                style={{
                  borderColor: isDarkRealm ? 'rgba(48,63,159,0.8)' : 'rgba(255,165,0,0.8)',
                  objectPosition: imagesToAdjust.includes(heroImages?.[currentImageIndex]?.src || '') ? '50% 30%' : 'center'
                }}
                loading="eager"
              />
            </AnimatePresence>
            <motion.div
              className="absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-300"
              animate={{
                backgroundColor: isDarkRealm ? 'rgba(139,92,246,0.5)' : 'rgba(255,127,80,0.5)'
              }}
              transition={prefersReducedMotion ? { duration: 0.4 } : { duration: 0.8, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.h1
            className={`text-7xl md:text-8xl font-extrabold mb-4 relative leading-none text-white`}
            style={{ y: heroTextY }}
          >
            <motion.span
              className="relative z-0 inline-block overflow-hidden"
              variants={{
                visible: {
                  transition: prefersReducedMotion ? { staggerChildren: 0.04, delayChildren: 0.4 } : {
                    staggerChildren: 0.08,
                    delayChildren: 0.8
                  }
                }
              }}
            >
              {"SUNAME".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="inline-block"
                  variants={sunameCharReveal}
                  animate={isMounted && !prefersReducedMotion ? sunameActiveTextAnimation.animate : undefined}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          <motion.p
            className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white`}
            style={{ y: heroTextY }}
            variants={{
              visible: {
                transition: prefersReducedMotion ? { staggerChildren: 0.02, delayChildren: 0.6 } : {
                  staggerChildren: 0.05,
                  delayChildren: 1.2
                }
              }
            }}
          >
            {splitTagline.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                variants={taglineWordReveal}
                animate={isMounted && !prefersReducedMotion ? taglineActiveTextAnimation.animate : undefined}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.div
            className="flex justify-center space-x-4 mb-12"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: prefersReducedMotion ? { delay: 0.8, staggerChildren: 0.05 } : {
                  delay: 1.5,
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[
              { icon: FaSoundcloud, url: biography.socials.soundcloud },
              { icon: FaInstagram, url: biography.socials.instagram },
              { icon: FaTwitter, url: biography.socials.twitter },
              { icon: FaTiktok, url: biography.socials.tiktok },
              { icon: FaYoutube, url: biography.socials.youtube },
              { icon: FaSpotify, url: biography.socials.spotify },
              { icon: FaApple, url: biography.socials.appleMusic }
            ].map(({ icon: Icon, url }, index) => (
              <motion.a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={prefersReducedMotion ? { duration: 0.4, delay: 0.8 + index * 0.05 } : { duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 1.5 + index * 0.1 }}
              >
                <motion.span
                  className="inline-block"
                  style={{
                    color: '#FFFFFF',
                    filter: isDarkRealm
                      ? 'drop-shadow(0px 0px 5px rgba(139,92,246,0.6)) drop-shadow(0px 0px 10px rgba(139,92,246,0.4))'
                      : 'drop-shadow(0px 0px 5px rgba(255,165,0,0.6)) drop-shadow(0px 0px 10px rgba(255,165,0,0.4))',
                  }}
                  whileHover={prefersReducedMotion ? {} : {
                    scale: 1.2,
                    color: isDarkRealm ? '#8B5CF6' : '#FF7043',
                    filter: isDarkRealm
                      ? 'drop-shadow(0px 0px 8px rgba(139,92,246,0.9)) drop-shadow(0px 0px 15px rgba(139,92,246,0.7)) drop-shadow(0px 0px 25px rgba(139,92,246,0.5))'
                      : 'drop-shadow(0px 0px 8px rgba(255,165,0,0.9)) drop-shadow(0px 0px 15px rgba(255,165,0,0.7)) drop-shadow(0px 0px 25px rgba(255,165,0,0.5))',
                  }}
                  transition={prefersReducedMotion ? {} : {
                    filter: { duration: 0.4, ease: "easeOut" },
                    color: { duration: 0.4, ease: "easeOut" },
                    scale: { type: "spring", stiffness: 400, damping: 30 }
                  }}
                >
                  <Icon />
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-4 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className={`text-4xl md:text-5xl font-bold mb-12 text-center ${isDarkRealm ? 'text-white' : 'text-gray-900'}`}
            variants={sectionHeadingReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            Gallery
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: prefersReducedMotion ? { staggerChildren: 0.1 } : { staggerChildren: 0.2 } } }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden shadow-lg"
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 50 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: prefersReducedMotion ? { duration: 0.4, delay: index * 0.02 } : { duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: index * 0.05 }
                  },
                }}
                whileHover={prefersReducedMotion ? {} : {
                  scale: 1.05, z: 10,
                  boxShadow: isDarkRealm ? '0px 0px 20px rgba(139,92,246,0.5)' : '0px 0px 20px rgba(255,127,80,0.6)'
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{
                    objectPosition: imagesToAdjust.includes(image.src) ? '50% 30%' : 'center'
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity flex items-end p-4"
                  whileHover={prefersReducedMotion ? {} : { opacity: 1 }}
                >
                  <p className="text-white text-lg font-semibold" style={getDynamicWhiteTextStyle(isDarkRealm)}>
                    {image.alt}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            className={`text-3xl md:text-4xl font-bold italic mb-8 relative`}
            variants={{
              visible: {
                transition: prefersReducedMotion ? { staggerChildren: 0.05, delayChildren: 0.1 } : {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <motion.span
              className={`absolute -top-6 left-1/2 -translate-x-1/2 text-7xl opacity-20 ${isDarkRealm ? 'text-primary-500' : 'text-orange-500'}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={prefersReducedMotion ? { duration: 0.4, delay: 0.05 } : { duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              &ldquo;
            </motion.span>
            {quoteTagline.split(" ").map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mx-0.5"
                variants={quoteLineReveal}
                animate={isMounted && !prefersReducedMotion ? quoteActiveTextAnimation.animate : undefined}
                style={{ color: isDarkRealm ? '#FFFFFF' : '#1A202C' }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-7xl opacity-20 ${isDarkRealm ? 'text-primary-500' : 'text-orange-500'}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={prefersReducedMotion ? { duration: 0.4, delay: quoteTagline.split(" ").length * 0.02 + 0.15 } : { duration: 0.8, ease: "easeOut", delay: quoteTagline.split(" ").length * 0.05 + 0.3 }}
            >
              &rdquo;
            </motion.span>
          </motion.blockquote>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: prefersReducedMotion ? { duration: 0.5, delay: 0.2 } : { duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.5 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Suspense fallback={null}>
              <AudioVisualizer
                height={80}
                barCount={48}
                color={isDarkRealm ? 'rgb(139, 92, 246)' : 'rgb(255,127,80)'}
              />
            </Suspense>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 text-center z-10 relative">
        <motion.p
          className={`text-base`}
          style={{ color: isDarkRealm ? '#FFFFFF' : '#1A202C' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={prefersReducedMotion ? { duration: 0.4, delay: 0.1 } : { duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
        >
          Artwork & Website by{' '}
          <motion.a
            href={biography.designer.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-400 font-semibold"
            animate={isMounted && !prefersReducedMotion ? footerTextAnimation.animate : undefined}
          >
            JimmyDesigns
          </motion.a>
        </motion.p>
      </footer>
    </motion.div>
  );
});

export default HomePage;

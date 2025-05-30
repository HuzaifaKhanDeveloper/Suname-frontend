import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { biography } from '../data/biography';
import AudioVisualizer from '../components/AudioVisualizer';
import MusicCard from '../components/MusicCard';
import { ArrowRight, Music2, ExternalLink } from 'lucide-react';

const MusicPage = () => {
  const { isDarkMode } = useTheme();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  // Random SoundCloud links - replace these with your actual SoundCloud URLs
  const soundCloudLinks = [
    "https://soundcloud.com/your-track-1",
    "https://soundcloud.com/your-track-2", 
    "https://soundcloud.com/your-track-3",
    "https://soundcloud.com/your-track-4",
    "https://soundcloud.com/your-track-5",
    "https://soundcloud.com/your-track-6"
  ];

  const musicTracks = [
    {
      title: "Midnight Echoes",
      description: "Latest single from the upcoming album",
      imageUrl: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      title: "Neon Dreams",
      description: "Experimental electronic journey",
      imageUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      title: "Urban Pulse",
      description: "City-inspired ambient track",
      imageUrl: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1600"
    },
    {
      title: "Ethereal Waves",
      description: "Collaboration with local artists",
      imageUrl: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600"
    }
  ];

  const getRandomSoundCloudLink = () => {
    return soundCloudLinks[Math.floor(Math.random() * soundCloudLinks.length)];
  };

  const handleCardClick = (index) => {
    setClickedCard(index);
    const randomLink = getRandomSoundCloudLink();
    
    // Add a small delay for visual feedback
    setTimeout(() => {
      window.open(randomLink, '_blank');
      setClickedCard(null);
    }, 200);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    }
  };

  const arrowVariants = {
    rest: { 
      x: 0,
      opacity: 0.7
    },
    hover: {
      x: 15,
      opacity: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 8
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
        delay: 0.2
      }
    }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(139,92,246,0.1) 0%, transparent 40%)',
            'radial-gradient(circle at 80% 20%, rgba(139,92,246,0.15) 0%, transparent 40%)',
            'radial-gradient(circle at 40% 80%, rgba(139,92,246,0.1) 0%, transparent 40%)',
            'radial-gradient(circle at 20% 50%, rgba(139,92,246,0.1) 0%, transparent 40%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1
            }}
            className="inline-block mb-6"
          >
            <motion.div
              animate={floatingAnimation}
            >
              <Music2
                size={56}
                className={`${isDarkMode ? 'text-primary-400' : 'text-primary-600'} drop-shadow-lg`}
              />
            </motion.div>
          </motion.div>

          <motion.h1
            variants={titleVariants}
            className={`text-4xl md:text-6xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            } bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent`}
          >
            Latest Releases
          </motion.h1>

          <motion.p
            className={`text-lg md:text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Experience the sound of SUNAME
          </motion.p>

          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <AudioVisualizer
              height={80}
              barCount={32}
              color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
        >
          {musicTracks.map((track, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(index)}
            >
              <motion.div
                className={`relative overflow-hidden rounded-2xl ${
                  isDarkMode 
                    ? 'bg-gray-900/80 border border-gray-700' 
                    : 'bg-white/90 border border-gray-200'
                } backdrop-blur-sm shadow-2xl p-6 transition-all duration-300`}
                animate={clickedCard === index ? {
                  scale: [1, 0.95, 1],
                  boxShadow: [
                    '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
                    '0 25px 50px -12px rgba(139, 92, 246, 0.5)',
                    '0 25px 50px -12px rgba(139, 92, 246, 0.25)'
                  ]
                } : {}}
              >
                {/* Shimmer effect on click */}
                <AnimatePresence>
                  {clickedCard === index && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      exit={{ x: '200%' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      transition={{ duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>

                <div className="flex items-center space-x-4">
                  <motion.img
                    src={track.imageUrl}
                    alt={track.title}
                    className="w-20 h-20 rounded-xl object-cover shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="flex-1">
                    <motion.h3
                      className={`text-xl font-bold mb-2 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      {track.title}
                    </motion.h3>
                    <motion.p
                      className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {track.description}
                    </motion.p>
                  </div>

                  <motion.div
                    className="flex items-center"
                    whileHover={{ scale: 1.2 }}
                  >
                    <ExternalLink 
                      size={20} 
                      className={`${
                        isDarkMode ? 'text-primary-400' : 'text-primary-600'
                      }`}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Animated Arrow */}
              <AnimatePresence>
                {hoveredCard === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.5, x: -20 }}
                    className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10"
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      variants={arrowVariants}
                      initial="rest"
                      animate="hover"
                      className="bg-primary-500 rounded-full p-2 shadow-xl"
                    >
                      <ArrowRight className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Spotify Embed Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16"
        >
          <motion.div
            className={`rounded-3xl p-8 ${
              isDarkMode
                ? 'bg-gray-900/60 border border-gray-800'
                : 'bg-white/80 border border-gray-200'
            } backdrop-blur-md shadow-2xl overflow-hidden relative`}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.25)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="absolute inset-0 -z-10"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)',
                  'radial-gradient(circle at 100% 100%, rgba(139,92,246,0.15) 0%, transparent 70%)',
                  'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)',
                  'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)',
                ],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.iframe
              style={{ borderRadius: '16px' }}
              src="https://open.spotify.com/embed/artist/1iSs6VT8Pi1pQ85ffnrLlZ?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Footer Credit */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-center mt-16"
        >
          <motion.p 
            className={`text-sm font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Artwork & Website by{' '}
            <motion.a
              href={biography.designer.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary-500 hover:text-primary-400 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {biography.designer.name}
            </motion.a>
          </motion.p>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default MusicPage;
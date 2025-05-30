import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { biography } from '../data/biography';
import AudioVisualizer from '../components/AudioVisualizer';
import MusicCard from '../components/MusicCard';
import { ArrowRight, Music2 } from 'lucide-react';

const MusicPage = () => {
  const { isDarkMode } = useTheme();
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const musicLinks = [
    {
      title: "Example Track 1",
      description: "Drop your Spotify/Apple Music link here",
      imageUrl: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1600",
      link: "https://open.spotify.com/track/your-track-id"
    },
    {
      title: "Example Track 2",
      description: "Another track link here",
      imageUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1600",
      link: "https://music.apple.com/us/album/your-track-id"
    },
    {
      title: "Example Track 3",
      description: "Your latest release",
      imageUrl: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1600",
      link: "https://open.spotify.com/track/your-track-id"
    },
    {
      title: "Example Track 4",
      description: "Featured collaboration",
      imageUrl: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600",
      link: "https://music.apple.com/us/album/your-track-id"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const arrowVariants = {
    rest: { x: 0 },
    hover: {
      x: 10,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.3
            }}
            className="inline-block mb-6"
          >
            <Music2
              size={48}
              className={`${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`}
            />
          </motion.div>

          <motion.h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Latest Releases
          </motion.h1>

          <motion.p
            className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Experience the sound of SUNAME
          </motion.p>

          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <AudioVisualizer
              height={60}
              barCount={24}
              color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
            />
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {musicLinks.map((track, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative"
            >
              <MusicCard
                title={track.title}
                description={track.description}
                imageUrl={track.imageUrl}
                link={track.link}
                isPlaying={playingTrack === index}
                onTogglePlay={() => {
                  if (playingTrack === index) {
                    setPlayingTrack(null);
                  } else {
                    setPlayingTrack(index);
                  }
                }}
              />
              <AnimatePresence>
                {hoveredCard === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -right-4 top-1/2 transform -translate-y-1/2"
                  >
                    <motion.div
                      variants={arrowVariants}
                      initial="rest"
                      animate="hover"
                    >
                      <ArrowRight className={`w-8 h-8 ${
                        isDarkMode ? 'text-primary-400' : 'text-primary-600'
                      }`} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <motion.div
            className={`rounded-2xl p-6 ${
              isDarkMode
                ? 'bg-gray-900/60 border border-gray-800'
                : 'bg-white/80 border border-gray-200'
            } backdrop-blur-sm shadow-xl overflow-hidden`}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="absolute inset-0 -z-10"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(139,92,246,0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.15) 0%, transparent 50%)',
                ],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/artist/1iSs6VT8Pi1pQ85ffnrLlZ?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>

        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className={`text-sm font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Artwork & Website by{' '}
            <motion.a
              href={biography.designer.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary-500 hover:text-primary-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {biography.designer.name}
            </motion.a>
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default MusicPage;
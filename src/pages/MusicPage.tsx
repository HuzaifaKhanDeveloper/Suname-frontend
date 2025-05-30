import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Assuming useTheme, biography, AudioVisualizer, and MusicCard are available in the context/components folder
// For demonstration, I'll mock useTheme, biography, AudioVisualizer, and MusicCard
import { ArrowRight, Music2 } from 'lucide-react'; // Assuming lucide-react is available

// Mock for useTheme
const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode for better contrast in example
  return { isDarkMode, setIsDarkMode };
};

// Mock for biography
const biography = {
  designer: {
    name: "AI Designer",
    twitter: "https://twitter.com/aid_designer"
  }
};

// Mock for AudioVisualizer
const AudioVisualizer = ({ height, barCount, color }) => {
  return (
    <div
      className="w-full flex justify-center items-end rounded-lg overflow-hidden"
      style={{ height: `${height}px`, backgroundColor: 'rgba(0,0,0,0.1)' }}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 mx-0.5 rounded-t-sm"
          style={{ backgroundColor: color }}
          initial={{ scaleY: 0.1, opacity: 0.5 }}
          animate={{ scaleY: [0.1, Math.random() * 0.8 + 0.2, 0.1], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: Math.random() * 1.5 + 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.05
          }}
        />
      ))}
    </div>
  );
};

// Mock for MusicCard
const MusicCard = ({ title, description, imageUrl, link, isPlaying, onTogglePlay }) => {
  const { isDarkMode } = useTheme();
  return (
    <motion.div
      className={`relative flex flex-col md:flex-row items-center p-4 rounded-2xl shadow-lg transition-all duration-300
        ${isDarkMode ? 'bg-gray-800/70 text-white border border-gray-700' : 'bg-white/70 text-gray-900 border border-gray-200'}
        backdrop-blur-sm`}
      whileHover={{ scale: 1.03, boxShadow: isDarkMode ? "0 10px 20px rgba(0,0,0,0.4)" : "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-24 h-24 rounded-lg object-cover shadow-md"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/96x96/cccccc/333333?text=No+Image`; }}
        />
      </div>
      <div className="flex-grow text-center md:text-left">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{description}</p>
        <div className="mt-3 flex justify-center md:justify-start space-x-3">
          <motion.button
            onClick={onTogglePlay}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${isPlaying ? 'bg-primary-600 text-white' : 'bg-primary-500 text-white hover:bg-primary-600'}
              focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-75`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </motion.button>
          <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Listen
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};


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
    },
    {
      title: "Example Track 5",
      description: "A deep cut from the archives",
      imageUrl: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1600",
      link: "https://open.spotify.com/track/your-track-id"
    },
    {
      title: "Example Track 6",
      description: "Live performance recording",
      imageUrl: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=1600",
      link: "https://music.apple.com/us/album/your-track-id"
    },
    {
      title: "Example Track 7",
      description: "Remix by a guest artist",
      imageUrl: "https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1600",
      link: "https://open.spotify.com/track/your-track-id"
    },
    {
      title: "Example Track 8",
      description: "A chill instrumental piece",
      imageUrl: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
      x: [0, 10, 0, 10, 0], // Arrow moves right, then back, then right again
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: Infinity, // Repeat the animation
        repeatType: "loop"
      }
    }
  };

  const backgroundGradientVariants = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      backgroundSize: ['200% 200%', '200% 200%', '200% 200%'],
    },
    transition: {
      duration: 25,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen pt-24 pb-12 px-4 relative overflow-hidden
        ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}
    >
      {/* Background animated gradient overlay */}
      <motion.div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: isDarkMode
            ? 'linear-gradient(270deg, #8B5CF6, #EC4899, #6366F1, #8B5CF6)'
            : 'linear-gradient(270deg, #A78BFA, #F9A8D4, #818CF8, #A78BFA)',
          backgroundSize: '200% 200%',
        }}
        animate={backgroundGradientVariants.animate}
        transition={backgroundGradientVariants.transition}
      />

      <div className="max-w-6xl mx-auto relative z-10">
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

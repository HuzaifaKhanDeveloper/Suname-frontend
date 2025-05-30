import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { biography } from '../data/biography';
import {
  Share2,
  Download,
  MoreHorizontal,
  Headphones,
  Music,
  Eye,
  Link,
  ExternalLink // Added ExternalLink icon for SoundCloud button
} from 'lucide-react';

const MusicPage = () => {
  const { isDarkMode } = useTheme();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const moreOptionsRef = useRef(null);

  // Effect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target)) {
        setShowMoreOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreOptionsRef]);


  const soundCloudLinks = [
    "https://soundcloud.com/suname/midnight-echoes",
    "https://soundcloud.com/suname/neon-dreams",
    "https://soundcloud.com/suname/urban-pulse",
    "https://soundcloud.com/suname/ethereal-waves",
    "https://soundcloud.com/suname/digital-rain",
    "https://soundcloud.com/suname/cosmic-drift"
  ];

  const tracks = [
    {
      id: 1,
      title: "Midnight Echoes",
      artist: "SUNAME",
      album: "Digital Dreams",
      duration: "3:24",
      releaseDate: "2024-12-15",
      plays: "847,592",
      genre: "Electronic",
      imageUrl: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800",
      waveform: Array.from({ length: 100 }, (_, i) => Math.sin(i * 0.1) * 0.5 + Math.random() * 0.3)
    },
    {
      id: 2,
      title: "Neon Dreams",
      artist: "SUNAME",
      album: "Digital Dreams",
      duration: "4:12",
      releaseDate: "2024-11-28",
      plays: "1,203,847",
      genre: "Synthwave",
      imageUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800",
      waveform: Array.from({ length: 100 }, (_, i) => Math.cos(i * 0.15) * 0.4 + Math.random() * 0.4)
    },
    {
      id: 3,
      title: "Urban Pulse",
      artist: "SUNAME ft. Nova",
      album: "City Lights EP",
      duration: "3:56",
      releaseDate: "2024-10-10",
      plays: "692,134",
      genre: "Future Bass",
      imageUrl: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=800",
      waveform: Array.from({ length: 100 }, (_, i) => Math.sin(i * 0.08) * 0.6 + Math.random() * 0.2)
    },
    {
      id: 4,
      title: "Ethereal Waves",
      artist: "SUNAME",
      album: "Ambient Sessions",
      duration: "5:18",
      releaseDate: "2024-09-22",
      plays: "434,921",
      genre: "Ambient",
      imageUrl: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      waveform: Array.from({ length: 100 }, (_, i) => Math.sin(i * 0.05) * 0.3 + Math.random() * 0.5)
    },
    {
      id: 5,
      title: "Digital Rain",
      artist: "SUNAME",
      album: "Cyberpunk Nights",
      duration: "4:07",
      releaseDate: "2024-08-14",
      plays: "1,847,293",
      genre: "Cyberpunk",
      imageUrl: "https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=800",
      waveform: Array.from({ length: 100 }, (_, i) => Math.sin(i * 0.12) * 0.7 + Math.random() * 0.3)
    },
    {
      id: 6,
      title: "Cosmic Drift",
      artist: "SUNAME x Stellar",
      album: "Space Odyssey",
      duration: "6:42",
      releaseDate: "2024-07-01",
      plays: "523,847",
      genre: "Space Ambient",
      imageUrl: "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=800",
      waveform: Array.from({ length: 100 }, (_, i) => Math.cos(i * 0.03) * 0.4 + Math.random() * 0.4)
    }
  ];

  const handleTrackClick = (trackId) => {
    // Opens the SoundCloud link directly as play functionality is removed
    const randomLink = soundCloudLinks[Math.floor(Math.random() * soundCloudLinks.length)];
    window.open(randomLink, '_blank');
  };

  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
  };

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    try {
      // Use document.execCommand('copy') for clipboard operations in iframes
      const tempInput = document.createElement('textarea');
      tempInput.value = currentUrl;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 2000); // Hide message after 2 seconds
      setShowMoreOptions(false); // Close dropdown after action
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Optionally, show a fallback message or handle error
    }
  };

  const handleShare = async () => {
    const shareData = {
        title: 'Check out this music page!',
        text: 'Listen to amazing tracks by SUNAME.',
        url: window.location.href,
    };
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback for browsers that do not support navigator.share
            console.log('Web Share API not supported. Copying link instead.');
            handleCopyLink(); // Fallback to copy link
        }
        setShowMoreOptions(false); // Close dropdown after action
    } catch (err) {
        console.error('Error sharing:', err);
    }
  };

  // Function to open a random SoundCloud link
  const handleListenInSoundCloud = () => {
    const randomLink = soundCloudLinks[Math.floor(Math.random() * soundCloudLinks.length)];
    window.open(randomLink, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden"
    >
      {/* Your Original Animated Background */}
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

      {/* Header */}
      <motion.div
        className={`${isDarkMode ? 'bg-gray-900/60 border border-gray-800' : 'bg-white/80 border border-gray-200'} backdrop-blur-sm rounded-3xl shadow-2xl pt-8 pb-16 px-6 mb-8`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="SUNAME"
                className="w-64 h-64 rounded-2xl shadow-2xl object-cover"
              />
              {/* Removed play button overlay */}
            </motion.div>

            <div className="flex-1 text-center lg:text-left">
              <motion.p
                className={`text-sm font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-600'} mb-2`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                VERIFIED ARTIST
              </motion.p>

              <motion.h1
                className={`text-5xl lg:text-7xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                SUNAME
              </motion.h1>

              <motion.div
                className={`flex flex-wrap justify-center lg:justify-start gap-6 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="flex items-center gap-1">
                  <Headphones className="w-4 h-4" />
                  4.2M monthly listeners
                </span>
                {/* Removed Heart icon and follower count */}
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {/* Added Eye icon for views */}
                  1.5M views
                </span>
                <span className="flex items-center gap-1">
                  <Music className="w-4 h-4" />
                  Electronic • Synthwave
                </span>
              </motion.div>

              <motion.div
                className="flex justify-center lg:justify-start gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Follow/Following Button */}
                <motion.button
                  onClick={handleFollowToggle}
                  className={`${isFollowing ? 'bg-purple-600 text-white shadow-lg' : isDarkMode ? 'border-gray-600 text-gray-300 hover:text-white hover:shadow-md' : 'border-gray-400 text-gray-600 hover:text-gray-900 hover:shadow-md'} border-2 px-6 py-3 rounded-full font-semibold`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    backgroundColor: isFollowing ? 'rgb(147, 51, 234)' : (isDarkMode ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)'),
                    color: isFollowing ? 'rgb(255, 255, 255)' : (isDarkMode ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)')
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </motion.button>

                {/* Listen in SoundCloud button */}
                <motion.button
                  onClick={handleListenInSoundCloud}
                  className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:text-white' : 'border-gray-400 text-gray-600 hover:text-gray-900'} border-2 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Listen in SoundCloud
                </motion.button>

                {/* More Options Dropdown */}
                <div className="relative" ref={moreOptionsRef}>
                  <motion.button
                    onClick={() => setShowMoreOptions(prev => !prev)}
                    className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-3 transition-colors`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MoreHorizontal className="w-6 h-6" />
                  </motion.button>

                  <AnimatePresence>
                    {showMoreOptions && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 z-10 border origin-top-right`}
                      >
                        <motion.button
                          onClick={handleCopyLink}
                          className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-md`}
                          whileHover={{ backgroundColor: isDarkMode ? '#374151' : '#F3F4F6', scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.1 }}
                        >
                          <Link className="w-4 h-4" />
                          Copy Link
                        </motion.button>
                        <motion.button
                          onClick={handleShare}
                          className={`flex items-center gap-2 w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} rounded-md`}
                          whileHover={{ backgroundColor: isDarkMode ? '#374151' : '#F3F4F6', scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.1 }}
                        >
                          <Share2 className="w-4 h-4" />
                          Share
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
              <AnimatePresence>
                {showCopyMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 text-center text-sm font-medium text-green-500"
                  >
                    Link copied to clipboard!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Track List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          className={`${isDarkMode ? 'bg-gray-900/60 border border-gray-800' : 'bg-white/80 border border-gray-200'} backdrop-blur-sm rounded-3xl shadow-2xl p-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
            Popular
          </h2>

          <div className="space-y-2">
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                className={`group flex items-center gap-4 p-4 rounded-lg hover:${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'} transition-all duration-200 cursor-pointer`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => handleTrackClick(track.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Track Number */}
                <div className="w-8 flex justify-center">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {index + 1}
                  </span>
                </div>

                {/* Track Image */}
                <img
                  src={track.imageUrl}
                  alt={track.title}
                  className="w-12 h-12 rounded object-cover"
                />

                {/* Track Info */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                    {track.title}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                    {track.artist}
                  </p>
                </div>

                {/* Removed Waveform Visualization */}

                {/* Play Count with Eye icon */}
                <div className={`hidden md:flex items-center gap-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} w-20`}>
                  <Eye className="w-4 h-4" />
                  {track.plays}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {/* Removed Heart button */}
                  <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} w-12`}>
                    {track.duration}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MoreHorizontal className={`w-5 h-5 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </motion.div>

        {/* Removed Player Controls */}
      </div>
    </motion.div>
  );
};

export default MusicPage;

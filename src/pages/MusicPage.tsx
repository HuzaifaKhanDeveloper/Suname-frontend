import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { biography } from '../data/biography';
import {
  Play,
  Pause,
  Heart,
  Share2,
  Download,
  MoreHorizontal,
  Clock,
  Calendar,
  Headphones,
  Volume2,
  Shuffle,
  Repeat,
  SkipBack,
  SkipForward,
  Music
} from 'lucide-react';

const MusicPage = () => {
  const { isDarkMode } = useTheme();
  const [activeTrack, setActiveTrack] = useState(null);
  const [likedTracks, setLikedTracks] = useState(new Set());
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const [volume, setVolume] = useState(75);

  // Mock audio visualization data
  const [audioData, setAudioData] = useState(Array.from({ length: 64 }, () => Math.random()));

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTrack !== null) {
        setCurrentTime(prev => (prev + 1) % 180); // 3 minute mock duration
        setAudioData(Array.from({ length: 64 }, () => Math.random() * (activeTrack !== null ? 1 : 0.1)));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTrack]);

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
    const randomLink = soundCloudLinks[Math.floor(Math.random() * soundCloudLinks.length)];
    window.open(randomLink, '_blank');
  };

  const togglePlay = (trackId) => {
    setActiveTrack(activeTrack === trackId ? null : trackId);
    setCurrentTime(0);
  };

  const toggleLike = (trackId) => {
    const newLiked = new Set(likedTracks);
    if (newLiked.has(trackId)) {
      newLiked.delete(trackId);
    } else {
      newLiked.add(trackId);
    }
    setLikedTracks(newLiked);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
              <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="bg-white/20 rounded-full p-4 backdrop-blur-sm"
                >
                  <Play className="w-8 h-8 text-white" />
                </motion.div>
              </div>
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
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  847K followers
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
                <motion.button
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5" />
                  Play
                </motion.button>

                <motion.button
                  className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:text-white' : 'border-gray-400 text-gray-600 hover:text-gray-900'} border-2 px-6 py-3 rounded-full font-semibold transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Follow
                </motion.button>

                <motion.button
                  className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-3 transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MoreHorizontal className="w-6 h-6" />
                </motion.button>
              </motion.div>
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
                {/* Track Number / Play Button */}
                <div className="w-8 flex justify-center">
                  <span className={`group-hover:hidden text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {index + 1}
                  </span>
                  <motion.button
                    className="hidden group-hover:block"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(track.id);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {activeTrack === track.id ? (
                      <Pause className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                    ) : (
                      <Play className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
                    )}
                  </motion.button>
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

                {/* Waveform Visualization */}
                <div className="hidden lg:flex items-center gap-1 w-32">
                  {track.waveform.slice(0, 40).map((height, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 bg-gradient-to-t ${
                        activeTrack === track.id
                          ? 'from-green-500 to-green-300'
                          : isDarkMode ? 'from-gray-700 to-gray-600' : 'from-gray-400 to-gray-300'
                      } rounded-full`}
                      style={{
                        height: `${Math.max(2, height * 20)}px`,
                      }}
                      animate={activeTrack === track.id ? {
                        height: [`${Math.max(2, height * 20)}px`, `${Math.max(2, height * 25)}px`, `${Math.max(2, height * 20)}px`]
                      } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  ))}
                </div>

                {/* Play Count */}
                <div className={`hidden md:block text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} w-20`}>
                  {track.plays}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(track.id);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        likedTracks.has(track.id)
                          ? 'text-green-500 fill-green-500'
                          : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                      } transition-colors`}
                    />
                  </motion.button>

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

        {/* Player Controls (when active) */}
        <AnimatePresence>
          {activeTrack && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t backdrop-blur-lg p-4 z-50`}
            >
              <div className="max-w-7xl mx-auto flex items-center gap-4">
                {/* Current Track Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={tracks.find(t => t.id === activeTrack)?.imageUrl}
                    alt=""
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="min-w-0">
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                      {tracks.find(t => t.id === activeTrack)?.title}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                      {tracks.find(t => t.id === activeTrack)?.artist}
                    </p>
                  </div>
                  <Heart className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-2`} />
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                  <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    <Shuffle className="w-5 h-5" />
                  </button>
                  <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <motion.button
                    className="bg-white text-black rounded-full p-2 hover:scale-105"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => togglePlay(activeTrack)}
                  >
                    {activeTrack ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </motion.button>
                  <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    <SkipForward className="w-5 h-5" />
                  </button>
                  <button className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    <Repeat className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 flex-1">
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {formatTime(currentTime)}
                  </span>
                  <div className={`flex-1 h-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full overflow-hidden`}>
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(currentTime / 180) * 100}%` }}
                    />
                  </div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    3:00
                  </span>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <Volume2 className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  <div className={`w-20 h-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full`}>
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${volume}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MusicPage;

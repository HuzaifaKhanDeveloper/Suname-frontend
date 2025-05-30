import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { biography } from '../data/biography';
import {
  Share2,
  MoreHorizontal,
  Headphones,
  Music,
  Eye,
  Link,
  ExternalLink,
  ListPlus,
  Flag
} from 'lucide-react';
import { FaSoundcloud, FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaSpotify, FaApple } from 'react-icons/fa';

const MusicPage = () => {
  const { isDarkMode } = useTheme();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [openTrackOptionsId, setOpenTrackOptionsId] = useState(null);
  const mainMoreOptionsRef = useRef(null);
  const trackOptionsRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mainMoreOptionsRef.current && !mainMoreOptionsRef.current.contains(event.target)) {
        setShowMoreOptions(false);
      }

      if (openTrackOptionsId !== null && trackOptionsRefs.current[openTrackOptionsId]) {
        if (!trackOptionsRefs.current[openTrackOptionsId].contains(event.target)) {
          setOpenTrackOptionsId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mainMoreOptionsRef, trackOptionsRefs, openTrackOptionsId]);

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
      soundCloudLink: "https://soundcloud.com/suname/midnight-echoes",
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
      soundCloudLink: "https://soundcloud.com/suname/neon-dreams",
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
      soundCloudLink: "https://soundcloud.com/suname/urban-pulse",
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
      soundCloudLink: "https://soundcloud.com/suname/ethereal-waves",
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
      soundCloudLink: "https://soundcloud.com/suname/digital-rain",
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
      soundCloudLink: "https://soundcloud.com/suname/cosmic-drift"
      ,waveform: Array.from({ length: 100 }, (_, i) => Math.cos(i * 0.03) * 0.4 + Math.random() * 0.4)
    }
  ];

  const socialMediaLinks = [
    { icon: FaSoundcloud, url: biography.socials.soundcloud, name: 'SoundCloud' },
    { icon: FaInstagram, url: biography.socials.instagram, name: 'Instagram' },
    { icon: FaTwitter, url: biography.socials.twitter, name: 'Twitter' },
    { icon: FaTiktok, url: biography.socials.tiktok, name: 'TikTok' },
    { icon: FaYoutube, url: biography.socials.youtube, name: 'YouTube' },
    { icon: FaSpotify, url: biography.socials.spotify, name: 'Spotify' },
    { icon: FaApple, url: biography.socials.appleMusic, name: 'Apple Music' }
  ];

  const handleTrackClick = (trackId) => {
    if (openTrackOptionsId !== null) {
      setOpenTrackOptionsId(null);
    }
    const track = tracks.find(t => t.id === trackId);
    if (track && track.soundCloudLink) {
      window.open(track.soundCloudLink, '_blank');
    } else {
      console.warn('SoundCloud link not found for this track.');
    }
  };

  const handleFollowToggle = () => {
    setIsFollowing(prev => !prev);
  };

  const handleCopyLink = (linkToCopy) => {
    try {
      const tempInput = document.createElement('textarea');
      tempInput.value = linkToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 2000);
      setShowMoreOptions(false);
      setOpenTrackOptionsId(null);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async (linkToShare, title, text) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: linkToShare,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
        handleCopyLink(linkToShare);
      }
    } else {
      handleCopyLink(linkToShare);
    }
    setShowMoreOptions(false);
    setOpenTrackOptionsId(null);
  };

  const handleListenInSoundCloud = () => {
    const randomLink = tracks[Math.floor(Math.random() * tracks.length)].soundCloudLink;
    window.open(randomLink, '_blank');
  };

  const handleAddToPlaylist = (trackTitle) => {
    console.log(`Adding "${trackTitle}" to playlist (mock action)...`);
    setOpenTrackOptionsId(null);
  };

  const handleReportTrack = (trackTitle) => {
    console.log(`Reporting "${trackTitle}" (mock action)...`);
    setOpenTrackOptionsId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <AnimatePresence>
        {showCopyMessage && (
          <motion.div
            key="copy-notification"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-md shadow-lg font-semibold text-white bg-green-600 w-full max-w-xs sm:max-w-sm text-center`}
          >
            Link Copied!
          </motion.div>
        )}
      </AnimatePresence>

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

      <motion.div
        className={`${isDarkMode ? 'bg-gray-900/60 border border-gray-800' : 'bg-white/80 border border-gray-200'} backdrop-blur-sm rounded-3xl shadow-2xl pt-8 pb-16 px-4 sm:px-6 mb-8`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          scale: 1.005,
          boxShadow: isDarkMode ? '0 15px 30px rgba(0,0,0,0.6)' : '0 15px 30px rgba(0,0,0,0.2)'
        }}
        whileTap={{ scale: 0.995 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.05, rotateZ: 2 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <img
                src="https://i1.sndcdn.com/avatars-GkI4ZmDLFcspabfy-UDuvjA-t500x500.jpg"
                alt="SUNAME"
                className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl shadow-2xl object-cover"
              />
            </motion.div>

            <div className="flex-1 text-center lg:text-left">
              <motion.p
                className={`text-sm font-medium ${isDarkMode ? 'text-purple-300' : 'text-purple-600'} mb-2`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ease: "easeOut" }}
              >
                VERIFIED ARTIST
              </motion.p>

              <motion.h1
                className={`text-4xl sm:text-5xl lg:text-7xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ease: "easeOut" }}
              >
                SUNAME
              </motion.h1>

              <motion.div
                className={`flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ease: "easeOut" }}
              >
                <span className="flex items-center gap-1">
                  <Headphones className="w-4 h-4" />
                  4.2M monthly listeners
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  1.5M views
                </span>
                <span className="flex items-center gap-1">
                  <Music className="w-4 h-4" />
                  Electronic • Synthwave
                </span>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, ease: "easeOut" }}
              >
                <motion.button
                  onClick={handleFollowToggle}
                  className={`${isFollowing ? 'bg-purple-600 text-white shadow-lg' : isDarkMode ? 'border-gray-600 text-gray-300 hover:text-white hover:shadow-md' : 'border-gray-400 text-gray-600 hover:text-gray-900 hover:shadow-md'} border-2 px-6 py-3 rounded-full font-semibold text-sm sm:text-base`}
                  whileHover={{ scale: 1.1, y: -5, boxShadow: isFollowing ? '0 10px 25px rgba(147, 51, 234, 0.6)' : (isDarkMode ? '0 8px 16px rgba(0,0,0,0.5)' : '0 8px 16px rgba(0,0,0,0.3)') }}
                  whileTap={{ scale: 0.9, y: 0 }}
                  animate={{
                    backgroundColor: isFollowing ? 'rgb(147, 51, 234)' : (isDarkMode ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)'),
                    color: isFollowing ? 'rgb(255, 255, 255)' : (isDarkMode ? 'rgb(209, 213, 219)' : 'rgb(75, 85, 99)')
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </motion.button>

                <motion.button
                  onClick={handleListenInSoundCloud}
                  className={`${isDarkMode ? 'border-gray-600 text-gray-300 hover:text-white' : 'border-gray-400 text-gray-600 hover:text-gray-900'} border-2 px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-md text-sm sm:text-base`}
                  whileHover={{ scale: 1.1, y: -5, boxShadow: isDarkMode ? '0 8px 16px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.9, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Listen in SoundCloud
                </motion.button>

                <div className="relative" ref={mainMoreOptionsRef}>
                  <motion.button
                    onClick={() => setShowMoreOptions(prev => !prev)}
                    className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-3 transition-colors rounded-full flex items-center justify-center`}
                    whileHover={{ scale: 1.25, rotate: 360, backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.6)' : 'rgba(243, 244, 246, 0.6)' }}
                    whileTap={{ scale: 0.8, rotate: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <MoreHorizontal className="w-6 h-6" />
                  </motion.button>

                  <AnimatePresence>
                    {showMoreOptions && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-48 rounded-xl shadow-2xl py-2 z-10 border origin-top-right sm:origin-top-center overflow-hidden`}
                      >
                        <motion.button
                          onClick={() => handleCopyLink(window.location.href)}
                          className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-gray-200 hover:bg-purple-700 hover:text-white' : 'text-gray-800 hover:bg-purple-100 hover:text-purple-800'} transition-colors duration-200`}
                          whileHover={{ x: 10, backgroundColor: isDarkMode ? '#6B46C1' : '#EDE9FE', color: isDarkMode ? '#FFFFFF' : '#6B46C1' }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                          <Link className="w-4 h-4" />
                          Copy Link
                        </motion.button>
                        <motion.button
                          onClick={() => handleShare(window.location.href, 'Check out this music page!', 'Listen to amazing tracks by SUNAME.')}
                          className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-gray-200 hover:bg-purple-700 hover:text-white' : 'text-gray-800 hover:bg-purple-100 hover:text-purple-800'} transition-colors duration-200`}
                          whileHover={{ x: 10, backgroundColor: isDarkMode ? '#6B46C1' : '#EDE9FE', color: isDarkMode ? '#FFFFFF' : '#6B46C1' }}
                          whileTap={{ scale: 0.96 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                        >
                          <Share2 className="w-4 h-4" />
                          Share
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, ease: "easeOut" }}
              >
                {socialMediaLinks.map(({ icon: Icon, url, name }, index) => (
                  <motion.a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center p-2 sm:p-3 rounded-lg shadow-md transition-colors duration-300
                      ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}
                    `}
                    whileHover={{
                      scale: 1.05,
                      y: -3,
                      rotate: 2,
                      boxShadow: isDarkMode ? '0 8px 16px rgba(0,0,0,0.4)' : '0 8px 16px rgba(0,0,0,0.2)',
                      backgroundColor: isDarkMode ? '#374151' : '#E5E7EB'
                    }}
                    whileTap={{ scale: 0.95, y: 0, rotate: 0 }}
                  >
                    <motion.span
                      className="inline-block mr-1 sm:mr-2 text-xl sm:text-2xl"
                      style={{
                        color: isDarkMode ? '#FFFFFF' : '#333333',
                      }}
                      whileHover={{
                        scale: 1.2,
                        rotate: 15,
                        color: isDarkMode ? '#A78BFA' : '#F97316',
                      }}
                      transition={{
                        color: { duration: 0.4, ease: "easeOut" },
                        scale: { type: "spring", stiffness: 400, damping: 30 },
                        rotate: { duration: 0.3, ease: "easeOut" }
                      }}
                    >
                      <Icon />
                    </motion.span>
                    <span className={`text-sm sm:text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {name}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className={`${isDarkMode ? 'bg-gray-900/60 border border-gray-800' : 'bg-white/80 border border-gray-200'} backdrop-blur-sm rounded-3xl shadow-2xl p-4 sm:p-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ease: "easeOut" }}
          whileHover={{
            scale: 1.005,
            boxShadow: isDarkMode ? '0 15px 30px rgba(0,0,0,0.6)' : '0 15px 30px rgba(0,0,0,0.2)'
          }}
          whileTap={{ scale: 0.995 }}
        >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, ease: "easeOut" }}
        >
          <h2 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, ease: "easeOut" }}
          >
            Popular
          </h2>

          <div className="space-y-2">
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                className={`group flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg hover:${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100'} transition-all duration-200 cursor-pointer`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, ease: "easeOut" }}
                onClick={() => handleTrackClick(track.id)}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                  boxShadow: isDarkMode ? '0 6px 12px rgba(0,0,0,0.4)' : '0 6px 12px rgba(0,0,0,0.2)',
                  backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.7)' : 'rgba(243, 244, 246, 0.7)'
                }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="w-8 flex-shrink-0 flex justify-center">
                  <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {index + 1}
                  </span>
                </div>

                <motion.img
                  src={track.imageUrl}
                  alt={track.title}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />

                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate text-sm sm:text-base`}>
                    {track.title}
                  </h3>
                  <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                    {track.artist}
                  </p>
                </div>

                <div className={`hidden sm:flex items-center gap-1 text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} w-20 flex-shrink-0`}>
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  {track.plays}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} w-12 text-right sm:text-left`}>
                    {track.duration}
                  </span>

                  <div className="relative" ref={el => trackOptionsRefs.current[track.id] = el}>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenTrackOptionsId(openTrackOptionsId === track.id ? null : track.id);
                      }}
                      className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-2 transition-colors rounded-full flex items-center justify-center`}
                      whileHover={{ scale: 1.2, rotate: 360, backgroundColor: isDarkMode ? 'rgba(55, 65, 81, 0.6)' : 'rgba(243, 244, 246, 0.6)' }}
                      whileTap={{ scale: 0.8, rotate: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.button>

                    <AnimatePresence>
                      {openTrackOptionsId === track.id && (
                        <motion.div
                          key={track.id}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} absolute right-0 mt-2 w-48 rounded-xl shadow-2xl py-2 z-20 border origin-top-right overflow-hidden`}
                        >
                          <motion.button
                            onClick={() => handleCopyLink(track.soundCloudLink)}
                            className={`flex items-center gap-3 w-full text-left px-4 py-3 text-sm font-medium ${isDarkMode ? 'text-gray-200 hover:bg-purple-700 hover:text-white' : 'text-gray-800 hover:bg-purple-100 hover:text-purple-800'} transition-colors duration-200`}
                            whileHover={{ x: 10, backgroundColor: isDarkMode ? '#6B46C1' : '#EDE9FE', color: isDarkMode ? '#FFFFFF' : '#6B46C1' }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                          >
                            <Link className="w-4 h-4" />
                            Copy Track Link
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MusicPage;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSoundcloud, FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaSpotify, FaApple } from 'react-icons/fa';
import { Music2, Info, Calendar, Mail, MapPin, Mic } from 'lucide-react';
import { biography } from '../data/biography';
import { useTheme } from '../context/ThemeContext';

const EPKPage = () => {
  const { isDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'bio',
      icon: Info,
      title: 'Biography',
      content: biography.fullBio
    },
    {
      id: 'genres',
      icon: Music2,
      title: 'Genres',
      content: biography.genres ? biography.genres.join(', ') : 'N/A'
    },
    {
      id: 'location',
      icon: MapPin,
      title: 'Location',
      content: biography.location
    },
    {
      id: 'contact',
      icon: Mail,
      title: 'Contact',
      content: `Management: ${biography.emails.management}\nBookings: ${biography.emails.bookings}`
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Electronic Press Kit
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
          {}
          <motion.div
            className="md:col-span-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-4 sticky top-24">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                    className={`w-full p-4 rounded-xl flex items-center space-x-3 transition-all ${
                      activeSection === section.id
                        ? isDarkMode
                          ? 'bg-primary-600 text-white'
                          : 'bg-primary-500 text-white'
                        : isDarkMode
                          ? 'bg-gray-900/60 text-gray-300 hover:bg-gray-800'
                          : 'bg-white/80 text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{section.title}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {}
          <div className="md:col-span-9">
            {}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { src: '/images/artist_main.jpg', alt: 'SUNAME Main' },
                { src: '/images/artist_beachball.jpg', alt: 'SUNAME Beachball' },
                { src: '/images/artist_orange.jpg', alt: 'SUNAME Orange' },
                { src: '/images/darkPhoto1.jpg', alt: 'SUNAME Dark Photo 1' },
                { src: '/images/darkPhoto2.jpg', alt: 'SUNAME Dark Photo 2' },
                { src: '/images/darkPhoto3.jpg', alt: 'SUNAME Dark Photo 3' }
              ].map((photo, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: isDarkMode
                        ? 'linear-gradient(to top, rgba(30,61,89,0.8), transparent)'
                        : 'linear-gradient(to top, rgba(255,127,80,0.8), transparent)'
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {}
            <AnimatePresence mode="wait">
              {activeSection && (
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-6 rounded-xl mb-8 ${
                    isDarkMode
                      ? 'bg-gray-900/60 text-white'
                      : 'bg-white/80 text-gray-900'
                  }`}
                >
                  <h2 className="text-2xl font-bold mb-4">
                    {sections.find(s => s.id === activeSection)?.title}
                  </h2>
                  <p className="whitespace-pre-line">
                    {sections.find(s => s.id === activeSection)?.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: FaSoundcloud, url: biography.socials.soundcloud, label: 'SoundCloud' },
                { icon: FaInstagram, url: biography.socials.instagram, label: 'Instagram' },
                { icon: FaTwitter, url: biography.socials.twitter, label: 'Twitter' },
                { icon: FaTiktok, url: biography.socials.tiktok, label: 'TikTok' },
                { icon: FaYoutube, url: biography.socials.youtube, label: 'YouTube' },
                { icon: FaSpotify, url: biography.socials.spotify, label: 'Spotify' },
                { icon: FaApple, url: biography.socials.appleMusic, label: 'Apple Music' }
              ].map(({ icon: Icon, url, label }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center space-x-2 p-4 rounded-xl ${
                    isDarkMode
                      ? 'bg-gray-900/60 hover:bg-gray-800 text-white'
                      : 'bg-white/80 hover:bg-gray-100 text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="text-2xl" />
                  <span className="font-medium">{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {}
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
            <a
              href={biography.designer.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary-500 hover:text-primary-400"
            >
              {biography.designer.name}
            </a>
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default EPKPage;
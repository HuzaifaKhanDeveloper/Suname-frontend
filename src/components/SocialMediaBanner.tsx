import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Youtube, Music } from 'lucide-react';
import { biography } from '../data/biography';
import { useTheme } from '../context/ThemeContext';

const SocialMediaBanner: React.FC = () => {
  const { isDarkMode } = useTheme();

  const socialIcons = {
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    tiktok: Music,
  };

  return (
    <motion.div
      className={`fixed bottom-0 left-0 right-0 p-4 ${
        isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'
      } backdrop-blur-sm z-40`}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="container mx-auto flex justify-center space-x-6">
        {Object.entries(biography.socials).map(([platform, url]) => {
          const Icon = socialIcons[platform as keyof typeof socialIcons] || Music;
          return (
            <motion.a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                isDarkMode 
                  ? 'hover:bg-gray-800' 
                  : 'hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.2, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon 
                size={24} 
                className={isDarkMode ? 'text-white' : 'text-gray-900'} 
              />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SocialMediaBanner;
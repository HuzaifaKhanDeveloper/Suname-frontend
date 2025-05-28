import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Pause } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';
import { useTheme } from '../context/ThemeContext';

interface MusicCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  className?: string;
}

const MusicCard: React.FC<MusicCardProps> = ({
  title,
  description,
  imageUrl = 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600',
  link,
  isPlaying = false,
  onTogglePlay,
  className = '',
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div 
      className={`relative overflow-hidden group rounded-2xl ${
        isDarkMode 
          ? 'bg-gray-900/60 border border-gray-800' 
          : 'bg-white/80 border border-gray-200'
      } backdrop-blur-sm ${className}`}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        rotate: [0, 1, -1, 0],
        transition: {
          rotate: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-30"
        animate={{ 
          background: [
            'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(139,92,246,0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.3) 0%, transparent 50%)',
          ],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Background image with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex-1">
          <motion.h3 
            className={`text-xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h3>
          
          {description && (
            <motion.p 
              className={`text-sm mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          {/* Audio visualization */}
          <div className="flex-1">
            {isPlaying && (
              <AudioVisualizer 
                height={30} 
                barCount={6} 
                isCompact={true}
                color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
              />
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-2">
            <motion.button
              className={`p-3 rounded-full ${
                isDarkMode 
                  ? 'bg-primary-600 hover:bg-primary-500' 
                  : 'bg-primary-500 hover:bg-primary-400'
              } text-white`}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -10, 10, 0],
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                rotate: {
                  duration: 0.3,
                  ease: "easeInOut"
                }
              }}
              onClick={onTogglePlay}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </motion.button>
            
            {link && (
              <motion.a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-200 hover:bg-gray-300'
                } ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, 10, -10, 0],
                }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  rotate: {
                    duration: 0.3,
                    ease: "easeInOut"
                  }
                }}
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          whileHover={{
            backgroundImage: [
              'linear-gradient(to top, rgba(0,0,0,0.2), transparent)',
              'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
              'linear-gradient(to top, rgba(0,0,0,0.2), transparent)',
            ]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Floating particles effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={false}
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 70%, rgba(139,92,246,0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

export default MusicCard;
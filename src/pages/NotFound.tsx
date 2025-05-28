import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Music2 } from 'lucide-react';
import AudioVisualizer from '../components/AudioVisualizer';

const NotFound: React.FC = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.title = 'Page Not Found | SUNAME';
  }, []);

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center justify-between px-4 pt-20 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 0.2 
          }}
          className="mb-6 inline-block"
        >
          <Music2 
            size={80} 
            className={`${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} 
          />
        </motion.div>
        
        <motion.h1
          className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          404 - Page Not Found
        </motion.h1>
        
        <motion.p
          className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The frequency you're looking for seems to be out of range.
        </motion.p>
        
        <AudioVisualizer 
          height={60} 
          barCount={8} 
          className="mb-8"
          color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
        />
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/">
            <motion.button
              className={`px-6 py-3 rounded-full ${
                isDarkMode 
                  ? 'bg-primary-600 hover:bg-primary-500' 
                  : 'bg-primary-500 hover:bg-primary-400'
              } text-white flex items-center justify-center mx-auto`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="mr-2" size={18} />
              Return to Homepage
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Credit Footer */}
      <div className="text-sm text-center mt-12">
        <p className={isDarkMode ? 'text-gray-500' : 'text-gray-600'}>
          Designed & built with ❤️ by <a 
            href="https://yourwebsite.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-primary-500"
          >
            SUNAME
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default NotFound;

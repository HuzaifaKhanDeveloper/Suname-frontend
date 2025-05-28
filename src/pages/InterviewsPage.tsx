import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Play, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AudioVisualizer from '../components/AudioVisualizer';
import { biography } from '../data/biography';

const interviews = [
  {
    title: "The Future of Electronic Music",
    platform: "Music Today Podcast",
    date: "Coming Soon",
    description: "SUNAME discusses the evolution of electronic music and the WAVE movement.",
    link: "#"
  },
  {
    title: "Behind the Beats",
    platform: "DJ Magazine",
    date: "Coming Soon",
    description: "An in-depth look at SUNAME's production process and musical influences.",
    link: "#"
  },
  {
    title: "Rising Stars in Electronic Music",
    platform: "Electronic Beat",
    date: "Coming Soon",
    description: "Featured interview about SUNAME's journey and vision for the future.",
    link: "#"
  }
];

const InterviewsPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Interviews & Media
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Get to know SUNAME through exclusive interviews and features
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          {interviews.map((interview, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`rounded-2xl p-6 ${
                isDarkMode 
                  ? 'bg-gray-900/60 border border-gray-800' 
                  : 'bg-white/80 border border-gray-200'
              } backdrop-blur-sm shadow-xl`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <Mic className={`mr-3 ${
                      isDarkMode ? 'text-primary-400' : 'text-primary-600'
                    }`} />
                    <h2 className={`text-xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {interview.title}
                    </h2>
                  </div>
                  
                  <p className={`text-sm mb-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {interview.platform} • {interview.date}
                  </p>
                  
                  <p className={`${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {interview.description}
                  </p>
                </div>

                <motion.a
                  href={interview.link}
                  className={`mt-4 md:mt-0 md:ml-6 inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={16} />
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    Coming Soon
                  </span>
                </motion.a>
              </div>

              <div className="mt-4">
                <AudioVisualizer 
                  height={30} 
                  barCount={8}
                  color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <p className={`text-lg mb-6 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            More interviews and media features coming soon.
          </p>
          
          <motion.a
            href="#"
            className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full text-white ${
              isDarkMode 
                ? 'bg-primary-600 hover:bg-primary-500' 
                : 'bg-primary-500 hover:bg-primary-400'
            } transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Press Inquiries</span>
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>

        {/* Credit */}
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

export default InterviewsPage;

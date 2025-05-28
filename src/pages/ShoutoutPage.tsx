import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Twitter, Instagram, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AudioVisualizer from '../components/AudioVisualizer';

const ShoutoutPage = () => {
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
            Design by Jamez
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Crafting Digital Experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl p-8 ${
            isDarkMode 
              ? 'bg-gray-900/60 border border-gray-800' 
              : 'bg-white/80 border border-gray-200'
          } backdrop-blur-sm shadow-xl relative overflow-hidden`}
        >
          {/* Animated background gradient */}
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

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.img
                src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg"
                alt="Jamez Design"
                className="rounded-xl shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div>
              <h2 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                About Jamez
              </h2>
              <p className={`mb-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Jamez is a visionary digital designer specializing in creating immersive web experiences 
                for artists and creative professionals. With a unique blend of technical expertise and 
                artistic vision, Jamez brings brands to life in the digital space.
              </p>

              <div className="space-y-4">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Services
                </h3>
                <ul className={`space-y-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <li>• Custom Website Design</li>
                  <li>• Brand Identity Development</li>
                  <li>• UI/UX Design</li>
                  <li>• Motion Graphics</li>
                  <li>• Digital Marketing Assets</li>
                </ul>
              </div>

              <div className="mt-8 flex space-x-4">
                <motion.a
                  href="https://twitter.com/jamezdesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Twitter className={isDarkMode ? 'text-white' : 'text-gray-900'} />
                </motion.a>
                <motion.a
                  href="https://instagram.com/jamezdesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Instagram className={isDarkMode ? 'text-white' : 'text-gray-900'} />
                </motion.a>
                <motion.a
                  href="mailto:jamez@design.com"
                  className={`p-3 rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail className={isDarkMode ? 'text-white' : 'text-gray-900'} />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className={`text-2xl font-bold mb-6 text-center ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "SUNAME",
                  description: "Artist Website",
                  image: "https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg"
                },
                {
                  title: "Wave Movement",
                  description: "Brand Identity",
                  image: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg"
                },
                {
                  title: "Digital Experience",
                  description: "Interactive Design",
                  image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  className={`rounded-xl overflow-hidden ${
                    isDarkMode 
                      ? 'bg-gray-800' 
                      : 'bg-white'
                  } shadow-lg`}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h4>
                    <p className={
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }>
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <AudioVisualizer 
              height={40} 
              barCount={12}
              color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="mailto:jamez@design.com"
            className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full text-white ${
              isDarkMode 
                ? 'bg-primary-600 hover:bg-primary-500' 
                : 'bg-primary-500 hover:bg-primary-400'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Work with Jamez</span>
            <ExternalLink size={20} />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShoutoutPage;
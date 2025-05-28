import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Music, Upload, Check } from 'lucide-react';
import { biography } from '../data/biography';
import { useTheme } from '../context/ThemeContext';
import AudioVisualizer from '../components/AudioVisualizer';

const DemosPage = () => {
  const { isDarkMode } = useTheme();
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    // Simulate upload
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Submit Your Demo
          </h1>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Ready to share your music with SUNAME?
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
          } backdrop-blur-sm shadow-xl`}
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Demo Guidelines */}
            <div className="text-left">
              <h2 className={`text-2xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Demo Guidelines
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Accepted Formats
                  </h3>
                  <ul className={`space-y-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>• WAV (preferred)</li>
                    <li>• AIFF</li>
                    <li>• MP3 (320kbps minimum)</li>
                  </ul>
                </div>

                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Requirements
                  </h3>
                  <ul className={`space-y-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li>• Original, unreleased tracks only</li>
                    <li>• High-quality mixdown</li>
                    <li>• No remix submissions</li>
                    <li>• Include track title and your name</li>
                  </ul>
                </div>

                <AudioVisualizer 
                  height={40} 
                  barCount={8}
                  color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
                />
              </div>
            </div>

            {/* Upload Section */}
            <div>
              <motion.div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`h-64 rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-6 transition-colors ${
                  dragActive
                    ? isDarkMode 
                      ? 'border-primary-400 bg-gray-800/50' 
                      : 'border-primary-500 bg-gray-100/50'
                    : isDarkMode
                      ? 'border-gray-700 hover:border-gray-600'
                      : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {uploadSuccess ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center"
                  >
                    <Check size={48} className="mx-auto mb-4 text-green-500" />
                    <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                      Demo uploaded successfully!
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <Upload 
                      size={48} 
                      className={`mb-4 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`} 
                    />
                    <p className={`text-center ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Drag and drop your demo here<br />
                      or click to browse
                    </p>
                  </>
                )}
              </motion.div>

              <p className={`mt-4 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Maximum file size: 50MB
              </p>

              <div className="mt-8">
                <motion.a
                  href={biography.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full text-white ${
                    isDarkMode 
                      ? 'bg-primary-600 hover:bg-primary-500' 
                      : 'bg-primary-500 hover:bg-primary-400'
                  } transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Submit via Platform</span>
                  <ExternalLink size={20} />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Credit section outside the grid and card, centered */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-sm font-bold text-white">
            Artwork & Website by{' '}
            <a
              href={biography.designer.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-400 underline"
            >
              {biography.designer.name}
            </a>
          </p>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default DemosPage;

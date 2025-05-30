import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { biography } from '../data/biography';
import AudioVisualizer from '../components/AudioVisualizer';
import MusicCard from '../components/MusicCard';

const MusicPage = () => {
  const { isDarkMode } = useTheme();
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);

  const musicLinks = [
    {
      title: "Example Track 1",
      description: "Drop your Spotify/Apple Music link here",
      imageUrl: "https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1600",
      link: "https://open.spotify.com/track/your-track-id"
    },
    {
      title: "Example Track 2",
      description: "Another track link here",
      imageUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1600",
      link: "https://music.apple.com/us/album/your-track-id"
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
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Music
          </h1>
          <p className={`text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Latest releases and tracks
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {musicLinks.map((track, index) => (
            <MusicCard
              key={index}
              title={track.title}
              description={track.description}
              imageUrl={track.imageUrl}
              link={track.link}
              isPlaying={playingTrack === index}
              onTogglePlay={() => {
                if (playingTrack === index) {
                  setPlayingTrack(null);
                } else {
                  setPlayingTrack(index);
                }
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className={`rounded-2xl p-6 ${
            isDarkMode
              ? 'bg-gray-900/60 border border-gray-800'
              : 'bg-white/80 border border-gray-200'
          } backdrop-blur-sm shadow-xl`}
          >
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/artist/1iSs6VT8Pi1pQ85ffnrLlZ?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>

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

export default MusicPage;
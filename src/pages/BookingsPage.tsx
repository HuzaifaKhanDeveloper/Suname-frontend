import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Music2, Disc, Headphones, Radio } from 'lucide-react';
import { FaSoundcloud, FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaSpotify, FaApple } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import AudioVisualizer from '../components/AudioVisualizer';
import { biography } from '../data/biography';

type NotificationType = 'success' | 'error';

const BookingsPage = () => {
  const { isDarkMode, isThemeLoaded } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);

  const showNotification = (message: string, type: NotificationType) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mdkgqpaz', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (response.ok) {
        showNotification('Your message has been sent', 'success');
        form.reset();
      } else {
        showNotification('Something went wrong', 'error');
      }
    } catch (error) {
      showNotification('Something went wrong', 'error');
    }

    setIsSubmitting(false);
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -10, 0],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const floatingIcons = useMemo(() => {
    return [Music2, Disc, Headphones, Radio].map((Icon) => ({
      Icon,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      rotate: Math.random() * 360,
    }));
  }, []);

  // Define positions and animations for social icons
  const socialIcons = useMemo(() => {
    return [
      { icon: FaSoundcloud, url: biography.socials.soundcloud, name: 'SoundCloud' },
      { icon: FaInstagram, url: biography.socials.instagram, name: 'Instagram' },
      { icon: FaTwitter, url: biography.socials.twitter, name: 'Twitter' },
      { icon: FaTiktok, url: biography.socials.tiktok, name: 'TikTok' },
      { icon: FaYoutube, url: biography.socials.youtube, name: 'YouTube' },
      { icon: FaSpotify, url: biography.socials.spotify, name: 'Spotify' },
      { icon: FaApple, url: biography.socials.appleMusic, name: 'Apple Music' }
    ].map((item, index) => ({
      ...item,
      // Variants for the subtle floating effect applied directly to the button
      buttonVariants: {
        animate: {
          y: [0, Math.random() * 5 - 2.5, 0], // Smaller vertical float
          x: [0, Math.random() * 5 - 2.5, 0], // Smaller horizontal float
          transition: {
            duration: 3 + Math.random() * 1, // Slightly varied duration
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.1 // Staggered delay for each icon's animation
          },
        },
      },
    }));
  }, []);


  const darkModeTransition = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.type}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-md shadow-lg font-semibold text-white max-w-sm text-center
              ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={isDarkMode ? 'dark' : 'light'}
        variants={darkModeTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen pt-24 pb-12 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Book SUNAME
            </h1>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Bring the WAVE movement to your venue
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`rounded-2xl p-8 ${isDarkMode ? 'bg-gray-900/60 border border-gray-800' : 'bg-white/80 border border-gray-200'} backdrop-blur-sm shadow-xl relative overflow-hidden`}
          >
            <motion.div
              className="absolute inset-0 -z-10"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(139,92,246,0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(139,92,246,0.15) 0%, transparent 50%)',
                ],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />

            {floatingIcons.map(({ Icon, top, left, rotate }, index) => (
              <motion.div
                key={index}
                className={`absolute ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}
                style={{ top, left, transform: `rotate(${rotate}deg)` }}
                variants={floatingIconVariants}
                animate="animate"
              >
                <Icon size={24} />
              </motion.div>
            ))}

            <div className="grid md:grid-cols-2 gap-8 relative">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Booking Information
                </h2>
                <div className="space-y-6">
                  {/* FIX: Wrapped children in a fragment to resolve adjacent JSX error */}
                  <>
                    <motion.div
                      whileHover={{ x: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Available For
                      </h3>
                      <ul className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
                        {['Club Events', 'Music Festivals', 'Private Events', 'Corporate Functions'].map((item, index) => (
                          <motion.li
                            key={item}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="flex items-center"
                          >
                            <Music2 size={16} className={`mr-2 ${isDarkMode ? 'text-purple-400' : 'text-orange-500'}`} />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <AudioVisualizer
                      height={40}
                      barCount={8}
                      color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
                    />

                    {/* Added horizontal line and heading for social media section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className={`w-full h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} my-8`}
                    />
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                      className={`text-lg font-semibold mb-4 text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}
                    >
                      Connect on Social Media
                    </motion.h3>

                    {/* Aligned social media links as buttons */}
                    <motion.div
                      className="grid grid-cols-2 gap-4 mt-8" // Use grid for 2-column layout
                      initial="hidden"
                      animate="visible"
                      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                    >
                      {socialIcons.map(({ icon: Icon, url, name, buttonVariants }, index) => (
                        <motion.a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center p-3 rounded-lg shadow-md transition-colors duration-300
                            ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}
                          `}
                          whileHover={{ scale: 1.05 }} // Scale the whole button
                          variants={buttonVariants} // Apply subtle floating animation to the button
                          animate="animate"
                        >
                          <motion.span
                            className="inline-block mr-2 text-2xl" // Adjust icon size and margin
                            style={{
                              color: isDarkMode ? '#FFFFFF' : '#333333', // Pure white for dark, dark grey for light
                            }}
                            whileHover={{
                              scale: 1.2, // Scale icon on hover
                              color: isDarkMode ? '#A78BFA' : '#F97316', // Muted purple for dark hover, vibrant orange for light hover
                            }}
                            transition={{
                              color: { duration: 0.4, ease: "easeOut" },
                              scale: { type: "spring", stiffness: 400, damping: 30 }
                            }}
                          >
                            <Icon />
                          </motion.span>
                          <span className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {name}
                          </span>
                        </motion.a>
                      ))}
                    </motion.div>
                  </>
                </div>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  { id: 'name', label: 'Name', type: 'text' },
                  { id: 'email', label: 'Email', type: 'email' },
                  { id: 'date', label: 'Event Date', type: 'date' },
                  { id: 'venue', label: 'Venue/Location', type: 'text' },
                ].map((field) => (
                  <motion.div key={field.id} className="relative" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <label htmlFor={field.id} className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                      {field.label}
                    </label>
                    <motion.input
                      type={field.type}
                      name={field.id}
                      id={field.id}
                      required
                      className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:ring-2 ring-purple-500 outline-none transition-all duration-300`}
                      whileFocus={{ scale: 1.02 }}
                      onFocus={() => setFocusedInput(field.id)}
                      onBlur={() => setFocusedInput(null)}
                    />
                    {focusedInput === field.id && (
                      <motion.div className="absolute right-4 top-9 text-purple-500" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Music2 size={16} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                <motion.div whileHover={{ scale: 1.02 }} className="relative">
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    Event Details
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border focus:ring-2 ring-purple-500 outline-none transition-all duration-300`}
                    whileFocus={{ scale: 1.02 }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium flex items-center justify-center space-x-2 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 -z-10"
                    animate={{
                      background: [
                        'linear-gradient(45deg, rgba(139,92,246,0.5) 0%, rgba(0,0,0,0) 100%)',
                        'linear-gradient(45deg, rgba(0,0,0,0) 0%, rgba(139,92,246,0.5) 100%)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <span>{isSubmitting ? 'Sending...' : 'Submit Booking Request'}</span>
                  <Send size={18} className={isSubmitting ? 'animate-spin' : ''} />
                </motion.button>
              </motion.form>
            </div>
          </motion.div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8 text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>For direct inquiries:</p>
            <motion.a
              href="mailto:sunamebookings@gmail.com"
              className={`inline-flex items-center space-x-2 mt-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}
              whileHover={{ scale: 1.05, x: 10 }}
            >
              <Mail size={16} />
              <span>sunamebookings@gmail.com</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default BookingsPage;

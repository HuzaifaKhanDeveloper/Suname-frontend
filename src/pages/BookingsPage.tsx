import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Music2, Disc, Headphones, Radio } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Assuming this path is correct
import AudioVisualizer from '../components/AudioVisualizer'; // Assuming this path is correct
import ImageCircle from '../components/ImageCircle'; // Assuming this path is correct

type NotificationType = 'success' | 'error';

const BookingsPage = () => {
  const { isDarkMode, isThemeLoaded } = useTheme(); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const lightModeImages = useMemo(() => ([
    { src: "/images/artist_main.jpg", alt: "SUNAME Main Artist" },
    { src: "/images/artist_beachball.jpg", alt: "SUNAME Beachball Headshot" },
    { src: "/images/artist_orange.jpg", alt: "SUNAME Orange Full Body" },
  ]), []);

  const darkModeImages = useMemo(() => ([
    { src: "/images/darkPhoto1.jpg", alt: "SUNAME Dark Realm 1" },
    { src: "/images/darkPhoto2.jpg", alt: "SUNAME Dark Realm 2" },
    { src: "/images/darkPhoto3.jpg", alt: "SUNAME Dark Realm 3" },
  ]), []);

  // Determine which set of images to use based on the current theme
  // This will re-evaluate on every render where isDarkMode might change
  const imagesForCircle = isDarkMode ? darkModeImages : lightModeImages;

  // Effect to cycle through images and reset index on mode change
  useEffect(() => {
    // Only proceed if the theme has loaded to avoid initial flash
    // if (!isThemeLoaded) { // <--- This line depends on your ThemeContext providing isThemeLoaded
    //   return;
    // }

    // Reset index to 0 immediately when the image set changes (due to mode switch)
    setCurrentImageIndex(0);

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesForCircle.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [imagesForCircle, isDarkMode]); // Explicitly include isDarkMode here as well, though imagesForCircle should be enough

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

  // Optional: If your theme context has a loading state, you can render nothing until it's loaded
  // if (!isThemeLoaded) {
  //   return null; // Or a loading spinner
  // }

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
              {/* Info column */}
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
                          <Music2 size={16} className="mr-2" />
                        {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* AUDIO VISUALIZER HERE */}
                  <AudioVisualizer
                    height={40}
                    barCount={8}
                    color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
                  />

                  {/* IMAGECIRCLE HERE */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex justify-center"
                  >
                    <ImageCircle
                      images={imagesForCircle}
                      isDarkRealm={isDarkMode}
                      currentImageIndex={currentImageIndex}
                    />
                  </motion.div>

                </div>
              </motion.div>

              {/* Form column */}
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
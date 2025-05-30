import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion'; 
import { Mail, ExternalLink, Send } from 'lucide-react';
import { biography } from '../data/biography';
import { useTheme } from '../context/ThemeContext';
import AudioVisualizer from '../components/AudioVisualizer';
import { useInView } from 'react-intersection-observer';
import { IconType } from 'react-icons'; 
import { FaSoundcloud, FaInstagram, FaTwitter, FaTiktok, FaYoutube, FaSpotify, FaApple } from 'react-icons/fa';

type NotificationType = 'success' | 'error'; 

interface SocialPlatform {
  name: string;
  icon: IconType; 
  url: string;
  color: string;
  buttonVariants?: Variants; 
}

const ContactPage = () => {
  const { isDarkMode } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: NotificationType } | null>(null); 
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true });

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
        headers: {
          'Accept': 'application/json'
        },
        body: formData,
      });

      if (response.ok) {
        showNotification('Your message has been sent!', 'success');
        form.reset(); 
      } else {
        const data = await response.json();
        if (data.errors) {
          showNotification(data.errors.map((error: any) => error.message).join(', '), 'error');
        } else {
          showNotification('Something went wrong. Please try again.', 'error');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      showNotification('Could not send message. Please check your network.', 'error');
    }

    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const socialPlatforms = useMemo(() => {
    return [
      { name: 'Instagram', icon: FaInstagram, url: biography.socials.instagram, color: '#E4405F' },
      { name: 'TikTok', icon: FaTiktok, url: biography.socials.tiktok, color: '#000000' },
      { name: 'SoundCloud', icon: FaSoundcloud, url: biography.socials.soundcloud, color: '#FF5500' },
      { name: 'Twitter', icon: FaTwitter, url: biography.socials.twitter, color: '#1DA1F2' },
      { name: 'Spotify', icon: FaSpotify, url: biography.socials.spotify, color: '#1DB954' },
      { name: 'Apple Music', icon: FaApple, url: biography.socials.appleMusic, color: '#FA243C' },
      { name: 'YouTube', icon: FaYoutube, url: biography.socials.youtube, color: '#FF0000' },
    ].map((item: SocialPlatform, index) => ({ 
      ...item,

      buttonVariants: {
        animate: {
          y: [0, Math.random() * 5 - 2.5, 0], 
          x: [0, Math.random() * 5 - 2.5, 0], 
          transition: {
            duration: 3 + Math.random() * 1, 
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.1 
          },
        },
      },
    }));
  }, []);

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen pt-24 pb-12 px-4"
      >
        {}

        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`text-4xl md:text-5xl font-bold text-center mb-8 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Contact SUNAME
          </motion.h1>

          {}
          <div className="grid md:grid-cols-2 gap-8">
            {}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`rounded-2xl p-8 ${
                isDarkMode 
                  ? 'bg-gray-900/60 border border-gray-800' 
                  : 'bg-white/80 border border-gray-200'
              } backdrop-blur-sm shadow-xl relative overflow-hidden`}
            >
              {}
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

              <div className="space-y-8">
                <motion.div variants={itemVariants}>
                  <h2 className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Management & General Inquiries
                  </h2>
                  <motion.a
                    href={`mailto:${biography.emails.management}`}
                    className="group flex items-center space-x-3 text-lg"
                    whileHover={{ x: 10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Mail className={`${
                        isDarkMode ? 'text-primary-400' : 'text-primary-600'
                      }`} />
                    </motion.div>
                    <span className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {biography.emails.management}
                    </span>
                    <ExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h2 className={`text-xl font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Booking Inquiries
                  </h2>
                  <motion.a
                    href={`mailto:${biography.emails.bookings}`}
                    className="group flex items-center space-x-3 text-lg"
                    whileHover={{ x: 10, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Mail className={`${
                        isDarkMode ? 'text-primary-400' : 'text-primary-600'
                      }`} />
                    </motion.div>
                    <span className={`${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {biography.emails.bookings}
                    </span>
                    <ExternalLink className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </motion.div>

                <AudioVisualizer 
                  height={40} 
                  barCount={8}
                  color={isDarkMode ? 'rgb(139, 92, 246)' : 'rgb(109, 40, 217)'}
                />

                <motion.div 
                  variants={itemVariants}
                  className="pt-8 border-t border-gray-200 dark:border-gray-700"
                >
                  <h2 className={`text-xl font-semibold mb-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Connect on Social Media
                  </h2>
                  <motion.div 
                    className="grid grid-cols-2 gap-4" 
                    variants={containerVariants}
                  >
                    {socialPlatforms.map((platform: SocialPlatform) => { 
                      const IconComponent = platform.icon; 
                      return (
                        <motion.a
                          key={platform.name}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center p-3 rounded-lg shadow-md transition-colors duration-300
                            ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}
                          `}
                          whileHover={{ scale: 1.05 }} 
                          variants={platform.buttonVariants} 
                          animate="animate"
                        >
                          <motion.span
                            className="inline-block mr-2 text-2xl" 
                            style={{
                              color: isDarkMode ? '#FFFFFF' : '#333333', 
                            }}
                            whileHover={{
                              scale: 1.2, 
                              color: isDarkMode ? '#A78BFA' : '#F97316', 
                            }}
                            transition={{
                              color: { duration: 0.4, ease: "easeOut" },
                              scale: { type: "spring", stiffness: 400, damping: 30 }
                            }}
                          >
                            <IconComponent /> {}
                          </motion.span>
                          <span className={`text-base font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {platform.name}
                          </span>
                        </motion.a>
                      );
                    })}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {}
            <motion.div
              ref={formRef}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
              variants={containerVariants}
              className={`rounded-2xl p-8 ${
                isDarkMode 
                  ? 'bg-gray-900/60 border border-gray-800' 
                  : 'bg-white/80 border border-gray-200'
              } backdrop-blur-sm shadow-xl`}
            >
              <motion.h2 
                variants={itemVariants}
                className={`text-xl font-semibold mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Send a Message
              </motion.h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: 'name', label: 'Name', type: 'text', name: 'name' }, 
                  { id: 'email', label: 'Email', type: 'email', name: '_replyto' }, 
                  { id: 'subject', label: 'Subject', type: 'text', name: 'subject' } 
                ].map((field) => (
                  <motion.div
                    key={field.id}
                    variants={itemVariants}
                  >
                    <label htmlFor={field.id} className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {field.label}
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type={field.type}
                      id={field.id}
                      name={field.name} 
                      required
                      className={`w-full px-4 py-2 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } border focus:ring-2 focus:ring-primary-500 outline-none`}
                    />
                  </motion.div>
                ))}

                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="message"
                    name="message" 
                    rows={4}
                    required
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDarkMode 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border focus:ring-2 focus:ring-primary-500 outline-none`}
                  />
                </motion.div>

                <motion.button
                  variants={itemVariants}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg ${
                    isDarkMode 
                      ? 'bg-primary-600 hover:bg-primary-500' 
                      : 'bg-primary-500 hover:bg-primary-400'
                  } text-white font-medium flex items-center justify-center space-x-2 relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {}
                  <motion.div
                    className="absolute inset-0 -z-10"
                    animate={{
                      background: [
                        'linear-gradient(45deg, rgba(139,92,246,0.5) 0%, rgba(0,0,0,0) 100%)',
                        'linear-gradient(45deg, rgba(0,0,0,0) 0%, rgba(139,92,246,0.5) 100%)',
                        'linear-gradient(45deg, rgba(139,92,246,0.5) 0%, rgba(0,0,0,0) 100%)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send size={18} />
                    </motion.div>
                  ) : (
                    <Send size={18} />
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {}
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
    </>
  );
};

export default ContactPage;
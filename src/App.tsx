import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import IntroAnimation from './components/IntroAnimation';
import BackgroundEffects from './components/BackgroundEffects';
import RealmToggle from './components/RealmToggle';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import HomePage from './pages/HomePage';
import BookingsPage from './pages/BookingsPage';
import ContactPage from './pages/ContactPage';
import DemosPage from './pages/DemosPage';
import TourPage from './pages/TourPage';
import InterviewsPage from './pages/InterviewsPage';
import MixesPage from './pages/MixesPage';
import EPKPage from './pages/EPKPage';
import WaveEventsPage from './pages/WaveEventsPage';
import MusicPage from './pages/MusicPage';
import NotFound from './pages/NotFound';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isDarkRealm, setIsDarkRealm] = useState(false);

  useEffect(() => {
    if (isDarkRealm) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkRealm]);

  if (showIntro) {
    return <IntroAnimation onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="relative min-h-screen transition-colors duration-500">
      <BackgroundEffects isDarkRealm={isDarkRealm} />
      <CustomCursor />
      <Header isDarkRealm={isDarkRealm} />
      <RealmToggle 
        isDarkRealm={isDarkRealm} 
        onToggle={() => setIsDarkRealm(!isDarkRealm)} 
      />
      
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage isDarkRealm={isDarkRealm} />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/demos" element={<DemosPage />} />
          <Route path="/tour" element={<TourPage />} />
          <Route path="/interviews" element={<InterviewsPage />} />
          <Route path="/mixes" element={<MixesPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/epk" element={<EPKPage />} />
          <Route path="/wave-events" element={<WaveEventsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
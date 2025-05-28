import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface RealmToggleProps {
  isDarkRealm: boolean;
  onToggle: () => void;
}

const RealmToggle: React.FC<RealmToggleProps> = ({ isDarkRealm, onToggle }) => {
  return (
    <motion.button
      onClick={onToggle}
      className={`fixed bottom-8 right-8 px-6 py-3 rounded-full backdrop-blur-sm z-50 font-bold
        ${isDarkRealm 
          ? 'bg-white/10 text-white hover:bg-white/20' 
          : 'bg-black/10 text-black hover:bg-black/20'
        }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="flex items-center gap-2">
        {isDarkRealm ? (
          <>
            <Sun className="w-5 h-5" />
            Enter the Light
          </>
        ) : (
          <>
            <Moon className="w-5 h-5" />
            Enter the Realm
          </>
        )}
      </span>
    </motion.button>
  );
};

export default RealmToggle;
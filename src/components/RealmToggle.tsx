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
      className={`
        fixed 
        bottom-16 right-4
        sm:bottom-20 sm:right-6
        md:bottom-24 md:right-8
        
        px-5 py-2.5
        sm:px-5 sm:py-2.5
        md:px-6 md:py-3
        
        rounded-full 
        backdrop-blur-sm 
        z-50 
        font-bold
        transition-colors duration-200
        
        ${isDarkRealm 
          ? 'bg-white/10 text-white hover:bg-white/20' 
          : 'bg-black/10 text-black hover:bg-black/20'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="flex items-center gap-2 
                       text-sm sm:text-base md:text-base">
        {isDarkRealm ? (
          <>
            <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Enter the Light</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Enter the Realm</span>
          </>
        )}
      </span>
    </motion.button>
  );
};

export default RealmToggle;

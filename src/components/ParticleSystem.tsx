import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Music,
  Disc,
  Headphones,
  Radio,
  Mic,
  Speaker,
  Music2,
  Music4,
} from 'lucide-react';

interface ParticleSystemProps {
  particleCount?: number;
  className?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({
  particleCount = 20,
  className = '',
}) => {
  const getRandomIcon = useCallback((index: number) => {
    const icons = [Music, Disc, Headphones, Radio, Mic, Speaker, Music2, Music4];
    return icons[index % icons.length];
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(particleCount)].map((_, index) => {
        const size = 10 + (index % 20);
        const left = `${(index * 5) % 100}%`;
        const top = `${(index * 7) % 100}%`;
        const duration = 15 + (index % 10) * 2;
        const delay = index * 0.5;

        const IconComponent = getRandomIcon(index);

        return (
          <motion.div
            key={index}
            className="absolute text-primary-400 opacity-10"
            style={{
              left,
              top,
              width: size,
              height: size,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(index) * 50, 0],
              rotate: [0, 360, 0],
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'linear',
              delay,
              times: [0, 0.5, 1],
            }}
          >
            <IconComponent size={size} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ParticleSystem; 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '../context/ThemeContext';

interface VinylRecordProps {
  size?: number;
  className?: string;
  albumCover?: string;
}

const VinylRecord: React.FC<VinylRecordProps> = ({
  size = 260,
  className = '',
  albumCover = 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
}) => {
  const { isDarkMode } = useTheme();
  const [hover, setHover] = useState(false);
  
  const vinylSize = size;
  const labelSize = size * 0.4;
  const holeSIze = size * 0.05;
  const grooveWidth = size * 0.02;
  
  return (
    <div className={`relative ${className}`}>
      <Tilt
        className="parallax-effect"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.25}
        scale={hover ? 1.05 : 1}
        transitionSpeed={1500}
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
      >
        <motion.div
          className="relative"
          style={{ width: vinylSize, height: vinylSize }}
          animate={{ 
            rotate: 360, 
            scale: hover ? 1.05 : 1,
          }}
          transition={{ 
            rotate: {
              duration: 6,
              ease: "linear",
              repeat: Infinity, 
            },
            scale: {
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }
          }}
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-black"
            animate={{
              boxShadow: hover
                ? isDarkMode 
                  ? '0 0 40px rgba(139, 92, 246, 0.4)' 
                  : '0 15px 35px rgba(0, 0, 0, 0.3)'
                : isDarkMode
                  ? '0 0 30px rgba(139, 92, 246, 0.3)'
                  : '0 10px 25px rgba(0, 0, 0, 0.2)'
            }}
            transition={{ duration: 0.3 }}
          />

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${(i+1) * grooveWidth * 1.5}px`,
                left: `${(i+1) * grooveWidth * 1.5}px`,
                right: `${(i+1) * grooveWidth * 1.5}px`,
                bottom: `${(i+1) * grooveWidth * 1.5}px`,
                borderWidth: `${grooveWidth}px`,
                borderStyle: 'solid',
                borderColor: 'rgba(50, 50, 50, 0.6)',
              }}
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.02, 1],
              }}
              transition={{
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
            />
          ))}

          <motion.div
            className="absolute rounded-full overflow-hidden"
            style={{
              top: `${(vinylSize - labelSize) / 2}px`,
              left: `${(vinylSize - labelSize) / 2}px`,
              width: `${labelSize}px`,
              height: `${labelSize}px`,
            }}
            whileHover={{ scale: 1.1, rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${albumCover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute rounded-full bg-black"
              style={{
                top: `${(labelSize - holeSIze) / 2}px`,
                left: `${(labelSize - holeSIze) / 2}px`,
                width: `${holeSIze}px`,
                height: `${holeSIze}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8], 
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </Tilt>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 70%, rgba(139,92,246,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 30%, rgba(139,92,246,0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default VinylRecord;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as Tone from 'tone';

interface AudioVisualizerProps {
  color?: string;
  barCount?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
  responsive?: boolean;
  isCompact?: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  color = 'rgb(139, 92, 246)',
  barCount = 12,
  height = 60,
  style,
  className = '',
  responsive = true,
  isCompact = false,
}) => {
  const [synth, setSynth] = useState<Tone.Synth | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination();
    setSynth(synth);

    return () => {
      newSynth.dispose();
    };
  }, []);

  // Use fewer bars on mobile if responsive
  const effectiveBarCount = responsive && isCompact ? Math.min(6, barCount) : barCount;
  
  const playNote = (index: number) => {
    if (synth && !isPlaying) {
      setIsPlaying(true);
      const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
      const note = notes[index % notes.length];
      synth.triggerAttackRelease(note, '8n');
      setTimeout(() => setIsPlaying(false), 100);
    }
  };

  return (
    <div 
      className={`flex items-end justify-center gap-1 ${className}`} 
      style={{ height: `${height}px`, ...style }}
    >
      {[...Array(effectiveBarCount)].map((_, i) => {
        // Create a unique animation duration for each bar
        const duration = 1 + (i % 4) * 0.1;
        // Make a unique pattern for all bars
        const heightPercentage = 30 + ((i % 3) * 25);
        
        return (
          <motion.div
            key={i}
            className="rounded-full cursor-pointer"
            style={{ 
              backgroundColor: color,
              // Alternate widths for visual interest
              width: isCompact ? '3px' : `${3 + (i % 3)}px`,
            }}
            animate={{
              height: [
                `${heightPercentage * 0.5}%`,
                `${heightPercentage}%`,
                `${heightPercentage * 0.5}%`,
              ],
              scale: isPlaying ? [1, 1.2, 1] : 1,
            }}
            transition={{
              height: {
                duration,
                repeat: Infinity,
                ease: [0.45, 0.05, 0.55, 0.95],
                // Offset the start time to create a wave effect
                delay: i * 0.07,
              },
              scale: {
                duration: 0.2,
              }
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={() => playNote(i)}
          />
        );
      })}
    </div>
  );
};

export default AudioVisualizer;
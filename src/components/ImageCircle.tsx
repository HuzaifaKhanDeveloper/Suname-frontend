import React from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

interface ImageProps {
  src: string;
  alt: string;
}

interface ImageCircleProps {
  images: ImageProps[];
  isDarkRealm: boolean;
  currentImageIndex: number;
  imagesNeedingAdjustment?: string[];
}

const ImageCircle: React.FC<ImageCircleProps> = ({
  images,
  isDarkRealm,
  currentImageIndex,
  imagesNeedingAdjustment = [],
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [3, -3]);
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.9, y: 20, filter: 'blur(5px)' },
    animate: { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, y: -20, filter: 'blur(5px)', transition: { duration: 0.5, ease: "easeIn" } },
  };

  const currentImage = images[currentImageIndex];

  const borderColor = isDarkRealm ? 'rgba(48,63,159,0.8)' : 'rgba(255,190,0,1)'; 

  const gradientBackground = isDarkRealm
    ? [
       'linear-gradient(0deg, rgba(48,63,159,0.6), transparent)',
       'linear-gradient(90deg, rgba(48,63,159,0.6), transparent)',
       'linear-gradient(180deg, rgba(48,63,159,0.6), transparent)',
       'linear-gradient(270deg, rgba(48,63,159,0.6), transparent)'
      ]
    : [
       'linear-gradient(0deg, rgba(255,210,0,0.9), transparent)', 
       'linear-gradient(90deg, rgba(255,210,0,0.9), transparent)',
       'linear-gradient(180deg, rgba(255,210,0,0.9), transparent)',
       'linear-gradient(270deg, rgba(255,210,0,0.9), transparent)'];

  const blurBackgroundColor = isDarkRealm ? 'rgba(139,92,246,0.5)' : 'rgba(255,160,0,0.9)'; 

  const imageObjectPosition = imagesNeedingAdjustment.includes(currentImage?.src || '') ? '50% 30%' : 'center';

  return (
    <motion.div
      className="relative w-64 h-64 mx-auto mb-10 cursor-grab active:cursor-grabbing rounded-full overflow-hidden md:w-80 md:h-80 shadow-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      animate={{ rotate: [0, 10, -10, 5, -5, 0] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: gradientBackground
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <AnimatePresence initial={false} mode="wait">
        {currentImage && (
          <motion.img
            key={`${isDarkRealm ? 'dark' : 'light'}-${currentImage.src}`}
            src={currentImage.src}
            alt={currentImage.alt}
            className="w-full h-full object-cover rounded-full border-4 absolute"
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              borderColor: borderColor,
              objectPosition: imageObjectPosition,
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-0 transition-opacity duration-300"
        animate={{
          backgroundColor: blurBackgroundColor
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default ImageCircle;
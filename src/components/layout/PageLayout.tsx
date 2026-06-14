import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from './Footer';

// 3D Page Flip / Curl transition variants
const pageCurlVariants = {
  initial: {
    opacity: 0,
    rotateY: 45,
    skewY: 6,
    x: "30%",
    z: 150,
    transformOrigin: "left center",
    clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    skewY: 0,
    x: 0,
    z: 0,
    transformOrigin: "left center",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    rotateY: -45,
    skewY: -6,
    x: "-30%",
    z: -150,
    transformOrigin: "right center",
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

interface PageLayoutProps {
  children: React.ReactNode;
  id?: string;
  hasPadding?: boolean; // Toggles offset padding for subpages
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  id,
  hasPadding = false
}) => {
  return (
    <motion.div
      id={id}
      variants={pageCurlVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full min-h-screen bg-transparent flex flex-col justify-between ${
        hasPadding ? 'pt-[80px]' : ''
      }`}
      style={{ 
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Primary Inner content element */}
      <div className="flex-grow w-full">
        {children}
      </div>
      
      {/* Footer element */}
      <Footer />
    </motion.div>
  );
};

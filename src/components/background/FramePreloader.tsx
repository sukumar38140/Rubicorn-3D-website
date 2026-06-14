import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFrameSequence } from '../../contexts/FrameSequenceProvider';

export const FramePreloader: React.FC = () => {
  const { isLoading, preloadProgress, skipPreloader } = useFrameSequence();
  const [showSkipButton, setShowSkipButton] = useState(false);

  // Trigger skip button fallback visibility after 2.5 seconds of loading
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowSkipButton(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShowSkipButton(false);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed top-0 left-0 w-screen h-screen bg-[#02060D] z-[9999] flex items-center justify-center pointer-events-auto"
        >
          <div className="flex flex-col items-center gap-8 w-[90%] max-w-[400px]">
            {/* Pulsing neon logo image */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                filter: [
                  'drop-shadow(0 0 15px rgba(0, 200, 255, 0.4))',
                  'drop-shadow(0 0 25px rgba(0, 200, 255, 0.7))',
                  'drop-shadow(0 0 15px rgba(0, 200, 255, 0.4))'
                ]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="relative"
            >
              <img
                src="/assets/logos/Rubicorn High Quality Logo.webp"
                alt="Rubicorn Logo"
                className="h-[80px] w-auto filter drop-shadow-[0_0_15px_rgba(0,200,255,0.4)]"
              />
            </motion.div>

            {/* Progress Bar & percentage counter */}
            <div className="w-full flex flex-col items-center gap-3">
              <span className="font-space-grotesk text-[0.8rem] tracking-[0.2em] text-[#00C8FF] drop-shadow-[0_0_10px_rgba(0,200,255,0.3)]">
                INITIALIZING TECH ENGINE
              </span>
              <div className="w-full h-[4px] bg-white/5 rounded-full overflow-hidden border border-white/[0.02]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00C8FF] to-[#0055FF] shadow-[0_0_10px_rgba(0,200,255,0.5)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${preloadProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="font-orbitron text-[0.95rem] tracking-[0.1em] text-white/50">
                {preloadProgress}%
              </span>
            </div>

            {/* Emergency Skip Button (visible under poor network conditions) */}
            <AnimatePresence>
              {showSkipButton && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={skipPreloader}
                  className="mt-4 px-5 py-2.5 rounded border border-[#00C8FF]/30 font-space-grotesk text-[0.75rem] tracking-[0.15em] text-[#00C8FF] hover:bg-[#00C8FF]/10 hover:border-[#00C8FF] hover:shadow-[0_0_15px_rgba(0,200,255,0.3)] transition-all duration-300 pointer-events-auto"
                >
                  SKIP LOADING
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { Footer } from '../components/layout/Footer';

const pageCurlVariants = {
  initial: {
    opacity: 0,
    rotateY: 45,
    skewY: 6,
    x: "30%",
    transformOrigin: "left center",
    clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    skewY: 0,
    x: 0,
    transformOrigin: "left center",
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    rotateY: -45,
    skewY: -6,
    x: "-30%",
    transformOrigin: "right center",
    clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const TestimonialsPage: React.FC = () => {
  return (
    <motion.div
      variants={pageCurlVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full min-h-screen pt-[80px] bg-transparent"
    >
      {/* Page Hero Banner */}
      <div className="relative w-full overflow-hidden py-20 md:py-28 flex flex-col items-center justify-center px-6 border-b border-white/[0.04]">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ x: [-30, 30, -30], y: [-20, 20, -20], opacity: [0.04, 0.07, 0.04] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/3 w-[700px] h-[700px] rounded-full bg-[#0055FF] blur-[150px]"
          />
          <motion.div
            animate={{ x: [20, -20, 20], y: [15, -15, 15], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00C8FF] blur-[120px]"
          />
        </div>

        <div className="relative z-10 max-w-[900px] text-center flex flex-col items-center gap-5">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="px-4 py-1.5 rounded-full border border-[#00C8FF]/25 bg-[#00C8FF]/[0.08] font-space-grotesk text-[0.65rem] tracking-[0.3em] text-[#00C8FF] uppercase"
          >
            Client Success Stories
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-orbitron font-extrabold text-[2.4rem] sm:text-[3.5rem] md:text-[4.5rem] leading-[1.1] uppercase"
          >
            <span className="text-white">PROVEN </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00C8FF] via-white to-[#0055FF]">
              RESULTS
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="text-white/55 text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-[640px]"
          >
            Real metrics. Real transformations. Hear from the leaders and founders who trusted Rubicorn to engineer their digital futures.
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="flex flex-wrap justify-center gap-6 mt-2 text-white/35 font-space-grotesk text-[0.72rem] tracking-[0.15em] uppercase"
          >
            {['5-Star Rated', '25+ Clients Served', '0 Failed Deliveries'].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#00C8FF]" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <TestimonialsSection />
      <Footer />
    </motion.div>
  );
};

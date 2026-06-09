import React from 'react';
import { motion } from 'framer-motion';
import { CareersSection } from '../components/sections/CareersSection';
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

export const CareersPage: React.FC = () => {
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
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(0,200,255,0.04) 25%, transparent 50%, rgba(0,85,255,0.04) 75%, transparent 100%)',
              filter: 'blur(40px)'
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#00C8FF]/[0.03] blur-[80px]" />
        </div>

        {/* Dashed circuit pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(0,200,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 max-w-[900px] text-center flex flex-col items-center gap-5">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="px-4 py-1.5 rounded-full border border-[#00C8FF]/25 bg-[#00C8FF]/[0.08] font-space-grotesk text-[0.65rem] tracking-[0.3em] text-[#00C8FF] uppercase"
          >
            We're Hiring
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-orbitron font-extrabold text-[2.4rem] sm:text-[3.5rem] md:text-[4.5rem] leading-[1.1] uppercase"
          >
            <span className="text-white">JOIN OUR </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00C8FF] to-[#0055FF]">
              MISSION
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="text-white/55 text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-[640px]"
          >
            We're always looking for ambitious, curious, and high-output individuals. Come build the future of technology with us — and accelerate your career trajectory.
          </motion.p>

          {/* Currently hiring badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C8FF]/15 bg-white/[0.02]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C8FF] shadow-[0_0_8px_rgba(0,200,255,1)] animate-pulse" />
            <span className="text-white/50 font-space-grotesk text-[0.72rem] tracking-[0.2em] uppercase">
              2 Open Internship Positions
            </span>
          </motion.div>
        </div>
      </div>

      <CareersSection />
      <Footer />
    </motion.div>
  );
};

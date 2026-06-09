import React from 'react';
import { motion } from 'framer-motion';
import { ContactSection } from '../components/sections/ContactSection';
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

export const ContactPage: React.FC = () => {
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
          {/* Left orb */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.08, 0.04] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00C8FF] blur-[120px]"
          />
          {/* Right orb */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.07, 0.03] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#0055FF] blur-[100px]"
          />
        </div>

        {/* Horizontal lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,200,255,0.4) 60px, rgba(0,200,255,0.4) 61px)', backgroundSize: '61px 100%' }}
        />

        <div className="relative z-10 max-w-[900px] text-center flex flex-col items-center gap-5">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="px-4 py-1.5 rounded-full border border-[#00C8FF]/25 bg-[#00C8FF]/[0.08] font-space-grotesk text-[0.65rem] tracking-[0.3em] text-[#00C8FF] uppercase"
          >
            Let's Build Together
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-orbitron font-extrabold text-[2.4rem] sm:text-[3.5rem] md:text-[4.5rem] leading-[1.1] uppercase"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00C8FF] to-[#0055FF]">GET IN </span>
            <span className="text-white">TOUCH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="text-white/55 text-[0.95rem] md:text-[1.05rem] leading-relaxed max-w-[640px]"
          >
            Have a project in mind, need a technical consultation, or want to apply for an open internship? We respond within 24 business hours — always.
          </motion.p>

          {/* Contact quick info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="flex flex-wrap justify-center gap-4 mt-1"
          >
            {[
              { label: 'Email', value: 'contact@rubicorn.in' },
              { label: 'Phone', value: '+91 94945 65162' },
              { label: 'Location', value: 'Hyderabad, India' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.07] bg-white/[0.01]">
                <span className="text-white/25 font-space-grotesk text-[0.65rem] tracking-[0.15em] uppercase">{item.label}:</span>
                <span className="text-white/55 font-space-grotesk text-[0.72rem]">{item.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <ContactSection />
      <Footer />
    </motion.div>
  );
};

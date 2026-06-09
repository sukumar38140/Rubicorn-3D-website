import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const desktopVideo = '/assets/desktop/Rubicorn Landing page desktop.mp4';
  const mobileVideo = '/assets/mobile/Rubicorn Mobile size landing page.mp4';

  const [isMobile, setIsMobile] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 400], [0, -80]);
  const textScale = useTransform(scrollY, [0, 400], [1, 0.82]);
  const textOpacity = useTransform(scrollY, [0, 320], [1, 0]);
  const textRotate = useTransform(scrollY, [0, 400], [0, -8]);

  // Split title text structures to highlight DIGITAL
  const titleWords = [
    { text: "BUILDING", highlight: false },
    { text: "DIGITAL", highlight: true },
    { text: "FUTURES", highlight: false }
  ];

  const paragraphText = "Rubicorn Technologies specializes in AI integration, custom software architecture, automation systems, and high-performance Web environments.";

  // Math helper to generate realistic 3D spiral vortex keyframe paths
  const generateSpiralKeyframes = (i: number, baseRadius = 250, turns = 1.6) => {
    const steps = 7;
    const xKeyframes: number[] = [];
    const yKeyframes: number[] = [];
    const rotateKeyframes: number[] = [];
    const scaleKeyframes: number[] = [];
    const opacityKeyframes: number[] = [];
    const blurKeyframes: string[] = [];

    // Unique angle offset and randomized offset bounds for natural storm distribution
    const startAngle = i * 0.35 + Math.random() * 0.4;
    const startRotate = 360 * turns + Math.random() * 90;

    for (let step = 0; step < steps; step++) {
      const progress = step / (steps - 1); // 0 to 1
      const invertedProgress = 1 - progress; // 1 to 0

      // Winding math: angle and radius shrink to 0 at progress = 1
      const currentAngle = startAngle + invertedProgress * (turns * Math.PI * 2);
      const currentRadius = invertedProgress * (baseRadius + Math.random() * 40);

      xKeyframes.push(Math.cos(currentAngle) * currentRadius);
      yKeyframes.push(Math.sin(currentAngle) * currentRadius);
      rotateKeyframes.push(invertedProgress * startRotate);
      scaleKeyframes.push(progress);
      opacityKeyframes.push(progress === 0 ? 0 : progress);
      blurKeyframes.push(`blur(${Math.round(invertedProgress * 8)}px)`);
    }

    return {
      x: xKeyframes,
      y: yKeyframes,
      rotate: rotateKeyframes,
      scale: scaleKeyframes,
      opacity: opacityKeyframes,
      filter: blurKeyframes
    };
  };

  // Header characters vortex variants using spiral keyframes
  const charVariants = {
    hidden: {
      opacity: 0,
      scale: 0
    },
    visible: (i: number) => {
      const kf = generateSpiralKeyframes(i, 300, 1.8);
      return {
        x: kf.x,
        y: kf.y,
        rotate: kf.rotate,
        scale: kf.scale,
        opacity: kf.opacity,
        filter: kf.filter,
        transition: {
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1], // Premium easing
          delay: i * 0.035
        }
      };
    }
  };

  // Paragraph words vortex variants
  const paragraphContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      scale: 0
    },
    visible: (i: number) => {
      const kf = generateSpiralKeyframes(i, 180, 1.2);
      return {
        x: kf.x,
        y: kf.y,
        rotate: kf.rotate,
        scale: kf.scale,
        opacity: kf.opacity,
        filter: kf.filter,
        transition: {
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.9 + i * 0.04
        }
      };
    }
  };

  // Monitor media query on mount and resize to swap video assets
  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const handleViewportChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    handleViewportChange(media);
    media.addEventListener('change', handleViewportChange);
    return () => media.removeEventListener('change', handleViewportChange);
  }, []);

  // Sync scroll positions for background video cross-fading to canvas sequence
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const fadeRange = 300; // Opacity transitions to 0 over first 300px of scroll
      const newOpacity = Math.max(0, Math.min(1, 1 - scrollTop / fadeRange));
      setVideoOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play block recovery handler
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch((err) => {
        console.warn('Autoplay blocked. Retrying on user interaction.', err);
        const retryPlay = () => {
          video.play();
          window.removeEventListener('click', retryPlay);
        };
        window.addEventListener('click', retryPlay);
      });
    };

    playVideo();
  }, [isMobile]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-transparent flex flex-col justify-center items-center px-6">
      
      {/* Video element container with scroll cross-fade interpolation styling */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-75"
        style={{ opacity: videoOpacity }}
      >
        <video
          ref={videoRef}
          key={isMobile ? 'mobile-video' : 'desktop-video'}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={isMobile ? mobileVideo : desktopVideo} type="video/mp4" />
        </video>
        {/* Completely transparent overlay to keep video at maximum brightness */}
        <div className="absolute top-0 left-0 w-full h-full bg-transparent" />
      </div>

      {/* Hero Content Overlays (exit vortex and zoom linked continuously with scroll) */}
      <motion.div 
        style={{ y: textY, scale: textScale, opacity: textOpacity, rotate: textRotate }}
        className="relative z-10 max-w-[900px] text-center flex flex-col items-center gap-6 mt-16 md:mt-24"
      >
        
        {/* Tagline Badge */}
        <div className="px-4 py-1.5 rounded-full border border-[#00C8FF]/20 bg-[#00C8FF]/5 font-space-grotesk text-[0.7rem] tracking-[0.25em] text-[#00C8FF] uppercase shadow-[0_0_15px_rgba(0,200,255,0.1)]">
          Engineering Intelligence.
        </div>

        {/* Brand Main Title with character-by-character Vortex transition */}
        <h1 className="font-orbitron font-extrabold text-[2.2rem] sm:text-[3.2rem] md:text-[4.5rem] leading-[1.1] text-white tracking-wide flex flex-wrap justify-center gap-x-4 gap-y-2 select-none">
          {titleWords.map((word, wordIdx) => {
            // Compute preceding character length offset for staggered custom keys
            let charOffset = 0;
            for (let w = 0; w < wordIdx; w++) {
              charOffset += titleWords[w].text.length;
            }
            
            return (
              <span 
                key={wordIdx} 
                className={`inline-block ${
                  word.highlight 
                    ? "bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00C8FF] to-[#0055FF] drop-shadow-[0_0_15px_rgba(0,200,255,0.2)]"
                    : ""
                }`}
              >
                {word.text.split("").map((char, charIdx) => {
                  const globalIdx = charOffset + charIdx;
                  return (
                    <motion.span
                      key={charIdx}
                      custom={globalIdx}
                      variants={charVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block origin-center animate-continuous-vortex"
                      style={{ animationDelay: `${2.0 + globalIdx * 0.08}s` }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            );
          })}
        </h1>

        {/* Supporting Copy with word-by-word Vortex transition */}
        <motion.p 
          variants={paragraphContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-white/70 max-w-[650px] text-[0.95rem] md:text-[1.1rem] leading-relaxed font-light flex flex-wrap justify-center gap-x-1.5 select-none"
        >
          {paragraphText.split(" ").map((word, wordIdx) => (
            <motion.span
              key={wordIdx}
              custom={wordIdx}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block origin-center animate-continuous-float"
              style={{ animationDelay: `${2.2 + wordIdx * 0.05}s` }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <a
            href="#contact"
            className="px-8 py-3.5 rounded bg-gradient-to-r from-[#00C8FF] to-[#0055FF] shadow-[0_0_20px_rgba(0,200,255,0.4)] hover:shadow-[0_0_30px_rgba(0,200,255,0.65)] text-white font-space-grotesk text-[0.8rem] tracking-[0.15em] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase font-semibold text-center"
          >
            Start Project
          </a>
          <a
            href="#services"
            className="px-8 py-3.5 rounded border border-white/20 hover:border-[#00C8FF] hover:bg-[#00C8FF]/5 text-white/90 hover:text-white font-space-grotesk text-[0.8rem] tracking-[0.15em] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase text-center"
          >
            Explore Services
          </a>
        </div>
      </motion.div>

      {/* Mouse Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <span className="font-space-grotesk text-[0.6rem] tracking-[0.3em] text-white/30 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[18px] h-[30px] rounded-full border-2 border-white/25 flex justify-center py-1.5">
          <div className="w-[3px] h-[6px] bg-[#00C8FF] rounded-full animate-bounce" />
        </div>
      </div>

    </section>
  );
};

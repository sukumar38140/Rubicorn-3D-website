import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ContentEmergence } from '../ui/ContentEmergence';

export const HeroSection: React.FC = () => {
  const desktopVideo = '/assets/desktop/Rubicorn Landing page desktop.mp4';
  const mobileVideo = '/assets/mobile/Rubicorn Mobile size landing page.mp4';

  const [isMobile, setIsMobile] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(1);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const paragraphText = "Rubicorn Technologies specializes in AI integration, custom software architecture, automation systems, and high-performance Web environments.";

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

      {/* Hero Content Overlays wrapped with staggered ContentEmergence 3D Launch */}
      <div className="relative z-10 max-w-[900px] text-center flex flex-col items-center gap-6 mt-16 md:mt-24">
        
        {/* Tagline Badge */}
        <ContentEmergence intensity="hero" delay={0}>
          <div className="px-4 py-1.5 rounded-full border border-[#00C8FF]/20 bg-[#00C8FF]/5 font-space-grotesk text-[0.7rem] tracking-[0.25em] text-[#00C8FF] uppercase shadow-[0_0_15px_rgba(0,200,255,0.1)]">
            Engineering Intelligence.
          </div>
        </ContentEmergence>

        {/* Brand Main Title */}
        <ContentEmergence intensity="hero" delay={120}>
          <h1 className="font-orbitron font-extrabold text-[2.2rem] sm:text-[3.2rem] md:text-[4.5rem] leading-[1.1] text-white tracking-wide select-none">
            BUILDING{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00C8FF] to-[#0055FF] drop-shadow-[0_0_15px_rgba(0,200,255,0.2)]">
              DIGITAL
            </span>{' '}
            FUTURES
          </h1>
        </ContentEmergence>

        {/* Supporting Copy */}
        <ContentEmergence intensity="hero" delay={240}>
          <p className="text-white/70 max-w-[650px] text-[0.95rem] md:text-[1.1rem] leading-relaxed font-light select-none">
            {paragraphText}
          </p>
        </ContentEmergence>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
          <ContentEmergence intensity="hero" delay={360}>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded bg-gradient-to-r from-[#00C8FF] to-[#0055FF] shadow-[0_0_20px_rgba(0,200,255,0.4)] hover:shadow-[0_0_30px_rgba(0,200,255,0.65)] text-white font-space-grotesk text-[0.8rem] tracking-[0.15em] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase font-semibold text-center block w-full sm:w-auto"
            >
              Start Project
            </a>
          </ContentEmergence>
          <ContentEmergence intensity="hero" delay={460}>
            <a
              href="#services"
              className="px-8 py-3.5 rounded border border-white/20 hover:border-[#00C8FF] hover:bg-[#00C8FF]/5 text-white/90 hover:text-white font-space-grotesk text-[0.8rem] tracking-[0.15em] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase text-center block w-full sm:w-auto"
            >
              Explore Services
            </a>
          </ContentEmergence>
        </div>
      </div>

      {/* Mouse Scroll indicator */}
      <ContentEmergence intensity="secondary" delay={600} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
        <span className="font-space-grotesk text-[0.6rem] tracking-[0.3em] text-white/30 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-[18px] h-[30px] rounded-full border-2 border-white/25 flex justify-center py-1.5">
          <div className="w-[3px] h-[6px] bg-[#00C8FF] rounded-full animate-bounce" />
        </div>
      </ContentEmergence>

    </section>
  );
};

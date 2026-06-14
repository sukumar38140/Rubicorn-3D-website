import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { ContentEmergence } from '../ui/ContentEmergence';
import { useFrameSequence } from '../../contexts/FrameSequenceProvider';

interface Review {
  name: string;
  role: string;
  company: string;
  industry: string;
  content: string;
  result: string;
  resultLabel: string;
}

export const TestimonialsSection: React.FC = () => {
  const { isMobile } = useFrameSequence();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const parallaxBg = useTransform(scrollYProgress, [0, 1], isMobile ? ['0%', '0%'] : ['0%', '10%']);

  const reviews: Review[] = [
    {
      name: 'Aditya Vardhan', role: 'Director of Technology', company: 'Aura Logistics Solutions', industry: 'Logistics & Supply Chain',
      content: 'Rubicorn developed a custom fleet management ERP that integrated seamlessly with our warehousing systems. The performance improvement was immediate, reducing manual dispatch times by over 40%. Their engineers understood our operational bottlenecks on day one.',
      result: '40%', resultLabel: 'Dispatch Time Reduction'
    },
    {
      name: 'Sarah Mendis', role: 'Co-Founder', company: 'Elevate Fintech Platforms', industry: 'Financial Technology',
      content: 'The custom web experience that Rubicorn designed for our customer acquisition campaigns surpassed every target we set. The glassmorphism animations and high-speed page loads improved our conversion rate by 25%. The team was professional, responsive, and deeply technical.',
      result: '25%', resultLabel: 'Conversion Rate Lift'
    },
    {
      name: 'Rajesh K. Mehta', role: 'Operations Head', company: 'Zenith Automation Labs', industry: 'Industrial AI',
      content: 'We contracted Rubicorn to construct our AI quality control vision pipeline. Their engineering quality, TypeScript precision, and deep understanding of cloud infrastructure made them a perfect partner. The system went live in under 8 weeks and has been flawless since.',
      result: '8 Wks', resultLabel: 'Full Pipeline Delivery'
    },
    {
      name: 'Priya Nair', role: 'Head of Digital', company: 'NovaBridge Consulting', industry: 'Enterprise Consulting',
      content: 'From brand identity to a fully functional client portal, Rubicorn handled every layer of our digital transformation. Their ability to marry exceptional design sensibility with robust backend architecture is rare. We now have a product our clients genuinely enjoy using.',
      result: '3x', resultLabel: 'Client Portal Engagement'
    },
    {
      name: 'Marcus Wu', role: 'CTO', company: 'SkyNet Analytics', industry: 'Data Analytics',
      content: 'Rubicorn built our real-time analytics dashboard that processes over 2 million events per day. The architecture they proposed was elegant, scalable, and maintainable. Six months in — zero downtime. Their code reviews alone elevated our entire engineering team.',
      result: '2M+', resultLabel: 'Daily Events Processed'
    }
  ];

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % reviews.length);
    }, 5000);
  };

  useEffect(() => {
    if (isAutoPlaying) startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isAutoPlaying]);

  const navigate = (dir: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    setActiveIndex(prev => dir === 'next' ? (prev + 1) % reviews.length : (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const active = reviews[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full py-28 md:py-36 bg-transparent flex flex-col items-center px-6 overflow-hidden"
    >
      {/* Ambient background orb (delegated to CSS and hidden on mobile) */}
      <div
        className="bg-ambient-orb bg-ambient-orb-large animate-orb-float w-[800px] h-[800px] left-1/2 top-1/2"
        style={{ background: 'radial-gradient(circle, rgba(0,85,255,0.5) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1200px] w-full flex flex-col gap-16 md:gap-20 relative z-10">

        {/* Section Header — Content Emergence 3D launch */}
        <ContentEmergence intensity="feature" delay={0} className="flex flex-col items-center text-center gap-5 max-w-[800px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-[#00C8FF]/60 w-12" />
            <span className="font-space-grotesk text-[0.7rem] tracking-[0.3em] text-[#00C8FF] uppercase">CLIENT FEEDBACK</span>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-[#00C8FF]/60 w-12" />
          </div>

          <h2 className="font-orbitron font-extrabold text-[2rem] md:text-[3.2rem] text-white leading-[1.15] uppercase text-center">
            DELIVERING
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00C8FF] to-[#0055FF]">
              PROVEN IMPACT
            </span>
          </h2>

          <p className="text-white/55 text-[0.95rem] leading-relaxed max-w-[600px]">
            Real metrics. Real transformations. Hear from the leaders and founders who trusted Rubicorn.
          </p>
        </ContentEmergence>

        {/* Featured Testimonial Carousel — ContentEmergence */}
        <ContentEmergence intensity="feature" delay={100}>
          <div className="relative rounded-2xl border border-[#00C8FF]/14 overflow-hidden">
            {/* Top gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C8FF]/40 to-transparent" />

            <div className="p-8 md:p-12 lg:p-16" style={{ background: 'rgba(3, 10, 24, 0.52)', backdropFilter: 'blur(16px)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center"
                >
                  {/* Content */}
                  <div className="flex flex-col gap-6">
                    {/* Animated star rating */}
                    <div className="flex gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -30 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.08, duration: 0.4, ease: 'backOut' }}
                        >
                          <Star size={16} className="fill-[#00C8FF] text-[#00C8FF] drop-shadow-[0_0_6px_rgba(0,200,255,0.6)]" />
                        </motion.span>
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5, ease: 'backOut' }}
                      >
                        <Quote size={40} className="absolute -top-2 -left-2 text-[#00C8FF]/15" />
                      </motion.div>
                      <p className="text-white/80 text-[1rem] md:text-[1.12rem] leading-[1.8] italic pl-8">
                        "{active.content}"
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-2">
                      <div
                        className="w-12 h-12 rounded-full border border-[#00C8FF]/25 flex items-center justify-center font-orbitron font-bold text-[#00C8FF] text-[0.9rem] shrink-0 shadow-[0_0_10px_rgba(0,200,255,0.15)]"
                        style={{ background: 'linear-gradient(135deg, rgba(0,200,255,0.15), rgba(0,85,255,0.15))' }}
                      >
                        {active.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-orbitron font-semibold text-[0.92rem] text-white uppercase tracking-wide">{active.name}</div>
                        <div className="text-[#00C8FF] text-[0.74rem] font-space-grotesk tracking-wider uppercase mt-0.5">{active.role}</div>
                        <div className="text-white/35 text-[0.7rem] uppercase mt-0.5">{active.company} · {active.industry}</div>
                      </div>
                    </div>
                  </div>

                  {/* Result Callout */}
                  <div
                    className="flex flex-col items-center justify-center p-6 md:p-8 rounded-xl border border-[#00C8FF]/20 min-w-[160px] text-center shadow-[0_0_15px_rgba(0,200,255,0.08)]"
                    style={{ background: 'rgba(0,200,255,0.04)' }}
                  >
                    <div className="font-orbitron font-extrabold text-[2.5rem] md:text-[3rem] bg-clip-text text-transparent bg-gradient-to-b from-[#00C8FF] to-white leading-none">
                      {active.result}
                    </div>
                    <div className="font-space-grotesk text-[0.68rem] tracking-[0.15em] text-white/40 uppercase mt-2 max-w-[120px]">
                      {active.resultLabel}
                    </div>
                    </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/[0.04]">
                <div className="flex items-center gap-2">
                  {reviews.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => { setActiveIndex(i); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 8000); }}
                      className={`h-[3px] rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-[#00C8FF]' : 'bg-white/20 hover:bg-white/40'}`}
                      animate={{ width: i === activeIndex ? 32 : 12 }}
                      style={{ boxShadow: i === activeIndex ? '0 0 8px rgba(0,200,255,0.6)' : 'none' }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {[
                    { icon: <ChevronLeft size={18} />, action: () => navigate('prev') },
                    { icon: <Play size={14} fill={isAutoPlaying ? 'currentColor' : 'none'} />, action: () => setIsAutoPlaying(p => !p), active: isAutoPlaying },
                    { icon: <ChevronRight size={18} />, action: () => navigate('next') },
                  ].map((btn, i) => (
                    <motion.button
                      key={i}
                      onClick={btn.action}
                      className={`p-2.5 rounded-lg border transition-all duration-300 ${btn.active ? 'border-[#00C8FF]/40 text-[#00C8FF] bg-[#00C8FF]/[0.08]' : 'border-white/10 text-white/50 hover:border-[#00C8FF]/30 hover:text-[#00C8FF]'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      {btn.icon}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ContentEmergence>

        {/* Mini review cards — alternating directions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.slice(0, 3).map((rev, index) => (
            <ContentEmergence key={rev.name} delay={index * 80} intensity="card" className="h-full">
              <motion.div
                className={`p-5 rounded-xl border cursor-pointer transition-colors duration-400 h-full ${activeIndex === index ? 'border-[#00C8FF]/35' : 'border-white/[0.08] hover:border-white/15'}`}
                style={{ background: activeIndex === index ? 'rgba(0,200,255,0.05)' : 'rgba(3, 10, 24, 0.50)' }}
                onClick={() => { setActiveIndex(index); setIsAutoPlaying(false); }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      <Star size={11} className="fill-[#00C8FF] text-[#00C8FF]" />
                    </span>
                  ))}
                </div>
                <p className="text-white/55 text-[0.8rem] leading-relaxed line-clamp-3 italic mb-4">"{rev.content}"</p>
                <div className="flex flex-col">
                  <span className="font-orbitron font-semibold text-[0.8rem] text-white uppercase">{rev.name}</span>
                  <span className="text-[#00C8FF] text-[0.65rem] uppercase font-space-grotesk tracking-wider mt-0.5">{rev.company}</span>
                </div>
              </motion.div>
            </ContentEmergence>
          ))}
        </div>

      </div>
    </section>
  );
};

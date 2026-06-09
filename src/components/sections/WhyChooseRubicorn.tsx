import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Cpu, Eye, ShieldCheck, Zap, Globe, Award, TrendingUp, Users } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import { TiltCard } from '../ui/TiltCard';

/* ─── Animated Counter ─── */
const useCounter = (target: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

/* ─── Stat Card ─── */
const StatCard: React.FC<{ icon: React.ReactNode; value: number; suffix: string; label: string; index: number }> = ({ icon, value, suffix, label, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCounter(value, 2200, visible);

  // Alternating entrance: even = from left, odd = from right
  const enterX = index % 2 === 0 ? -50 : 50;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: enterX, scale: 0.85 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.04, transition: { duration: 0.3 } }}
      className="flex flex-col items-center gap-3 p-6 rounded-xl border border-white/[0.09] group text-center cursor-default relative overflow-hidden"
      style={{ background: 'rgba(3, 10, 24, 0.52)', backdropFilter: 'blur(10px)' }}
    >
      {/* Shimmer sweep on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(0,200,255,0.07) 50%, transparent 70%)', backgroundSize: '200% 100%' }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="text-[#00C8FF]"
        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.5, ease: 'easeInOut' }}
      >
        {icon}
      </motion.div>
      <motion.div
        className="font-orbitron font-extrabold text-[2.2rem] md:text-[2.8rem] text-white leading-none"
        animate={{ textShadow: ['0 0 0px rgba(0,200,255,0)', '0 0 20px rgba(0,200,255,0.4)', '0 0 0px rgba(0,200,255,0)'] }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="font-space-grotesk text-[0.75rem] tracking-[0.2em] text-white/40 uppercase">{label}</div>
    </motion.div>
  );
};

/* ─── Animated Highlight Item ─── */
const HighlightItem: React.FC<{ text: string; index: number }> = ({ text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -15 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
    whileHover={{ x: 4, transition: { duration: 0.2 } }}
    className="flex items-center gap-2 group cursor-default"
  >
    <motion.span
      className="w-1.5 h-1.5 rounded-full bg-[#00C8FF] shrink-0"
      animate={{ boxShadow: ['0 0 0px rgba(0,200,255,0.4)', '0 0 8px rgba(0,200,255,0.9)', '0 0 0px rgba(0,200,255,0.4)'] }}
      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
    />
    <span className="text-[#00C8FF] text-[0.75rem] font-space-grotesk tracking-wider group-hover:text-white transition-colors duration-300">{text}</span>
  </motion.div>
);

export const WhyChooseRubicorn: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.01, 0.03, 0.03, 0.01]);

  const features = [
    {
      icon: <Cpu className="w-8 h-8 text-[#00C8FF] drop-shadow-[0_0_8px_rgba(0,200,255,0.4)]" />,
      title: 'Autonomous Engineering',
      description: 'We develop intelligent systems, custom AI integrations, and automated pipelines that optimize workflows, eliminate redundancies, and scale businesses far beyond legacy capabilities.',
      highlights: ['AI-First Architecture', 'Zero-Redundancy Design', 'Infinite Scalability'],
      accentColor: '#00C8FF',
      animType: 'fadeLeft' as const,
    },
    {
      icon: <Eye className="w-8 h-8 text-[#00C8FF] drop-shadow-[0_0_8px_rgba(0,200,255,0.4)]" />,
      title: 'Immersive UI/UX Design',
      description: 'Our interfaces are built to captivate. We design premium, motion-driven frontends that load instantaneously, scroll fluidly, and convert visitors into loyal customers.',
      highlights: ['Sub-100ms Interactions', 'Motion-Driven Design', 'Conversion Optimized'],
      accentColor: '#00C8FF',
      animType: 'scale' as const,
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#00C8FF] drop-shadow-[0_0_8px_rgba(0,200,255,0.4)]" />,
      title: 'Enterprise-Grade Scale',
      description: 'From secure CRM/ERP integrations to high-availability cloud architecture, we build resilient, secure solutions verified by compliance protocols and industry standards.',
      highlights: ['SOC 2 Compliant', 'High Availability SLA', 'Zero-Trust Security'],
      accentColor: '#00C8FF',
      animType: 'fadeRight' as const,
    }
  ];

  const stats = [
    { icon: <TrendingUp size={24} />, value: 40, suffix: '%', label: 'Avg Efficiency Gain' },
    { icon: <Users size={24} />, value: 25, suffix: '+', label: 'Enterprise Clients' },
    { icon: <Zap size={24} />, value: 98, suffix: '%', label: 'Client Retention' },
    { icon: <Globe size={24} />, value: 5, suffix: '+', label: 'Countries Served' },
  ];

  const differentiators = [
    { icon: <Award size={16} />, text: 'No-Template Policy — Every system is bespoke engineered' },
    { icon: <Zap size={16} />, text: '72-Hour Sprint Deployments for critical client timelines' },
    { icon: <Globe size={16} />, text: 'Bilingual Engineering Teams across IST and EST timezones' },
    { icon: <ShieldCheck size={16} />, text: 'Source code ownership transferred fully to every client' },
  ];

  return (
    <section
      ref={sectionRef}
      id="why-rubicorn"
      className="relative w-full py-28 md:py-36 bg-transparent flex flex-col items-center px-6 overflow-hidden"
    >
      {/* Parallax grid background */}
      <motion.div
        style={{
          y: bgY,
          opacity: bgOpacity,
          backgroundImage: `linear-gradient(rgba(0,200,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,200,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Ambient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.025, 0.05, 0.025] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.3) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1400px] w-full flex flex-col gap-20 md:gap-28 relative z-10">

        {/* Section Header — blur reveal */}
        <ScrollReveal type="blur" className="flex flex-col items-center text-center gap-5 max-w-[800px] mx-auto">
          <motion.div
            className="flex items-center gap-3"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#00C8FF]/60" />
            <span className="font-space-grotesk text-[0.7rem] tracking-[0.3em] text-[#00C8FF] uppercase">WHY RUBICORN</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#00C8FF]/60" />
          </motion.div>

          {/* Character-split heading animation */}
          <h2 className="font-orbitron font-extrabold text-[2rem] md:text-[3.2rem] text-white leading-[1.15] uppercase">
            {'ENGINEERING THE'.split('').map((ch, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.02 * i, duration: 0.4 }}
                className="inline-block">{ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00C8FF] via-white to-[#0055FF]">
              {'DIGITAL ADVANTAGE'.split('').map((ch, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.4 + 0.025 * i, duration: 0.4 }}
                  className="inline-block">{ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.7 }}
            className="text-white/55 text-[0.95rem] leading-relaxed max-w-[640px]"
          >
            We bypass generic templates to build high-performance, custom-crafted digital solutions that define the next era of technological progress. Every line of code is intentional.
          </motion.p>
        </ScrollReveal>

        {/* Stats — alternating left/right entrance */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>

        {/* Feature Cards — three different entrance types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feat, index) => (
            <ScrollReveal key={feat.title} delay={index * 120} type={feat.animType}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                className="h-full"
              >
                <TiltCard className="h-full relative overflow-hidden">
                  {/* Animated top border sweep */}
                  <motion.div
                    className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#00C8FF] to-[#0055FF]"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Icon with continuous spin glow */}
                  <motion.div
                    className="mb-6 w-fit p-3.5 rounded-lg border relative"
                    style={{ background: 'rgba(0,200,255,0.06)', borderColor: 'rgba(0,200,255,0.2)' }}
                    animate={{ boxShadow: ['inset 0 0 8px rgba(0,200,255,0.05)', 'inset 0 0 20px rgba(0,200,255,0.2)', 'inset 0 0 8px rgba(0,200,255,0.05)'] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
                    whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.25 } }}
                  >
                    {feat.icon}
                  </motion.div>

                  <h3 className="font-orbitron font-bold text-[1.1rem] text-white tracking-wide mb-3 uppercase">
                    {feat.title}
                  </h3>
                  <p className="text-white/50 text-[0.85rem] leading-relaxed mb-5">
                    {feat.description}
                  </p>

                  <motion.div
                    className="flex flex-col gap-2 pt-4 border-t border-white/[0.06]"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.15 }}
                  >
                    {feat.highlights.map((h, hi) => (
                      <HighlightItem key={h} text={h} index={hi} />
                    ))}
                  </motion.div>
                </TiltCard>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Differentiators Banner — flipX entrance */}
        <ScrollReveal type="flipX">
          <div
            className="rounded-2xl border border-[#00C8FF]/18 p-8 md:p-12"
            style={{ background: 'rgba(3, 10, 24, 0.52)', backdropFilter: 'blur(12px)' }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <motion.span
                  className="font-space-grotesk text-[0.65rem] tracking-[0.3em] text-[#00C8FF] uppercase"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  THE RUBICORN DIFFERENCE
                </motion.span>
                <h3 className="font-orbitron font-bold text-[1.4rem] md:text-[1.8rem] text-white mt-2 uppercase leading-tight">
                  Our Core<br />Commitments
                </h3>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {differentiators.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -25 : 25, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.02, x: 3, transition: { duration: 0.2 } }}
                    className="flex items-start gap-3 p-4 rounded-lg border border-white/[0.07] hover:border-[#00C8FF]/30 transition-colors duration-300 cursor-default"
                    style={{ background: 'rgba(3, 10, 24, 0.52)' }}
                  >
                    <motion.span
                      className="text-[#00C8FF] mt-0.5 shrink-0"
                      animate={{ rotate: [0, 15, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.7 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span className="text-white/65 text-[0.85rem] leading-relaxed">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

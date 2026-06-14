import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Brain, LayoutGrid, ShieldAlert, Workflow, Palette, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ContentEmergence } from '../ui/ContentEmergence';

interface Service {
  icon: React.ReactNode;
  title: string;
  tag: string;
  description: string;
  bullets: string[];
  color: string;
}

export const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  const services: Service[] = [
    {
      icon: <Brain className="w-7 h-7" />,
      title: 'Artificial Intelligence',
      tag: 'AI & ML',
      description: 'Custom machine learning models, natural language processing, predictive analysis, and intelligent automated workflows tailored for your operations.',
      bullets: ['Custom ML model training & deployment', 'NLP chatbots & voice assistants', 'Computer vision & image recognition', 'Predictive analytics dashboards'],
      color: '#00C8FF',
    },
    {
      icon: <LayoutGrid className="w-7 h-7" />,
      title: 'Web & Mobile Engineering',
      tag: 'Full-Stack Dev',
      description: 'High-performance React/Vite frontends, secure APIs, and responsive iOS/Android mobile apps engineered for speed and conversion.',
      bullets: ['React, Next.js & Vite frontends', 'Node.js & Python backend APIs', 'iOS & Android mobile apps', 'Progressive Web Apps (PWA)'],
      color: '#7C3AED',
    },
    {
      icon: <ShieldAlert className="w-7 h-7" />,
      title: 'Cybersecurity & Cloud',
      tag: 'Security',
      description: 'Secure serverless setups, AWS/GCP architecture design, identity management, and comprehensive software vulnerability compliance auditing.',
      bullets: ['Penetration testing & audits', 'AWS / GCP cloud architecture', 'Identity & access management', 'Compliance & vulnerability scans'],
      color: '#10B981',
    },
    {
      icon: <Workflow className="w-7 h-7" />,
      title: 'Automation & ERP / CRM',
      tag: 'Business Systems',
      description: 'Streamline business operations with custom management portals, database integrations, and legacy systems synchronization.',
      bullets: ['Custom ERP / CRM portals', 'Workflow automation engines', 'Legacy system migrations', 'Third-party API integrations'],
      color: '#F59E0B',
    },
    {
      icon: <Palette className="w-7 h-7" />,
      title: 'Branding & UI/UX Design',
      tag: 'Design',
      description: 'Complete logo design systems, UI design kits, interactive mockups, and corporate brand alignments that stand out in crowded markets.',
      bullets: ['Logo & visual identity systems', 'UI component design kits', 'Interactive Figma prototypes', 'Motion & interaction design'],
      color: '#EC4899',
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: 'Digital Marketing & Growth',
      tag: 'Growth',
      description: 'Conversion rate optimization, custom tracking dashboards, search engine optimization, and targeted marketing strategy.',
      bullets: ['SEO & content optimization', 'CRO & A/B testing strategy', 'Custom analytics dashboards', 'Performance ad management'],
      color: '#F97316',
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-28 md:py-36 bg-transparent flex flex-col items-center px-6 overflow-hidden"
    >
      {/* Parallax floating orbs */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.025, 0.05, 0.025] }}
          transition={{ duration: 7, repeat: Infinity }}
          style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.4) 0%, transparent 70%)' }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.02, 0.045, 0.02] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          style={{ background: 'radial-gradient(circle, rgba(0,85,255,0.5) 0%, transparent 70%)' }}
        />
      </motion.div>

      <div className="max-w-[1400px] w-full flex flex-col gap-20 relative z-10">

        {/* Section Header — Content Emergence 3D launch */}
        <ContentEmergence intensity="feature" delay={0} className="flex flex-col items-center text-center gap-5 max-w-[800px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-[#00C8FF]/60 w-12" />
            <span className="font-space-grotesk text-[0.7rem] tracking-[0.3em] text-[#00C8FF] uppercase">OUR CAPABILITIES</span>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-[#00C8FF]/60 w-12" />
          </div>

          <h2 className="font-orbitron font-extrabold text-[2rem] md:text-[3.2rem] text-white leading-[1.15] uppercase text-center">
            INTELLIGENT SOLUTION
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00C8FF] to-[#0055FF]">
              ENGINEERING
            </span>
          </h2>

          <p className="text-white/55 text-[0.95rem] leading-relaxed max-w-[640px]">
            Six engineering disciplines. One unified team. We cover the complete digital product lifecycle — from intelligent architecture to high-conversion interfaces.
          </p>
        </ContentEmergence>

        {/* Services Grid — each card has ContentEmergence animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, index) => (
            <ContentEmergence key={service.title} delay={index * 90} intensity="card" className="h-full">
              <motion.div
                className="relative rounded-xl cursor-pointer overflow-hidden group h-full"
                style={{ border: `1px solid rgba(255,255,255,0.08)`, background: 'rgba(3, 10, 24, 0.52)' }}
                whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
                onClick={() => setActiveService(activeService === index ? null : index)}
              >
                {/* Animated colored glow on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${service.color}18 0%, transparent 65%)`,
                    boxShadow: `inset 0 0 0 1px ${service.color}25`,
                    borderRadius: 'inherit'
                  }}
                />

                {/* Animated top accent line */}
                <motion.div
                  className="absolute top-0 left-0 h-[2px]"
                  style={{ background: `linear-gradient(to right, ${service.color}, transparent)` }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '60%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="p-7 flex flex-col gap-4">
                  {/* Icon + Tag */}
                  <div className="flex items-center justify-between">
                    <motion.div
                      className="p-3 rounded-lg"
                      style={{ background: `${service.color}12`, border: `1px solid ${service.color}25`, color: service.color }}
                      whileHover={{ scale: 1.15, rotate: 8, transition: { duration: 0.25 } }}
                      animate={{ boxShadow: [`0 0 0px ${service.color}00`, `0 0 14px ${service.color}30`, `0 0 0px ${service.color}00`] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                    >
                      {service.icon}
                    </motion.div>
                    <motion.span
                      className="font-space-grotesk text-[0.65rem] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                      style={{ background: `${service.color}12`, border: `1px solid ${service.color}28`, color: service.color }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {service.tag}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <h3 className="font-orbitron font-bold text-[1.05rem] text-white tracking-wide uppercase">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-[0.85rem] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Expanded bullets */}
                  <AnimatePresence>
                    {activeService === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-2 border-t flex flex-col gap-2" style={{ borderColor: `${service.color}22` }}>
                          {service.bullets.map((b, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -12 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.08, duration: 0.4 }}
                              className="flex items-center gap-2"
                            >
                              <CheckCircle2 size={14} style={{ color: service.color }} className="shrink-0" />
                              <span className="text-white/65 text-[0.82rem]">{b}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand toggle */}
                  <motion.button
                    className="flex items-center gap-1 text-[0.72rem] font-space-grotesk tracking-[0.1em] uppercase mt-auto pt-2 w-fit"
                    style={{ color: `${service.color}90` }}
                    whileHover={{ x: 3, color: service.color }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeService === index ? 'Show Less' : 'Learn More'}
                    <motion.span animate={{ rotate: activeService === index ? 90 : 0 }} transition={{ duration: 0.3 }}>
                      <ArrowRight size={12} />
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            </ContentEmergence>
          ))}
        </div>

        {/* CTA Banner — ContentEmergence */}
        <ContentEmergence intensity="feature" delay={150}>
          <motion.div
            className="rounded-2xl border border-[#00C8FF]/18 p-8 md:p-12 flex flex-col md:flex-row items-center gap-6 justify-between relative overflow-hidden"
            style={{ background: 'rgba(3, 10, 24, 0.52)', backdropFilter: 'blur(12px)' }}
          >
            {/* Animated shimmer sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
              style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(0,200,255,0.06) 50%, transparent 60%)', width: '200%' }}
            />
            <div className="flex flex-col gap-2 relative">
              <h3 className="font-orbitron font-bold text-[1.3rem] md:text-[1.6rem] text-white uppercase">
                Need A Custom Scope?
              </h3>
              <p className="text-white/50 text-[0.9rem] max-w-[480px]">
                Our engineers will design a tailored solution architecture for your exact business challenges.
              </p>
            </div>
            <motion.a
              href="/contact"
              className="shrink-0 px-8 py-4 rounded-lg bg-gradient-to-r from-[#00C8FF] to-[#0055FF] text-white font-space-grotesk text-[0.8rem] tracking-[0.15em] uppercase font-semibold flex items-center gap-2"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,200,255,0.5)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              Start A Conversation <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </ContentEmergence>

      </div>
    </section>
  );
};

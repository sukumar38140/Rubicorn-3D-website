import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, Zap, Users, Star, ArrowRight } from 'lucide-react';
import { ContentEmergence } from '../ui/ContentEmergence';
import { useFrameSequence } from '../../contexts/FrameSequenceProvider';
import { JobOpening } from '../../types';

const perks = [
  { icon: '🚀', title: 'Mentorship First', desc: 'Learn directly from senior engineers and industry veterans' },
  { icon: '🌐', title: 'Real Projects', desc: 'Work on live client projects — not dummy exercises or sandbox tasks' },
  { icon: '💡', title: 'Innovation Culture', desc: 'Your ideas matter. We encourage creative problem-solving at every level' },
  { icon: '📜', title: 'Certificate & Letter', desc: 'Receive a formal letter of recommendation and skill certification on completion' },
  { icon: '⚡', title: 'Fast-Track Growth', desc: 'High performers are fast-tracked to full-time roles within the team' },
  { icon: '🎯', title: 'Stipend Based', desc: 'Performance-linked monthly stipend for qualified candidates' },
];

export const CareersSection: React.FC = () => {
  const { setSelectedJob } = useFrameSequence();
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const jobs: JobOpening[] = [
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Intern',
      department: 'Growth & Analytics',
      location: 'Hyderabad, India (Hybrid)',
      type: 'Internship (3-6 Months)',
      description: 'Join our marketing team to manage organic search campaigns, set up customer funnel analytics, run conversion optimization (CRO) tests, and coordinate digital brand identities across all platforms.',
      requirements: [
        'Fundamental understanding of SEO, keyword research, and page optimization.',
        'Familiarity with Google Analytics (GA4), Search Console, and marketing dashboards.',
        'Strong copywriting skills and creative mindset for social content creation.',
        'Data-oriented approach to monitoring click-through rates and campaign budgets.'
      ],
      dataJob: 'Digital Marketing Intern'
    },
    {
      id: 'sales-executive',
      title: 'Sales Executive Intern',
      department: 'Business Development',
      location: 'Hyderabad, India (Hybrid)',
      type: 'Internship (3-6 Months)',
      description: 'Support our growth pipeline by identifying enterprise prospects, conducting market research, setting up meeting outreach sequences, and maintaining our CRM contacts data with precision.',
      requirements: [
        'Exceptional written and verbal communication skills in English.',
        'Proactive research habits to profile decision makers and target accounts.',
        'Basic familiarity with CRM systems (HubSpot/Salesforce) and outbound mailing tools.',
        'Competitive spirit and high coachability to learn consultative tech sales.'
      ],
      dataJob: 'Sales Executive Intern'
    }
  ];

  const handleToggleJob = (id: string) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  const handleApplyNow = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    window.location.href = '/contact';
  };

  return (
    <section id="careers" className="relative w-full py-28 md:py-36 bg-transparent flex flex-col items-center px-6 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.025, 0.05, 0.025] }}
          transition={{ duration: 7, repeat: Infinity }}
          style={{ background: 'radial-gradient(circle, rgba(0,200,255,0.4) 0%, transparent 70%)' }}
        />
        <motion.div
          className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          style={{ background: 'radial-gradient(circle, rgba(0,85,255,0.5) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-[1100px] w-full flex flex-col gap-20 relative z-10">

        {/* Section Header — Content Emergence 3D launch */}
        <ContentEmergence intensity="feature" delay={0} className="flex flex-col items-center text-center gap-5 max-w-[800px] mx-auto">
          <div className="flex items-center gap-3">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-[#00C8FF]/60 w-12" />
            <span className="font-space-grotesk text-[0.7rem] tracking-[0.3em] text-[#00C8FF] uppercase">JOIN THE TEAM</span>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-[#00C8FF]/60 w-12" />
          </div>

          <h2 className="font-orbitron font-extrabold text-[2rem] md:text-[3.2rem] text-white leading-[1.15] uppercase text-center">
            BUILD THE FUTURE
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#00C8FF] to-[#0055FF]">
              WITH US
            </span>
          </h2>

          <p className="text-white/55 text-[0.95rem] leading-relaxed max-w-[600px]">
            We're building a team of relentlessly curious, high-output individuals. Work on cutting-edge technology while shaping digital futures.
          </p>
        </ContentEmergence>

        {/* Culture Stats — ContentEmergence with stagger */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: <Users size={22} />, value: '15+', label: 'Team Members' },
            { icon: <Star size={22} />, value: '98%', label: 'Intern Satisfaction' },
            { icon: <Zap size={22} />, value: '72H', label: 'Onboarding Sprint' },
          ].map((item, i) => (
            <ContentEmergence key={i} intensity="card" delay={i * 100} className="h-full">
              <motion.div
                whileHover={{ y: -6, scale: 1.04, transition: { duration: 0.25 } }}
                className="flex flex-col items-center gap-2 p-5 rounded-xl border border-white/[0.09] text-center relative overflow-hidden group cursor-default h-full justify-center"
                style={{ background: 'rgba(3, 10, 24, 0.52)', backdropFilter: 'blur(10px)' }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at center, rgba(0,200,255,0.07) 0%, transparent 70%)' }}
                />
                <motion.span
                  className="text-[#00C8FF] relative"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                >
                  {item.icon}
                </motion.span>
                <motion.div
                  className="font-orbitron font-extrabold text-[1.6rem] md:text-[2rem] text-white relative"
                  animate={{ textShadow: ['0 0 0px rgba(0,200,255,0)', '0 0 15px rgba(0,200,255,0.35)', '0 0 0px rgba(0,200,255,0)'] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                >
                  {item.value}
                </motion.div>
                <div className="font-space-grotesk text-[0.65rem] tracking-[0.2em] text-white/40 uppercase relative">{item.label}</div>
              </motion.div>
            </ContentEmergence>
          ))}
        </div>

        {/* Perks Grid — ContentEmergence */}
        <ContentEmergence intensity="feature" delay={150}>
          <div
            className="rounded-2xl border border-[#00C8FF]/18 p-8 md:p-10"
            style={{ background: 'rgba(3, 10, 24, 0.52)', backdropFilter: 'blur(12px)' }}
          >
            <motion.span
              className="font-space-grotesk text-[0.65rem] tracking-[0.3em] text-[#00C8FF] uppercase"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              INTERNSHIP BENEFITS
            </motion.span>
            <h3 className="font-orbitron font-bold text-[1.2rem] md:text-[1.5rem] text-white mt-2 mb-8 uppercase">What You Gain</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {perks.map((perk, i) => (
                <ContentEmergence key={i} delay={i * 70} intensity="secondary" className="h-full">
                  <motion.div
                    className="flex items-start gap-3 p-4 rounded-lg border border-white/[0.07] hover:border-[#00C8FF]/25 transition-colors duration-300 group cursor-default h-full"
                    style={{ background: 'rgba(3, 10, 24, 0.52)' }}
                    whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.25 } }}
                  >
                    <motion.span
                      className="text-[1.4rem] mt-0.5"
                      animate={{ rotate: [0, 8, -5, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.45 }}
                    >
                      {perk.icon}
                    </motion.span>
                    <div>
                      <div className="font-orbitron font-bold text-[0.85rem] text-white uppercase mb-1">{perk.title}</div>
                      <div className="text-white/45 text-[0.78rem] leading-relaxed">{perk.desc}</div>
                    </div>
                  </motion.div>
                </ContentEmergence>
              ))}
            </div>
          </div>
        </ContentEmergence>

        {/* Job Listings */}
        <div className="flex flex-col gap-4">
          <ContentEmergence intensity="secondary" delay={180}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-orbitron font-bold text-[1.1rem] text-white uppercase tracking-wide">Open Positions</h3>
              <motion.span
                className="font-space-grotesk text-[0.7rem] tracking-[0.2em] text-[#00C8FF] bg-[#00C8FF]/10 border border-[#00C8FF]/20 px-3 py-1 rounded-full uppercase"
                animate={{ boxShadow: ['0 0 0px rgba(0,200,255,0)', '0 0 10px rgba(0,200,255,0.2)', '0 0 0px rgba(0,200,255,0)'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {jobs.length} Open Roles
              </motion.span>
            </div>
          </ContentEmergence>

          {jobs.map((job, index) => {
            const isExpanded = expandedJobId === job.id;
            return (
              <ContentEmergence key={job.id} delay={200 + index * 100} intensity="card" className="w-full">
                <motion.div
                  className={`rounded-xl transition-colors duration-500 ${isExpanded ? 'border-[#00C8FF]/35' : 'border-white/[0.08] hover:border-[#00C8FF]/22'}`}
                  style={{
                    border: `1px solid ${isExpanded ? 'rgba(0,200,255,0.35)' : 'rgba(255,255,255,0.08)'}`,
                    background: isExpanded ? 'rgba(0,200,255,0.03)' : 'rgba(3, 10, 24, 0.52)',
                    backdropFilter: 'blur(10px)'
                  }}
                  animate={{ boxShadow: isExpanded ? '0 0 25px rgba(0,200,255,0.10)' : '0 0 0px rgba(0,200,255,0)' }}
                >
                  {/* Header */}
                  <motion.div
                    onClick={() => handleToggleJob(job.id)}
                    className="p-6 md:p-8 flex justify-between items-center cursor-pointer select-none"
                    whileHover={{ x: 2, transition: { duration: 0.2 } }}
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-3">
                        <motion.span
                          className="w-2 h-2 rounded-full bg-[#00C8FF] shrink-0"
                          animate={{ boxShadow: ['0 0 0px rgba(0,200,255,0.5)', '0 0 10px rgba(0,200,255,1)', '0 0 0px rgba(0,200,255,0.5)'] }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                        />
                        <h4 className="font-orbitron font-bold text-[0.95rem] md:text-[1.1rem] text-white uppercase tracking-wide">{job.title}</h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-5">
                        <span className="flex items-center gap-1.5 text-white/45 text-[0.72rem] uppercase">
                          <Briefcase size={12} className="text-[#00C8FF]/80" /> {job.department}
                        </span>
                        <span className="flex items-center gap-1.5 text-white/45 text-[0.72rem] uppercase">
                          <MapPin size={12} className="text-[#00C8FF]/80" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-white/45 text-[0.72rem] uppercase">
                          <Clock size={12} className="text-[#00C8FF]/80" /> {job.type}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      className="p-2 rounded-lg border border-white/10 text-white/40"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </motion.div>
                  </motion.div>

                  {/* Collapsible Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 md:px-8 md:pb-10 pt-2 border-t border-white/[0.04] flex flex-col gap-6">
                          <div className="flex flex-col gap-2">
                            <h5 className="font-orbitron font-bold text-[0.8rem] text-white/70 uppercase tracking-wider">Role Overview</h5>
                            <p className="text-white/50 text-[0.82rem] leading-relaxed max-w-[800px]">{job.description}</p>
                          </div>

                          <div className="flex flex-col gap-3">
                            <h5 className="font-orbitron font-bold text-[0.8rem] text-white/70 uppercase tracking-wider">Key Requirements</h5>
                            <ul className="flex flex-col gap-2 pl-1">
                              {job.requirements.map((req, rIdx) => (
                                <motion.li
                                  key={rIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: rIdx * 0.08, duration: 0.35 }}
                                  className="flex items-start gap-2.5"
                                >
                                  <span className="text-[#00C8FF] mt-1 shrink-0">•</span>
                                  <span className="text-white/45 text-[0.8rem] leading-relaxed">{req}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          <motion.button
                            onClick={() => handleApplyNow(job.dataJob)}
                            className="mt-2 w-fit px-6 py-3 rounded bg-[#00C8FF]/10 hover:bg-gradient-to-r hover:from-[#00C8FF] hover:to-[#0055FF] border border-[#00C8FF]/30 hover:border-transparent text-white font-space-grotesk text-[0.75rem] tracking-[0.15em] uppercase font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(0,200,255,0.35)] transition-all duration-300"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            Apply For This Position <ArrowRight size={14} />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </ContentEmergence>
            );
          })}
        </div>

      </div>
    </section>
  );
};

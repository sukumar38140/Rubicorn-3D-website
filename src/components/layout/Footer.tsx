import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, MessageSquare, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/why-rubicorn', label: 'Why Choose Us' },
    { to: '/services', label: 'Services' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/careers', label: 'Careers' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const services = [
    'Artificial Intelligence',
    'Web & Mobile Engineering',
    'Cybersecurity & Cloud',
    'Automation & ERP/CRM',
    'Branding & UI/UX',
    'Digital Marketing',
  ];

  const socials = [
    { icon: <Instagram size={16} />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <Linkedin size={16} />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Facebook size={16} />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <MessageSquare size={16} />, href: 'https://wa.me/919494565162', label: 'WhatsApp' },
  ];

  return (
    <footer className="relative w-full z-10 border-t border-[#00C8FF]/10 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00C8FF]/30 to-transparent" />

      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-[#00C8FF]/[0.02] blur-[80px] pointer-events-none" />

      {/* CTA Banner */}
      <div className="relative border-b border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-space-grotesk text-[0.65rem] tracking-[0.3em] text-[#00C8FF] uppercase mb-2">
              Ready to Launch?
            </p>
            <h3 className="font-orbitron font-bold text-[1.5rem] md:text-[2rem] text-white uppercase leading-tight">
              Start Your Project Today
            </h3>
          </div>
          <Link
            to="/contact"
            className="group shrink-0 flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00C8FF] to-[#0055FF] text-white font-space-grotesk text-[0.82rem] tracking-[0.15em] uppercase font-semibold shadow-[0_0_25px_rgba(0,200,255,0.3)] hover:shadow-[0_0_40px_rgba(0,200,255,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Get in Touch
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-14 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
        
        {/* Brand Column */}
        <div className="lg:col-span-1 flex flex-col gap-5">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/assets/logos/Rubicorn High Quality Logo.webp"
              alt="Rubicorn logo"
              className="h-[36px] w-auto filter drop-shadow-[0_0_8px_rgba(0,200,255,0.3)]"
            />
            <span className="font-orbitron font-black text-[1.1rem] tracking-[0.1em] bg-clip-text text-transparent bg-gradient-to-r from-white to-[#00C8FF]/80">
              RUBICORN
            </span>
          </Link>
          <p className="text-white/40 text-[0.82rem] leading-[1.75]">
            Delivering high-performance AI integration, enterprise-grade business automation, and premium web experience ecosystems globally.
          </p>
          {/* Social icons */}
          <div className="flex gap-2 mt-1">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-2.5 rounded-lg border border-white/[0.07] hover:border-[#00C8FF]/35 hover:bg-[#00C8FF]/[0.08] text-white/40 hover:text-[#00C8FF] transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-orbitron text-[0.75rem] tracking-[0.2em] text-white/60 uppercase font-semibold">
            Navigation
          </h4>
          <nav className="flex flex-col gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group flex items-center gap-1.5 text-white/45 hover:text-[#00C8FF] text-[0.83rem] transition-colors duration-300 w-fit"
              >
                <span className="w-0 h-[1px] bg-[#00C8FF] group-hover:w-3 transition-all duration-300" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Services Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-orbitron text-[0.75rem] tracking-[0.2em] text-white/60 uppercase font-semibold">
            Services
          </h4>
          <nav className="flex flex-col gap-2">
            {services.map((s) => (
              <Link
                key={s}
                to="/services"
                className="group flex items-center gap-1.5 text-white/45 hover:text-[#00C8FF] text-[0.83rem] transition-colors duration-300 w-fit"
              >
                <span className="w-0 h-[1px] bg-[#00C8FF] group-hover:w-3 transition-all duration-300" />
                {s}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-4">
          <h4 className="font-orbitron text-[0.75rem] tracking-[0.2em] text-white/60 uppercase font-semibold">
            Contact
          </h4>
          <div className="flex flex-col gap-3.5">
            <a href="mailto:contact@rubicorn.in" className="flex items-start gap-3 group">
              <div className="p-2 rounded bg-[#00C8FF]/[0.07] border border-[#00C8FF]/15 text-[#00C8FF] shrink-0 group-hover:bg-[#00C8FF]/[0.12] transition-colors duration-300">
                <Mail size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-white/25 text-[0.62rem] uppercase tracking-wider font-space-grotesk">Email</span>
                <span className="text-white/55 text-[0.82rem] group-hover:text-[#00C8FF] transition-colors duration-300 mt-0.5">
                  contact@rubicorn.in
                </span>
              </div>
            </a>
            <a href="tel:+919494565162" className="flex items-start gap-3 group">
              <div className="p-2 rounded bg-[#00C8FF]/[0.07] border border-[#00C8FF]/15 text-[#00C8FF] shrink-0 group-hover:bg-[#00C8FF]/[0.12] transition-colors duration-300">
                <Phone size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-white/25 text-[0.62rem] uppercase tracking-wider font-space-grotesk">Phone</span>
                <span className="text-white/55 text-[0.82rem] group-hover:text-[#00C8FF] transition-colors duration-300 mt-0.5">
                  +91 94945 65162
                </span>
              </div>
            </a>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-[#00C8FF]/[0.07] border border-[#00C8FF]/15 text-[#00C8FF] shrink-0">
                <MapPin size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-white/25 text-[0.62rem] uppercase tracking-wider font-space-grotesk">Location</span>
                <span className="text-white/55 text-[0.82rem] mt-0.5">Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-[0.75rem]">
            © {currentYear} Rubicorn Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="font-space-grotesk tracking-[0.08em] uppercase text-[0.65rem] text-white/20">
            Engineering Intelligence · Building Digital Futures
          </p>
        </div>
      </div>
    </footer>
  );
};

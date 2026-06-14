import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Monitor scroll height to apply glass background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
    if (!isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
    document.body.style.overflow = '';
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/why-rubicorn', label: 'Why Choose Us' },
    { to: '/services', label: 'Services' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/careers', label: 'Careers' },
    { to: '/contact', label: 'Contact Us' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] border-b transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-[#02060D]/65 backdrop-blur-[20px] border-[#00C8FF]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center gap-4 sm:gap-8">
          {/* Logo brand container linking to Home root */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 text-white font-orbitron font-black text-[1.15rem] tracking-[0.1em] z-50 shrink-0">
            <img
              src="/assets/logos/Rubicorn High Quality Logo.webp"
              alt="Rubicorn logo header"
              className="h-[36px] w-auto filter drop-shadow-[0_0_8px_rgba(0,200,255,0.3)]"
            />
            <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-[#00C8FF]/70 text-[0.8rem] sm:text-[1.15rem]">
              RUBICORN TECHNOLOGIES
            </span>
          </Link>

          {/* Desktop Nav menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-space-grotesk text-[0.82rem] tracking-[0.12em] uppercase transition-all duration-300 relative group ${
                    isActive 
                      ? 'text-[#00C8FF] drop-shadow-[0_0_6px_rgba(0,200,255,0.4)]' 
                      : 'text-white/70 hover:text-[#00C8FF]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span 
                      className={`absolute bottom-[-4px] left-0 h-[1.5px] bg-[#00C8FF] shadow-[0_0_8px_rgba(0,200,255,0.8)] transition-all duration-300 group-hover:w-full ${
                        isActive ? 'w-full' : 'w-0'
                      }`} 
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA Header Action */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded font-space-grotesk text-[0.78rem] tracking-[0.15em] text-[#00C8FF] border border-[#00C8FF]/25 hover:bg-[#00C8FF]/8 hover:border-[#00C8FF] hover:shadow-[0_0_15px_rgba(0,200,255,0.35)] transition-all duration-300 uppercase"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white/80 hover:text-[#00C8FF] p-2 transition-colors duration-300 z-50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav overlay menu */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-[#02060D]/98 z-[90] flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          isMobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-[-20px] pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMobileMenu}
              className="font-space-grotesk text-[1.1rem] tracking-[0.15em] uppercase text-white/80 hover:text-[#00C8FF] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="mt-4 px-6 py-3 rounded font-space-grotesk text-[0.85rem] tracking-[0.15em] text-[#00C8FF] border border-[#00C8FF]/30 hover:bg-[#00C8FF]/10 transition-colors duration-300 uppercase"
          >
            Start Project
          </Link>
        </nav>
      </div>
    </>
  );
};

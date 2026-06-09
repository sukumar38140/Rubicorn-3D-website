import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FrameSequenceProvider } from './contexts/FrameSequenceProvider';
import { FrameBackground } from './components/background/FrameBackground';
import { FramePreloader } from './components/background/FramePreloader';
import { Header } from './components/layout/Header';
import { ScrollToTop } from './components/layout/ScrollToTop';

import { Home } from './pages/Home';
import { WhyRubicornPage } from './pages/WhyRubicornPage';
import { ServicesPage } from './pages/ServicesPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';

export const App: React.FC = () => {
  const location = useLocation();

  return (
    <FrameSequenceProvider>
      <div className="relative min-h-screen text-white overflow-x-hidden">
        {/* Persistent background frame rendering engine and preloader */}
        <FrameBackground />
        <FramePreloader />

        {/* Global Navigation Header (persistent, does not hide during curl transitions) */}
        <Header />

        {/* Scroll utility that resets offset on routing change */}
        <ScrollToTop />

        {/* Main Content Area mapping page transitions with 3D perspective */}
        <main 
          className="relative w-full z-10"
          style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/why-rubicorn" element={<WhyRubicornPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Wildcard redirect to main landing fold */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </FrameSequenceProvider>
  );
};

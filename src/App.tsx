import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FrameSequenceProvider } from './contexts/FrameSequenceProvider';
import { EmergenceProvider } from './contexts/EmergenceContext';
import { FrameBackground } from './components/background/FrameBackground';
import { FramePreloader } from './components/background/FramePreloader';
import { Header } from './components/layout/Header';
import { ScrollToTop } from './components/layout/ScrollToTop';

const Home = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const WhyRubicornPage = React.lazy(() => import('./pages/WhyRubicornPage').then(m => ({ default: m.WhyRubicornPage })));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const TestimonialsPage = React.lazy(() => import('./pages/TestimonialsPage').then(m => ({ default: m.TestimonialsPage })));
const CareersPage = React.lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));

export const App: React.FC = () => {
  const location = useLocation();

  return (
    <FrameSequenceProvider>
      <EmergenceProvider>
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
              <React.Suspense fallback={null}>
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
              </React.Suspense>
            </AnimatePresence>
          </main>
        </div>
      </EmergenceProvider>
    </FrameSequenceProvider>
  );
};

import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { HeroSection } from '../components/hero/HeroSection';
import { WhyChooseRubicorn } from '../components/sections/WhyChooseRubicorn';
import { ServicesSection } from '../components/sections/ServicesSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { CareersSection } from '../components/sections/CareersSection';
import { ContactSection } from '../components/sections/ContactSection';

export const Home: React.FC = () => {
  return (
    <PageLayout id="scroll-experience">
      <HeroSection />
      <WhyChooseRubicorn />
      <ServicesSection />
      <TestimonialsSection />
      <CareersSection />
      <ContactSection />
    </PageLayout>
  );
};

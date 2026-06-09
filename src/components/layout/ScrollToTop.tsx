import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset page offset immediately on routing change
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Dispatch a scroll event inside a requestAnimationFrame block to trigger canvas frame update checks
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('scroll'));
    });
  }, [pathname]);

  return null;
};

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface FrameSequenceContextType {
  isMobile: boolean;
  isLoading: boolean;
  preloadProgress: number;
  images: React.MutableRefObject<Record<number, HTMLImageElement>>;
  loadedStatus: React.MutableRefObject<Record<number, boolean>>;
  startFrame: number;
  endFrame: number;
  totalFrames: number;
  skipPreloader: () => void;
  selectedJob: string;
  setSelectedJob: (job: string) => void;
}

const FrameSequenceContext = createContext<FrameSequenceContextType | undefined>(undefined);

export const useFrameSequence = () => {
  const context = useContext(FrameSequenceContext);
  if (!context) {
    throw new Error('useFrameSequence must be used within a FrameSequenceProvider');
  }
  return context;
};

export const FrameSequenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preloadProgress, setPreloadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState('');

  // Check if we should serve mobile or desktop frame assets based on screen width/ratios
  const shouldUseMobileAssets = (): boolean => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (width <= 768) return true;
    if (width <= 1024 && height > width) return true; // Tablet portrait mode
    return false;
  };

  const [isMobile, setIsMobile] = useState(shouldUseMobileAssets());

  const startFrame = isMobile ? 12 : 1;
  const endFrame = 240;
  const totalFrames = endFrame - startFrame + 1;

  const images = useRef<Record<number, HTMLImageElement>>({});
  const loadedStatus = useRef<Record<number, boolean>>({});

  const pad = (num: number) => String(num).padStart(3, '0');
  
  const getFrameUrl = (index: number) => {
    const folder = isMobile ? 'mobile' : 'desktop';
    return `/assets/${folder}/ezgif-frame-${pad(index)}.webp`;
  };

  const skipPreloader = () => {
    setIsLoading(false);
  };

  // Preloading parameters (Wait for first 1 frame to load before releasing preloader for instant entry)
  const initialPreloadCount = Math.min(1, totalFrames);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setPreloadProgress(0);
    images.current = {};
    loadedStatus.current = {};

    const frameIndices: number[] = [];
    // Queue initial frames first
    for (let i = 0; i < initialPreloadCount; i++) {
      frameIndices.push(startFrame + i);
    }
    // Queue secondary frames next
    for (let i = initialPreloadCount; i < totalFrames; i++) {
      frameIndices.push(startFrame + i);
    }

    let nextQueueIndex = 0;
    let initialLoadedCount = 0;

    const loadNext = () => {
      if (!active || nextQueueIndex >= frameIndices.length) return;

      const queueIndex = nextQueueIndex++;
      const frameNameIndex = frameIndices[queueIndex];
      const img = new Image();
      img.src = getFrameUrl(frameNameIndex);

      let isProcessed = false;

      // Wrap loading in a timeout check to prevent network hang freezes
      const loadTimeout = setTimeout(() => {
        if (!active || isProcessed) return;
        isProcessed = true;
        console.warn(`Timeout loading frame: ${img.src}`);
        handleFrameProcessed();
      }, 3000);

      const handleFrameProcessed = () => {
        if (!active) return;
        if (queueIndex < initialPreloadCount) {
          initialLoadedCount++;
          const percent = Math.round((initialLoadedCount / initialPreloadCount) * 100);
          setPreloadProgress(percent);

          if (initialLoadedCount === initialPreloadCount) {
            setIsLoading(false);
          }
        }
        loadNext();
      };

      img.onload = () => {
        clearTimeout(loadTimeout);
        if (!active || isProcessed) return;
        isProcessed = true;

        // Perform asynchronous image decoding off the main thread before cache save
        img.decode()
          .then(() => {
            if (!active) return;
            images.current[frameNameIndex] = img;
            loadedStatus.current[frameNameIndex] = true;
            handleFrameProcessed();
          })
          .catch((err) => {
            console.error(`Decoding failed for: ${img.src}`, err);
            // Even if decoding fails, save img reference as fallback drawing source
            if (active) {
              images.current[frameNameIndex] = img;
              loadedStatus.current[frameNameIndex] = true;
              handleFrameProcessed();
            }
          });
      };

      img.onerror = () => {
        clearTimeout(loadTimeout);
        if (!active || isProcessed) return;
        isProcessed = true;
        console.error(`Error loading frame: ${img.src}`);
        handleFrameProcessed();
      };
    };

    // Spin up 8 parallel loading connections
    const pipelines = 8;
    for (let p = 0; p < pipelines; p++) {
      loadNext();
    }

    return () => {
      active = false;
    };
  }, [isMobile]);

  // Window Resize listener to update mobile asset configurations
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = shouldUseMobileAssets();
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <FrameSequenceContext.Provider value={{
      isMobile,
      isLoading,
      preloadProgress,
      images,
      loadedStatus,
      startFrame,
      endFrame,
      totalFrames,
      skipPreloader,
      selectedJob,
      setSelectedJob
    }}>
      {children}
    </FrameSequenceContext.Provider>
  );
};

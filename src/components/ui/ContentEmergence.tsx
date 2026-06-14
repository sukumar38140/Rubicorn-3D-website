import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useEmergence } from '../../contexts/EmergenceContext';
import { useFrameSequence } from '../../contexts/FrameSequenceProvider';

export type EmergenceIntensity = 'hero' | 'feature' | 'card' | 'secondary';

interface ContentEmergenceProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  intensity?: EmergenceIntensity;
  delay?: number; // in milliseconds
  once?: boolean;
  style?: React.CSSProperties;
}

export const ContentEmergence: React.FC<ContentEmergenceProps> = ({
  children,
  id: propId,
  className = '',
  intensity = 'feature',
  delay = 0,
  once = true,
  style = {},
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useFrameSequence();
  const {
    registerEmergence,
    updateEmergence,
    unregisterEmergence,
    triggerPulse,
  } = useEmergence();

  // Create a unique ID for context tracking if not provided
  const [uniqueId] = useState(() => propId || `emergence-${Math.random().toString(36).substr(2, 9)}`);
  const animationFinishedRef = useRef(false);

  // Trigger emergence animation when element is scrolled into view (with a margin offset)
  const isInView = useInView(elementRef, { once, margin: '-50px 0px' });

  // Map string intensities to floating coefficients (0.0 to 1.0)
  const intensityMap: Record<EmergenceIntensity, number> = {
    hero: 1.0,      // 100%
    feature: 0.6,   // 60%
    card: 0.4,      // 40%
    secondary: 0.2, // 20%
  };

  const intensityVal = intensityMap[intensity];

  // Mobile optimization flags
  const initialBlur = isMobile ? 0 : (8 * intensityVal);
  const p2Blur = isMobile ? 0 : (6 * intensityVal);
  const p3Blur = isMobile ? 0 : (3 * intensityVal);

  const initialZ = isMobile ? (-500 * intensityVal) : (-2500 * intensityVal);
  const p2Z = isMobile ? (-350 * intensityVal) : (-1800 * intensityVal);
  const p3Z = isMobile ? (-150 * intensityVal) : (-900 * intensityVal);
  const p4Z = isMobile ? (15 * intensityVal) : (50 * intensityVal);

  const initialScale = 1 - (1 - 0.15) * intensityVal;
  const initialOpacity = 1 - (1 - 0.2) * intensityVal;

  const p2Scale = 1 - (1 - 0.35) * intensityVal;
  const p2Opacity = 1 - (1 - 0.4) * intensityVal;

  const p3Scale = 1 - (1 - 0.65) * intensityVal;
  const p3Opacity = 1 - (1 - 0.7) * intensityVal;

  const p4Scale = 1 + (1.05 - 1) * intensityVal;

  // Real-time animation phase and bounding coordinate tracker
  useEffect(() => {
    if (!isInView || animationFinishedRef.current) return;

    // On mobile, bypass canvas telemetry coordinate tracking loop entirely to save layout checks
    if (isMobile) {
      animationFinishedRef.current = true;
      return;
    }

    registerEmergence(uniqueId, intensityVal);

    const startTime = performance.now() + delay;
    let animId: number;

    const trackEmergence = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        // Still waiting for delay trigger
        animId = requestAnimationFrame(trackEmergence);
        return;
      }

      const duration = 1600; // 1.6s total duration
      const progress = Math.min(elapsed / duration, 1);

      // Determine the active phase
      let phase: 'presence' | 'acceleration' | 'travel' | 'arrival' | 'settlement' | 'idle' = 'presence';
      if (elapsed >= 1400) {
        phase = 'settlement';
      } else if (elapsed >= 1100) {
        phase = 'arrival';
      } else if (elapsed >= 600) {
        phase = 'travel';
      } else if (elapsed >= 200) {
        phase = 'acceleration';
      }

      // Calculate layout coordinates relative to viewport
      let rect = { x: 0, y: 0, width: 0, height: 0 };
      if (elementRef.current) {
        const domRect = elementRef.current.getBoundingClientRect();
        rect = {
          x: domRect.left + domRect.width / 2,
          y: domRect.top + domRect.height / 2,
          width: domRect.width,
          height: domRect.height,
        };
      }

      updateEmergence(uniqueId, {
        phase,
        progress,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      });

      if (progress < 1) {
        animId = requestAnimationFrame(trackEmergence);
      } else {
        animationFinishedRef.current = true;

        // Card arrival triggers an environmental energy pulse at its center
        if (intensity === 'card' || intensity === 'hero' || intensity === 'feature') {
          triggerPulse(rect.x, rect.y, '#00C8FF');
        }

        updateEmergence(uniqueId, { phase: 'idle', progress: 1 });
        
        // Retain coordinates for a moment to let background shaders settle smoothly
        setTimeout(() => {
          unregisterEmergence(uniqueId);
        }, 500);
      }
    };

    animId = requestAnimationFrame(trackEmergence);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [
    isInView,
    delay,
    uniqueId,
    intensity,
    intensityVal,
    registerEmergence,
    updateEmergence,
    unregisterEmergence,
    triggerPulse,
  ]);

  // Framer Motion keyframe configuration
  const emergenceVariants = {
    hidden: {
      scale: initialScale,
      opacity: initialOpacity,
      z: initialZ,
      filter: isMobile ? 'none' : `blur(${initialBlur}px)`,
    },
    visible: {
      scale: [initialScale, initialScale, p2Scale, p3Scale, p4Scale, 1],
      opacity: [initialOpacity, initialOpacity, p2Opacity, p3Opacity, 1, 1],
      z: [initialZ, initialZ, p2Z, p3Z, p4Z, 0],
      filter: isMobile
        ? 'none'
        : [
            `blur(${initialBlur}px)`,
            `blur(${initialBlur}px)`,
            `blur(${p2Blur}px)`,
            `blur(${p3Blur}px)`,
            'blur(0px)',
            'blur(0px)',
          ],
      transition: {
        duration: 1.6,
        times: [0, 0.125, 0.375, 0.6875, 0.875, 1],
        ease: [
          [0, 0, 1, 1],        // 0ms - 200ms (hold)
          [0.4, 0, 1, 1],      // 200ms - 600ms (acceleration)
          [0, 0, 1, 1],        // 600ms - 1100ms (travel)
          [0.16, 1, 0.3, 1],   // 1100ms - 1400ms (arrival overshoot)
          [0.25, 1, 0.5, 1],   // 1400ms - 1600ms (settle)
        ],
        delay: delay / 1000,
      },
    },
  };

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={emergenceVariants}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity, filter',
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

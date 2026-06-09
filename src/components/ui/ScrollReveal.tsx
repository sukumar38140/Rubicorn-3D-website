import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'flipX' | 'flipY' | 'rotate' | 'blur';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  type?: AnimationType;
  duration?: number;
  once?: boolean;
}

const variants: Record<AnimationType, { hidden: object; visible: object }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 48, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -40, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.75, filter: 'blur(6px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' }
  },
  flipX: {
    hidden: { opacity: 0, rotateX: 60, y: 30 },
    visible: { opacity: 1, rotateX: 0, y: 0 }
  },
  flipY: {
    hidden: { opacity: 0, rotateY: 45, x: 20 },
    visible: { opacity: 1, rotateY: 0, x: 0 }
  },
  rotate: {
    hidden: { opacity: 0, rotate: -8, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(16px)', scale: 1.05 },
    visible: { opacity: 1, filter: 'blur(0px)', scale: 1 }
  }
};

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  type = 'fadeUp',
  duration = 0.75,
  once = true
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      variants={variants[type]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1]
      }}
      style={{ transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

import React, { useRef, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Skip tilt mousemove listeners on touch devices to save CPU cycles
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for radial glow positioning
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // Calculate 3D tilt metrics
      const width = rect.width;
      const height = rect.height;
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotX = -((mouseY / (height / 2)) * maxTilt).toFixed(2);
      const rotY = ((mouseX / (width / 2)) * maxTilt).toFixed(2);

      // Apply 3D matrix transform
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'none'; // Avoid delay lag during moves
    };

    const handleMouseLeave = () => {
      // Reset layout with smooth transition on mouse leave
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove, { passive: true });
    card.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return (
    <div
      ref={cardRef}
      data-tilt
      className={`relative rounded-xl overflow-hidden glass-panel glass-panel-hover p-8 z-10 flex flex-col gap-4 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(1000px)'
      }}
    >
      {/* Radial Hover glow overlays element */}
      <div 
        className="card-glow absolute pointer-events-none rounded-full"
        style={{
          left: 'var(--mouse-x, 0px)',
          top: 'var(--mouse-y, 0px)'
        }}
      />
      {/* Content wrapper relative to render on top of glow background */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

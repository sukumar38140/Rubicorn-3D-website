import React, { useRef, useEffect } from 'react';
import { useFrameSequence } from '../../contexts/FrameSequenceProvider';

export const FrameBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    images,
    loadedStatus,
    startFrame,
    endFrame,
    totalFrames
  } = useFrameSequence();

  // Reference hooks to keep track of variables without trigger-rendering React
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const isLoopRunningRef = useRef(false);

  const lerpFactor = 0.15; // Smooth transition velocity coefficient

  // Drawing method executing object-fit cover scale logic
  const drawFrame = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frameIndex: number) => {
    const frameNameIndex = startFrame + frameIndex;
    let img = images.current[frameNameIndex];

    // Fallback: search closest cached buffer image if active index is still downloading
    if (!img || !loadedStatus.current[frameNameIndex]) {
      let nearestIndex = -1;
      let minDiff = Infinity;
      
      for (let i = startFrame; i <= endFrame; i++) {
        if (loadedStatus.current[i] && images.current[i]) {
          const diff = Math.abs(i - frameNameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            nearestIndex = i;
          }
        }
      }
      
      if (nearestIndex !== -1) {
        img = images.current[nearestIndex];
      } else {
        return; // No assets preloaded yet
      }
    }

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    // Scale canvas dimensions based on DPR to prevent blurred pixels
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;
    let drawWidth, drawHeight, x, y;

    if (imgRatio > canvasRatio) {
      drawHeight = height;
      drawWidth = height * imgRatio;
      x = (width - drawWidth) / 2;
      y = 0;
    } else {
      drawWidth = width;
      drawHeight = width / imgRatio;
      x = 0;
      y = (height - drawHeight) / 2;
    }

    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  };

  // Main rendering loop (Runs inside requestAnimationFrame context)
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      isLoopRunningRef.current = false;
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      isLoopRunningRef.current = false;
      return;
    }

    const diff = targetFrameRef.current - currentFrameRef.current;

    // Check if we have arrived at the target frame index (with subpixel tolerance)
    if (Math.abs(diff) > 0.005) {
      currentFrameRef.current += diff * lerpFactor;
      drawFrame(ctx, canvas, Math.round(currentFrameRef.current));
      
      // Request next frame update
      animationFrameIdRef.current = requestAnimationFrame(animate);
    } else {
      // Snap exactly to target frame index and pause the requestAnimationFrame loop to conserve battery/thermals
      currentFrameRef.current = targetFrameRef.current;
      drawFrame(ctx, canvas, Math.round(currentFrameRef.current));
      
      isLoopRunningRef.current = false;
      animationFrameIdRef.current = null;
    }
  };

  // Function to request loop animation restart if scroll movement is active
  const startAnimationLoop = () => {
    if (!isLoopRunningRef.current) {
      isLoopRunningRef.current = true;
      animationFrameIdRef.current = requestAnimationFrame(animate);
    }
  };

  // Scroll listener that updates target frame target ref values
  useEffect(() => {
    let scrollHeight = document.documentElement.scrollHeight;
    let clientHeight = document.documentElement.clientHeight;
    let maxScroll = scrollHeight - clientHeight;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      
      // Map scroll value to progress fraction and clamp to handle Safari bounce scroll
      const fraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const clampedFraction = Math.max(0, Math.min(1, fraction));
      
      // Update target frames index ref pointer
      targetFrameRef.current = clampedFraction * (totalFrames - 1);
      
      // Kickstart loop animation if it was paused
      startAnimationLoop();
    };

    // ResizeObserver tracks dynamic page changes (like Careers openings folds, etc.)
    const resizeObserver = new ResizeObserver(() => {
      scrollHeight = document.documentElement.scrollHeight;
      clientHeight = document.documentElement.clientHeight;
      maxScroll = scrollHeight - clientHeight;
      handleScroll(); // Recalculate mapping on container updates
    });

    resizeObserver.observe(document.body);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Draw initial frame once mounts
    handleScroll();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [totalFrames]);

  // Window resize callback listener
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      drawFrame(ctx, canvas, Math.round(currentFrameRef.current));
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[-10] pointer-events-none bg-[#02060D]">
      <canvas ref={canvasRef} className="w-full h-full block object-cover" />
    </div>
  );
};

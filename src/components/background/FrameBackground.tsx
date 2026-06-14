import React, { useRef, useEffect } from 'react';
import { useFrameSequence } from '../../contexts/FrameSequenceProvider';
import { useEmergence } from '../../contexts/EmergenceContext';

interface Particle {
  x: number;
  y: number;
  z: number;
  speed: number;
  size: number;
  color: string;
  alpha: number;
}

export const FrameBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    images,
    loadedStatus,
    startFrame,
    endFrame,
    totalFrames,
    isMobile,
  } = useFrameSequence();

  const { emergencesRef, pulsesRef } = useEmergence();

  // Reference hooks to keep track of variables without trigger-rendering React
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const isLoopRunningRef = useRef(false);

  const particlesRef = useRef<Particle[]>([]);

  const lerpFactor = 0.15; // Smooth transition velocity coefficient

  // Initialize particles once on mount or when isMobile changes
  useEffect(() => {
    const pCount = isMobile ? 24 : 80;
    const items: Particle[] = [];
    for (let i = 0; i < pCount; i++) {
      items.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        z: Math.random() * 1000,
        speed: 1.2 + Math.random() * 1.8,
        size: 0.8 + Math.random() * 2.2,
        color: '#00C8FF',
        alpha: 0.12 + Math.random() * 0.38,
      });
    }
    particlesRef.current = items;
  }, [isMobile]);

  // Update particles and draw environmental reactions (portal glows, particles speed-up & suction pull, energy wave ripples)
  const drawEnvironmentReactions = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const now = performance.now();
    const activeEmergences = Object.values(emergencesRef.current).filter(
      (e) => e.phase !== 'idle'
    );

    // 1. Draw Portal Glows behind/around emerging components (skipped on mobile for scroll performance)
    if (!isMobile) {
      activeEmergences.forEach((e) => {
        let radius = e.width * 0.75;
        let alpha = 0.22 * e.intensity;

        if (e.phase === 'presence') {
          radius = e.width * 0.45 * (0.5 + e.progress * 0.5);
          alpha = 0.12 * e.intensity * e.progress;
        } else if (e.phase === 'acceleration') {
          radius = e.width * (0.45 + e.progress * 0.3);
          alpha = (0.12 + e.progress * 0.1) * e.intensity;
        } else if (e.phase === 'travel') {
          radius = e.width * (0.75 + Math.sin(now * 0.008) * 0.04);
          alpha = 0.26 * e.intensity;
        } else if (e.phase === 'arrival') {
          radius = e.width * (0.75 + (1 - e.progress) * 0.08);
          alpha = 0.26 * (1 - e.progress) * e.intensity;
        } else if (e.phase === 'settlement') {
          radius = e.width * 0.75;
          alpha = 0.08 * (1 - e.progress) * e.intensity;
        }

        // Safeguard: radial gradient throws index size error if radius is <= 0 or NaN. Also prevent alpha NaNs.
        if (isNaN(radius) || radius <= 0.001 || isNaN(alpha) || alpha <= 0 || isNaN(e.x) || isNaN(e.y)) return;

        const grad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, radius);
        grad.addColorStop(0, `rgba(0, 200, 255, ${alpha})`);
        grad.addColorStop(0.45, `rgba(0, 85, 255, ${alpha * 0.45})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(e.x, e.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 2. Update and Draw Particles
    const particles = particlesRef.current;
    const focalLength = 500;
    const cx = width / 2;
    const cy = height / 2;

    particles.forEach((p) => {
      let suctionX = 0;
      let suctionY = 0;
      let speedMultiplier = 1.0;

      activeEmergences.forEach((e) => {
        if (e.phase === 'acceleration' || e.phase === 'travel') {
          // Perspective projection for distance calculation
          const pzRatio = focalLength / (focalLength + p.z);
          const px = cx + (p.x - cx) * pzRatio;
          const py = cy + (p.y - cy) * pzRatio;

          const dx = e.x - px;
          const dy = e.y - py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Safeguard: prevent division by zero or NaN pull forces
          if (dist > 0.1 && !isNaN(dist)) {
            if (dist < 350) {
              const pullForce = (1 - dist / 350) * 2.2 * e.intensity;
              suctionX += (dx / dist) * pullForce * 4;
              suctionY += (dy / dist) * pullForce * 4;
              speedMultiplier = 2.4;
            }
          }
        }
      });

      p.z -= p.speed * speedMultiplier;
      p.x += suctionX;
      p.y += suctionY;

      // Reset when particle flies past camera, goes out of boundaries, or hits NaN
      if (
        p.z <= 0 ||
        p.x < -100 ||
        p.x > width + 100 ||
        p.y < -100 ||
        p.y > height + 100 ||
        isNaN(p.x) ||
        isNaN(p.y) ||
        isNaN(p.z)
      ) {
        p.z = 1000;
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        p.speed = 1.2 + Math.random() * 1.8;
        p.size = 0.8 + Math.random() * 2.2;
        p.alpha = 0.12 + Math.random() * 0.38;
      }

      // Projection mapping
      const pzRatio = focalLength / (focalLength + p.z);
      const px = cx + (p.x - cx) * pzRatio;
      const py = cy + (p.y - cy) * pzRatio;
      const psize = p.size * pzRatio * 1.6;

      if (!isNaN(px) && !isNaN(py) && px >= 0 && px <= width && py >= 0 && py <= height) {
        let alpha = p.alpha;
        if (p.z > 800) {
          alpha *= (1000 - p.z) / 200;
        } else if (p.z < 200) {
          alpha *= p.z / 200;
        }

        ctx.fillStyle = `rgba(0, 200, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, psize, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // 3. Draw energy wave pulses (skipped on mobile)
    if (!isMobile) {
      pulsesRef.current = pulsesRef.current.filter((p) => {
        const elapsed = now - p.startTime;
        const progress = elapsed / p.duration;

        if (progress >= 1) return false;

        const radius = progress * 240;
        const alpha = (1 - progress) * 0.32;

        // Safeguard: prevent drawing if invalid values exist
        if (isNaN(radius) || radius <= 0.001 || isNaN(p.x) || isNaN(p.y) || isNaN(alpha) || alpha <= 0) return true;

        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2.2 * (1 - progress);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(0, 200, 255, ${alpha * 0.08})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });
    } else {
      pulsesRef.current = [];
    }
  };

  // Drawing method executing object-fit cover scale logic
  const drawFrame = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frameIndex: number) => {
    const frameNameIndex = startFrame + frameIndex;
    let img = images.current[frameNameIndex];

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

    // Layer custom interactive portal, particle, and energy shockwaves on top of background sequence
    drawEnvironmentReactions(ctx, width, height);
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
    const hasScrollMovement = Math.abs(diff) > 0.005;

    // Redraw loop triggers if scrolling is active OR emergence events/energy pulses are animating
    const activeEmergenceCount = Object.values(emergencesRef.current).filter(
      (e) => e.phase !== 'idle'
    ).length;

    const activePulseCount = pulsesRef.current.filter(
      (p) => performance.now() - p.startTime < p.duration
    ).length;

    const needsRendering = hasScrollMovement || activeEmergenceCount > 0 || activePulseCount > 0;

    if (hasScrollMovement) {
      currentFrameRef.current += diff * lerpFactor;
    } else {
      currentFrameRef.current = targetFrameRef.current;
    }

    drawFrame(ctx, canvas, Math.round(currentFrameRef.current));

    if (needsRendering) {
      animationFrameIdRef.current = requestAnimationFrame(animate);
    } else {
      isLoopRunningRef.current = false;
      animationFrameIdRef.current = null;
    }
  };

  // Function to request loop animation restart
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
      const fraction = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const clampedFraction = Math.max(0, Math.min(1, fraction));
      
      targetFrameRef.current = clampedFraction * (totalFrames - 1);
      startAnimationLoop();
    };

    const resizeObserver = new ResizeObserver(() => {
      scrollHeight = document.documentElement.scrollHeight;
      clientHeight = document.documentElement.clientHeight;
      maxScroll = scrollHeight - clientHeight;
      handleScroll();
    });

    resizeObserver.observe(document.body);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    handleScroll();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [totalFrames]);

  // Listen to custom DOM events to trigger draw loops when page contents emerge
  useEffect(() => {
    const handleRenderNeeded = () => {
      startAnimationLoop();
    };
    window.addEventListener('emergence-render-needed', handleRenderNeeded, { passive: true });
    return () => {
      window.removeEventListener('emergence-render-needed', handleRenderNeeded);
    };
  }, []);

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

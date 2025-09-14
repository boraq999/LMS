'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

interface VenomBeamProps extends React.HTMLAttributes<HTMLDivElement> {
  beamColor?: string;
  beamWidth?: number;
  beamLength?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

const VenomBeam: React.FC<VenomBeamProps> = ({
  beamColor = 'hsl(var(--primary))',
  beamWidth = 1,
  beamLength = 70,
  delay = 0,
  duration = 10,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const beams: HTMLDivElement[] = [];

    const createBeam = (x: number, y: number) => {
      const beam = document.createElement('div');
      beam.className = 'venom-beam';
      Object.assign(beam.style, {
        '--beam-x': `${x}px`,
        '--beam-y': `${y}px`,
        '--beam-color': beamColor,
        '--beam-width': `${beamWidth}px`,
        '--beam-length': `${beamLength}px`,
        '--beam-duration': `${duration}s`,
        '--beam-delay': `${delay}s`,
      });
      beams.push(beam);
      container.appendChild(beam);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createBeam(x, y);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      for (const touch of Array.from(e.touches)) {
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        createBeam(x, y);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);

    const intervalId = setInterval(() => {
      beams.forEach((beam) => {
        const animation = beam.getAnimations()[0];
        if (animation?.playState === 'finished') {
          beam.remove();
          beams.shift();
        }
      });
    }, 1000);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      clearInterval(intervalId);
    };
  }, [beamColor, beamWidth, beamLength, delay, duration]);

  return (
    <>
      <style>{`
        @keyframes venom-beam-animation {
          from {
            opacity: 0.7;
            transform: scaleY(0);
          }
          to {
            opacity: 0;
            transform: scaleY(1);
          }
        }
        .venom-beam {
          position: absolute;
          top: var(--beam-y);
          left: var(--beam-x);
          width: var(--beam-width);
          height: var(--beam-length);
          background: var(--beam-color);
          transform-origin: top;
          animation: venom-beam-animation var(--beam-duration) ease-out forwards;
          animation-delay: var(--beam-delay);
          pointer-events: none;
        }
      `}</style>
      <div
        ref={containerRef}
        className={cn(
          'fixed inset-0 z-0 h-full w-full overflow-hidden',
          className
        )}
      />
    </>
  );
};

export default VenomBeam;

'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';

interface BeamsUpstreamProps extends React.HTMLAttributes<HTMLDivElement> {
  beamColor?: string;
  beamWidth?: number;
  beamCount?: number;
  beamLength?: number;
  delay?: number;
  duration?: number;
  className?: string;
}

const BeamsUpstream: React.FC<BeamsUpstreamProps> = ({
  beamColor = 'hsl(var(--super-admin-primary))',
  beamWidth = 1.5,
  beamCount = 30,
  beamLength = 150,
  delay = 0,
  duration = 15,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous beams
    container.innerHTML = '';

    for (let i = 0; i < beamCount; i++) {
      const beam = document.createElement('div');
      beam.className = 'beam-upstream';
      const randomX = Math.random() * 100;
      const randomDelay = Math.random() * duration;
      const randomDuration = duration * (0.8 + Math.random() * 0.4);

      Object.assign(beam.style, {
        left: `${randomX}%`,
        '--beam-color': beamColor,
        '--beam-width': `${beamWidth}px`,
        '--beam-length': `${beamLength}px`,
        '--beam-duration': `${randomDuration}s`,
        '--beam-delay': `${randomDelay}s`,
      });
      container.appendChild(beam);
    }
  }, [beamColor, beamWidth, beamCount, beamLength, delay, duration]);

  return (
    <>
      <style>{`
        @keyframes beams-upstream-animation {
          from {
            transform: translateY(0) scaleY(1);
            opacity: 0.5;
          }
          to {
            transform: translateY(calc(-100% - var(--beam-length))) scaleY(1);
            opacity: 0;
          }
        }
        .beam-upstream {
          position: absolute;
          bottom: calc(0% - var(--beam-length));
          width: var(--beam-width);
          height: var(--beam-length);
          background: linear-gradient(to top, transparent, var(--beam-color));
          animation: beams-upstream-animation var(--beam-duration) linear infinite;
          animation-delay: var(--beam-delay);
          pointer-events: none;
        }
      `}</style>
      <div
        ref={containerRef}
        className={cn(
          'fixed top-0 left-0 z-0 h-full w-full overflow-hidden',
          className
        )}
      />
    </>
  );
};

export { BeamsUpstream };

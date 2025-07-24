import React, { useCallback, useEffect, useRef } from 'react';
import styles from './GlobeIcon.module.css';

interface GlobeIconProps {
  color?: string;
  isAnimating?: boolean;
}

const GlobeIcon = ({
  color = '#6C7688',
  isAnimating = false,
}: GlobeIconProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);

  const FRAME_RATE = 60;
  const FRAME_DURATION = 1000 / FRAME_RATE;
  const ANIMATION_DURATION = 10000;

  const drawFrame = useCallback(
    (progress: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;

      const globeRadius = 78;
      const globeCenterX = 80;
      const globeCenterY = 80;

      for (let i = 0; i < 4; i += 1) {
        const ellipseProgress = (progress + i / 4) % 1;
        const xRadius =
          globeRadius * Math.abs(Math.cos(ellipseProgress * Math.PI));
        let startAngle;
        let endAngle;

        if (ellipseProgress < 0.5) {
          startAngle = Math.PI / 2;
          endAngle = (3 * Math.PI) / 2;
        } else {
          startAngle = (3 * Math.PI) / 2;
          endAngle = Math.PI / 2;
        }

        ctx.beginPath();
        ctx.ellipse(
          globeCenterX,
          globeCenterY,
          xRadius,
          globeRadius,
          0,
          startAngle,
          endAngle
        );
        ctx.stroke();
      }
    },
    [color]
  );

  const animate = useCallback(
    (currentTime: number) => {
      if (!isAnimating) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = 0;
        }
        return;
      }

      if (currentTime - lastFrameTimeRef.current < FRAME_DURATION) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastFrameTimeRef.current = currentTime;

      const progress = (currentTime % ANIMATION_DURATION) / ANIMATION_DURATION;
      drawFrame(progress);

      animationRef.current = requestAnimationFrame(animate);
    },
    [FRAME_DURATION, isAnimating, drawFrame]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = 160 * dpr;
      canvas.height = 160 * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    }
    // Draw initial frame
    drawFrame(0);
    // Start animation if isAnimating is true
    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, drawFrame, isAnimating]);

  return (
    <div
      className={`${styles.icon}`}
      style={{ '--globeGraphicColor': color } as React.CSSProperties}
    >
      <>
        <canvas ref={canvasRef} className={styles.ellipseCanvas} />

        <svg width='84' height='84' viewBox='0 0 42 42' fill='none'>
          <circle cx='20' cy='20' r='19.5' strokeWidth={1} stroke={color} />
          <path d='M3.5 9.5 36.5 9.5' strokeWidth={1} stroke={color} />
          <path d='M0 20 39 20' strokeWidth={1} stroke={color} />
          <path d='M3.5 30.5 36.5 30.5' strokeWidth={1} stroke={color} />
        </svg>
      </>
    </div>
  );
};

export default React.memo(GlobeIcon);

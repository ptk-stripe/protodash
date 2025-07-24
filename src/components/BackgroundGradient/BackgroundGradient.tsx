import { useEffect, useRef } from 'react';
import styles from './BackgroundGradient.module.css';

export default function BackgroundGradient({
  containerRef,
  focusAreas = [],
  isAnimating = true,
  className,
  isHidden,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  focusAreas?: Array<number>;
  isAnimating?: boolean;
  className?: string;
  isHidden?: boolean;
}) {
  const ellipse1Ref = useRef(null);
  const ellipse2Ref = useRef(null);
  const ellipse3Ref = useRef(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let e1X = 0;
    let e1Y = 0;
    let mouseX = 0;
    let mouseY = 0;

    const containerRefCurrent = containerRef.current;

    if (!containerRefCurrent) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRefCurrent) return;
      const b = containerRefCurrent.getBoundingClientRect();
      const w = b.width;
      const h = b.height;
      const x = b.x;
      const y = b.y;
      mouseX = (e.pageX - x) / w - 0.5;
      mouseY = ((e.pageY - y) / h) * 0.3 - 0.5;
    };

    // containerRefCurrent.addEventListener('mousemove', handleMouseMove);

    function updateCard() {
      if (!ellipse1Ref.current || !ellipse2Ref.current || !ellipse3Ref.current)
        return;

      const ellipse1 = ellipse1Ref.current as HTMLDivElement;
      const ellipse2 = ellipse2Ref.current as HTMLDivElement;
      const ellipse3 = ellipse3Ref.current as HTMLDivElement;

      // Smoothly interpolate towards target position
      e1X += 0.005 * (mouseX * 4 - e1X);
      e1Y += 0.005 * (mouseY * 5 - e1Y);

      const scaleX = focusAreas.length > 0 ? 0.25 : 1;
      const scaleY = 1;

      const timeShiftX1 = Math.sin(performance.now() * 0.00005) * 20;
      const timeShiftX2 = Math.sin(performance.now() * 0.00005 + 2) * 20;
      const timeShiftX3 = Math.sin(performance.now() * 0.00005 + 4) * 20;
      const timeShiftY1 = Math.cos(performance.now() * 0.00005) * 20;
      const timeShiftY2 = Math.cos(performance.now() * 0.00005 + 2) * 20;
      const timeShiftY3 = Math.cos(performance.now() * 0.00005 + 4) * 20;
      const focusShiftX = focusAreas.length > 0 ? (focusAreas[0] - 2) * 7 : 0;

      const x1 = (e1X * -10 + timeShiftX1) * scaleX + focusShiftX;
      const y1 = (e1Y * 10 + timeShiftY1) * scaleX;
      const x2 = (e1X * 10 + timeShiftX2) * scaleX + focusShiftX;
      const y2 = (e1Y * -10 + timeShiftY2) * scaleX;
      const x3 = (e1X * 10 + timeShiftX3) * scaleX + focusShiftX;
      const y3 = (e1Y * 10 + timeShiftY3) * scaleX;

      ellipse1.style.transform = `translate(${x1 - 50}%, ${y1 - 50}%) scaleX(${scaleX}) scaleY(${scaleY})`;
      ellipse2.style.transform = `translate(${x2 - 50}%, ${y2 - 50}%) scaleX(${scaleX}) scaleY(${scaleY})`;
      ellipse3.style.transform = `translate(${x3 - 50}%, ${y3 - 50}%) scaleX(${scaleX}) scaleY(${scaleY})`;

      if (isAnimating) {
        rafRef.current = requestAnimationFrame(updateCard);
      }
    }

    // Start the animation
    updateCard();

    return () => {
      if (containerRefCurrent) {
        // containerRefCurrent.removeEventListener('mousemove', handleMouseMove);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [containerRef, isAnimating, focusAreas]);

  return (
    <div
      className={`${styles.ellipseContainer} ${className} ${
        isHidden ? styles.isHidden : ''
      }`}
    >
      <div className={styles.ellipse1} ref={ellipse1Ref}></div>
      <div className={styles.ellipse2} ref={ellipse2Ref}></div>
      <div className={styles.ellipse3} ref={ellipse3Ref}></div>
    </div>
  );
}

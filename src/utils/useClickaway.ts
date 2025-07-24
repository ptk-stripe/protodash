import { RefObject, useEffect } from 'react';

type ClickAwayCallback = () => void;

/**
 * Hook that handles click-outside events for a given ref
 * @param ref - The ref to track
 * @param callback - Function to call when clicking outside
 * @param enabled - Whether the hook should be active (defaults to true)
 */
export function useClickaway<T extends Element>(
  ref: RefObject<T | null>,
  callback: ClickAwayCallback,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    function handleClickOutside(event: MouseEvent) {
      const mouseCoords = {
        x: event.clientX,
        y: event.clientY,
      };
      const refCoords = ref.current?.getBoundingClientRect();
      let isOutsideRef = true;
      // If there is a ref, check if the mouse is outside the ref
      if (refCoords) {
        isOutsideRef =
          mouseCoords.x < refCoords.left ||
          mouseCoords.x > refCoords.right ||
          mouseCoords.y < refCoords.top ||
          mouseCoords.y > refCoords.bottom;
      }
      // If the mouse is outside the ref, call the callback
      if (enabled && ref.current && isOutsideRef) {
        callback();
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, enabled]);
}


import { useCallback, useRef } from 'react';

interface TouchOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  swipeThreshold?: number;
}

export function useTouch({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  swipeThreshold = 50,
}: TouchOptions, debounceTime: number = 0) {
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const lastSwipeTime = useRef<number>(0);

  const handleTouchStart = useCallback((e: React.TouchEvent | TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent | TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    touchEndY.current = e.changedTouches[0].clientY;
    
    const now = Date.now();
    if (now - lastSwipeTime.current < debounceTime) return;
    
    const deltaX = touchEndX.current - touchStartX.current;
    const deltaY = touchEndY.current - touchStartY.current;
    
    // Determine if it's more of a horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
          lastSwipeTime.current = now;
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
          lastSwipeTime.current = now;
        }
      }
    } else {
      if (Math.abs(deltaY) > swipeThreshold) {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
          lastSwipeTime.current = now;
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
          lastSwipeTime.current = now;
        }
      }
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, swipeThreshold, debounceTime]);

  const handlers = {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
  };
  
  return { handlers };
}

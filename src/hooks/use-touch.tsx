
import * as React from "react";

type TouchDirection = "left" | "right" | "up" | "down" | null;
type TouchCallbacks = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
};

interface TouchPosition {
  x: number;
  y: number;
}

export function useTouch(callbacks?: TouchCallbacks, threshold: number = 50) {
  const [touchStart, setTouchStart] = React.useState<TouchPosition | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<TouchPosition | null>(null);
  const [direction, setDirection] = React.useState<TouchDirection>(null);
  
  // الحد الأدنى للمسافة للاعتراف بالحركة كتمرير
  const minSwipeDistance = threshold;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setDirection(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    
    let newDirection: TouchDirection = null;

    if (isHorizontalSwipe) {
      if (Math.abs(distanceX) < minSwipeDistance) {
        return;
      }
      if (distanceX > 0) {
        newDirection = "left";
        callbacks?.onSwipeLeft?.();
      } else {
        newDirection = "right";
        callbacks?.onSwipeRight?.();
      }
    } else {
      if (Math.abs(distanceY) < minSwipeDistance) {
        return;
      }
      if (distanceY > 0) {
        newDirection = "up";
        callbacks?.onSwipeUp?.();
      } else {
        newDirection = "down";
        callbacks?.onSwipeDown?.();
      }
    }
    
    setDirection(newDirection);
  };

  const handlers = {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };

  return { direction, handlers };
}

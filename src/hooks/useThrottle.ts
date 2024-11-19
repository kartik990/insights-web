import { useRef } from "react";

export function useThrottle(func: () => void, limit: number) {
  const lastRan = useRef(0);

  return () => {
    const now = Date.now();
    if (now - lastRan.current >= limit) {
      lastRan.current = now;
      func();
    }
  };
}

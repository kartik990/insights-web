import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function throttle(func: () => void, limit: number) {
  let lastRan: number = 0;
  return function () {
    if (Date.now() - lastRan >= limit) {
      lastRan = Date.now();
      func();
    }
  };
}

export const reqUploadOnS3 = () => {};

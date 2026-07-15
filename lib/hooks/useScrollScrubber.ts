import { useEffect, useRef, useState } from 'react';

interface UseScrollScrubberProps {
  frameCount: number;
  containerSelector: string;
  scrollMultiplier?: number;
}

export function useScrollScrubber({
  frameCount,
  containerSelector,
  scrollMultiplier = 1,
}: UseScrollScrubberProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.querySelector(containerSelector) as HTMLElement;
    if (!container) return;

    containerRef.current = container;

    const handleScroll = () => {
      if (!containerRef.current) return;

      // Get container dimensions
      const containerHeight = containerRef.current.clientHeight;
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1)
      // When container top is at bottom of viewport (entering), progress = 0
      // When container bottom is at top of viewport (leaving), progress = 1
      const scrollStart = windowHeight;
      const scrollEnd = -containerHeight;
      const progress = Math.max(
        0,
        Math.min(1, (scrollStart - containerTop) / (scrollStart - scrollEnd))
      );

      // Convert progress to frame index
      const frameIndex = Math.floor(progress * frameCount * scrollMultiplier);
      const clampedFrame = Math.min(frameIndex, frameCount - 1);

      setCurrentFrame(clampedFrame);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [frameCount, containerSelector, scrollMultiplier]);

  return currentFrame;
}
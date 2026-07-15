'use client'; // For Next.js App Router

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useScrollScrubber } from '@/lib/hooks/useScrollScrubber'; // adjust path based on your structure

interface ScrollScrubberProps {
  frameBasePath: string; // e.g., "/frames/aether/" - path to your optimized frames
  frameCount: number; // 60 in your case
  frameExtension?: string; // 'webp' (optimized) or 'jpg' (original)
  containerHeight?: string; // height of the scrubber section
  scrollMultiplier?: number; // how aggressive the scroll sensitivity is
}

export default function ScrollScrubberHero({
  frameBasePath,
  frameCount,
  frameExtension = 'webp',
  containerHeight = '400vh', // 4x viewport height = smooth 4-second scroll
  scrollMultiplier = 1,
}: ScrollScrubberProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [preloadedFrames, setPreloadedFrames] = useState<Record<number, string>>({});
  
  const currentFrame = useScrollScrubber({
    frameCount,
    containerSelector: '#scroll-scrubber-container',
    scrollMultiplier,
  });

  // Preload frames on mount
  useEffect(() => {
    const preloadFrames = async () => {
      const frames: Record<number, string> = {};
      
      for (let i = 1; i <= frameCount; i++) {
        const frameNum = String(i).padStart(3, '0');
        frames[i - 1] = `${frameBasePath}frame_${frameNum}.${frameExtension}`;
      }
      
      setPreloadedFrames(frames);
      setIsLoading(false);
    };

    preloadFrames();
  }, [frameCount, frameBasePath, frameExtension]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="animate-pulse text-white text-lg">Loading video...</div>
      </div>
    );
  }

  const currentFrameSrc = preloadedFrames[currentFrame];

  return (
    <div id="scroll-scrubber-container" style={{ height: containerHeight }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* Frame display */}
        <div className="relative w-full h-full">
          <Image
            key={currentFrame}
            src={currentFrameSrc}
            alt={`Frame ${currentFrame + 1} of ${frameCount}`}
            fill
            priority
            quality={85}
            className="object-cover"
            unoptimized // since we're using external URLs, not Next Image optimization
          />
        </div>

        {/* Optional overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 bg-gradient-to-t from-black/60 via-transparent to-transparent">
          <div className="text-center text-white max-w-2xl px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              From stuck to unstoppable
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Your partner in landing the perfect role
            </p>
            <a
              href="#services"
              className="inline-block px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors"
            >
              Explore Our Services
            </a>
          </div>
        </div>

        {/* Frame counter (optional - remove if you don't want it) */}
        <div className="absolute top-6 right-6 text-white text-sm font-mono opacity-60">
          {String(currentFrame + 1).padStart(2, '0')} / {String(frameCount).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
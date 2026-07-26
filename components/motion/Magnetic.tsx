'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import type { ReactNode, PointerEvent } from 'react';

// Motivation: primary CTAs get a subtle pull toward the cursor, signaling
// "this is the interactive, important thing" without being a gimmick.
// Continuous pointer tracking uses useMotionValue (not useState) so it
// never triggers a React re-render per pixel of mouse movement.
export default function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  if (reduce) return <>{children}</>;

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}

'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE_OUT } from '@/lib/motion-easing';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

// Motivation: a grid of cards (services, benefits, pricing tiers) arriving
// in a short cascade reads as "this was assembled with care" rather than
// popping in all at once. Each card is still readable well before the
// group finishes animating.
export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduce ? undefined : container}
      initial={reduce ? undefined : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={`h-full ${className || ''}`} variants={reduce ? undefined : item}>
      {children}
    </motion.div>
  );
}

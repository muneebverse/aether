'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE_OUT } from '@/lib/motion-easing';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

// Scroll-triggered entrance. Motivation: draws the eye down the page in
// reading order as sections come into view, instead of dumping everything
// on screen at once. Respects prefers-reduced-motion.
export default function Reveal({ children, delay = 0, y = 24, className, once = true }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

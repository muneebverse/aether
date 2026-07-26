'use client';
import { motion } from 'motion/react';
import { useCurrency } from '@/lib/CurrencyContext';

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="inline-flex items-center bg-white border border-aether-electric-teal/20 rounded-full p-1">
      {(['PKR', 'USD'] as const).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`relative px-4 py-1.5 rounded-full text-sm font-semibold min-h-[36px] touch-manipulation ${
            currency === c ? 'text-sky-white' : 'text-aether-deep-teal'
          }`}
        >
          {currency === c && (
            <motion.span
              layoutId="currency-active"
              className="absolute inset-0 -z-10 rounded-full bg-aether-electric-teal"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          {c}
        </button>
      ))}
    </div>
  );
}

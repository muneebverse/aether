'use client';
import { useCurrency } from '@/lib/CurrencyContext';

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="inline-flex items-center bg-white border border-aether-electric-teal border-opacity-20 rounded-full p-1">
      {(['PKR', 'USD'] as const).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all min-h-[36px] touch-manipulation ${
            currency === c ? 'bg-aether-electric-teal text-sky-white' : 'text-aether-deep-teal'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

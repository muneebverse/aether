'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrencyCode } from './currency';

const CurrencyContext = createContext<{
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
}>({ currency: 'PKR', setCurrency: () => {} });

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');

  useEffect(() => {
    const saved = localStorage.getItem('aether-currency') as CurrencyCode | null;
    if (saved) setCurrency(saved);
  }, []);

  const update = (c: CurrencyCode) => {
    setCurrency(c);
    localStorage.setItem('aether-currency', c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: update }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);

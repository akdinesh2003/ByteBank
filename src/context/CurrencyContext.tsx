
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'USD' | 'INR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currencySymbol: string;
}

const currencySymbols: { [key in Currency]: string } = {
  USD: '$',
  INR: '₹',
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const currencySymbol = currencySymbols[currency];

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export type CurrencyCode = 'PKR' | 'USD';

// Manual rate — update every few weeks, no live API dependency needed
const PKR_TO_USD_RATE = 1 / 280;

export function convertPrice(pkrAmount: number, currency: CurrencyCode): number {
  if (currency === 'PKR') return pkrAmount;
  return Math.round(pkrAmount * PKR_TO_USD_RATE);
}

export function formatPrice(pkrAmount: number, currency: CurrencyCode): string {
  const value = convertPrice(pkrAmount, currency);
  return currency === 'PKR'
    ? `Rs ${value.toLocaleString('en-PK')}`
    : `$${value.toLocaleString('en-US')}`;
}

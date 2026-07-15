export function formatCurrency(value: number, currency: string) {
  const symbol = currency === 'INR' ? '₹' : `${currency} `;
  return `${symbol}${value.toLocaleString('en-IN')}`;
}

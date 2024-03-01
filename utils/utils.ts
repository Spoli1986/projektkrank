export function formatPrice(price: number) {
  return (price / 100).toLocaleString('de-CH', {
    style: 'currency',
    currency: 'CHF',
  });
}

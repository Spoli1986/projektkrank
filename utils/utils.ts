import dayjs from 'dayjs';
import 'dayjs/locale/de'; // Import German locale

export function formatPrice(price: number) {
  return (price / 100).toLocaleString('de-CH', {
    style: 'currency',
    currency: 'CHF',
  });
}

export const formatDate = (date: Date): string => {
  // Set locale to German
  dayjs.locale('de');

  // Format the date
  return dayjs(date).format('ddd DD MMM YYYY');
};

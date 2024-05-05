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

export function generateRandomHexString(length: number): string {
  const characters = '0123456789ABCDEF';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export function getMapLink(location: string): string {
  if (typeof window !== 'undefined' && window.navigator) {
    const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
    const isAndroid = /Android/.test(window.navigator.userAgent);

    if (isIOS) {
      return `https://maps.apple.com/?q=${encodeURIComponent(location)}`;
    } else if (isAndroid) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    }
  }

  // Default to Google Maps link for other platforms or server-side rendering
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

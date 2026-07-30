import { formatPrice } from '../../../../utils/utils';

interface PriceTagProps { price: number; className?: string }

export default function PriceTag({ price, className = '' }: PriceTagProps) {
  return <span className={`price-pill ${className}`}>{formatPrice(price)}</span>;
}

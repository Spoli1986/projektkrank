import Link from 'next/link';
import { FiPackage, FiTruck } from 'react-icons/fi';
import ImageCarousel from './ImageCarousel';
import PriceTag from './PriceTag';
import AddToCartButton from './AddToCartButton';
import { incrementProductQuantity } from '@/app/shop/[id]/actions';

type Product = { imageUrl: string[]; price: number; id: string; name: string; description: string; createdAt: Date; updatedAt: Date; size: string | null };
type Props = { products: { product: Product; productSize: '' | Product[] | null | undefined } };

export default function SingleProductPage({ products }: Props) {
  const { product, productSize } = products;
  return (
    <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
      <ImageCarousel imageUrl={product.imageUrl} />
      <div className="lg:sticky lg:top-28">
        <p className="eyebrow">Official merch</p><h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl">{product.name}</h1><PriceTag price={product.price} className="mt-6 text-base" /><p className="mt-7 text-lg leading-8 text-zinc-300">{product.description}</p>
        {productSize && productSize.length > 0 && <div className="mt-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Grösse</p><div className="mt-3 flex flex-wrap gap-2">{productSize.map((option) => <Link key={option.id} href={`/shop/${option.id}`} className={`flex min-h-[2.75rem] min-w-12 items-center justify-center rounded-full border px-4 text-sm font-black uppercase transition ${option.id === product.id ? 'border-pk-green bg-pk-green text-black' : 'border-white/[0.15] bg-white/5 text-white hover:border-pk-green/50'}`}>{option.size}</Link>)}</div></div>}
        <div className="mt-8"><AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity} /></div>
        <div className="mt-10 grid gap-3 border-t border-white/10 pt-6 text-sm text-zinc-400 sm:grid-cols-2"><span className="flex items-center gap-2"><FiPackage className="text-pk-green" /> Direkt von der Band</span><span className="flex items-center gap-2"><FiTruck className="text-pk-green" /> Versand innerhalb Schweiz</span></div>
      </div>
    </div>
  );
}

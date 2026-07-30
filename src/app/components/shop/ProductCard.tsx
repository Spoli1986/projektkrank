import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import PriceTag from './PriceTag';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`} className="surface surface-hover group min-w-0 overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-zinc-900">
        <Image
          src={product.imageUrl[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/70 text-sm text-white backdrop-blur-md transition group-hover:border-pk-green/50 group-hover:text-pk-green sm:right-4 sm:top-4 sm:h-10 sm:w-10">
          <FiArrowUpRight aria-hidden />
        </span>
      </div>

      <div className="p-3 sm:p-5">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
          <h2 className="line-clamp-2 text-sm font-black uppercase leading-tight text-white sm:text-lg">
            {product.name}
          </h2>

          <PriceTag price={product.price} className="shrink-0 px-2 py-1 text-[0.7rem] sm:px-3 sm:py-1.5 sm:text-sm" />
        </div>

        <p className="mt-3 hidden line-clamp-2 text-sm leading-6 text-zinc-400 sm:block">{product.description}</p>
      </div>
    </Link>
  );
}

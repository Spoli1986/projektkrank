import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { prisma } from '../../../utils/db/prisma';
import ProductCard from '../components/shop/ProductCard';
import PaginationBar from '../components/shop/PaginationBar';
import PriceTag from '../components/shop/PriceTag';

interface ShopProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

export const metadata: Metadata = { title: 'Shop', description: 'Projekt Krank Merch, Shirts und Musik.' };

export default async function Shop({ searchParams }: ShopProps) {
  const { page } = await searchParams;
  const pageValue = Array.isArray(page) ? page[0] : page;
  const parsedPage = Number.parseInt(pageValue ?? '1', 10);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const pageSize = 8;
  const totalItemCount = await prisma.product.count();
  const totalPages = Math.max(1, Math.ceil(totalItemCount / pageSize));
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });
  const featured =
    currentPage === 1 ? products.find((product) => product.description === 'Aufbruch') ?? products[0] : undefined;
  const gridProducts = featured ? products.filter((product) => product.id !== featured.id) : products;

  return (
    <main className="pb-24 pt-32">
      <div className="site-shell">
        <div className="mb-12">
          <p className="eyebrow">Official merch</p>
          <h1 className="section-title mt-3">Projekt Krank Shop</h1>
          <p className="section-copy mt-5">
            Direkt von der Band. Jeder Kauf unterstützt neue Musik, Videos und Konzerte.
          </p>
        </div>

        {featured ? (
          <Link
            href={`/shop/${featured.id}`}
            className="surface surface-hover group mb-12 grid overflow-hidden lg:grid-cols-2"
          >
            <div className="relative min-h-80 overflow-hidden bg-zinc-900 lg:min-h-[34rem]">
              <Image
                src={featured.imageUrl[0]}
                alt={featured.name}
                fill
                priority
                sizes="(min-width:1024px) 50vw,100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
              <p className="eyebrow">Featured</p>
              <h2 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl">{featured.name}</h2>
              <p className="mt-5 max-w-xl leading-7 text-zinc-300">{featured.description}</p>
              <PriceTag price={featured.price} className="mt-6" />
              <span className="pk-button mt-8 w-max">
                Artikel ansehen <FiArrowRight aria-hidden />
              </span>
            </div>
          </Link>
        ) : (
          <div className="surface flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <FiShoppingBag className="h-10 w-10 text-pk-green" />
            <h2 className="mt-5 text-2xl font-black uppercase">Shop wird aufgefüllt</h2>
            <p className="mt-2 text-zinc-400">Neue Artikel folgen in Kürze.</p>
          </div>
        )}

        {gridProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {gridProducts
              .filter((product) => !product.size || product.size.toLowerCase() === 'm')
              .map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <PaginationBar currentPage={currentPage} totalPages={totalPages} />
          </div>
        )}
      </div>
    </main>
  );
}

import React from 'react';
import { prisma } from '../../../utils/db/prisma';
import ProductCard from '../components/shop/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import PaginationBar from '../components/shop/PaginationBar';
import { Metadata } from 'next';

interface ShopProps {
  searchParams: { page: string };
}

export const metadata: Metadata = {
  title: 'Projekt Krank Webshop',
  description: 'Band merch site, tshirt cd',
};

async function Shop({ searchParams: { page = '1' } }: ShopProps) {
  const currentPage = parseInt(page);

  const pageSize = 8;
  const heroItemCount = 1;
  const totalItemCount = await prisma.product.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: {
      id: 'asc',
    },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  const aufbruchProductIndex = products.findIndex((product) => product.description === 'Aufbruch');

  if (aufbruchProductIndex !== -1) {
    const aufbruchProduct = products[aufbruchProductIndex];
    products.splice(aufbruchProductIndex, 1); // Remove the Aufbruch product from its original position
    products.unshift(aufbruchProduct); // Add it to the beginning of the array
  }

  const heroItem = products.find(({ description }) => description === 'Aufbruch');
  // const restItems = products.filter((product) => product.description !== 'Aufbruch');

  return (
    <div className="flex flex-col text-4xl text-pk-green mt-28 items-center">
      <main className="flex flex-col items-center gap-4">
        {currentPage === 1 && (
          <div className="hero rounded-xl bg-gray-900">
            <div className="hero-content flex-col lg:flex-row">
              <Image
                src={products[0]!.imageUrl[0]}
                alt={products[0]!.name}
                width={400}
                height={800}
                className="w-full max-w-sm rounded-lg shadow-2xl"
                priority
              />
              <div>
                <h1 className="text-5xl font-bold">{products[0]!.name}</h1>
                <p className="py-6">{products[0]!.description}</p>
                <Link href={'/shop/' + products[0]!.id} className="btn-primary btn">
                  Check it out
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(currentPage === 1 ? products.slice(1) : products).map(
            (product) =>
              (!!!product.size || product.size === 'm') && <ProductCard product={product} key={product.id} />,
          )}
        </div>
        {totalPages > 1 && <PaginationBar currentPage={currentPage} totalPages={totalPages} />}
        {/* <p>Coming soon...</p> */}
      </main>
    </div>
  );
}

export default Shop;

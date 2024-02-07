import { notFound } from 'next/navigation';
import { prisma } from '../../../../utils/db/prisma';
import Image from 'next/image';
import PriceTag from '@/app/components/shop/PriceTag';
import { Metadata } from 'next';
import { cache } from 'react';
import AddToCartButton from './AddToCartButton';
import { incrementProductQuantity } from './actions';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();
  return product;
});

export async function generateMetadata({ params: { id } }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product.name + ' - Projekt Krank',
    description: product.description,
  };
}

async function ProductPage({ params: { id } }: ProductPageProps) {
  const product = await getProduct(id);
  return (
    <div className="flex flex-col lg:flex-row mt-32 self-center gap-4 lg:items-center">
      <Image src={product.imageUrl} alt={product.name} width={500} height={500} className="rounded-lg" priority />
      <div className="text-white">
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} />
        <p className="py-6">{product.description}</p>
        {!!product.size && (
          <div className="flex gap-1">
            Grösse:
            <select
              className="bg-transparent cursor-pointer"
              //  onChange={(e) => {
              //    handleSelect(e);
              //  }}
              defaultValue={'s'}
            >
              {(product.size as string[]).map((size) => (
                <option value={size} key={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
        <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity} size="m" />
      </div>
    </div>
  );
}

export default ProductPage;

import { notFound } from 'next/navigation';
import { prisma } from '../../../../utils/db/prisma';
import Image from 'next/image';
import PriceTag from '@/app/components/shop/PriceTag';
import { Metadata } from 'next';
import { cache } from 'react';
import AddToCartButton from './AddToCartButton';
import { incrementProductQuantity } from './actions';
import Link from 'next/link';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  const productSize =
    product?.size && (await prisma.product.findMany({ where: { description: { equals: product?.description } } }));

  if (!product) notFound();
  return { product, productSize };
});

export async function generateMetadata({ params: { id } }: ProductPageProps): Promise<Metadata> {
  const products = await getProduct(id);
  return {
    title: products.product.name + ' - Projekt Krank',
    description: products.product.description,
  };
}

async function ProductPage({ params: { id } }: ProductPageProps) {
  const products = await getProduct(id);

  return (
    <div className="flex flex-col lg:flex-row mt-32 self-center gap-4 lg:items-center">
      <Image
        src={products.product.imageUrl}
        alt={products.product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div className="flex flex-col text-white gap-4">
        <h1 className="text-5xl font-bold">{products.product.name}</h1>
        <PriceTag price={products.product.price} />
        <p className="py-6">{products.product.description}</p>
        {products.productSize && (
          <div className="flex gap-1 ">
            Grösse:
            <div className="dropdown dropdown-bottom text-black">
              <div tabIndex={0} role="button" className="btn">
                {products.product.size}
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box">
                {products.productSize.map(
                  (product) =>
                    product.size !== products.product.size && (
                      <li key={product.id}>
                        <Link href={'/shop/' + product.id}>{product.size}</Link>
                      </li>
                    ),
                )}
              </ul>
            </div>
          </div>
        )}
        <AddToCartButton productId={products.product.id} incrementProductQuantity={incrementProductQuantity} />
      </div>
    </div>
  );
}

export default ProductPage;

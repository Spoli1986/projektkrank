import ProductPageWrapper from '@/app/components/shop/ProductPageWrapper';
import SingleProductPage from '@/app/components/shop/ProductPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '../../../../utils/db/prisma';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  const productSize = product.size
    ? await prisma.product.findMany({
        where: { description: { equals: product.description } },
        orderBy: { size: 'asc' },
      })
    : null;

  return { product, productSize };
});

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const products = await getProduct(id);

  return {
    title: products.product.name,
    description: products.product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const products = await getProduct(id);

  return (
    <main>
      <ProductPageWrapper>
        <SingleProductPage products={products} />
      </ProductPageWrapper>
    </main>
  );
}

import { notFound } from 'next/navigation';
import { prisma } from '../../../../utils/db/prisma';
import { Metadata } from 'next';
import { cache } from 'react';
import ProductPageWrapper from '@/app/components/shop/ProductPageWrapper';
import SingleProductPage from '@/app/components/shop/ProductPage';

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
    <div className="flex w-full justify-center">
      <ProductPageWrapper>
        <SingleProductPage products={products} />
      </ProductPageWrapper>
    </div>
  );
}

export default ProductPage;

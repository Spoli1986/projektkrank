import { notFound } from 'next/navigation';
import { prisma } from '../../../../utils/db/prisma';
import { Metadata } from 'next';
import { cache } from 'react';
import ProductPageWrapper from '@/app/components/shop/ProductPageWrapper';
import SingleProductPage from '@/app/components/shop/ProductPage';

interface ProductPageProps { params: { id: string } }
const getProduct = cache(async (id: string) => { const product = await prisma.product.findUnique({ where: { id } }); if (!product) notFound(); const productSize = product.size ? await prisma.product.findMany({ where: { description: { equals: product.description } }, orderBy: { size: 'asc' } }) : null; return { product, productSize }; });
export async function generateMetadata({ params: { id } }: ProductPageProps): Promise<Metadata> { const products = await getProduct(id); return { title: products.product.name, description: products.product.description }; }
export default async function ProductPage({ params: { id } }: ProductPageProps) { const products = await getProduct(id); return <main><ProductPageWrapper><SingleProductPage products={products} /></ProductPageWrapper></main>; }

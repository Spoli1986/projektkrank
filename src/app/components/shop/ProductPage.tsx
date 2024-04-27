import React from 'react';
import ImageCarousel from './ImageCarousel';
import PriceTag from './PriceTag';
import AddToCartButton from '@/app/components/shop/AddToCartButton';
import Link from 'next/link';
import { incrementProductQuantity } from '@/app/shop/[id]/actions';

type Props = {
  products: {
    product: {
      imageUrl: string[];
      price: number;
      id: string;
      name: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
      size: string | null;
    };
    productSize:
      | ''
      | {
          imageUrl: string[];
          price: number;
          id: string;
          name: string;
          description: string;
          createdAt: Date;
          updatedAt: Date;
          size: string | null;
        }[]
      | null
      | undefined;
  };
};

function SingleProductPage({ products }: Props) {
  return (
    <div className="flex flex-col lg:flex-row mt-32 self-center gap-4 lg:items-center">
      <ImageCarousel imageUrl={products.product.imageUrl} />
      <div className="flex flex-col text-white gap-4">
        <h1 className="text-5xl font-bold">{products.product.name}</h1>
        <PriceTag price={products.product.price} />
        <p className="py-6">{products.product.description}</p>
        {products.productSize && (
          <div className="flex gap-1 items-center">
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

export default SingleProductPage;

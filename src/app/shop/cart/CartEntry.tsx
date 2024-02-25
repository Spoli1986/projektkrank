'use client';

import Image from 'next/image';
import { CartItemWithProduct } from '../../../../utils/db/cart';
import Link from 'next/link';
import { formatPrice } from '../../../../utils/utils';
import { useTransition } from 'react';
import { setProductQuantity } from './actions';

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

function CartEntry({ cartItem: { product, quantity } }: CartEntryProps) {
  const [isPending, startTransition] = useTransition();
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }
  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-lg" />
      </div>
      <div>
        <Link href={'/shop/' + product.id} className="font-bold">
          {product.name}
        </Link>
        {!!product.size && <div>Size: {product.size}</div>}
        <div>Price: {formatPrice(product.price)}</div>
        <div className="my-1 flex items-center gap-2">
          Quantity:
          <select
            className="select select-bordered w-full max-w-[80px]"
            defaultValue={quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.currentTarget.value);
              startTransition(async () => {
                await setProductQuantity(product.id, newQuantity);
              });
            }}
          >
            <option value={0}>0 (Remove)</option>
            {quantityOptions}
          </select>
        </div>
        <div className="flex items-center gap-3">
          Total: {formatPrice(product.price * quantity)}
          {isPending && <span className="loading loading-spinner loading-sm" />}
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default CartEntry;

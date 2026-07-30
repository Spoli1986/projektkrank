'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTransition } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import type { CartItemWithProduct } from '../../../../utils/db/cart';
import { formatPrice } from '../../../../utils/utils';
import { setProductQuantity } from '../../shop/cart/actions';

export default function CartEntry({ cartItem: { product, quantity } }: { cartItem: CartItemWithProduct }) {
  const [isPending, startTransition] = useTransition();

  function updateQuantity(nextQuantity: number) {
    startTransition(async () => { await setProductQuantity(product.id, nextQuantity); });
  }

  return (
    <article className={`surface grid gap-5 p-4 transition sm:grid-cols-[8rem_1fr_auto] sm:items-center ${isPending ? 'opacity-60' : ''}`}>
      <Link href={`/shop/${product.id}`} className="relative aspect-square overflow-hidden rounded-xl bg-zinc-900"><Image src={product.imageUrl[0]} alt={product.name} fill sizes="128px" className="object-cover" /></Link>
      <div><Link href={`/shop/${product.id}`} className="text-xl font-black uppercase text-white transition hover:text-pk-green">{product.name}</Link>{product.size && <p className="mt-1 text-sm text-zinc-500">Grösse: {product.size}</p>}<p className="mt-4 text-sm text-zinc-400">Einzelpreis: {formatPrice(product.price)}</p><div className="mt-4 flex items-center gap-3"><label htmlFor={`quantity-${product.id}`} className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">Menge</label><select id={`quantity-${product.id}`} className="field-control w-24 py-2" value={quantity} onChange={(event) => updateQuantity(Number.parseInt(event.currentTarget.value, 10))}>{Array.from({ length: 20 }, (_, index) => index + 1).map((value) => <option value={value} key={value}>{value}</option>)}</select><button type="button" className="icon-button h-10 w-10" onClick={() => updateQuantity(0)} aria-label={`${product.name} entfernen`}><FiTrash2 aria-hidden /></button>{isPending && <span className="loading loading-spinner loading-sm text-pk-green" />}</div></div>
      <div className="sm:text-right"><p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">Total</p><p className="mt-1 text-xl font-black text-pk-green">{formatPrice(product.price * quantity)}</p></div>
    </article>
  );
}

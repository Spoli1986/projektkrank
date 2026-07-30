'use client';

import type { ShoppingCart } from '../../../../utils/db/cart';
import { formatPrice } from '../../../../utils/utils';
import StripeCheckout from '../stripe/StripeCheckout';

export default function CheckoutForm({ cart }: { cart: ShoppingCart | null }) {
  const productsTotal = cart?.items.reduce((total, item) => total + item.product.price * item.quantity, 0) ?? 0;
  const shipping = Math.max(0, (cart?.subtotal ?? 0) - productsTotal);

  return <div className="grid gap-6 lg:grid-cols-[22rem_26rem] lg:items-start"><aside className="surface-strong p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Bestellung</p><div className="mt-5 space-y-4">{cart?.items.map((item) => <div key={item.id} className="flex justify-between gap-4 border-b border-white/10 pb-4 text-sm"><div><p className="font-bold text-white">{item.quantity}× {item.product.name}</p>{item.product.size && <p className="mt-1 text-zinc-500">Grösse {item.product.size}</p>}</div><span className="text-zinc-300">{formatPrice(item.product.price * item.quantity)}</span></div>)}</div><dl className="mt-5 space-y-3 text-sm"><div className="flex justify-between text-zinc-400"><dt>Artikel</dt><dd>{formatPrice(productsTotal)}</dd></div><div className="flex justify-between text-zinc-400"><dt>Versand</dt><dd>{formatPrice(shipping)}</dd></div><div className="flex justify-between border-t border-white/10 pt-4 text-lg font-black"><dt>Total</dt><dd className="text-pk-green">{formatPrice(cart?.subtotal ?? 0)}</dd></div></dl></aside><StripeCheckout cart={cart} /></div>;
}

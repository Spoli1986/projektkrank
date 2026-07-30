import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import Checkout from '@/app/components/shop/Checkout';
import CartEntry from '@/app/components/shop/CartEntry';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCart } from '../../../../utils/db/cart';
import { formatPrice } from '../../../../utils/utils';

export const metadata = { title: 'Warenkorb' };

export default async function Cart() {
  const cart = await getCart();
  const session = await getServerSession(authOptions);
  const shipping = Number(process.env.SHIPPING_COST ?? 0);
  const productsTotal = Math.max(0, (cart?.subtotal ?? 0) - shipping);

  return (
    <main className="pb-24 pt-32"><div className="site-shell"><Link href="/shop" className="pk-button-quiet"><FiArrowLeft /> Weiter einkaufen</Link><div className="mt-8"><p className="eyebrow">Deine Auswahl</p><h1 className="section-title mt-3">Warenkorb</h1></div>
      {!cart?.items.length ? <div className="surface mt-10 flex min-h-80 flex-col items-center justify-center p-8 text-center"><FiShoppingBag className="h-12 w-12 text-pk-green" /><h2 className="mt-5 text-2xl font-black uppercase">Noch nichts drin</h2><p className="mt-2 text-zinc-400">Im Shop wartet Merch direkt von der Band.</p><Link href="/shop" className="pk-button mt-6">Zum Shop</Link></div> : <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start"><div className="space-y-4">{cart.items.map((item) => <CartEntry cartItem={item} key={item.id} />)}</div><aside className="surface-strong p-6 lg:sticky lg:top-28"><p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Zusammenfassung</p><dl className="mt-6 space-y-4 text-sm"><div className="flex justify-between gap-4 text-zinc-400"><dt>Artikel</dt><dd>{formatPrice(productsTotal)}</dd></div><div className="flex justify-between gap-4 text-zinc-400"><dt>Versand</dt><dd>{formatPrice(shipping)}</dd></div><div className="flex justify-between gap-4 border-t border-white/10 pt-5 text-xl font-black text-white"><dt>Total</dt><dd className="text-pk-green">{formatPrice(cart.subtotal)}</dd></div></dl><div className="mt-6"><Checkout session={session} /></div><p className="mt-4 text-center text-xs leading-5 text-zinc-600">Sichere Zahlung via Stripe. Versand innerhalb der Schweiz.</p></aside></div>}
    </div></main>
  );
}

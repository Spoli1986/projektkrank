import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import CheckoutForm from '@/app/components/shop/CheckoutForm';
import StripeWrapper from '@/app/components/stripe/StripeWrapper';
import { getCart } from '../../../../utils/db/cart';

async function getClientSecret(price: number | undefined) {
  if (!price || !process.env.NEXTAUTH_URL) return null;
  try {
    const response = await fetch(new URL('/api/stripe', process.env.NEXTAUTH_URL), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ price }), cache: 'no-store' });
    if (!response.ok) throw new Error(`Stripe request failed with status ${response.status}`);
    const data = await response.json();
    return data.secret.client_secret as string;
  } catch (error) {
    console.error('Unable to initialize checkout:', error);
    return null;
  }
}

export default async function CheckoutPage() {
  const cart = await getCart();
  const clientSecret = await getClientSecret(cart?.subtotal);

  return <main className="pb-24 pt-32"><div className="site-shell"><Link href="/shop/cart" className="pk-button-quiet"><FiArrowLeft /> Zurück zum Warenkorb</Link><div className="mb-10 mt-8"><p className="eyebrow">Sicher bezahlen</p><h1 className="section-title mt-3">Checkout</h1></div>{!clientSecret ? <div className="surface border-red-400/20 p-8"><h2 className="text-2xl font-black uppercase text-red-300">Checkout nicht verfügbar</h2><p className="mt-3 text-zinc-400">Bitte versuche es später noch einmal.</p></div> : <StripeWrapper clientSecret={clientSecret}><CheckoutForm cart={cart} /></StripeWrapper>}</div></main>;
}

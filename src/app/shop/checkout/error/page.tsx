import Link from 'next/link';
import { FiAlertTriangle } from 'react-icons/fi';

export default function ErrorPayment({ searchParams }: { searchParams?: { message?: string } }) {
  return <main className="flex min-h-[75vh] items-center pb-20 pt-32"><div className="site-shell"><div className="surface mx-auto max-w-2xl border-red-400/20 p-8 text-center sm:p-12"><FiAlertTriangle className="mx-auto h-14 w-14 text-red-400" /><p className="eyebrow mt-6 text-red-300">Zahlung fehlgeschlagen</p><h1 className="mt-3 text-3xl font-black uppercase sm:text-4xl">Das hat leider nicht funktioniert.</h1><p className="mt-5 leading-7 text-zinc-400">{searchParams?.message || 'Unser Shop konnte die Zahlung nicht abschliessen. Bitte versuche es später noch einmal.'}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/shop/checkout" className="pk-button">Erneut versuchen</Link><Link href="/shop/cart" className="pk-button-secondary">Zum Warenkorb</Link></div></div></div></main>;
}

import Link from 'next/link';

export default function NotFoundPage() {
  return <main className="flex min-h-[75vh] items-center pb-20 pt-32"><div className="site-shell text-center"><p className="text-8xl font-black tracking-tighter text-pk-green sm:text-9xl">404</p><h1 className="mt-4 text-3xl font-black uppercase">Seite nicht gefunden</h1><p className="mx-auto mt-4 max-w-lg text-zinc-400">Hier ist nichts – ausser Feedback, Rauschen und einem falschen Link.</p><Link href="/" className="pk-button mt-8">Zur Startseite</Link></div></main>;
}

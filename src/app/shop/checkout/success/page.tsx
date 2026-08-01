'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';

export default function SuccessPayment() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <main className="flex min-h-[75vh] items-center pb-20 pt-32">
      <div className="site-shell">
        <div className="surface mx-auto max-w-2xl p-8 text-center sm:p-12">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pk-green text-black">
            <FiCheck className="h-8 w-8" />
          </span>
          <p className="eyebrow mt-6">Bestellung eingegangen</p>
          <h1 className="mt-3 text-3xl font-black uppercase sm:text-4xl">Danke für deine Unterstützung.</h1>
          <p className="mt-5 leading-7 text-zinc-400">
            Sobald wir die Zahlungsbestätigung erhalten, bekommst du eine E-Mail mit allen Details.
          </p>
          <Link href="/" className="pk-button mt-8">
            Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}

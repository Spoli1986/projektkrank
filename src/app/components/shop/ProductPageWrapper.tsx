'use client';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

export default function ProductPageWrapper({ children }: { children: ReactElement }) {
  const router = useRouter();
  return <div className="site-shell w-full pb-24 pt-32"><button type="button" className="pk-button-quiet mb-8" onClick={() => router.push('/shop')}><FiArrowLeft aria-hidden /> Zurück zum Shop</button>{children}</div>;
}

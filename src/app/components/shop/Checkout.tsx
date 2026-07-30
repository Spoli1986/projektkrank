'use client';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import type { Session } from 'next-auth';

export default function Checkout({ session: _session }: { session: Session | null }) {
  return <Link href="/shop/checkout" className="pk-button w-full">Zur Kasse <FiArrowRight aria-hidden /></Link>;
}

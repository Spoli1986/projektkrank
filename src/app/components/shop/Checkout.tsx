'use client';
import { Session } from 'next-auth';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

interface CheckoutProps {
  session: Session | null;
}

function Checkout({ session }: CheckoutProps) {
  return (
    <>
      {session?.user ? (
        <Link href={'/shop/checkout'} className="btn btn-primary">
          Checkout
        </Link>
      ) : (
        <button onClick={() => signIn()} className="btn btn-primary">
          Sign In
        </button>
      )}
    </>
  );
}

export default Checkout;

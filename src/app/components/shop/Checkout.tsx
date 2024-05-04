'use client';
import { Session } from 'next-auth';
import Link from 'next/link';

interface CheckoutProps {
  session: Session | null;
}

function Checkout({ session }: CheckoutProps) {
  return (
    <div className="flex w-full items-center justify-center">
      {session?.user ? (
        <Link href={'/shop/checkout'} className="btn btn-primary">
          Checkout
        </Link>
      ) : (
        <div className="flex flex-col gap-4">
          {/* <button onClick={() => signIn()} className="btn btn-primary">
            Sign In
          </button> */}
          <Link href={'/shop/checkout/'} className="btn btn-primary">
            Checkout
          </Link>
        </div>
      )}
    </div>
  );
}

export default Checkout;

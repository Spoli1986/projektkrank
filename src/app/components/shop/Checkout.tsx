'use client';
import { Session } from 'next-auth';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { ShoppingCart } from '../../../../utils/db/cart';

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
          <Link href={'/shop/checkout/guest'} className="btn btn-primary">
            Continue as a guest
          </Link>
        </div>
      )}
    </div>
  );
}

export default Checkout;

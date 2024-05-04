import CheckoutForm from '@/app/components/shop/CheckoutForm';
import Link from 'next/link';

import StripeWrapper from '@/app/components/stripe/StripeWrapper';
import { getCart } from '../../../../utils/db/cart';

async function getClinetSecret(price: number | undefined) {
  const link = new URL(`${process.env.NEXTAUTH_URL}/api/stripe`);

  try {
    const res = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price: price }),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();

    return data.secret.client_secret;
  } catch (error) {
    console.error('Error occured: ', error);
  }
}

async function Checkout() {
  const cart = await getCart();
  const price = cart?.subtotal;

  const clientSecret = await getClinetSecret(price);

  if (!clientSecret) {
    return (
      <div className="flex flex-col text-center mt-52">
        <h3 className="text-2xl font-bold text-error p-4 w-full self-center">
          Checkout failed, please try again later...{' '}
        </h3>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-52">
        <h3 className="text-2xl font-bold text-warning p-4 w-max self-center">Checkout</h3>
        <div className="mt-2 px-7 py-3 w-full sm:w-max">
          <StripeWrapper clientSecret={clientSecret}>
            <CheckoutForm cart={cart} />
          </StripeWrapper>
        </div>
        <div className="flex justify-center mt-4">
          {/* Navigates back to the base URL - closing the modal */}
          <Link href="/shop/cart" className="btn btn-primary">
            Back
          </Link>
        </div>
      </div>
    );
  }
}

export default Checkout;

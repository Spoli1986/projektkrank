import CheckoutForm from '@/app/components/shop/CheckoutForm';
import Link from 'next/link';
import { getCart } from '../../../../../utils/db/cart';
import StripeWrapper from '@/app/components/stripe/StripeWrapper';

async function getClinetSecret(price: number | undefined) {
  const link = new URL(`${process.env.NEXTAUTH_URL}/api/stripe`);
  console.log(link);
  try {
    const res = await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price }),
    });

    console.log('res.json client: ', res);
    if (!res.ok) {
      throw new Error(`Failed to fetch data. Status: ${res.status}`);
    }
    const data = await res.json();
    return data.secret;
  } catch (error) {
    console.error('Error occured: ', error);
  }
}

async function Checkout() {
  const cart = await getCart();
  const price = cart?.subtotal;
  console.log('price client: ', price);

  const clientSecret = await getClinetSecret(price);

  console.log('clientsecret client: ', clientSecret);

  return (
    <div className="flex flex-col text-center mt-52">
      <h3 className="text-2xl font-bold text-slate-500 bg-slate-200 p-4 w-max self-center">Checkout</h3>
      <div className="mt-2 px-7 py-3">
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

export default Checkout;

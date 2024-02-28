import CheckoutForm from '@/app/components/shop/CheckoutForm';
import Link from 'next/link';
import { getCart } from '../../../../../utils/db/cart';

async function Checkout() {
  const cart = await getCart();

  return (
    <div className="text-center mt-52">
      <h3 className="text-2xl font-bold text-white">Checkout</h3>
      <div className="mt-2 px-7 py-3">
        <CheckoutForm cart={cart} />
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

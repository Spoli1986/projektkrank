import Checkout from '@/app/components/shop/Checkout';
import { getCart } from '../../../../utils/db/cart';
import { formatPrice } from '../../../../utils/utils';
import CartEntry from '../../components/shop/CartEntry';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Your Cart - Projekt Krank',
};

async function Cart() {
  const cart = await getCart();
  const session = await getServerSession(authOptions);
  const shipping: number = 700;

  return (
    <div className="mt-24 text-info flex flex-col justify-center sm:items-center mx-4 lg:mx-0">
      <h1 className="mb-6 text-3xl self-center font-bold text-pk-green">Your Cart</h1>
      <div className="flex flex-col sm:grid sm:grid-cols-4 gap-4">
        {cart?.items.map((item) => <CartEntry cartItem={item} key={item.id} />)}
      </div>
      {!cart?.items.length ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col sm:items-center">
          <span className="py-2">Shipping: {formatPrice(shipping)}</span>
          <p className="mb-3 font-bold">Total: {formatPrice(cart?.subtotal) || 0}</p>
          <Checkout session={session} />
        </div>
      )}
    </div>
  );
}

export default Cart;

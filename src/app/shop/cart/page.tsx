import Checkout from '@/app/components/shop/Checkout';
import { getCart } from '../../../../utils/db/cart';
import { formatPrice } from '../../../../utils/utils';
import CartEntry from '../../components/shop/CartEntry';
import { setProductQuantity } from './actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Your Cart - Projekt Krank',
};

async function Cart() {
  const cart = await getCart();
  const session = await getServerSession(authOptions);
  return (
    <div className="mt-24 text-info flex flex-col justify-center sm:items-center mx-4 lg:mx-0">
      <h1 className="mb-6 text-3xl self-center font-bold text-pk-green">Your Cart</h1>
      <div className="flex flex-col sm:grid sm:grid-cols-4 gap-4">
        {cart?.items.map((item) => <CartEntry cartItem={item} key={item.id} setProductQuantity={setProductQuantity} />)}
      </div>
      {!cart?.items.length ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="flex flex-col items-end sm:items-center ">
          <p className="mb-3 font-bold">Total: {formatPrice(cart?.subtotal) || 0}</p>
          <Checkout session={session} />
        </div>
      )}
    </div>
  );
}

export default Cart;

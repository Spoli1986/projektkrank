import { getCart } from '../../../../utils/db/cart';
import { formatPrice } from '../../../../utils/utils';
import CartEntry from './CartEntry';
import { setProductQuantity } from './actions';

export const metadata = {
  title: 'Your Cart - Projekt Krank',
};

async function Cart() {
  const cart = await getCart();
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

          <button className="btn btn-primary sm:w-[200px]">Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;

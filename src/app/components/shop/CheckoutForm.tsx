'use client';

import React, { useState } from 'react';
import { ShoppingCart } from '../../../../utils/db/cart';
import CartEntry from './CartEntry';
import { formatPrice } from '../../../../utils/utils';
import StripeCheckout from '../stripe/StripeCheckout';

interface CheckoutFormProps {
  cart: ShoppingCart | null;
}

export default function CheckoutForm({ cart }: CheckoutFormProps) {
  const [formSuccess, setFormSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  return (
    <div className="flex justify-center bg-slate-200/10 w-full sm:w-max rounded-md">
      {formSuccess ? (
        <div className="text-success text-3xl">{formSuccessMessage}</div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:justify-center w-full sm:p-2 py-4">
          <div className="flex flex-col gap-1 w-[90%] sm:w-max  text-[#30313d] border bg-slate-100/80 rounded-md p-2 sm:p-10">
            {cart?.items.map((item) => <CartEntry cartItem={item} key={item.id} />)}
            <span className="text-left italic text-info text-lg">Shipping: {formatPrice(500)}</span>
            <div className="divider"></div>
            <span className="font-semibold text-left text-3xl">Total: {formatPrice(cart?.subtotal!)}</span>
          </div>
          <StripeCheckout cart={cart} />
        </div>
      )}
    </div>
  );
}

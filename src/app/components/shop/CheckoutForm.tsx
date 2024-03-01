'use client';

import React, { useState } from 'react';
import { ShoppingCart } from '../../../../utils/db/cart';
import CartEntry from './CartEntry';
import { setProductQuantity } from '@/app/shop/cart/actions';
import { formatPrice } from '../../../../utils/utils';
import { useRouter } from 'next/navigation';

interface CheckoutFormProps {
  cart: ShoppingCart | null;
}

export type FormData = {
  total: string;
  cartId: string;
  name: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
};

export default function CheckoutForm({ cart }: CheckoutFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    cartId: cart?.id!,
    total: formatPrice(cart?.subtotal!),
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    phone: '',
  });

  const [formSuccess, setFormSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  function generateRandomHexString(length: number): string {
    const characters = '0123456789ABCDEF';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  const orderId: string = generateRandomHexString(16);

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const submitForm = (e: any) => {
    // We don't want the page to refresh
    e.preventDefault();

    const formURL = e.target.action;

    // POST the data to the URL of the form
    fetch(formURL, {
      method: 'POST',
      body: JSON.stringify({ ...formData, orderId }),
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        // response.json();
      })
      .then((data) => {
        setFormSuccess(true);
        setFormSuccessMessage('success');
      });
    setTimeout(() => router.push('/shop'), 3000);
  };

  return (
    <div className="flex justify-center bg-slate-200">
      {formSuccess ? (
        <div className="text-success text-3xl">{formSuccessMessage}</div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:justify-center  w-full sm:w-max sm:p-2 py-4">
          <div className="flex flex-col gap-1 w-max text-slate-500 border bg-slate-100 rounded-md sm:p-10">
            {cart?.items.map((item) => (
              <CartEntry cartItem={item} key={item.id} setProductQuantity={setProductQuantity} />
            ))}
            <span className="font-bold text-left text-3xl">Total: {formatPrice(cart?.subtotal!)}</span>
          </div>
          <form
            className="space-y-2 flex flex-col justify-center sm:w-[340px] w-[90%] text-slate-500 border bg-slate-100 rounded-md sm:p-10"
            onSubmit={submitForm}
            action="/api/email"
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full input input-bordered"
                onChange={(e) => handleInput(e)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full input input-bordered"
                onChange={(e) => handleInput(e)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full input input-bordered"
                onChange={(e) => handleInput(e)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="zip"
                placeholder="Zip"
                className="w-full input input-bordered"
                onChange={(e) => handleInput(e)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="w-full input input-bordered"
                onChange={(e) => handleInput(e)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full input input-bordered"
                onChange={(e) => handleInput(e)}
                required
              />
            </div>
            <div className="">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className="w-full input input-bordered"
                onChange={(e) => handleInput(e)}
                required
              />
            </div>
            <button type="submit" className="btn btn-warning">
              Order
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { ShoppingCart } from '../../../../utils/db/cart';
import CartEntry from './CartEntry';
import { setProductQuantity } from '@/app/shop/cart/actions';
import { formatPrice } from '../../../../utils/utils';

interface CheckoutFormProps {
  cart: ShoppingCart | null;
}

export type FormData = {
  name: string;
  email: string;
  address: string;
  zip: string;
  country: string;
  phone: string;
};

export default function CheckoutForm({ cart }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    zip: '',
    country: '',
    phone: '',
  });

  console.log(formData);

  const [formSuccess, setFormSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

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
    const data = new FormData();

    // Turn our formData state into data we can use with a form submission
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // POST the data to the URL of the form
    fetch(formURL, {
      method: 'POST',
      body: data,
      headers: {
        accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          name: '',
          email: '',
          address: '',
          zip: '',
          country: '',
          phone: '',
        });

        setFormSuccess(true);
        setFormSuccessMessage(data.submission_text);
      });
  };

  return (
    <div className="flex justify-center bg-slate-200">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:justify-center  w-full sm:w-max sm:p-2 py-4">
        <div className="flex flex-col gap-1 w-max text-slate-500 border bg-slate-100 rounded-md sm:p-10">
          {cart?.items.map((item) => (
            <CartEntry cartItem={item} key={item.id} setProductQuantity={setProductQuantity} />
          ))}
          <span className="font-bold text-left text-3xl">Total: {formatPrice(cart?.subtotal!)}</span>
        </div>
        {formSuccess ? (
          <div>{formSuccessMessage}</div>
        ) : (
          <form
            className="space-y-2 flex flex-col justify-center sm:w-[340px] w-[90%] text-slate-500 border bg-slate-100 rounded-md sm:p-10"
            onSubmit={submitForm}
          >
            <div>
              <input type="text" placeholder="Name" className="w-full input input-bordered" onChange={handleInput} />
            </div>
            <div>
              <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
            </div>
            <div>
              <input type="text" placeholder="Address" className="w-full input input-bordered" />
            </div>
            <div>
              <input type="text" placeholder="Zip" className="w-full input input-bordered" />
            </div>
            <div>
              <input type="text" placeholder="Country" className="w-full input input-bordered" />
            </div>
            <div className="">
              <input type="text" placeholder="Phone" className="w-full input input-bordered" />
            </div>
            <button type="submit" className="btn btn-warning">
              Order
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

'use client';

import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { deleteAnonymousCart, ShoppingCart } from '../../../../utils/db/cart';
import { useEffect, useState } from 'react';
import '@stripe/stripe-js'; // Import this to ensure the CSS is included
import { formatPrice, generateRandomHexString } from '../../../../utils/utils';
import { StripeAddressElementChangeEvent } from '@stripe/stripe-js';
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
  address2: string | null;
  city: string;
  zip: string;
  country: string;
};

export default function StripeCheckout({ cart }: CheckoutFormProps) {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const elements = useElements();
  const stripe = useStripe();
  const [formData, setFormData] = useState<FormData>({
    cartId: cart?.id!,
    total: formatPrice(cart?.subtotal!),
    name: '',
    email: '',
    address: '',
    address2: null,
    city: '',
    zip: '',
    country: '',
  });

  const price: number | undefined = cart?.subtotal;
  const cartId: string | undefined = cart?.id;
  const orderId: string = generateRandomHexString(16);
  const router = useRouter();

  const handleInput = (e: StripeAddressElementChangeEvent) => {
    setFormData((prevState) => ({
      ...prevState,
      name: e.value.name,
      address: e.value.address.line1,
      address2: e.value.address.line2,
      city: e.value.address.city,
      zip: e.value.address.postal_code,
      country: e.value.address.country,
      email: email,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formURL = e.target.action;

    if (!stripe || !elements) {
      return;
    }

    // const paymentElement = elements.getElement(PaymentElement);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/shop/checkout/success',
        payment_method_data: {
          billing_details: {
            email: email,
          },
        },
      },
      redirect: 'if_required',
    });

    if (confirmError) {
      console.log(confirmError);
    } else {
      fetch(formURL, {
        method: 'POST',
        body: JSON.stringify({ ...formData, orderId }),
        headers: {
          accept: 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            router.push('/shop/checkout/error');
          } else {
            setLoading(false);
            router.push('/shop/checkout/success');
          }
        })
        .catch((error) => {
          console.log(error);
          router.push('/shop/checkout/error');
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 flex flex-col justify-center sm:w-[340px] w-[90%] border bg-slate-100 rounded-md p-2 sm:p-10"
      action="/api/email"
    >
      <PaymentElement className="text-red" />
      <div className="flex flex-col">
        <label htmlFor="" className=" text-[#30313d] text-left font-light">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          className="w-full border rounded-md p-3 outline-[#5caafe] font-light placeholder-[#6d6e78] m-0"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <AddressElement
        options={{
          mode: 'shipping',
          allowedCountries: ['CH'],
        }}
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <button type="submit" className="btn btn-primary">
        {loading ? <span className="loading loading-spinner" /> : <span>PAY</span>}
      </button>
    </form>
  );
}

'use client';

import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { ShoppingCart } from '../../../../utils/db/cart';
import { FormEvent, useState } from 'react';
import '@stripe/stripe-js'; // Import this to ensure the CSS is included
import { formatPrice, generateRandomHexString } from '../../../../utils/utils';
import { StripeAddressElementChangeEvent } from '@stripe/stripe-js';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const pathname = '/shop/checkout/error';
  const { replace } = useRouter();
  const orderId: string = generateRandomHexString(16);
  const router = useRouter();

  function handleSearch(message: string | undefined) {
    const params = new URLSearchParams(searchParams);
    if (message) {
      params.set('message', message);
    } else {
      params.delete('message');
    }
    replace(`${pathname}?${params.toString()}`);
  }

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formURL = e.currentTarget.action;

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/shop/checkout/success`,
        payment_method_data: {
          billing_details: {
            email: email,
          },
        },
      },
      redirect: 'if_required',
    });

    if (confirmError) {
      if (confirmError.code === 'card_declined') {
        handleSearch(confirmError.message);
      } else {
        router.push('/shop/checkout/error');
      }
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
      className="surface flex w-full flex-col gap-4 p-5 text-[#30313d] sm:p-7"
      action="/api/email"
    >
      <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">Zahlung & Versand</p>
      <PaymentElement />
      <div className="flex flex-col">
        <label htmlFor="checkout-email" className="mb-2 text-left text-xs font-bold uppercase tracking-[0.12em] text-zinc-600">
          Email
        </label>
        <input
          id="checkout-email"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="off"
          className="w-full rounded-xl border border-zinc-300 bg-white p-3 font-normal text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-pk-green focus:ring-4 focus:ring-pk-green/10"
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
      <button type="submit" disabled={loading} className="pk-button mt-2 w-full">
        {loading ? <span className="loading loading-spinner loading-sm" /> : <span>Jetzt bezahlen</span>}
      </button>
    </form>
  );
}

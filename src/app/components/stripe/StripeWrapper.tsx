'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

type StripeWrapperProps = {
  children: React.ReactNode;
  clientSecret: string;
};
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC!);

const StripeWrapper = ({ children, clientSecret }: StripeWrapperProps) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;

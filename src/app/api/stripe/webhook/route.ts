import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? process.env.STRIPE_WEBHOOK_TEST;

    if (!stripeSecretKey || !webhookSecret) {
      console.error('Stripe webhook configuration is missing.', {
        hasStripeSecret: Boolean(stripeSecretKey),
        hasWebhookSecret: Boolean(webhookSecret),
      });

      return NextResponse.json({ message: 'Stripe webhook is not configured.', ok: false }, { status: 500 });
    }

    const body = await request.text();
    const headerStore = await headers();
    const signature = headerStore.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ message: 'Missing Stripe signature.', ok: false }, { status: 400 });
    }

    const stripe = new Stripe(stripeSecretKey);
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // Add event-specific processing here when order fulfilment is implemented.
    // Example: if (event.type === 'payment_intent.succeeded') { ... }

    return NextResponse.json({ eventType: event.type, ok: true });
  } catch (error) {
    console.error('Stripe webhook verification failed:', error);

    return NextResponse.json({ message: 'Invalid Stripe webhook signature.', ok: false }, { status: 400 });
  }
}

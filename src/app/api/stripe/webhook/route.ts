import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const stripe = require('stripe')(process.env.STRIPE_PRIVATE);

const secret = process.env.STRIPE_WEBHOOK_TEST || '';

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signature = headers().get('stripe-signature');
    const header = headers().get('stripe-signature');
    // const event = stripe.webhooks.constructEvent(body, signature, secret);

    // if (event.type === 'checkout.session.completed') {
    //   if (!event.data.object.customer_details.email) {
    //     throw new Error(`missing user email, ${event.id}`);
    //   }
    //   if (!event.data.object.metadata.itinerary_id) {
    //     throw new Error(`missing itinerary_id on metadata, ${event.id}`);
    //   }
    // }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'something went wrong',
        ok: false,
      },
      { status: 500 },
    );
  }
}

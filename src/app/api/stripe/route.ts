import { NextRequest, NextResponse } from 'next/server';
import { loadStripe } from '@stripe/stripe-js';
import { env } from '../../../../utils/env';
import { Stripe } from 'stripe';

const stripe = new Stripe(env.STRIPE_SECRET!);

export async function POST(request: NextRequest) {
  const { price } = await request.json();
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: 'chf',
      payment_method_types: ['card'],
    });

    return NextResponse.json(
      { secret: paymentIntent },

      { status: 200 },
    );
  } catch (error) {
    console.log('stripe error:', error);
    return NextResponse.json({ error: 'Error processing payment intent' }, { status: 500 });
  }
}

// export async function GET(request: NextRequest, context: {params: {session_id: string}}){
//     try {
//         const session = stripe.checkout.sessions.retrieve(request.nextUrl.searchParams)
//     } catch (error) {

//     }
// }

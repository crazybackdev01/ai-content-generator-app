import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized to process payments" },
        { status: 401 }
      );
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: "10,000 AI Credit",
            description: "all $10 worth of credit",
          },
          unit_amount: 1000,
        },
      },
    ];

    let purchase = await db.purchase.create({
      data: {
        userId: userId,
        credit: 10000,
      },
    });

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: userId,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user?.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: userId,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
      metadata: {
        userId: userId,
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error in Processing Payments" },
      { status: 500 }
    );
  }
}

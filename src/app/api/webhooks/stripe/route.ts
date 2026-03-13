import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const itemsJson = session.metadata?.items;

    if (userId && itemsJson) {
      const items = JSON.parse(itemsJson) as {
        productId: string;
        quantity: number;
      }[];

      // Fetch products for price snapshot
      const products = await prisma.product.findMany({
        where: {
          id: { in: items.map((i) => i.productId) },
        },
      });

      const total = items.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product?.price ?? 0) * item.quantity;
      }, 0);

      // Create order
      await prisma.order.create({
        data: {
          userId,
          status: "paid",
          total,
          stripeSessionId: session.id,
          stripePaymentId: session.payment_intent as string,
          items: {
            create: items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!;
              return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
              };
            }),
          },
        },
      });

      // Clear user's cart
      await prisma.cartItem.deleteMany({ where: { userId } });
    }
  }

  return NextResponse.json({ received: true });
}

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { items } = await req.json();

  // Fetch product details from DB for security (don't trust client prices)
  const productIds = items.map((i: { productId: string }) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const lineItems = items.map(
    (item: { productId: string; quantity: number }) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: `${product.dosage} — ${product.category}`,
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      };
    }
  );

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancel`,
    metadata: {
      userId,
      items: JSON.stringify(
        items.map((i: { productId: string; quantity: number }) => ({
          productId: i.productId,
          quantity: i.quantity,
        }))
      ),
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}

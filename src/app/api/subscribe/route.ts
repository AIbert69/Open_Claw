import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Already subscribed" },
        { status: 400 }
      );
    }

    await prisma.subscriber.create({ data: { email } });

    // Send welcome email if Resend API key is configured
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes("placeholder")) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "peplogix <onboarding@resend.dev>",
          to: email,
          subject: "Welcome to peplogix — Here's your 10% discount!",
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
              <h1 style="color: #0d1f2d;">Welcome to peplogix!</h1>
              <p>Thanks for subscribing. Use code <strong>WELCOME10</strong> at checkout for 10% off your first order.</p>
              <p style="color: #555;">— The peplogix team</p>
            </div>
          `,
        });
      } catch {
        // Email sending is best-effort
      }
    }

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

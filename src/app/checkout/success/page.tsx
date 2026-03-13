import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="checkout-result">
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(0,201,167,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
          fontSize: "2rem",
        }}
      >
        ✓
      </div>
      <h1>Order Confirmed!</h1>
      <p>
        Thank you for your purchase. Your order has been received and is being
        processed. You&apos;ll receive a confirmation email shortly.
      </p>
      <div style={{ display: "flex", gap: "16px" }}>
        <Link href="/dashboard/orders" className="btn btn-primary">
          View Orders
        </Link>
        <Link
          href="/shop"
          className="btn"
          style={{
            border: "1px solid var(--border)",
            background: "var(--white)",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="checkout-result">
      <h1>Checkout Cancelled</h1>
      <p>
        Your checkout was cancelled. No charges have been made. Your cart items
        are still saved.
      </p>
      <div style={{ display: "flex", gap: "16px" }}>
        <Link href="/cart" className="btn btn-primary">
          Return to Cart
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

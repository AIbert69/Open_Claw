"use client";

import { useCart, CartProduct } from "@/context/CartContext";

export default function AddToCartButton({ product }: { product: CartProduct }) {
  const { addItem } = useCart();

  return (
    <button
      className="btn btn-primary"
      style={{ width: "100%", justifyContent: "center", fontSize: "0.8rem", padding: "8px 16px" }}
      onClick={() => addItem(product)}
    >
      Add to Cart
    </button>
  );
}

import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) notFound();

  return (
    <div className="product-detail">
      <div className="product-detail__image">
        <div className="hero__vial" style={{ transform: "scale(1.5)" }}>
          <div className="hero__vial-cap"></div>
          <div className="hero__vial-body">
            <div className="hero__vial-logo">
              <svg viewBox="0 0 20 20" fill="none">
                <polygon
                  points="10,1 19,5.5 19,14.5 10,19 1,14.5 1,5.5"
                  stroke="#00c9a7"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>
              <span>peplogix</span>
            </div>
            <p className="hero__vial-name">{product.name}</p>
            <p className="hero__vial-dose">{product.dosage}</p>
            <p className="hero__vial-tag">RESEARCH USE ONLY</p>
          </div>
        </div>
      </div>

      <div className="product-detail__info">
        <p className="section-label">× {product.category.toUpperCase()}</p>
        <h1>{product.name}</h1>
        <p className="product-detail__price">{formatPrice(product.price)}</p>
        <p className="product-detail__description">{product.description}</p>

        <div className="product-detail__meta">
          <span>
            <strong>Category:</strong> {product.category}
          </span>
          <span>
            <strong>Dosage:</strong> {product.dosage}
          </span>
          <span>
            <strong>Availability:</strong>{" "}
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <AddToCartButton
          product={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            dosage: product.dosage,
          }}
        />
      </div>
    </div>
  );
}

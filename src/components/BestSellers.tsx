import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

export default async function BestSellers() {
  const products = await prisma.product.findMany({
    where: { inStock: true, category: "Peptides" },
    take: 4,
    orderBy: { createdAt: "asc" },
  });

  return (
    <section className="best-sellers">
      <div className="best-sellers__header">
        <p className="section-label">× BEST SELLERS</p>
        <h2>Precision formulas in high demand</h2>
      </div>

      <div className="best-sellers__grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link href={`/products/${product.slug}`}>
              <div className="product-card__img">
                <div className="product-card__vial-wrap">
                  <div className="product-card__vial product-card__vial--dark"></div>
                </div>
              </div>
            </Link>
            <div className="product-card__info">
              <h4>{product.name}</h4>
              <span>{formatPrice(product.price)}</span>
            </div>
            <div style={{ padding: "0 16px 14px" }}>
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
        ))}
      </div>

      <div className="best-sellers__footer">
        <div className="best-sellers__dots">
          <span className="dot dot--active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <Link href="/shop" className="btn btn-primary best-sellers__cta">
          See all <span className="btn__arrow">→</span>
        </Link>
      </div>
    </section>
  );
}

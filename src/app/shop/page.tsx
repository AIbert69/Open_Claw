import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/AddToCartButton";

const CATEGORIES = ["All", "Peptides", "Blends", "L-Carnitine", "Capsules", "Bulk"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;

  const products = await prisma.product.findMany({
    where: category && category !== "All" ? { category, inStock: true } : { inStock: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="shop-page">
      <p className="section-label">× SHOP</p>
      <h1>All Products</h1>

      <div className="shop-filters">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={cat === "All" ? "/shop" : `/shop?category=${encodeURIComponent(cat)}`}
            className={`filter-btn ${
              (cat === "All" && !category) || category === cat
                ? "filter-btn--active"
                : ""
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="shop-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link href={`/products/${product.slug}`}>
              <div className="product-card__img">
                <div className="product-card__vial-wrap">
                  <div className="product-card__vial product-card__vial--dark"></div>
                </div>
              </div>
              <div className="product-card__info">
                <h4>{product.name}</h4>
                <span>{formatPrice(product.price)}</span>
              </div>
            </Link>
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

      {products.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--muted)", marginTop: "40px" }}>
          No products found in this category.
        </p>
      )}
    </div>
  );
}

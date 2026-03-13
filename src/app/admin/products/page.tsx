import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <div className="admin-header">
        <h1>Products</h1>
        <Link href="/admin/products/new" className="btn btn-primary">
          Add Product
        </Link>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Dosage</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ fontWeight: 600 }}>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.dosage}</td>
              <td>{formatPrice(product.price)}</td>
              <td>
                <span
                  className={`status-badge ${
                    product.inStock
                      ? "status-badge--paid"
                      : "status-badge--pending"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </td>
              <td>
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.82rem" }}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

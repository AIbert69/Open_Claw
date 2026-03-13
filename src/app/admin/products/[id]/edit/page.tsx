"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "Peptides",
    dosage: "",
    inStock: true,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    fetch(`/api/admin/products?id=${params.id}`)
      .then((r) => r.json())
      .then((product) => {
        setFormData({
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: (product.price / 100).toFixed(2),
          category: product.category,
          dosage: product.dosage,
          inStock: product.inStock,
        });
      });
  }, [params.id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(`/api/admin/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: params.id,
        ...formData,
        price: Math.round(parseFloat(formData.price) * 100),
      }),
    });

    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to update product");
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: params.id }),
    });
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <div className="settings-form" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name="name" className="form-input" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Slug</label>
            <input name="slug" className="form-input" value={formData.slug} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              style={{ resize: "vertical" }}
              required
            />
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Price ($)</label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                className="form-input"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Category</label>
              <select name="category" className="form-input" value={formData.category} onChange={handleChange}>
                <option>Peptides</option>
                <option>Blends</option>
                <option>L-Carnitine</option>
                <option>Capsules</option>
                <option>Bulk</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Dosage</label>
            <input name="dosage" className="form-input" value={formData.dosage} onChange={handleChange} />
          </div>
          <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              id="inStock"
            />
            <label htmlFor="inStock" style={{ margin: 0 }}>In Stock</label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: "center" }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn"
              style={{
                background: "#e74c3c",
                color: "white",
                justifyContent: "center",
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

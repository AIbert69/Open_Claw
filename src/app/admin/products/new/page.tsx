"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "Peptides",
    dosage: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name"
        ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "") }
        : {}),
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: Math.round(parseFloat(formData.price) * 100),
      }),
    });

    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to create product");
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Add Product</h1>
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

          {error && <p className="form-error">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

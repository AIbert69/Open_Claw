import Link from "next/link";

const categories = [
  {
    name: "Peptides",
    description:
      "Clinically formulated compounds that boost repair, recovery, and performance at the cellular level.",
    featured: true,
  },
  {
    name: "Blends",
    description:
      "Multi-peptide formulas designed for synergy — maximising regeneration, strength, and vitality.",
  },
  {
    name: "L-Carnitine",
    description:
      "Supports fat metabolism, endurance, and energy production for a lean, efficient body.",
  },
  {
    name: "Capsules",
    description:
      "Clean, precisely dosed formulas for daily support and consistent performance.",
  },
  {
    name: "Bulk",
    description:
      "Large-format research-grade peptides with verified purity and uncompromising quality.",
  },
];

function ArrowSvg() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export default function Categories() {
  return (
    <section className="categories">
      {categories.map((cat) =>
        cat.featured ? (
          <div key={cat.name} className="category-row category-row--featured">
            <div className="category-row__left">
              <div className="category-row__img category-row__img--peptides"></div>
            </div>
            <div className="category-row__body">
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
            <Link
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="category-row__arrow category-row__arrow--featured"
              aria-label={`Shop ${cat.name}`}
            >
              <ArrowSvg />
            </Link>
          </div>
        ) : (
          <div key={cat.name} className="category-row">
            <div className="category-row__body">
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
            <Link
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="category-row__arrow"
              aria-label={`Shop ${cat.name}`}
            >
              <ArrowSvg />
            </Link>
          </div>
        )
      )}
    </section>
  );
}

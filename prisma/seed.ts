import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "GLP-3",
      slug: "glp-3",
      description:
        "A research-grade peptide supporting gut health, tissue repair, and metabolic optimization at the cellular level.",
      price: 6400,
      category: "Peptides",
      dosage: "5mg",
    },
    {
      name: "MOTS-C",
      slug: "mots-c",
      description:
        "Mitochondrial-derived peptide that enhances metabolic homeostasis, exercise capacity, and cellular energy production.",
      price: 7400,
      category: "Peptides",
      dosage: "5mg",
    },
    {
      name: "BPC-157",
      slug: "bpc-157",
      description:
        "Body Protection Compound supporting accelerated tissue healing, gut restoration, and systemic recovery.",
      price: 8800,
      category: "Peptides",
      dosage: "5mg",
    },
    {
      name: "BPC-157 10mg",
      slug: "bpc-157-10mg",
      description:
        "Higher-dose Body Protection Compound for advanced research applications requiring elevated concentration.",
      price: 9300,
      category: "Peptides",
      dosage: "10mg",
    },
    {
      name: "BPC-157 Capsules",
      slug: "bpc-157-capsules",
      description:
        "The same verified purity in a seamless capsule format for daily precision dosing.",
      price: 7900,
      category: "Capsules",
      dosage: "250mcg x 60",
    },
    {
      name: "GLU-PP-332 Capsules",
      slug: "glu-pp-332-capsules",
      description:
        "Exercise mimetic compound in capsule form, supporting endurance and metabolic performance.",
      price: 8500,
      category: "Capsules",
      dosage: "10mg x 30",
    },
    {
      name: "Recovery Blend",
      slug: "recovery-blend",
      description:
        "Multi-peptide formula combining BPC-157 and TB-500 for synergistic tissue repair and recovery.",
      price: 12900,
      category: "Blends",
      dosage: "10mg",
    },
    {
      name: "L-Carnitine Injectable",
      slug: "l-carnitine-injectable",
      description:
        "Pharmaceutical-grade L-Carnitine supporting fat metabolism, endurance, and energy production.",
      price: 4500,
      category: "L-Carnitine",
      dosage: "500mg/ml",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import type { Metadata } from "next";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "peplogix — Precision Peptides",
  description:
    "Discover clinically designed peptide formulations engineered to enhance recovery, optimize performance, and unlock your full potential.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

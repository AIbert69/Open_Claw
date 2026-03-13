import Hero from "@/components/Hero";
import AboutStrip from "@/components/AboutStrip";
import TrustSection from "@/components/TrustSection";
import BestSellers from "@/components/BestSellers";
import Categories from "@/components/Categories";
import CapsuleHero from "@/components/CapsuleHero";
import Subscribe from "@/components/Subscribe";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutStrip />
      <TrustSection />
      <BestSellers />
      <Categories />
      <CapsuleHero />
      <Subscribe />
    </>
  );
}

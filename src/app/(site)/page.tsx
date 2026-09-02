import Hero from "@/components/home/Hero";
import TechIntro from "@/components/home/TechIntro";
import FeatureGrid from "@/components/home/FeatureGrid";
import LayerCta from "@/components/home/LayerCta";
import Industries from "@/components/home/Industries";
import CertCarousel from "@/components/home/CertCarousel";
import AboutBanner from "@/components/home/AboutBanner";
import Production from "@/components/home/Production";
import HeatFlex from "@/components/home/HeatFlex";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechIntro />
      <FeatureGrid />
      <LayerCta />
      <Industries />
      <CertCarousel />
      <AboutBanner />
      <Production />
      <HeatFlex />
    </>
  );
}
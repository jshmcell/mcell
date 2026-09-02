import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import Stats from "@/components/mcell/Stats";
import TechLayers from "@/components/mcell/TechLayers";
import Products from "@/components/mcell/Products";
import Comparisons from "@/components/mcell/Comparisons";
import Platform from "@/components/mcell/Platform";
import PartnershipCta from "@/components/subpage/PartnershipCta";

export const metadata: Metadata = {
  title: "Mcell",
};

export default function McellPage() {
  return (
    <>
      <SubHero groupLabel="Mcell" title="Mcell" currentHref="/mcell" />
      <Stats />
      <TechLayers />
      <Products />
      <Comparisons />
      <Platform />
      <PartnershipCta />
    </>
  );
}
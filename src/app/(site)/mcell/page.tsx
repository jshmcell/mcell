import type { Metadata } from "next";
import McellHero from "@/components/mcell/Hero";
import Stats from "@/components/mcell/Stats";
import TechLayers from "@/components/mcell/TechLayers";
import Products from "@/components/mcell/Products";
import Comparisons from "@/components/mcell/Comparisons";
import Industries from "@/components/mcell/Industries";
import Cooperation from "@/components/mcell/Cooperation";
import Platform from "@/components/mcell/Platform";
import PartnershipInquiry from "@/components/mcell/PartnershipInquiry";

export const metadata: Metadata = {
  title: "기술력 소개 | 엠셀",
};

/** 기술력 소개 (원본 /31) — 배너 → 투자현황 → 핵심기술 → 제품 → 성능비교 → 산업/협력/확장 → 문의폼 */
export default function McellPage() {
  return (
    <>
      <McellHero />
      <Stats />
      <TechLayers />
      <Products />
      <Comparisons />
      <Industries />
      <Cooperation />
      <Platform />
      <PartnershipInquiry />
    </>
  );
}

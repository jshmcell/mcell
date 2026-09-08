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
import { getLocale } from "@/i18n/server";
import { getMcellContent } from "@/lib/mcell-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title:
      locale === "ko" ? "기술력 소개 | 엠셀" : "Technology | MCell",
  };
}

export const dynamic = "force-dynamic";

/** 기술력 소개 (원본 /31) — 배너 → 투자현황 → 핵심기술 → 제품 → 성능비교 → 산업/협력/확장 → 문의폼 */
export default async function McellPage() {
  const locale = await getLocale();
  const c = await getMcellContent(locale);
  return (
    <>
      <McellHero content={c.hero} locale={locale} />
      <Stats content={c.stats} />
      <TechLayers content={c.tech} />
      <Products content={c.products} />
      <Comparisons content={c.comparisons} />
      <Industries content={c.industries} />
      <Cooperation content={c.cooperation} />
      <Platform content={c.platform} />
      <PartnershipInquiry />
    </>
  );
}

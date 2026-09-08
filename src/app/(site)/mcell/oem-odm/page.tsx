import type { Metadata } from "next";
import OemBanner from "@/components/mcell/oem/OemBanner";
import OemBlocks from "@/components/mcell/oem/OemBlocks";
import OemRnd from "@/components/mcell/oem/OemRnd";
import OemProof from "@/components/mcell/oem/OemProof";
import PartnershipInquiry from "@/components/mcell/PartnershipInquiry";
import { getLocale } from "@/i18n/server";
import { getMcellOemContent } from "@/lib/mcell-content";

export const metadata: Metadata = {
  title: "OEM/ODM | 엠셀",
};

export const dynamic = "force-dynamic";

/**
 * OEM/ODM (원본 /32) — 흰 오버레이 배너 → 3개 적용 분야(좌우 교차) →
 * R&D 이미지 → 6열 파트너십 실적 → 문의 폼
 */
export default async function OemOdmPage() {
  const locale = await getLocale();
  const c = await getMcellOemContent(locale);
  return (
    <>
      <OemBanner content={c.oemBanner} />
      <OemBlocks content={c.oemBlocks} />
      <OemRnd content={c.rnd} />
      <OemProof content={c.oemProof} proof={c.proof} />
      {/* PARTNERSHIP INQUIRY (+ 하단 무한 슬라이드) */}
      <PartnershipInquiry />
    </>
  );
}

import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import BoardTable from "@/components/library/BoardTable";
import { newsBand } from "@/data/boards";

export const metadata: Metadata = {
  title: "공지사항",
};

/** 공지사항 (원본 /45) — 서브 히어로 + 와이드 밴드 + 게시판 */
export default function NoticesPage() {
  return (
    <>
      <SubHero groupLabel="뉴스" title="공지사항" currentHref="/news/notices" />
      <SubPageBanner image={newsBand} heightClassName="h-[300px]" />
      <BoardTable boardKey="notices" />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}

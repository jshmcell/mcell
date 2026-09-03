import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import BoardTable from "@/components/library/BoardTable";
import { newsBand } from "@/data/boards";

export const metadata: Metadata = {
  title: "소식",
};

/** 소식 (원본 /46) — 서브 히어로 + 와이드 밴드 + 게시판 */
export default function UpdatesPage() {
  return (
    <>
      <SubHero groupLabel="뉴스" title="소식" currentHref="/news/updates" />
      <SubPageBanner image={newsBand} heightClassName="h-[300px]" />
      <BoardTable boardKey="updates" />
      <div aria-hidden className="h-[136px] bg-white md-header:h-[271px]" />
    </>
  );
}

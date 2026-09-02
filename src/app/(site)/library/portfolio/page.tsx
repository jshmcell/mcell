import type { Metadata } from "next";
import BoardList from "@/components/subpage/BoardList";

export const metadata: Metadata = {
  title: "포트폴리오",
};

export default function PortfolioPage() {
  return (
    <BoardList
      boardKey="portfolio"
      groupLabel="자료실"
      title="포트폴리오"
      currentHref="/library/portfolio"
      nav={[
        { label: "포트폴리오", href: "/library/portfolio" },
        { label: "카달로그", href: "/library/catalog" },
      ]}
    />
  );
}
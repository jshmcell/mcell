import type { Metadata } from "next";
import BoardList from "@/components/subpage/BoardList";

export const metadata: Metadata = {
  title: "카달로그",
};

export default function CatalogPage() {
  return (
    <BoardList
      boardKey="catalog"
      groupLabel="자료실"
      title="카달로그"
      currentHref="/library/catalog"
      children={[
        { label: "포트폴리오", href: "/library/portfolio" },
        { label: "카달로그", href: "/library/catalog" },
      ]}
    />
  );
}
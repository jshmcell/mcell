import type { Metadata } from "next";
import BoardList from "@/components/subpage/BoardList";

export const metadata: Metadata = {
  title: "공지사항",
};

export default function NoticesPage() {
  return (
    <BoardList
      boardKey="notices"
      groupLabel="뉴스"
      title="공지사항"
      currentHref="/news/notices"
      nav={[
        { label: "공지사항", href: "/news/notices" },
        { label: "소식", href: "/news/updates" },
      ]}
    />
  );
}
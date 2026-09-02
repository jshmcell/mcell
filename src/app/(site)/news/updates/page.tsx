import type { Metadata } from "next";
import BoardList from "@/components/subpage/BoardList";

export const metadata: Metadata = {
  title: "소식",
};

export default function UpdatesPage() {
  return (
    <BoardList
      boardKey="updates"
      groupLabel="뉴스"
      title="소식"
      currentHref="/news/updates"
      children={[
        { label: "공지사항", href: "/news/notices" },
        { label: "소식", href: "/news/updates" },
      ]}
    />
  );
}
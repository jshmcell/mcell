import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import HistoryTimeline from "@/components/about/HistoryTimeline";
import { getLocale } from "@/i18n/server";
import { getAboutHistoryContent } from "@/lib/about-content";

export const metadata: Metadata = {
  title: "연혁",
};

export default async function HistoryPage() {
  const locale = await getLocale();
  const c = await getAboutHistoryContent(locale);

  return (
    <>
      <SubHero groupLabel="About" title="연혁" currentHref="/about/history" locale={locale} />
      <SubPageBanner image="/assets/img/9e084a2b4a973.jpg" overlay locale={locale} />
      <HistoryTimeline content={c} />
      <div aria-hidden className="h-[76px] md-header:h-[151px]" />
    </>
  );
}

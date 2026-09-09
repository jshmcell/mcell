import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import HistoryTimeline from "@/components/about/HistoryTimeline";
import { getLocale } from "@/i18n/server";
import { getAboutHistoryContent } from "@/lib/about-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: locale === "ko" ? "연혁" : "History" };
}

export default async function HistoryPage() {
  const locale = await getLocale();
  const c = await getAboutHistoryContent(locale);
  const title = locale === "ko" ? "연혁" : "History";

  return (
    <>
      <SubHero groupLabel="About" title={title} currentHref="/about/history" locale={locale} />
      <SubPageBanner image={c.banner} overlay />
      <HistoryTimeline content={c} locale={locale} />
      <div aria-hidden className="h-[76px] md-header:h-[151px]" />
    </>
  );
}

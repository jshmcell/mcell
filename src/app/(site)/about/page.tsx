import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import CeoIntro from "@/components/about/CeoIntro";
import ContactBanner from "@/components/about/ContactBanner";
import { getLocale } from "@/i18n/server";
import { getAboutPageContent } from "@/lib/about-content";

export const metadata: Metadata = {
  title: "About Us",
};

export default async function AboutPage() {
  const locale = await getLocale();
  const c = await getAboutPageContent(locale);

  return (
    <>
      <SubHero groupLabel="About" title="About Us" currentHref="/about" locale={locale} />
      <SubPageBanner image={c.ceo.banner.bg} />
      <CeoIntro content={c.ceo} />
      <ContactBanner content={c.contact} locale={locale} />
    </>
  );
}

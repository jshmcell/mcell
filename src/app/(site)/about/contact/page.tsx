import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import ContactOffices from "@/components/about/ContactOffices";
import { getLocale } from "@/i18n/server";
import { getAboutContactContent } from "@/lib/about-content";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default async function ContactPage() {
  const locale = await getLocale();
  const c = await getAboutContactContent(locale);

  return (
    <>
      <SubHero
        groupLabel="About"
        title="Contact Us"
        currentHref="/about/contact"
        locale={locale}
      />
      <SubPageBanner image={c.banner} overlay />
      <section className="bg-white">
        <ContactOffices content={c.contact} locale={locale} />
        <div aria-hidden className="h-[76px] md-header:h-[148px]" />
      </section>
    </>
  );
}

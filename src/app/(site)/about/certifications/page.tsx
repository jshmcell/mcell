import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import CertGallery from "@/components/subpage/CertGallery";
import { getLocale } from "@/i18n/server";
import { getAboutCertificationsContent } from "@/lib/about-content";

export const metadata: Metadata = {
  title: "인증서",
};

export default async function CertificationsPage() {
  const locale = await getLocale();
  const c = await getAboutCertificationsContent(locale);

  return (
    <>
      <SubHero
        groupLabel="About"
        title="인증서"
        currentHref="/about/certifications"
        locale={locale}
      />
      <SubPageBanner image="/assets/img/f9124d9afd25e.jpg" overlay locale={locale} />
      <section className="bg-white">
        <div className="container-site pt-[75px] pb-[51px]">
          <CertGallery items={c.certifications} />
        </div>
      </section>
      <div aria-hidden className="h-[73px] md-header:h-[146px]" />
    </>
  );
}

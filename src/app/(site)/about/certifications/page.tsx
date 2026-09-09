import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import CertGallery from "@/components/subpage/CertGallery";
import { getLocale } from "@/i18n/server";
import { getAboutCertificationsContent } from "@/lib/about-content";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: locale === "ko" ? "인증서" : "Certifications" };
}

export default async function CertificationsPage() {
  const locale = await getLocale();
  const c = await getAboutCertificationsContent(locale);
  const title = locale === "ko" ? "인증서" : "Certifications";

  return (
    <>
      <SubHero
        groupLabel="About"
        title={title}
        currentHref="/about/certifications"
        locale={locale}
      />
      <SubPageBanner image={c.banner} overlay />
      <section className="bg-white">
        <div className="container-site pt-[75px] pb-[51px]">
          <CertGallery items={c.certifications} />
        </div>
      </section>
      <div aria-hidden className="h-[73px] md-header:h-[146px]" />
    </>
  );
}

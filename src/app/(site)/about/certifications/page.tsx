import type { Metadata } from "next";
import SubHero from "@/components/subpage/SubHero";
import SubPageBanner from "@/components/subpage/SubPageBanner";
import CertGallery from "@/components/subpage/CertGallery";
import { certifications } from "@/data/certifications";

export const metadata: Metadata = {
  title: "인증서",
};

export default function CertificationsPage() {
  return (
    <>
      <SubHero
        groupLabel="About"
        title="인증서"
        currentHref="/about/certifications"
      />
      <SubPageBanner image="/assets/img/f9124d9afd25e.jpg" overlay />
      <section className="bg-white">
        <div className="container-site pt-[75px] pb-[51px]">
          <CertGallery items={certifications} />
        </div>
      </section>
      <div aria-hidden className="h-[73px] md-header:h-[146px]" />
    </>
  );
}

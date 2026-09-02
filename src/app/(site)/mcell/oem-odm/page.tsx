import SubHero from "@/components/subpage/SubHero";
import PartnershipCta from "@/components/subpage/PartnershipCta";

export const metadata = {
  title: "OEM/ODM | 엠셀",
  description:
    "엠셀은 축적된 발열 기술과 생산 노하우를 바탕으로, 다양한 브랜드와 협력하며 제품 기획, 개발, 양산까지 함께 만들어갑니다.",
};

export default function OemOdmPage() {
  return (
    <>
      <SubHero groupLabel="Mcell" title="OEM/ODM" currentHref="/mcell/oem-odm" />
      <section className="container-site py-20">
        <p className="max-w-[720px] text-[16px] leading-8 text-ink">
          엠셀은 축적된 발열 기술과 생산 노하우를 바탕으로, 다양한 브랜드와 협력하며 제품 기획,
          개발, 양산까지 함께 만들어갑니다.
        </p>
      </section>
      <PartnershipCta />
    </>
  );
}
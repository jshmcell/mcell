import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function PartnershipCta() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/img/06285cdf4dddb.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="container-site relative py-28 text-center text-white">
        <Reveal>
          <ButtonLink href="/partnership" variant="outline" className="h-[43px] px-[40px] py-[10px] text-[15px]">
            제휴 및 문의 바로가기 →
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
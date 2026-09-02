import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { aboutBanner } from "@/data/home";

export default function AboutBanner() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={aboutBanner.bg}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="container-site relative pb-[49px] pt-[50px] md-header:pb-[57px] md-header:pt-[57px]">
        <Reveal direction="fade" duration={0.7}>
          <div className="pt-[10px] md-header:max-w-[610px]">
            <h2 className="text-[20px] font-bold leading-[24px] text-white md-header:text-[30px] md-header:leading-[36px]">
              {aboutBanner.title}
            </h2>
            <p className="mt-[10px] text-[15px] leading-[18px] text-white md-header:text-[18px] md-header:leading-[30px]">
              {aboutBanner.description}
            </p>
          </div>
        </Reveal>
        {/* original: button has no entrance animation, sits flush right */}
        <div className="mt-[93px] flex justify-end md-header:mt-[71px]">
          <ButtonLink
            href={aboutBanner.cta.href}
            variant="outline"
            className="h-[42px] rounded-[4px] px-[40px] py-[10px] text-[14px]"
          >
            {aboutBanner.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

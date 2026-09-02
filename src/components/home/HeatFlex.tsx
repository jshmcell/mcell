import SmartImage from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { heatFlex } from "@/data/home";

export default function HeatFlex() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heatFlex.bg})` }}
      />
      <div className="absolute inset-0 bg-black/75" />
      <div className="container-site relative pb-[65px] pt-[52px] text-center md-header:pb-[109px] md-header:pt-[113px]">
        {/* PC: logo+title+desc fadeInUp 1.2s/0.3s, button static */}
        <div className="hidden md-header:block">
          <Reveal direction="up" duration={1.2} delay={0.3}>
            <SmartImage
              src={heatFlex.logo}
              alt="HEAT FLEX"
              width={120}
              height={45}
              className="mx-auto mt-[10px] h-auto w-[120px]"
            />
            <h2 className="mt-[5px] text-[48px] font-bold leading-[57.6px] text-white">
              {heatFlex.title}
            </h2>
            <div className="mt-[13px] text-[18px] leading-[30px] text-white">
              {heatFlex.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>
          <div className="mt-[31px]">
            <ButtonLink
              href={heatFlex.cta.href}
              variant="outline"
              className="h-[43px] rounded-[4px] px-[30px] py-[10px] text-[15px]"
            >
              {heatFlex.cta.label}
            </ButtonLink>
          </div>
        </div>
        {/* mobile: content static, button fadeInUp 0.7s/0.3s */}
        <div className="md-header:hidden">
          <SmartImage
            src={heatFlex.logo}
            alt="HEAT FLEX"
            width={120}
            height={45}
            className="mx-auto mt-[10px] h-auto w-[120px]"
          />
          <h2 className="mt-[7px] text-[22px] font-bold leading-[26.4px] text-white">
            {heatFlex.title}
          </h2>
          <div className="mt-[14px] text-[14px] leading-[28px] text-white">
            {heatFlex.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-[24px]">
            <Reveal direction="up" duration={0.7} delay={0.3}>
              <ButtonLink
                href={heatFlex.cta.href}
                variant="outline"
                className="h-[38px] rounded-[4px] px-[34px] py-[8px] text-[14px]"
              >
                {heatFlex.cta.label}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

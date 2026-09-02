import Image from "next/image";
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
      <div className="container-site relative py-32 text-center">
        <Reveal>
          <Image
            src={heatFlex.logo}
            alt="HEAT FLEX"
            width={120}
            height={120}
            className="mx-auto h-[120px] w-[120px]"
          />
          <h2 className="mt-6 text-[22px] font-bold text-white lg:text-[48px]">
            {heatFlex.title}
          </h2>
          <div className="mt-6 text-[14px] leading-8 text-white/90 lg:text-[18px]">
            {heatFlex.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <ButtonLink
            href={heatFlex.cta.href}
            variant="outline"
            className="mt-12 h-[43px] rounded-[4px] px-[40px] py-[10px] text-[15px]"
          >
            {heatFlex.cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

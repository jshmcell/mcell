import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { aboutBanner } from "@/data/home";

export default function AboutBanner() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutBanner.bg})` }}
      />
      <div className="container-site relative py-20">
        <Reveal>
          <h2 className="text-[30px] font-bold text-white">
            {aboutBanner.title}
          </h2>
          <p className="mt-4 text-[18px] leading-8 text-white/95">
            {aboutBanner.description}
          </p>
          <ButtonLink
            href={aboutBanner.cta.href}
            variant="outline"
            className="mt-10 h-[42px] rounded-[4px] px-[40px] py-[10px] text-[14px]"
          >
            {aboutBanner.cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

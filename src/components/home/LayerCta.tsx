import { ButtonLink } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { layerSection } from "@/data/home";

export default function LayerCta() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${layerSection.bg})` }}
      />
      <div className="absolute inset-0 bg-white/75" />
      <div className="container-site relative flex justify-center py-40">
        <Reveal>
          <ButtonLink href={layerSection.cta.href} className="h-[43px] px-[40px] py-[10px] text-[15px]">
            {layerSection.cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
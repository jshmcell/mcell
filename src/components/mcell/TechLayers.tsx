import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { tech } from "@/data/mcell";

export default function TechLayers() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${tech.bg})` }}
      />
      <div className="absolute inset-0 bg-white/60" />
      <div className="container-site relative py-20">
        <Reveal>
          <p className="text-[18px] font-bold text-navy-900">{tech.heading}</p>
          <h2 className="mt-2 text-[30px] font-bold text-navy-900">{tech.title}</h2>
          <p className="mt-3 text-[16px] leading-8">{tech.description}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <SmartImage
            src={tech.image}
            alt={tech.title}
            width={1037}
            height={0}
            className="mx-auto mt-10 h-auto w-full max-w-[1037px]"
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tech.layers.map((layer, i) => (
            <Reveal key={layer.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-[15px] bg-white p-6 text-center">
                <h3 className="text-[20px] font-bold text-ink">{layer.title}</h3>
                <div className="mt-2 text-[14px] leading-6 text-ink/85">
                  {layer.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
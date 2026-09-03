import Appear from "@/components/ui/Appear";
import SmartImage from "@/components/ui/SmartImage";
import { tech } from "@/data/mcell";

/**
 * 핵심 기술 소개 — 원본: 배경 이미지 + 흰색 60% 오버레이,
 * 4개 기술 레이어 행(#e8ecf1, 1037x153/117) + 단면 다이어그램 1037x109
 */
export default function TechLayers() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${tech.bg})` }}
      />
      <div className="absolute inset-0 bg-white/60" />

      <div className="container-site relative pt-[110px] pb-[171px] text-center">
        <Appear animation="fadeIn" duration={0.7}>
          <p className="text-[20px] font-bold text-navy-900">{tech.heading}</p>
          <h2 className="text-[30px] font-bold text-ink">{tech.title}</h2>
          <p className="mt-[6px] text-[18px] leading-[2] text-ink">
            {tech.description}
          </p>
        </Appear>

        <Appear className="mx-auto mt-[30px] max-w-[1037px]">
          <div className="space-y-[22px]">
            {tech.layers.map((layer) => (
              <div
                key={layer.title}
                className="bg-[#e8ecf1] px-6 py-[18px] text-center"
              >
                <h3 className="text-[22px] font-bold leading-[2] text-navy-900">
                  {layer.title}
                </h3>
                <div className="text-[18px] leading-[2] text-ink">
                  {layer.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Appear>

        <Appear
          duration={1.2}
          className="mx-auto mt-[45px] block max-w-[1037px]"
        >
          <SmartImage
            src={tech.image}
            alt={tech.title}
            width={1037}
            height={109}
            className="h-auto w-full"
            sizes="(min-width: 992px) 1037px, 100vw"
          />
        </Appear>
      </div>
    </section>
  );
}

import Reveal from "@/components/ui/Reveal";
import { featureCards } from "@/data/home";

export default function FeatureGrid() {
  return (
    <section className="bg-navy-900">
      <div className="container-site py-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card, i) => (
            <Reveal key={card.no} delay={(i % 4) * 0.1}>
              <div className="flex h-[163px] flex-col items-center justify-center rounded-[15px] bg-white px-4 py-5 text-center">
                <span className="text-[18px]">{card.no}</span>
                <h3 className="mt-1 text-[22px] font-bold text-[#2a2a2a]">{card.title}</h3>
                <div className="mt-1 text-[16px] leading-6 text-[#2a2a2a]">
                  {card.lines.map((line) => (
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
import Reveal from "@/components/ui/Reveal";
import { featureCards as defaultCards, type FeatureCard } from "@/data/home";

// original stagger: card 1 = 0s, card 2 = 0.2s, then 0.1s steps
const DELAYS = [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

export default function FeatureGrid({
  cards = defaultCards,
}: {
  cards?: FeatureCard[];
}) {
  const featureCards = cards;
  return (
    <section className="bg-navy-900">
      <div className="container-site pb-[19px] pt-[18px] md-header:pb-[110px] md-header:pt-[110px]">
        <div className="my-[15px] grid auto-rows-[1fr] grid-cols-2 gap-[15px] md-header:grid-cols-4 md-header:gap-[30px]">
          {featureCards.map((card, i) => (
            <Reveal
              key={card.no}
              direction="fade"
              duration={0.7}
              delay={DELAYS[i]}
            >
              <div className="flex h-full flex-col items-center justify-center rounded-[10px] bg-white px-2 py-[10px] text-center md-header:rounded-[15px] md-header:px-4 md-header:py-5">
                <span className="text-[18px]">{card.no}</span>
                <h3
                  title={card.title}
                  className="mt-[10px] line-clamp-5 break-words text-[16px] font-bold leading-[22.4px] text-[#2a2a2a] md-header:text-[22px] md-header:leading-[26.4px]"
                >
                  {card.title}
                </h3>
                <div
                  title={card.lines.join(" ")}
                  className="mt-[15px] line-clamp-5 break-words text-[14px] leading-[22.4px] text-[#2a2a2a] md-header:mt-[16px] md-header:text-[16px] md-header:leading-[25.6px]"
                >
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

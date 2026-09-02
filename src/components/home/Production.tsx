import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { production } from "@/data/home";

export default function Production() {
  return (
    <section className="bg-white">
      <div className="container-site pb-[48px] pt-[48px] md-header:pb-[95px] md-header:pt-[110px]">
        <Reveal direction="fade" duration={0.7} className="my-[15px]">
          <div className="pt-[10px]">
            <h2 className="text-[20px] font-bold leading-[24px] text-navy-900 md-header:text-[30px] md-header:leading-[36px]">
              {production.title}
            </h2>
            <p className="mt-[10px] text-[15px] leading-[30px] text-ink md-header:text-[18px]">
              {production.description}
            </p>
          </div>
        </Reveal>

        {/* original: cards fadeInUp 1.2s, delays 0.2/0.4/0.6 */}
        <div className="mt-[15px] grid grid-cols-1 gap-y-[15px] md-header:mt-[60px] md-header:grid-cols-3 md-header:gap-[30px]">
          {production.cards.map((card, i) => (
            <Reveal
              key={card.title}
              direction="up"
              duration={1.2}
              delay={0.2 + i * 0.2}
            >
              <div className="rounded-[10px] bg-[#fafafa] pb-[20px] pt-[30px]">
                <SmartImage
                  src={card.icon}
                  alt=""
                  width={74}
                  height={74}
                  className="mx-auto h-[74px] w-[74px]"
                />
                <h3 className="mt-[16px] text-center text-[16px] font-bold leading-[32px] text-[#363636] md-header:text-[19.28px] md-header:leading-[27px]">
                  {card.title}
                </h3>
                <div className="mx-[20px] mt-[16px] bg-white px-[8px] py-[8px] text-center md-header:mt-[16px]">
                  {card.lines.map((line) => (
                    <p
                      key={line}
                      className="text-[15px] leading-[24px] text-[#363636]"
                    >
                      {line}
                    </p>
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

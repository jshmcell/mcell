import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { comparisons } from "@/data/mcell";

export default function Comparisons() {
  return (
    <>
      {comparisons.map((cmp, idx) => (
        <section key={idx} className={idx % 2 === 0 ? "bg-[#f7f7f7]" : "bg-white"}>
          <div className="container-site py-20">
            {cmp.heading && (
              <Reveal>
                <p className="text-[18px] font-bold text-navy-900">{cmp.heading}</p>
                <h2 className="mt-2 text-[30px] font-bold text-navy-900">{cmp.subheading}</h2>
                <p className="mt-3 text-[16px]">{cmp.description}</p>
              </Reveal>
            )}

            <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
              <Reveal delay={0.1}>
                <div className="flex h-full flex-col rounded-[15px] border border-black/10 bg-white p-8">
                  <h3 className="text-[20px] font-bold text-ink">{cmp.competitorTitle}</h3>
                  <div className="mt-4 flex-1">
                    <SmartImage src={cmp.image} alt={cmp.competitorTitle} width={520} height={0} className="h-auto w-full max-w-[520px]" />
                    <div className="mt-5 text-[14px] leading-7 text-ink/85">
                      {cmp.competitorLines.map((line) => (
                        <p key={line.slice(0, 20)}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="flex h-full flex-col rounded-[15px] border border-navy-900/30 bg-navy-900 p-8 text-white">
                  <h3 className="text-[20px] font-bold">{cmp.oursTitle}</h3>
                  <div className="mt-4 flex-1">
                    <SmartImage src={cmp.image} alt={cmp.oursTitle} width={520} height={0} className="h-auto w-full max-w-[520px]" />
                    <div className="mt-5 text-[14px] leading-7 text-white/90">
                      {cmp.oursLines
                        .filter((line) => !line.endsWith("|bold"))
                        .map((line) => (
                          <p key={line.slice(0, 20)}>{line}</p>
                        ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
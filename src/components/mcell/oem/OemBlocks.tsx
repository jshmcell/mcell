import Appear from "@/components/ui/Appear";
import SmartImage from "@/components/ui/SmartImage";
import { oemBlocks as defaultContent } from "@/data/mcell";
import { cn } from "@/lib/cn";
import type { ResolvedMcellOem } from "@/lib/mcell-content-resolve";

/**
 * 적용 분야 3블록 — 텍스트/이미지 좌우 교차, 이미지 610x421 fadeInUp 2s
 */
export default function OemBlocks({
  content = defaultContent,
}: {
  content?: ResolvedMcellOem["oemBlocks"];
}) {
  return (
    <>
      {content.map((block) => (
        <section key={block.title} className="bg-white">
          <div className="container-site pt-[93px] pb-[30px]">
            <div className="grid grid-cols-1 items-center gap-y-[30px] md-header:grid-cols-2">
              <div
                className={cn(
                  "text-left md-header:px-[36px]",
                  block.imageSide === "right"
                    ? "md-header:order-1"
                    : "md-header:order-2",
                )}
              >
                <Appear className="md-header:pt-[36px]">
                  <h2 className="text-[24px] font-bold text-black md-header:text-[30px]">
                    {block.title}
                  </h2>
                  <p className="mt-[10px] text-[17px] font-bold text-black md-header:text-[20px]">
                    {block.subtitle}
                  </p>
                  <div className="mt-[16px] text-[15px] leading-[2] text-[#505050] md-header:text-[16px]">
                    {block.lines.map((line) => (
                      <p key={line.slice(0, 24)}>{line}</p>
                    ))}
                  </div>
                </Appear>
              </div>
              <div
                className={cn(
                  block.imageSide === "right"
                    ? "md-header:order-2"
                    : "md-header:order-1",
                )}
              >
                <Appear
                  animation={
                    block.imageSide === "right" ? "fadeInRight" : "fadeInLeft"
                  }
                  duration={2}
                >
                  <SmartImage
                    src={block.image}
                    alt={block.title}
                    width={610}
                    height={421}
                    className="mx-auto h-auto w-full max-w-[610px]"
                    sizes="(min-width: 992px) 610px, 100vw"
                  />
                </Appear>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

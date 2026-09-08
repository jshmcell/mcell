import Appear from "@/components/ui/Appear";
import ViewableImage from "@/components/ui/ViewableImage";
import { rnd as defaultContent } from "@/data/mcell";
import type { ResolvedMcellOem } from "@/lib/mcell-content-resolve";

/**
 * R&D & MANUFACTURING — 원본: 헤딩 + 타이틀 + 이미지 1150x249 (클릭 시 뷰어)
 */
export default function OemRnd({
  content = defaultContent,
}: {
  content?: ResolvedMcellOem["rnd"];
}) {
  return (
    <section className="bg-white">
      <div className="container-site pt-[110px] pb-[50px] text-center">
        <Appear animation="fadeIn" duration={0.7}>
          <p className="text-[20px] font-bold text-navy-900">{content.heading}</p>
          <h2 className="text-[30px] font-bold text-ink">{content.title}</h2>
        </Appear>
        <Appear className="mt-[30px] block">
          <ViewableImage
            src={content.image}
            alt={content.title}
            width={1150}
            height={249}
            className="mx-auto h-auto w-full max-w-[1150px]"
            sizes="(min-width: 992px) 1150px, 100vw"
            wrapperClassName="mx-auto"
          />
        </Appear>
      </div>
    </section>
  );
}

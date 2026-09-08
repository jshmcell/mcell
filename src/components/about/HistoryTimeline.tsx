import Appear from "@/components/ui/Appear";
import SmartImage from "@/components/ui/SmartImage";
import { history, historyImages } from "@/data/about";
import type { ResolvedAboutHistory } from "@/lib/about-content-resolve";

const defaultContent: ResolvedAboutHistory = {
  history,
  historyImages,
  banner: "/assets/img/9e084a2b4a973.jpg",
};

/** About — 연혁 타임라인: 좌측 고정 이미지(PC) / 상단 이미지(모바일) + 연도별 이벤트 */
export default function HistoryTimeline({
  content = defaultContent,
}: {
  content?: ResolvedAboutHistory;
}) {
  const { history, historyImages } = content;
  return (
    <section className="bg-white">
      <div className="pt-[30px] pb-[30px] text-center md-header:hidden">
        <SmartImage
          src={historyImages.mobile}
          alt="엠셀 연구실"
          width={345}
          height={239}
          className="mx-auto h-auto w-full"
          sizes="(max-width: 991px) 100vw, 360px"
        />
      </div>
      <div className="pb-[15px] md-header:pt-[120px]">
        <div className="container-site flex flex-col md-header:flex-row">
          <aside className="hidden w-[600px] shrink-0 pt-[141px] md-header:block">
            <Appear
              animation="zoomIn"
              duration={2}
              delay={0}
              className="w-fit"
            >
              <SmartImage
                src={historyImages.pc}
                alt="엠셀"
                width={524}
                height={363}
                className="ml-[30px] h-[363px] w-[524px] object-cover"
                sizes="(min-width: 992px) 600px, 1px"
              />
            </Appear>
          </aside>
          <Appear
            duration={1.2}
            className="mt-[15px] w-full px-[15px] md-header:ml-auto md-header:mt-0 md-header:w-[600px] md-header:px-0"
          >
            {history.map((item) => (
              <div
                key={item.year}
                className="mb-[70px] last:mb-0 md:mb-[50px] md-header:mb-[61px]"
              >
                <p className="text-[28px] font-bold leading-[1.2] text-[#212121] md-header:text-[48px]">
                  {item.year}
                </p>
                <div className="text-[15px] leading-[24px] text-[#212121] md-header:text-[18px] md-header:leading-[30px]">
                  {item.events.map((event) => (
                    <p key={event}>- {event}</p>
                  ))}
                </div>
              </div>
            ))}
          </Appear>
        </div>
      </div>
    </section>
  );
}

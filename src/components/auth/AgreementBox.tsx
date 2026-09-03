import { cn } from "@/lib/cn";
import type { AgreementSection } from "@/lib/auth-types";

/**
 * 200px scrollable agreement box — replicated from the original
 * /site_join_agree .form-control (height 200px, border #dfe0df, radius 4px).
 */
export default function AgreementBox({
  sections,
  className,
}: {
  sections: AgreementSection[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-[200px] overflow-y-auto rounded-[4px] border border-[#dfe0df] bg-white px-[14px] py-3 text-[13px] leading-[20px] text-[#000]",
        className,
      )}
      tabIndex={0}
    >
      {sections.map((section, i) => (
        <div
          key={section.heading ?? i}
          className={section.heading ? "mt-4 first:mt-0" : ""}
        >
          {section.heading && (
            <h3 className="mb-1 font-bold text-ink">{section.heading}</h3>
          )}
          {section.paragraphs.map((p, j) => (
            <p key={j} className={p ? "mb-2 last:mb-0" : "h-2"}>
              {p}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

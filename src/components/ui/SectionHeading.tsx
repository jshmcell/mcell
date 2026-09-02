import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function SectionHeading({
  title,
  align = "center",
  dark = false,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <h2
        className={cn(
          "text-[30px] leading-[1.3] font-bold tracking-tight lg:text-[36px]",
          dark ? "text-white" : "text-navy-900"
        )}
      >
        {title}
      </h2>
      {children ? (
        <div
          className={cn(
            "mt-4 text-[16px] leading-8 lg:text-[18px]",
            dark ? "text-white/90" : "text-ink"
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
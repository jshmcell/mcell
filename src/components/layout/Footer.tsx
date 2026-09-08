import SmartImage from "@/components/ui/SmartImage";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { localizeHref, type Locale } from "@/i18n/config";
import type { ResolvedSiteSettings } from "@/lib/settings";
import type { ResolvedFooter } from "@/lib/footer-content";
import { FOOTER_DEFAULTS } from "@/data/footer";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.23.2 2.23.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
      {...props}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}

const socialIconMap: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
};

const defaultSocials: ResolvedSiteSettings["socials"] = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer({
  settings,
  content,
  locale = "ko",
}: {
  settings?: ResolvedSiteSettings;
  content?: ResolvedFooter;
  locale?: Locale;
}) {
  const c = content ?? {
    companyName: FOOTER_DEFAULTS.companyName,
    address: FOOTER_DEFAULTS.address,
    lab: FOOTER_DEFAULTS.lab,
    telPrefix: FOOTER_DEFAULTS.telPrefix,
    faxPrefix: FOOTER_DEFAULTS.faxPrefix,
    emailPrefix: FOOTER_DEFAULTS.emailPrefix,
    terms: FOOTER_DEFAULTS.terms,
    privacy: FOOTER_DEFAULTS.privacy,
  };
  const socialLinks = (settings?.socials ?? defaultSocials)
    .map((s) => ({
      label: s.label,
      href: s.href,
      Icon: socialIconMap[s.label],
    }))
    .filter((s) => s.Icon);
  return (
    <footer className="bg-[#242424]">
      <div className="container-site flex flex-col items-stretch pb-[20px] pt-[29px] lg:flex-row lg:justify-between lg:pb-[45px] lg:pt-[50px]">
        <div>
          <SmartImage
            src="/assets/img/fd051c1da84e1.png"
            alt={c.companyName}
            width={134}
            height={50}
            className="h-auto w-[134px]"
          />
          <div className="mt-[8px] text-[15px] leading-[24px] text-[#949494] lg:mt-[7px]">
            <p>{c.address}</p>
            <p>{c.lab}</p>
            <p className="mt-[24px]">{c.telPrefix} {settings?.company?.tel ?? ""}</p>
            <p>{c.faxPrefix} {settings?.company?.fax ?? ""}</p>
            <p>{c.emailPrefix} {settings?.company?.email ?? ""}</p>
          </div>
        </div>

        <div className="mt-[51px] lg:mt-[62px]">
          <div className="flex justify-end">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-[43px] w-[45px] items-center justify-center text-[#949494] transition-colors hover:text-white"
              >
                <Icon className="h-[25px] w-[25px]" />
              </a>
            ))}
          </div>
          <p className="mt-[18px] flex justify-end gap-[11px] text-[15px] leading-[18px] text-[#949494] lg:mt-[33px]">
            <Link
              href={localizeHref("/policy", locale)}
              className="transition-colors hover:text-white"
            >
              {c.terms}
            </Link>
            <Link
              href={localizeHref("/privacy", locale)}
              className="transition-colors hover:text-white"
            >
              {c.privacy}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

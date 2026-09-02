import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/site";

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.09 0 2.23.2 2.23.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 5.92a8.2 8.2 0 0 1-2.36.65 4.1 4.1 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.74A11.65 11.65 0 0 1 3.4 4.8a4.1 4.1 0 0 0 1.27 5.48A4.07 4.07 0 0 1 2.8 9.75v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.11 4.11 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.4a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.67v-.53A8.35 8.35 0 0 0 22 5.92Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-site flex flex-col gap-10 py-16 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Image
            src="/assets/img/fd051c1da84e1.png"
            alt={company.name}
            width={134}
            height={40}
            className="h-auto w-[134px]"
          />
          <div className="mt-6 space-y-1 text-[14px] leading-6 text-white/85">
            <p>{company.address}</p>
            <p>{company.lab}</p>
            <p className="pt-2">TEL. : {company.tel}</p>
            <p>FAX : {company.fax}</p>
            <p>E-mail: {company.email}</p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 lg:items-end">
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
              >
                <Icon />
              </a>
            ))}
          </div>
          <p className="text-[13px] text-[#949494]">
            <Link href="/policy" className="transition-colors hover:text-white/80">
              이용약관
            </Link>
            <span className="inline-block w-6" />
            <Link href="/privacy" className="transition-colors hover:text-white/80">
              개인정보처리방침
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
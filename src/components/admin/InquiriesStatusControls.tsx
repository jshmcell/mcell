"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setInquiryStatus } from "@/lib/actions/admin-inquiries";
import { useLocale } from "@/i18n/client";
import { adminDict } from "@/i18n/admin";

export default function InquiriesStatusControls({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const t = adminDict[useLocale()].inquiries;
  const options = [
    { value: "new", label: t.statusLabels.new },
    { value: "in_progress", label: t.statusLabels.in_progress },
    { value: "done", label: t.statusLabels.done },
  ];

  function change(next: string) {
    if (next === status) return;
    setMessage(null);
    startTransition(async () => {
      const res = await setInquiryStatus(id, next);
      if (!res.ok) setMessage(res.message ?? t.failed);
      else router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          disabled={pending}
          onClick={() => change(o.value)}
          className={
            status === o.value
              ? "h-[30px] rounded-[3px] bg-navy-900 px-3 text-[12px] text-white"
              : "h-[30px] rounded-[3px] border border-black/15 px-3 text-[12px] text-ink/70 transition-colors hover:border-navy-700 hover:text-navy-900"
          }
        >
          {o.label}
        </button>
      ))}
      {message && <span className="text-[12px] text-[#ff4d4d]">{message}</span>}
    </div>
  );
}
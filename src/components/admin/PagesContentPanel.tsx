"use client";

import { useState, useTransition } from "react";
import { savePageContent } from "@/lib/actions/admin-pages";

const inputCls =
  "w-full rounded-[3px] border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-navy-700";

export default function PagesContentPanel({
  defs,
  values,
}: {
  defs: Array<{ key: string; label: string }>;
  values: Record<string, string>;
}) {
  const [drafts, setDrafts] = useState<Record<string, string>>(values);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  function save(key: string) {
    setMessage(null);
    startTransition(async () => {
      const res = await savePageContent(key, drafts[key] ?? "");
      if (!res.ok) setMessage(res.message ?? "실패");
      else {
        setSavedKeys((s) => new Set(s).add(key));
      }
    });
  }

  return (
    <div className="space-y-4">
      {message && (
        <p className="rounded-[3px] bg-[#fff4f4] px-3 py-2 text-[13px] text-[#ff4d4d]">
          {message}
        </p>
      )}
      {defs.map((d) => (
        <div key={d.key} className="rounded-[4px] border border-black/10 bg-white p-5">
          <label className="block">
            <span className="text-[13px] font-medium text-ink">
              {d.label}
              <span className="ml-2 text-[11px] text-ink/40">{d.key}</span>
            </span>
            <textarea
              rows={2}
              className={`${inputCls} mt-2`}
              value={drafts[d.key] ?? ""}
              onChange={(e) => {
                setDrafts((s) => ({ ...s, [d.key]: e.target.value }));
                setSavedKeys((s) => {
                  const n = new Set(s);
                  n.delete(d.key);
                  return n;
                });
              }}
            />
          </label>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={() => save(d.key)}
              className="h-[34px] rounded-[3px] bg-navy-900 px-4 text-[12px] text-white disabled:opacity-50"
            >
              {pending ? "처리 중..." : "저장"}
            </button>
            {savedKeys.has(d.key) && (
              <span className="text-[12px] text-[#1a9c46]">저장됨</span>
            )}
          </div>
        </div>
      ))}
      <p className="text-[12px] text-ink/50">
        값이 비어 있으면 데이터 파일의 기본 문구가 표시됩니다.
      </p>
    </div>
  );
}
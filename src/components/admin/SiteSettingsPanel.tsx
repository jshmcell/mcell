"use client";

import { useState, useTransition } from "react";
import { saveSiteSetting } from "@/lib/actions/admin-settings";
import type { SiteSettingDef, SiteSettingKind } from "@/lib/site-settings";
import { useLocale } from "@/i18n/client";
import { adminDict } from "@/i18n/admin";

const inputCls =
  "w-full rounded-[3px] border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-navy-700";

function Field({
  def,
  value,
  pending,
  saved,
  onDraft,
  onSave,
  t,
}: {
  def: SiteSettingDef;
  value: string;
  pending: boolean;
  saved: boolean;
  onDraft: (key: string, value: string) => void;
  onSave: (key: string) => void;
  t: { save: string; saving: string; saved: string };
}) {
  const multiline = def.kind === "textarea";
  return (
    <div className="rounded-[4px] border border-black/10 bg-white p-5">
      <label className="block">
        <span className="text-[13px] font-medium text-ink">
          {def.label}
          <span className="ml-2 text-[11px] text-ink/40">{def.key}</span>
        </span>
        {multiline ? (
          <textarea
            rows={2}
            className={`${inputCls} mt-2`}
            value={value}
            onChange={(e) => onDraft(def.key, e.target.value)}
          />
        ) : (
          <input
            type={inputType(def.kind)}
            className={`${inputCls} mt-2`}
            value={value}
            onChange={(e) => onDraft(def.key, e.target.value)}
          />
        )}
      </label>
      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => onSave(def.key)}
          className="h-[34px] rounded-[3px] bg-navy-900 px-4 text-[12px] text-white disabled:opacity-50"
        >
          {pending ? t.saving : t.save}
        </button>
        {saved && <span className="text-[12px] text-[#1a9c46]">{t.saved}</span>}
      </div>
    </div>
  );
}

function inputType(kind: SiteSettingKind): string {
  switch (kind) {
    case "email":
      return "email";
    case "url":
      return "url";
    case "tel":
      return "tel";
    default:
      return "text";
  }
}

const GROUP_ORDER = ["company", "social"] as const;

export default function SiteSettingsPanel({
  defs,
  values,
}: {
  defs: SiteSettingDef[];
  values: Record<string, string>;
}) {
  const [drafts, setDrafts] = useState<Record<string, string>>(values);
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const t = adminDict[useLocale()].settings;

  const groups = GROUP_ORDER;

  function save(key: string) {
    setMessage(null);
    startTransition(async () => {
      const res = await saveSiteSetting(key, drafts[key] ?? "");
      if (!res.ok) setMessage(res.message ?? t.failed);
      else setSavedKeys((s) => new Set(s).add(key));
    });
  }

  return (
    <div className="space-y-8">
      {message && (
        <p className="rounded-[3px] bg-[#fff4f4] px-3 py-2 text-[13px] text-[#ff4d4d]">
          {message}
        </p>
      )}
      {groups.map((group) => {
        const groupDefs = defs.filter((d) => d.group === group);
        if (groupDefs.length === 0) return null;
        return (
          <section key={group}>
            <h2 className="mb-3 text-[15px] font-bold text-ink">
              {t.groups[group]}
            </h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {groupDefs.map((def) => (
                <Field
                  key={def.key}
                  def={def}
                  value={drafts[def.key] ?? ""}
                  pending={pending}
                  saved={savedKeys.has(def.key)}
                  onDraft={(key, value) => {
                    setDrafts((s) => ({ ...s, [key]: value }));
                    setSavedKeys((s) => {
                      const n = new Set(s);
                      n.delete(key);
                      return n;
                    });
                  }}
                  onSave={save}
                  t={t}
                />
              ))}
            </div>
          </section>
        );
      })}
      <p className="text-[12px] text-ink/50">{t.footnote}</p>
    </div>
  );
}

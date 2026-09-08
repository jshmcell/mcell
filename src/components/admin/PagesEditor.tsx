"use client";

import { Fragment, useMemo, useRef, useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import {
  HomeSectionPreview,
  ShopHeroPreview,
  ShopProductsPreview,
  McellSectionPreview,
  AboutSectionPreview,
} from "@/components/admin/SectionPreview";
import { savePageContent } from "@/lib/actions/admin-pages";
import {
  normalizeMediaUrl,
  validateMediaValue,
  type ContentDef,
  type ContentGroup,
} from "@/lib/content-registry";
import {
  homeSectionOfKey,
  resolveHomeFromRows,
  type HomeSectionKey,
} from "@/lib/home-content-resolve";
import {
  resolveShopHeroFromRows,
  resolveShopProductsFromRows,
} from "@/lib/shop-content-resolve";
import {
  resolveMcellFromRows,
  resolveMcellOemFromRows,
  type ResolvedMcell,
  type ResolvedMcellOem,
} from "@/lib/mcell-content-resolve";
import {
  resolveAboutFromRows,
  resolveAboutHistoryFromRows,
  resolveAboutCertificationsFromRows,
  resolveAboutContactFromRows,
  type ResolvedAbout,
  type ResolvedAboutHistory,
  type ResolvedAboutCertifications,
  type ResolvedAboutContact,
} from "@/lib/about-content-resolve";
import {
  pickLines,
  pickText,
  type ContentRows,
} from "@/lib/content-resolve";
import { partnership as partnershipDefaults } from "@/data/partnership";
import { EN_PARTNERSHIP } from "@/data/content-en";
import { useLocale } from "@/i18n/client";
import { adminDict } from "@/i18n/admin";
import { cn } from "@/lib/cn";

export type ContentValues = Record<string, { ko?: string; en?: string }>;
type PreviewLang = "ko" | "en";

/** 콘텐츠 키 prefix → mcell 미리보기 섹션 (메인 페이지 + OEM 페이지). */
function mcellSectionOfKey(key: string) {
  if (key.startsWith("mcell.hero.")) return "hero";
  if (key.startsWith("mcell.stats.")) return "stats";
  if (key.startsWith("mcell.tech.")) return "tech";
  if (key.startsWith("mcell.products.")) return "products";
  if (key.startsWith("mcell.comparisons.")) return "comparisons";
  if (key.startsWith("mcell.industries.")) return "industries";
  if (key.startsWith("mcell.cooperation.")) return "cooperation";
  if (key.startsWith("mcell.platform.")) return "platform";
  if (key.startsWith("mcell.oemBanner.")) return "oemBanner";
  if (key.startsWith("mcell.oemBlocks.")) return "oemBlocks";
  if (key.startsWith("mcell.rnd.")) return "rnd";
  // oemProof + proof 둘 다 OemProof 컴포넌트가 소비
  if (key.startsWith("mcell.oemProof.") || key.startsWith("mcell.proof.")) return "oemProof";
  return null;
}

/** 콘텐츠 키 prefix → about 미리보기 섹션. */
function aboutSectionOfKey(key: string) {
  if (key.startsWith("about.ceo.")) return "ceo";
  if (key.startsWith("about.historyImages.")) return "historyImages";
  // 정확한 키 about.history (동적 목록) + 기존 about.history.* 키 모두 연혁 섹션
  if (key === "about.history" || key.startsWith("about.history.")) return "history";
  if (key.startsWith("about.certs.")) return "certifications";
  if (key.startsWith("about.contact.banner.")) return "contactBanner";
  if (key.startsWith("about.contact.")) return "contact";
  return null;
}

/* ── 그룹별 페이지 구분 헤더 (편집 섹션 목록에만 시각적 구분 제공) ──────────── */

interface PageDivider {
  /** i18n/admin.ts content.pageLabels 키 */
  labelKey: string;
  route: string;
  /** 이 페이지에 속하는 콘텐츠 키 prefix (섹션 목록 순회 시 page index 결정) */
  prefixes: string[];
}

/** mcell → [메인 페이지, OEM/ODM 페이지] (섹션은 레지스트리 표시 순서와 동일) */
const MCELL_PAGES: PageDivider[] = [
  {
    labelKey: "mcellMain",
    route: "/mcell",
    prefixes: [
      "mcell.hero.",
      "mcell.stats.",
      "mcell.tech.",
      "mcell.products.",
      "mcell.comparisons.",
      "mcell.industries.",
      "mcell.cooperation.",
      "mcell.platform.",
    ],
  },
  {
    labelKey: "mcellOem",
    route: "/mcell/oem-odm",
    prefixes: [
      "mcell.oemBanner.",
      "mcell.oemBlocks.",
      "mcell.rnd.",
      "mcell.oemProof.",
      "mcell.proof.",
    ],
  },
];

/** about → [About, 연혁, 인증서, Contact] (섹션은 레지스트리 표시 순서와 동일) */
const ABOUT_PAGES: PageDivider[] = [
  {
    labelKey: "aboutMain",
    route: "/about",
    prefixes: ["about.ceo.", "about.contact.banner."],
  },
  { labelKey: "aboutHistory", route: "/about/history", prefixes: ["about.history", "about.historyImages."] },
  { labelKey: "aboutCerts", route: "/about/certifications", prefixes: ["about.certs."] },
  { labelKey: "aboutContact", route: "/about/contact", prefixes: ["about.contact.offices."] },
];

/** 그룹 → 페이지 구분 정의 (미리보기 논리 없음 — 순수 표시 전용) */
const GROUP_PAGES: Partial<Record<ContentGroup, PageDivider[]>> = {
  mcell: MCELL_PAGES,
  about: ABOUT_PAGES,
};

/** def.key → 소속 페이지 인덱스. 그룹에 페이지 정의가 없거나(단일 페이지 그룹) 매칭이 없으면 -1. */
function pageIndexForGroup(group: ContentGroup, key: string): number {
  const pages = GROUP_PAGES[group];
  if (!pages) return -1;
  return pages.findIndex((p) => p.prefixes.some((pfx) => key.startsWith(pfx)));
}

const inputCls =
  "w-full rounded-[3px] border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:border-navy-700";

/* ── media field (URL + upload + preview) ─────────────────────────────── */

function MediaField({
  locale,
  value,
  placeholder,
  onChange,
  onUpload,
  uploading,
  uploadError,
  fileInputRef,
  t,
}: {
  locale: PreviewLang;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  onUpload: (file: File) => void;
  uploading: boolean;
  uploadError: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  t: { en: string; ko: string; urlPh: string; upload: string; uploading: string; uploadFailed: string; preview: string };
}) {
  return (
    <div>
      <span className="mb-1 block text-[12px] font-medium text-ink/70">
        {locale === "ko" ? t.ko : t.en}
      </span>
      <div className="flex gap-2">
        <input
          type="url"
          placeholder={placeholder || t.urlPh}
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="h-[38px] shrink-0 rounded-[3px] border border-black/15 px-3 text-[12px] text-ink transition-colors hover:border-navy-700 hover:text-navy-900 disabled:opacity-50"
        >
          {uploading ? t.uploading : t.upload}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/mp4,video/webm"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onUpload(f);
            e.target.value = "";
          }}
        />
      </div>
      {uploadError && (
        <p className="mt-1 text-[12px] text-[#ff4d4d]">
          {t.uploadFailed}: {uploadError}
        </p>
      )}
      {value && (
        <div className="mt-2">
          <span className="text-[11px] text-ink/40">{t.preview}</span>
          {/\.(mp4|webm)(\?|#|$)/i.test(value) ? (
            <video
              src={value}
              controls
              className="mt-1 max-h-[160px] w-full rounded-[3px] bg-black object-contain"
            />
          ) : (
            <div className="mt-1 flex h-[110px] items-center justify-center overflow-hidden rounded-[3px] border border-black/10 bg-[#f7f7f7]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt=""
                className="max-h-[110px] w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── field row ────────────────────────────────────────────────────────── */

interface HistoryRow {
  year: string;
  items: string[];
}

/** about.history JSON 문자열 → 행 배열. 파싱 실패/형태 불일치 시 빈 배열. */
function parseHistoryJson(value: string): HistoryRow[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((entry) => {
        if (!entry || typeof entry !== "object") return null;
        const e = entry as Record<string, unknown>;
        const year = typeof e.year === "string" ? e.year : "";
        const items = Array.isArray(e.items)
          ? e.items.filter((x): x is string => typeof x === "string")
          : [];
        return { year, items };
      })
      .filter((x): x is HistoryRow => x !== null);
  } catch {
    return [];
  }
}

/** 행 배열 → about.history JSON 문자열. */
function serializeHistoryJson(rows: HistoryRow[]): string {
  return JSON.stringify(rows.map((r) => ({ year: r.year, items: r.items })));
}

/** 연혁 동적 목록 편집기 — 연도 행 추가/삭제, 각 행 = 연도 입력 + 사건 textarea(줄바꿈 = 항목). */
function HistoryListEditor({
  value,
  onChange,
  t,
}: {
  value: string;
  onChange: (json: string) => void;
  t: { historyYear: string; historyItems: string; addYear: string; removeYear: string };
}) {
  const rows = useMemo(() => parseHistoryJson(value), [value]);

  const updateRow = (i: number, patch: Partial<HistoryRow>) => {
    onChange(serializeHistoryJson(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r))));
  };
  const removeRow = (i: number) => {
    onChange(serializeHistoryJson(rows.filter((_, idx) => idx !== i)));
  };
  const addRow = () => {
    onChange(serializeHistoryJson([...rows, { year: "", items: [""] }]));
  };

  return (
    <div className="space-y-3">
      {rows.length === 0 && (
        <p className="text-[12px] text-ink/50">
          {t.addYear}
        </p>
      )}
      {rows.map((row, i) => (
        <div key={i} className="rounded-[4px] border border-black/10 bg-[#fafafa] p-3">
          <div className="flex items-end gap-2">
            <label className="block min-w-0 flex-1">
              <span className="mb-1 block text-[12px] font-medium text-ink/70">
                {t.historyYear}
              </span>
              <input
                className={inputCls}
                value={row.year}
                onChange={(e) => updateRow(i, { year: e.target.value })}
              />
            </label>
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="h-[38px] shrink-0 rounded-[3px] border border-black/15 px-3 text-[12px] text-ink transition-colors hover:border-[#ff4d4d] hover:text-[#ff4d4d]"
            >
              {t.removeYear}
            </button>
          </div>
          <label className="mt-2 block">
            <span className="mb-1 block text-[12px] font-medium text-ink/70">
              {t.historyItems}
            </span>
            <textarea
              rows={3}
              className={cn(inputCls, "resize-y")}
              value={row.items.join("\n")}
              onChange={(e) => updateRow(i, { items: e.target.value.split("\n") })}
            />
          </label>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="h-[32px] rounded-[3px] border border-dashed border-black/20 px-4 text-[12px] text-ink/70 transition-colors hover:border-navy-700 hover:text-navy-900"
      >
        + {t.addYear}
      </button>
    </div>
  );
}

function Row({
  def,
  values,
  placeholders,
  onDraft,
  onSave,
  pending,
  saved,
  t,
}: {
  def: ContentDef;
  values: { ko: string; en: string };
  placeholders: { ko: string; en: string };
  onDraft: (locale: PreviewLang, v: string) => void;
  onSave: () => void;
  pending: boolean;
  saved: boolean;
  t: {
    ko: string;
    en: string;
    kinds: Record<string, string>;
    sharedUrlNote: string;
    urlPh: string;
    upload: string;
    uploading: string;
    uploadFailed: string;
    preview: string;
    save: string;
    saving: string;
    saved: string;
    failed: string;
    invalidUrl: string;
    invalidVideo: string;
    historyYear: string;
    historyItems: string;
    addYear: string;
    removeYear: string;
  };
}) {
  const uiLocale = useLocale();
  const label = uiLocale === "ko" ? def.label.ko : def.label.en;
  const [uploading, setUploading] = useState<null | PreviewLang>(null);
  const [uploadError, setUploadError] = useState<{ loc: PreviewLang; message: string } | null>(null);
  const koFileRef = useRef<HTMLInputElement | null>(null);
  const enFileRef = useRef<HTMLInputElement | null>(null);

  // 클라이언트 검증 — 이미지/영상/링크 필드만. 빈 값(기본값 복귀)은 항상 유효.
  const errors = useMemo(() => {
    if (def.kind !== "image" && def.kind !== "video" && def.kind !== "url") {
      return { ko: null as string | null, en: null as string | null };
    }
    const msgFor = (v: string) => {
      const kind = def.kind === "video" ? "video" : def.kind === "url" ? "url" : "image";
      const res = validateMediaValue(v, kind);
      if (res.ok) return null;
      return res.message === "video" ? t.invalidVideo : t.invalidUrl;
    };
    return { ko: msgFor(values.ko), en: msgFor(values.en) };
  }, [def.kind, values.ko, values.en, t.invalidUrl, t.invalidVideo]);
  const hasError = !!(errors.ko || errors.en);

  async function upload(file: File, loc: PreviewLang) {
    setUploading(loc);
    setUploadError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? res.statusText);
      onDraft(loc, data.url);
    } catch (e) {
      setUploadError({ loc, message: e instanceof Error ? e.message : "error" });
    } finally {
      setUploading(null);
    }
  }

  return (
    <div className="rounded-[4px] border border-black/10 bg-white p-4">
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-[13px] font-medium text-ink">{label}</span>
        <span className="rounded-[3px] bg-navy-900/10 px-1.5 py-0.5 text-[11px] text-navy-900">
          {t.kinds[def.kind]}
        </span>
        <span className="text-[11px] text-ink/40">{def.key}</span>
      </div>

      <div className="mt-3 space-y-3">
        {def.kind === "historyList" && (
          <HistoryListEditor
            value={values.ko}
            onChange={(json) => {
              onDraft("ko", json);
              onDraft("en", json);
            }}
            t={t}
          />
        )}

        {(def.kind === "text" || def.kind === "textarea") && (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {(["ko", "en"] as const).map((loc) => (
              <label key={loc} className="block">
                <span className="mb-1 block text-[12px] font-medium text-ink/70">
                  {loc === "ko" ? t.ko : t.en}
                </span>
                {def.kind === "text" ? (
                  <input
                    className={inputCls}
                    value={values[loc]}
                    placeholder={placeholders[loc]}
                    onChange={(e) => onDraft(loc, e.target.value)}
                  />
                ) : (
                  <textarea
                    rows={4}
                    className={cn(inputCls, "resize-y")}
                    value={values[loc]}
                    placeholder={placeholders[loc]}
                    onChange={(e) => onDraft(loc, e.target.value)}
                  />
                )}
              </label>
            ))}
          </div>
        )}

        {(def.kind === "image" || def.kind === "video") && (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {(["ko", "en"] as const).map((loc) => (
              <div key={loc}>
                <div className={cn(errors[loc] && "[&_input]:border-[#ff4d4d]")}>
                  <MediaField
                    locale={loc}
                    value={values[loc]}
                    placeholder={placeholders[loc]}
                    onChange={(v) => onDraft(loc, normalizeMediaUrl(v))}
                    onUpload={(f) => upload(f, loc)}
                    uploading={uploading === loc}
                    uploadError={uploadError?.loc === loc ? uploadError.message : null}
                    fileInputRef={loc === "ko" ? koFileRef : enFileRef}
                    t={t}
                  />
                </div>
                {errors[loc] && (
                  <p className="mt-1 text-[12px] text-[#ff4d4d]">{errors[loc]}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {def.kind === "url" && (
          <div>
            <input
              type="url"
              placeholder={placeholders.ko}
              className={cn(inputCls, errors.ko && "border-[#ff4d4d]")}
              value={values.ko}
              onChange={(e) => {
                const v = e.target.value;
                onDraft("ko", v);
                onDraft("en", v);
              }}
            />
            {errors.ko ? (
              <p className="mt-1 text-[12px] text-[#ff4d4d]">{errors.ko}</p>
            ) : (
              <p className="mt-1 text-[12px] text-ink/50">{t.sharedUrlNote}</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          disabled={pending || uploading !== null || hasError}
          onClick={onSave}
          className="h-[32px] rounded-[3px] bg-navy-900 px-4 text-[12px] text-white disabled:opacity-50"
        >
          {pending ? t.saving : t.save}
        </button>
        {saved && <span className="text-[12px] text-[#1a9c46]">{t.saved}</span>}
      </div>
    </div>
  );
}

/* ── partnership preview (no dedicated resolver shape — inline) ───────── */

function PartnershipPreview({
  rows,
  lang,
}: {
  rows: ContentRows;
  lang: PreviewLang;
}) {
  const heading = pickText(rows, "partnership.heading", lang, EN_PARTNERSHIP.heading ?? "PARTNERSHIP INQUIRY");
  const title = pickText(
    rows,
    "partnership.title",
    lang,
    lang === "en"
      ? (EN_PARTNERSHIP.title ?? "엠셀과 함께 새로운 기술 가치를 만들어갑니다.")
      : "엠셀과 함께 새로운 기술 가치를 만들어갑니다.",
  );
  const lines = pickLines(rows, "partnership.lines", lang, [""]);
  const banner = pickText(
    rows,
    "partnership.banner",
    lang,
    "/assets/img/ab3b53993fa77.jpg",
  );
  return (
    <div>
      <div className="relative h-[140px] overflow-hidden">
        <SmartImage src={banner} alt="" fill className="object-cover" sizes="460px" />
        <div className="absolute inset-0 bg-black/45" />
      </div>
      <div className="bg-[#f7f7f7] p-5 text-center">
        <p className="text-[12px] font-bold text-navy-900">{heading}</p>
        <h3 className="mt-1 text-[17px] font-bold text-ink">{title}</h3>
        <div className="mt-2 text-[11px] leading-[1.9] text-ink">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── main editor ──────────────────────────────────────────────────────── */

/** 파일 기본값 맵 — 빈 rows 로 resolve 하면 기본값이 수집된다. */
function buildDefaultMap(locale: "ko" | "en"): Map<string, string> {
  const m = new Map<string, string>();
  resolveHomeFromRows({}, locale, m);
  resolveShopHeroFromRows({}, locale, m);
  resolveShopProductsFromRows({}, locale, m);
  resolveMcellFromRows({}, locale, m);
  resolveMcellOemFromRows({}, locale, m);
  resolveAboutFromRows({}, locale, m);
  resolveAboutHistoryFromRows({}, locale, m);
  resolveAboutCertificationsFromRows({}, locale, m);
  resolveAboutContactFromRows({}, locale, m);
  const en = EN_PARTNERSHIP;
  m.set(
    "partnership.heading",
    locale === "en" ? (en.heading ?? partnershipDefaults.heading) : partnershipDefaults.heading,
  );
  m.set(
    "partnership.title",
    locale === "en" ? (en.title ?? partnershipDefaults.title) : partnershipDefaults.title,
  );
  m.set(
    "partnership.lines",
    locale === "en"
      ? (en.lines ?? partnershipDefaults.lines.join("\n"))
      : partnershipDefaults.lines.join("\n"),
  );
  m.set("partnership.banner", partnershipDefaults.banner);
  return m;
}

const KO_DEFAULTS = buildDefaultMap("ko");
const EN_DEFAULTS = buildDefaultMap("en");

export default function PagesEditor({
  group,
  defs,
  values,
}: {
  group: ContentGroup;
  defs: ContentDef[];
  values: ContentValues;
}) {
  const uiLocale = useLocale();
  const t = adminDict[uiLocale].content;
  const [drafts, setDrafts] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const def of defs) {
      // 초기값 = 데이터 파일 기본값 (placeholder 가 아니라 실제 값)
      init[`${def.key}:ko`] = values[def.key]?.ko ?? KO_DEFAULTS.get(def.key) ?? "";
      init[`${def.key}:en`] =
        def.kind === "url" || def.kind === "historyList"
          ? (values[def.key]?.ko ?? KO_DEFAULTS.get(def.key) ?? "")
          : (values[def.key]?.en ?? EN_DEFAULTS.get(def.key) ?? "");
    }
    return init;
  });
  const [savedRows, setSavedRows] = useState<Set<string>>(new Set());
  const [pendingRow, setPendingRow] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [previewLang, setPreviewLang] = useState<PreviewLang>("ko");
  // accordion sections (registry order)
  const sections = useMemo(() => {
    const out: { key: string; defs: ContentDef[] }[] = [];
    for (const def of defs) {
      const label = uiLocale === "ko" ? def.section.ko : def.section.en;
      const last = out[out.length - 1];
      if (last && last.key === label) last.defs.push(def);
      else out.push({ key: label, defs: [def] });
    }
    return out;
  }, [defs, uiLocale]);

  function placeholderFor(def: ContentDef): { ko: string; en: string } {
    // 필드를 비웠을 때 기본값이 보이도록 placeholder 도 유지 (언어별 기본값)
    return {
      ko: KO_DEFAULTS.get(def.key) ?? "",
      en: EN_DEFAULTS.get(def.key) ?? "",
    };
  }

  // merged rows (saved + drafts) for the preview, keyed per def
  const previewRows: ContentRows = useMemo(() => {
    const rows: ContentRows = {};
    for (const def of defs) {
      rows[def.key] = {
        ko: drafts[`${def.key}:ko`] ?? "",
        en: def.kind === "url" || def.kind === "historyList" ? (drafts[`${def.key}:ko`] ?? "") : (drafts[`${def.key}:en`] ?? ""),
      };
    }
    return rows;
  }, [defs, drafts]);

  const home = useMemo(
    () => (group === "home" ? resolveHomeFromRows(previewRows, previewLang) : null),
    [group, previewRows, previewLang],
  );
  const shopHero = useMemo(
    () => (group === "shop" ? resolveShopHeroFromRows(previewRows, previewLang) : null),
    [group, previewRows, previewLang],
  );
  const shopProducts = useMemo(
    () => (group === "shop" ? resolveShopProductsFromRows(previewRows, previewLang) : null),
    [group, previewRows, previewLang],
  );
  const mcell = useMemo<ResolvedMcell | null>(
    () => (group === "mcell" ? resolveMcellFromRows(previewRows, previewLang) : null),
    [group, previewRows, previewLang],
  );
  const mcellOem = useMemo<ResolvedMcellOem | null>(
    () => (group === "mcell" ? resolveMcellOemFromRows(previewRows, previewLang) : null),
    [group, previewRows, previewLang],
  );
  const about = useMemo<ResolvedAbout | null>(
    () => (group === "about" ? resolveAboutFromRows(previewRows, previewLang) : null),
    [group, previewRows, previewLang],
  );
  const aboutHistory = useMemo<ResolvedAboutHistory | null>(
    () => (group === "about" ? resolveAboutHistoryFromRows(previewRows, previewLang) : null),
    [group, previewRows, previewLang],
  );
  const aboutCertifications = useMemo<ResolvedAboutCertifications | null>(
    () => (group === "about" ? resolveAboutCertificationsFromRows(previewRows, previewLang) : null),
    [group, previewRows, previewLang],
  );
  const aboutContact = useMemo<ResolvedAboutContact | null>(
    () => (group === "about" ? resolveAboutContactFromRows(previewRows, previewLang) : null),
    [group, previewRows, previewLang],
  );

  // which preview slice matches the open section (all closed → first section)
  const firstSectionKey = defs.length
    ? (uiLocale === "ko" ? defs[0].section.ko : defs[0].section.en)
    : null;
  const activeSectionKey = openSection ?? firstSectionKey;
  const openDef = defs.find(
    (d) => (uiLocale === "ko" ? d.section.ko : d.section.en) === activeSectionKey,
  );
  const homePreviewSection: HomeSectionKey | null = openDef
    ? homeSectionOfKey(openDef.key)
    : null;
  const shopPreviewKind: "hero" | "products" | null = openDef
    ? openDef.key.startsWith("shop.hero.")
      ? "hero"
      : "products"
    : null;
  // mcell: 첫 키 세그먼트가 메인 페이지 섹션(mcell.*)인지 OEM 섹션(oemBanner/oemBlocks/rnd/oemProof/proof)인지 판별
  const mcellPreviewSection: keyof ResolvedMcell | keyof ResolvedMcellOem | null =
    openDef && openDef.group === "mcell" ? mcellSectionOfKey(openDef.key) : null;
  // about: 첫 키 세그먼트로 4개 페이지 섹션 판별
  const aboutPreviewSection:
    | keyof ResolvedAbout
    | keyof ResolvedAboutHistory
    | keyof ResolvedAboutCertifications
    | "contactBanner"
    | keyof ResolvedAboutContact
    | null = openDef && openDef.group === "about" ? aboutSectionOfKey(openDef.key) : null;

  function draftFor(def: ContentDef): { ko: string; en: string } {
    return {
      ko: drafts[`${def.key}:ko`] ?? "",
      en: drafts[`${def.key}:en`] ?? "",
    };
  }

  function markDirty(key: string) {
    setSavedRows((s) => {
      const n = new Set(s);
      n.delete(key);
      return n;
    });
  }

  async function saveRow(def: ContentDef) {
    setMessage(null);
    setPendingRow(def.key);
    try {
      if (def.kind === "url" || def.kind === "historyList") {
        const res = await savePageContent(def.key, "ko", drafts[`${def.key}:ko`] ?? "");
        if (!res.ok) throw new Error(res.message ?? t.failed);
      } else {
        for (const loc of ["ko", "en"] as const) {
          const res = await savePageContent(def.key, loc, drafts[`${def.key}:${loc}`] ?? "");
          if (!res.ok) throw new Error(res.message ?? t.failed);
        }
      }
      setSavedRows((s) => new Set(s).add(def.key));
    } catch (e) {
      setMessage(e instanceof Error ? e.message : t.failed);
    } finally {
      setPendingRow(null);
    }
  }

  return (
    <div className="md-header:flex md-header:items-start md-header:gap-5">
      {/* editor column — 너비 고정(미리보기 열림/닫힘과 무관) */}
      <div className="min-w-0 md-header:w-[53%] md-header:shrink-0">
        <p className="mb-3 text-[13px] text-ink/60">{t.blurb}</p>
        {message && (
          <p className="mb-3 rounded-[3px] bg-[#fff4f4] px-3 py-2 text-[13px] text-[#ff4d4d]">
            {message}
          </p>
        )}
        <div className="space-y-2">
          {sections.map((sec, secIdx) => {
            // mcell/about 그룹만 페이지 구분 헤더 표시 (단일 페이지 그룹은 기존 그대로)
            const pageIdx =
              pageIndexForGroup(group, sec.defs[0]?.key ?? "");
            const prevSec = sections[secIdx - 1];
            // 첫 섹션은 "이전 페이지 없음(-1)"으로 간주해 페이지 헤더도 표시한다
            const prevPageIdx =
              pageIdx < 0
                ? pageIdx
                : prevSec
                  ? pageIndexForGroup(group, prevSec.defs[0]?.key ?? "")
                  : -1;
            const pages = GROUP_PAGES[group];
            const showDivider = pageIdx >= 0 && pageIdx !== prevPageIdx;
            const divider = showDivider && pages ? pages[pageIdx] : null;
            // 완전히 닫힌 상태 허용 — 열려 있는 첫 섹션만 표시, 모두 닫을 수 있음
            const open = openSection !== null && openSection === sec.key;
            return (
              <Fragment key={sec.key}>
                {divider && (
                  <div
                    aria-hidden
                    className="flex items-baseline gap-2 border-b border-black/5 px-1 pt-3 pb-2 text-[11px] font-bold tracking-wide text-ink/40 uppercase"
                  >
                    <span>{t.pageLabels[divider.labelKey]}</span>
                    <span className="font-normal text-ink/30 normal-case">
                      {divider.route}
                    </span>
                  </div>
                )}
                <div className="overflow-hidden rounded-[4px] border border-black/10 bg-white">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenSection(open ? null : sec.key)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <span className="text-[14px] font-bold text-ink">{sec.key}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={cn("text-ink/50 transition-transform", open && "rotate-180")}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {open && (
                  <div className="space-y-3 border-t border-black/5 p-4">
                    {sec.defs.map((def) => (
                      <Row
                        key={def.key}
                        def={def}
                        values={draftFor(def)}
                        placeholders={placeholderFor(def)}
                        onDraft={(loc, v) => {
                          setDrafts((s) => ({ ...s, [`${def.key}:${loc}`]: v }));
                          markDirty(def.key);
                        }}
                        onSave={() => saveRow(def)}
                        pending={pendingRow === def.key}
                        saved={savedRows.has(def.key)}
                        t={t}
                      />
                    ))}
                  </div>
                )}
              </div>
              </Fragment>
            );
          })}
        </div>
        <p className="mt-3 text-[12px] text-ink/50">{t.fallbackNote}</p>
      </div>

      {/* preview column — 편집 영역보다 넓게; 모든 아코디언이 닫히면 숨김 */}
      {openSection !== null && (
        <aside className="mt-6 md-header:sticky md-header:top-[108px] md-header:mt-0 md-header:w-[43%] md-header:max-w-[760px] md-header:min-w-[440px] md-header:shrink-0">
          <div className="overflow-hidden rounded-[6px] border border-black/10 bg-white">
            <div className="flex items-center justify-between border-b border-black/10 px-3 py-2">
              <span className="text-[12px] font-bold text-ink">
                {uiLocale === "ko" ? "미리보기" : "Preview"}
              </span>
            <div className="flex items-center gap-0.5 rounded-full bg-black/5 p-0.5 text-[11px]">
              {(["ko", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setPreviewLang(l)}
                  aria-pressed={previewLang === l}
                  className={cn(
                    "rounded-full px-2.5 py-1 transition-colors",
                    previewLang === l
                      ? "bg-navy-900 font-bold text-white"
                      : "text-ink/60 hover:text-ink",
                  )}
                >
                  {l === "ko" ? "한국어" : "English"}
                </button>
              ))}
            </div>
          </div>
          <p className="border-b border-black/10 bg-[#f7f7f7] px-3 py-2 text-[11px] leading-5 text-ink/60">
            {t.previewHint}
          </p>
          <div className="max-h-[82vh] overflow-y-auto">
            {group === "home" && home && homePreviewSection && (
              <HomeSectionPreview
                section={homePreviewSection}
                home={home}
                locale={previewLang}
              />
            )}
            {group === "shop" && shopHero && shopProducts && (
              shopPreviewKind === "products" ? (
                <ShopProductsPreview products={shopProducts} />
              ) : (
                <ShopHeroPreview hero={shopHero} />
              )
            )}
            {group === "partnership" && (
              <PartnershipPreview rows={previewRows} lang={previewLang} />
            )}
            {group === "mcell" && mcell && mcellOem && mcellPreviewSection && (
              <McellSectionPreview
                section={mcellPreviewSection}
                mcell={mcell}
                oem={mcellOem}
              />
            )}
            {group === "about" &&
              about &&
              aboutPreviewSection &&
              aboutHistory &&
              aboutCertifications &&
              aboutContact && (
                <AboutSectionPreview
                  section={aboutPreviewSection}
                  about={about}
                  history={aboutHistory}
                  certifications={aboutCertifications}
                  contact={aboutContact}
                  locale={previewLang}
                />
              )}
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-5 text-ink/50">
          {uiLocale === "ko"
            ? "미리보기는 저장 전 입력값을 즉시 반영합니다. 언어 토글은 관리자 UI 언어와 별개로 동작합니다."
            : "The preview reflects unsaved input instantly. The language toggle is independent of the admin UI language."}
        </p>
        </aside>
      )}
    </div>
  );
}

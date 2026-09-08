import type { Locale } from "@/i18n/config";
import {
  ceo as dCeo,
  history as dHistory,
  historyImages as dHistoryImages,
  type HistoryItem,
} from "@/data/about";
import { certifications as dCertifications, type Certification } from "@/data/certifications";
import { contact as dContact } from "@/data/contact";
import { pickLines, pickText, type ContentRows } from "@/lib/content-resolve";
import { EN_ABOUT, EN_HISTORY, EN_OFFICES } from "@/data/content-en";

/** DB/드래프트 오버라이드가 적용된 about 데이터 — data/about.ts 와 동일한 shape. */
export interface ResolvedAbout {
  ceo: typeof dCeo;
}

/** about.history JSON 을 canonical HistoryItem[] 로 정규화 (items/events 둘 다 수용). */
function historyCanonical(v: unknown): HistoryItem[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const e = entry as Record<string, unknown>;
      const year = typeof e.year === "string" ? e.year : "";
      const items = Array.isArray(e.items)
        ? e.items.filter((x): x is string => typeof x === "string")
        : Array.isArray(e.events)
          ? e.events.filter((x): x is string => typeof x === "string")
          : [];
      return { year, events: items };
    })
    .filter((x): x is HistoryItem => x !== null);
}

/** about.contact.offices JSON 을 canonical 배열로 정규화. */
function officesCanonical(v: unknown): (typeof dContact.offices)[number][] {
  if (!Array.isArray(v)) return [];
  return v
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const e = entry as Record<string, unknown>;
      const str = (xv: unknown) => (typeof xv === "string" ? xv : "");
      return {
        name: str(e.name),
        mapSrc: str(e.mapSrc),
        tel: str(e.tel),
        email: str(e.email),
        address: str(e.address),
      };
    })
    .filter((x): x is (typeof dContact.offices)[number] => x !== null);
}

/** DB/드래프트 오버라이드가 적용된 연혁 데이터 — data/about.ts 와 동일한 shape. */
export interface ResolvedAboutHistory {
  history: HistoryItem[];
  historyImages: typeof dHistoryImages;
  /** /about/history 상단 배너 이미지 */
  banner: string;
}

/** DB/드래프트 오버라이드가 적용된 인증서 데이터 — data/certifications.ts 와 동일한 shape. */
export interface ResolvedAboutCertifications {
  certifications: Certification[];
  /** /about/certifications 상단 배너 이미지 */
  banner: string;
}

/** DB/드래프트 오버라이드가 적용된 문의 데이터 — data/contact.ts 와 동일한 shape. */
export interface ResolvedAboutContact {
  contact: typeof dContact;
  /** /about/contact 상단 배너 이미지 */
  banner: string;
}

/** 순수 함수 — 서버(about-content.ts)와 관리자 미리보기(클라이언트) 양쪽에서 사용.
 *  collect 를 넘기면 키 → 적용된 기본/오버라이드 값 맵이 채워진다 (관리자 placeholder 용). */
export function resolveAboutFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ResolvedAbout {
  // EN 사전(data/content-en.ts) → 한국어 기본값 → DB 오버라이드 순으로 결정
  const fb = (key: string, fallback: string) =>
    locale === "en" ? (EN_ABOUT[key] ?? fallback) : fallback;
  const t = (key: string, fallback: string) => {
    const v = pickText(rows, key, locale, fb(key, fallback));
    collect?.set(key, v);
    return v;
  };

  const ceo = {
    ...dCeo,
    banner: {
      bg: t("about.ceo.banner.bg", dCeo.banner.bg),
      title: t("about.ceo.banner.title", dCeo.banner.title),
      quote: t("about.ceo.banner.quote", dCeo.banner.quote),
    },
    // 단일 키(about.ceo.paragraphs) — 줄바꿈 = 문단 구분. 빈 줄은 빈 문자열로 보존
    // (CeoIntro가 빈 문단을 &nbsp; 스페이서로 렌더링). EN 사전 → KO 기본값 순으로 폴백.
    paragraphs: (() => {
      const enFallback = locale === "en" && EN_ABOUT["about.ceo.paragraphs"]
        ? EN_ABOUT["about.ceo.paragraphs"].split(/\r?\n/)
        : dCeo.paragraphs;
      const v = pickLines(rows, "about.ceo.paragraphs", locale, enFallback);
      collect?.set("about.ceo.paragraphs", v.join("\n"));
      return v;
    })(),
    signature: t("about.ceo.signature", dCeo.signature),
  };

  return { ceo };
}

/** DB/드래프트 오버라이드가 적용된 연혁 데이터 — data/about.ts 와 동일한 shape. */
export function resolveAboutHistoryFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ResolvedAboutHistory {
  const fb = (key: string, fallback: string) =>
    locale === "en" ? (EN_ABOUT[key] ?? fallback) : fallback;
  const t = (key: string, fallback: string) => {
    const v = pickText(rows, key, locale, fb(key, fallback));
    collect?.set(key, v);
    return v;
  };

  // about.history — JSON 목록 [{"year":"2021","items":["...","..."]}, ...].
  // 파싱 실패/형태 불일치 시 기본값으로 폴백. collect에는 실제 사용된 JSON 문자열을 넣는다.
  // locale=en 일 때: EN DB 행(기본값과 다르면) → KO DB 행 → EN_HISTORY 사전 순.
  const rawHistoryKo = rows["about.history"]?.ko?.trim();
  const rawHistoryEn = locale === "en" ? rows["about.history"]?.en?.trim() : undefined;
  const parseHistory = (raw: string): HistoryItem[] | null => {
    try {
      const mapped = historyCanonical(JSON.parse(raw) as unknown);
      return mapped.length > 0 ? mapped : null;
    } catch {
      return null;
    }
  };
  const sameHistoryAsDefault = (h: HistoryItem[]) =>
    JSON.stringify(h) === JSON.stringify(dHistory);

  let history: HistoryItem[] = dHistory;
  if (locale === "en") {
    const enParsed = rawHistoryEn ? parseHistory(rawHistoryEn) : null;
    if (enParsed && !sameHistoryAsDefault(enParsed)) {
      history = enParsed;
      collect?.set("about.history", JSON.stringify(enParsed));
    } else {
      const koParsed = rawHistoryKo ? parseHistory(rawHistoryKo) : null;
      if (koParsed && !sameHistoryAsDefault(koParsed)) {
        history = koParsed;
        collect?.set("about.history", JSON.stringify(koParsed));
      } else {
        history = EN_HISTORY.map((h) => ({ ...h }));
        collect?.set("about.history", JSON.stringify(history));
      }
    }
  } else {
    const koParsed = rawHistoryKo ? parseHistory(rawHistoryKo) : null;
    history = koParsed ?? dHistory;
    collect?.set("about.history", rawHistoryKo || JSON.stringify(dHistory));
  }

  // historyImages는 더 이상 편집 대상이 아님 — 데이터 파일 기본값 그대로 사용
  const historyImages = {
    pc: dHistoryImages.pc,
    mobile: dHistoryImages.mobile,
  };

  const banner = t("about.historyBanner.bg", "/assets/img/9e084a2b4a973.jpg");

  return { history, historyImages, banner };
}

/** 순수 함수 — 서버(about-content.ts)와 관리자 미리보기(클라이언트) 양쪽에서 사용. */
export function resolveAboutCertificationsFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ResolvedAboutCertifications {
  const fb = (key: string, fallback: string) =>
    locale === "en" ? (EN_ABOUT[key] ?? fallback) : fallback;
  const t = (key: string, fallback: string) => {
    const v = pickText(rows, key, locale, fb(key, fallback));
    collect?.set(key, v);
    return v;
  };

  // about.certs — JSON 목록 [{"thumb":"...","full":"..."}, ...].
  // 인증서는 이미지 경로만 들어 있어 언어 독립적이지만, 저장은 로케일별로 한다.
  // 파싱 실패/형태 불일치 시 기본값으로 폴백. collect에는 원본 JSON 문자열을 넣는다.
  const rawCerts = pickText(rows, "about.certs", locale, "");
  let certifications: Certification[] = dCertifications;
  if (rawCerts) {
    try {
      const parsed = JSON.parse(rawCerts) as unknown;
      if (Array.isArray(parsed)) {
        const mapped = parsed
          .map((entry) => {
            if (!entry || typeof entry !== "object") return null;
            const e = entry as Record<string, unknown>;
            const str = (v: unknown) => (typeof v === "string" ? v : "");
            const thumb = str(e.thumb);
            const full = str(e.full);
            return { thumb, full };
          })
          .filter((x): x is Certification => x !== null && x.thumb !== "");
        if (mapped.length > 0) certifications = mapped;
      }
    } catch {
      // JSON 파싱 실패 → 기본값 유지
    }
  }
  collect?.set("about.certs", rawCerts || JSON.stringify(dCertifications));

  const banner = t("about.certsBanner.bg", "/assets/img/f9124d9afd25e.jpg");

  return { certifications, banner };
}

/** 순수 함수 — 서버(about-content.ts)와 관리자 미리보기(클라이언트) 양쪽에서 사용. */
export function resolveAboutContactFromRows(
  rows: ContentRows,
  locale: Locale,
  collect?: Map<string, string>,
): ResolvedAboutContact {
  const fb = (key: string, fallback: string) =>
    locale === "en" ? (EN_ABOUT[key] ?? fallback) : fallback;
  const t = (key: string, fallback: string) => {
    const v = pickText(rows, key, locale, fb(key, fallback));
    collect?.set(key, v);
    return v;
  };

  const contact = {
    ...dContact,
    banner: {
      bg: t("about.contact.banner.bg", dContact.banner.bg),
      lines: dContact.banner.lines.map((line, i) =>
        t(`about.contact.banner.lines.${i}`, line),
      ),
    },
    offices: (() => {
      // about.contact.offices — JSON 목록 [{"name","mapSrc","tel","email","address"}, ...].
      // locale=en 일 때: EN DB 행(기본값과 다르면) → KO DB 행 → EN_OFFICES 사전 순.
      // 파싱 실패/형태 불일치 시 기본값으로 폴백. collect에는 실제 사용된 JSON 문자열을 넣는다.
      const rawOfficesKo = rows["about.contact.offices"]?.ko?.trim();
      const rawOfficesEn =
        locale === "en" ? rows["about.contact.offices"]?.en?.trim() : undefined;
      const parseOffices = (raw: string) => {
        try {
          return officesCanonical(JSON.parse(raw) as unknown);
        } catch {
          return [];
        }
      };
      const sameOfficesAsDefault = (o: (typeof dContact.offices)[number][]) =>
        JSON.stringify(o) === JSON.stringify(dContact.offices);

      const fallbackOffices = () =>
        dContact.offices.map((office, i) => ({
          ...office,
          name: t(`about.contact.offices.${i}.name`, office.name),
          tel: t(`about.contact.offices.${i}.tel`, office.tel),
          email: t(`about.contact.offices.${i}.email`, office.email),
          address: t(`about.contact.offices.${i}.address`, office.address),
        }));

      if (locale === "en") {
        const enParsed = rawOfficesEn ? parseOffices(rawOfficesEn) : [];
        if (enParsed.length > 0 && !sameOfficesAsDefault(enParsed)) {
          collect?.set("about.contact.offices", JSON.stringify(enParsed));
          return enParsed;
        }
        const koParsed = rawOfficesKo ? parseOffices(rawOfficesKo) : [];
        if (koParsed.length > 0 && !sameOfficesAsDefault(koParsed)) {
          collect?.set("about.contact.offices", JSON.stringify(koParsed));
          return koParsed;
        }
        const enFallback = EN_OFFICES.map((o) => ({ ...o }));
        collect?.set("about.contact.offices", JSON.stringify(enFallback));
        return enFallback;
      }

      const koParsed = rawOfficesKo ? parseOffices(rawOfficesKo) : [];
      if (koParsed.length > 0) {
        collect?.set("about.contact.offices", JSON.stringify(koParsed));
        return koParsed;
      }
      collect?.set("about.contact.offices", JSON.stringify(dContact.offices));
      return fallbackOffices();
    })(),
  };

  const banner = t("about.contactBanner.bg", "/assets/img/38e99f51c3fe3.jpg");

  return { contact, banner };
}

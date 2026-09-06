import "server-only";
import { cookies, headers } from "next/headers";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_HEADER,
  isLocale,
  type Locale,
} from "./config";

/**
 * Server-side locale read. Priority: proxy header (URL prefix) →
 * cookie → default. URL prefix is the source of truth.
 */
export async function getLocale(): Promise<Locale> {
  const h = await headers();
  const fromHeader = h.get(LOCALE_HEADER);
  if (isLocale(fromHeader)) return fromHeader;
  const c = await cookies();
  const fromCookie = c.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;
  return DEFAULT_LOCALE;
}

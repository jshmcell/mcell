import { cache } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

/**
 * Server-side session read (per-request cached).
 * Returns null for guests; safe to call in any server component.
 */
export const getServerSession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session;
});

/** Convenience for the Header: { name, email, image } or null. */
export async function getCurrentUser() {
  const session = await getServerSession();
  if (!session?.user) return null;
  return {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image ?? null,
  };
}

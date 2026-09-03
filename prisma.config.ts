import path from "node:path";

import { config as dotenvConfig } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Prisma CLI does not auto-load .env files in v7; load ours explicitly.
dotenvConfig({ path: [".env.local", ".env.development.local"], quiet: true });

// Production (Vercel) namespaces DB secrets as MCELL_*; dev uses plain names.
function prefixed(name: string): string | undefined {
  return process.env[`MCELL_${name}`] ?? process.env[name] ?? undefined;
}

const directUrl = prefixed("DIRECT_URL_UNPOOLED") ?? prefixed("DATABASE_URL_UNPOOLED") ?? prefixed("DIRECT_URL");
const databaseUrl = prefixed("DATABASE_URL");

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  datasource: {
    // CLI (migrations/DDL) uses the unpooled Neon URL; runtime client (src/lib/prisma.ts)
    // uses the pooled DATABASE_URL and never reads this file.
    url: directUrl ?? env("DATABASE_URL") ?? databaseUrl,
  },
});

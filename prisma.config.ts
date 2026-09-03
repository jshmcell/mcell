import path from "node:path";

import { config as dotenvConfig } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Prisma CLI does not auto-load .env files in v7; load ours explicitly.
dotenvConfig({ path: [".env.local", ".env.development.local"], quiet: true });

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  datasource: {
    // CLI (migrations/DDL) uses the unpooled Neon URL; runtime client (src/lib/prisma.ts)
    // uses the pooled DATABASE_URL and never reads this file.
    url: process.env.DIRECT_URL ?? env("DATABASE_URL"),
  },
});

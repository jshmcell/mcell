-- PageContent: per-locale rows (ko/en). Existing rows keep locale 'ko'.
ALTER TABLE "page_content" ADD COLUMN "locale" TEXT NOT NULL DEFAULT 'ko';

-- Composite primary key (key, locale)
ALTER TABLE "page_content" DROP CONSTRAINT "page_content_pkey";
ALTER TABLE "page_content" ADD CONSTRAINT "page_content_pkey" PRIMARY KEY ("key", "locale");

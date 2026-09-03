-- CreateTable
CREATE TABLE "site_setting" (
    "key" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',
    "kind" TEXT NOT NULL DEFAULT 'string',
    "updatedBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "site_setting_pkey" PRIMARY KEY ("key")
);

-- CreateEnum
CREATE TYPE "role" AS ENUM ('NORMAL', 'ADMIN');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "role" NOT NULL DEFAULT 'NORMAL';

-- CreateTable
CREATE TABLE "board_post" (
    "id" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "author" TEXT NOT NULL,
    "authorId" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "board_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "board_attachment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "href" TEXT NOT NULL,

    CONSTRAINT "board_attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiry" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'partnership',
    "company" TEXT,
    "manager" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "oemType" TEXT,
    "content" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "board_post_board_published_createdAt_idx" ON "board_post"("board", "published", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "board_attachment_postId_key" ON "board_attachment"("postId");

-- CreateIndex
CREATE INDEX "inquiry_status_createdAt_idx" ON "inquiry"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "board_post" ADD CONSTRAINT "board_post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "board_attachment" ADD CONSTRAINT "board_attachment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "board_post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inquiry" ADD CONSTRAINT "inquiry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

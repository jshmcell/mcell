import { prisma } from "@/lib/prisma";
import type { BoardKey } from "@/lib/actions/admin-boards";

export type PublicPost = {
  id: string;
  category: string;
  title: string;
  author: string;
  date: string;
  views: number;
  body?: string;
  attachment?: { name: string; size: string; href: string };
};

/** 공개 게시물 목록 (published만) — 최신순 */
export async function getPublicPosts(board: BoardKey): Promise<PublicPost[]> {
  const posts = await prisma.boardPost.findMany({
    where: { board, published: true },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    include: { attachment: true },
  });
  return posts.map((p) => ({
    id: p.id,
    category: p.category,
    title: p.title,
    author: p.author,
    date: p.createdAt.toISOString().slice(0, 10),
    views: p.views,
    body: p.body ?? undefined,
    attachment: p.attachment
      ? {
          name: p.attachment.name,
          size: p.attachment.size,
          href: p.attachment.href,
        }
      : undefined,
  }));
}

export async function getPublicPost(board: BoardKey, id: string) {
  const p = await prisma.boardPost.findFirst({
    where: { board, id, published: true },
    include: { attachment: true },
  });
  if (!p) return null;
  return {
    id: p.id,
    category: p.category,
    title: p.title,
    author: p.author,
    date: p.createdAt.toISOString().slice(0, 10),
    views: p.views,
    body: p.body ?? undefined,
    attachment: p.attachment
      ? {
          name: p.attachment.name,
          size: p.attachment.size,
          href: p.attachment.href,
        }
      : undefined,
  } satisfies PublicPost;
}

/** 조회수 증가 (뷰 페이지 진입 시) */
export async function incrementViews(id: string) {
  await prisma.boardPost.update({
    where: { id },
    data: { views: { increment: 1 } },
  });
}

/** 이전/다음 글 (최신순 기준) */
export async function getAdjacentPosts(board: BoardKey, id: string) {
  const posts = await prisma.boardPost.findMany({
    where: { board, published: true },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    select: { id: true, title: true },
  });
  const idx = posts.findIndex((p) => p.id === id);
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}
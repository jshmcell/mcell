"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getActor } from "@/lib/roles";
import type { BoardKey } from "@/lib/boards-types";

export type { BoardKey } from "@/lib/boards-types";

export type CrudResult = { ok: boolean; message?: string; id?: string };

const postSchema = z.object({
  board: z.enum(["notices", "updates", "catalog", "portfolio"]),
  category: z.string().trim().min(1).max(50),
  title: z.string().trim().min(1, "제목을 입력하세요.").max(200),
  body: z.string().max(50000).optional().nullable(),
  published: z.boolean(),
  attachmentName: z.string().trim().max(200).optional().nullable(),
  attachmentSize: z.string().trim().max(20).optional().nullable(),
  attachmentHref: z.string().trim().max(500).optional().nullable(),
});

function revalidateBoards(board: BoardKey) {
  revalidatePath("/admin/boards");
  if (board === "notices") revalidatePath("/news/notices");
  if (board === "updates") revalidatePath("/news/updates");
  if (board === "catalog") revalidatePath("/library/catalog");
  if (board === "portfolio") revalidatePath("/library/portfolio");
}

const DB_ERROR: CrudResult = { ok: false, message: "처리 중 오류가 발생했습니다." };

export async function createBoardPost(
  input: z.input<typeof postSchema>,
): Promise<CrudResult> {
  const actor = await getActor();
  if (!actor?.isAdmin) return { ok: false, message: "권한이 없습니다." };

  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  }
  const d = parsed.data;

  try {
    const post = await prisma.boardPost.create({
      data: {
        board: d.board,
        category: d.category,
        title: d.title,
        body: d.body || null,
        published: d.published,
        author: actor.name,
        authorId: actor.id,
        attachment:
          d.attachmentName && d.attachmentHref
            ? {
                create: {
                  name: d.attachmentName,
                  size: d.attachmentSize || "",
                  href: d.attachmentHref,
                },
              }
            : undefined,
      },
    });
    revalidateBoards(d.board);
    return { ok: true, id: post.id };
  } catch (e) {
    console.error("createBoardPost failed:", e);
    return DB_ERROR;
  }
}

export async function updateBoardPost(
  id: string,
  input: z.input<typeof postSchema>,
): Promise<CrudResult> {
  const actor = await getActor();
  if (!actor?.isAdmin) return { ok: false, message: "권한이 없습니다." };

  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "입력값 오류" };
  }
  const d = parsed.data;

  try {
    const existing = await prisma.boardPost.findUnique({
      where: { id },
      select: { board: true, attachment: true },
    });
    if (!existing) return { ok: false, message: "게시물을 찾을 수 없습니다." };

    await prisma.boardPost.update({
      where: { id },
      data: {
        board: d.board,
        category: d.category,
        title: d.title,
        body: d.body || null,
        published: d.published,
        attachment: d.attachmentName && d.attachmentHref
          ? existing.attachment
            ? {
                update: {
                  name: d.attachmentName,
                  size: d.attachmentSize || "",
                  href: d.attachmentHref,
                },
              }
            : {
                create: {
                  name: d.attachmentName,
                  size: d.attachmentSize || "",
                  href: d.attachmentHref,
                },
              }
          : existing.attachment
            ? { delete: true }
            : undefined,
      },
    });
    revalidateBoards(d.board);
    if (existing.board !== d.board) revalidateBoards(existing.board as BoardKey);
    return { ok: true, id };
  } catch (e) {
    console.error("updateBoardPost failed:", e);
    return DB_ERROR;
  }
}

export async function deleteBoardPost(id: string): Promise<CrudResult> {
  const actor = await getActor();
  if (!actor?.isAdmin) return { ok: false, message: "권한이 없습니다." };
  try {
    const existing = await prisma.boardPost.findUnique({
      where: { id },
      select: { board: true },
    });
    if (!existing) return { ok: false, message: "게시물을 찾을 수 없습니다." };
    await prisma.boardPost.delete({ where: { id } });
    revalidateBoards(existing.board as BoardKey);
    return { ok: true };
  } catch (e) {
    console.error("deleteBoardPost failed:", e);
    return DB_ERROR;
  }
}

export async function toggleBoardPostPublished(
  id: string,
  published: boolean,
): Promise<CrudResult> {
  const actor = await getActor();
  if (!actor?.isAdmin) return { ok: false, message: "권한이 없습니다." };
  try {
    const existing = await prisma.boardPost.findUnique({
      where: { id },
      select: { board: true },
    });
    if (!existing) return { ok: false, message: "게시물을 찾을 수 없습니다." };
    await prisma.boardPost.update({ where: { id }, data: { published } });
    revalidateBoards(existing.board as BoardKey);
    return { ok: true };
  } catch (e) {
    console.error("toggleBoardPostPublished failed:", e);
    return DB_ERROR;
  }
}

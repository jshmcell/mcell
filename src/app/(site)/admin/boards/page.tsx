import { prisma } from "@/lib/prisma";
import { getActor } from "@/lib/roles";
import { getLocale } from "@/i18n/server";
import { adminDict } from "@/i18n/admin";
import { redirect } from "next/navigation";
import BoardsAdminPanel from "@/components/admin/BoardsAdminPanel";

/** /admin/boards — 게시물 CRUD */
export default async function AdminBoardsPage({
  searchParams,
}: {
  searchParams: Promise<{ board?: string }>;
}) {
  const { board } = await searchParams;
  const actor = await getActor();
  if (!actor) redirect("/login");
  const locale = await getLocale();
  const boards = adminDict[locale].boards.meta;

  const active = boards.find((b) => b.key === board) ?? boards[0];

  const posts = await prisma.boardPost.findMany({
    where: { board: active.key },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      board: true,
      category: true,
      title: true,
      body: true,
      author: true,
      views: true,
      published: true,
      createdAt: true,
      attachment: true,
    },
  });

  return (
    <BoardsAdminPanel
      boards={boards}
      activeKey={active.key}
      posts={posts.map((p) => ({
        id: p.id,
        category: p.category,
        title: p.title,
        body: p.body ?? "",
        author: p.author,
        views: p.views,
        published: p.published,
        createdAt: p.createdAt.toISOString().slice(0, 10),
        attachment: p.attachment
          ? { name: p.attachment.name, size: p.attachment.size, href: p.attachment.href }
          : null,
      }))}
    />
  );
}

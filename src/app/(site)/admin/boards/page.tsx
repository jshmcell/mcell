import { prisma } from "@/lib/prisma";
import { getActor } from "@/lib/roles";
import BoardsAdminPanel from "@/components/admin/BoardsAdminPanel";

const BOARD_META: Array<{ key: string; label: string; base: string }> = [
  { key: "notices", label: "공지사항", base: "/news/notices" },
  { key: "updates", label: "소식", base: "/news/updates" },
  { key: "catalog", label: "카달로그", base: "/library/catalog" },
  { key: "portfolio", label: "포트폴리오", base: "/library/portfolio" },
];

/** /admin/boards — 게시물 CRUD */
export default async function AdminBoardsPage({
  searchParams,
}: {
  searchParams: Promise<{ board?: string }>;
}) {
  const { board } = await searchParams;
  const actor = await getActor();
  if (!actor) return null;

  const active = BOARD_META.find((b) => b.key === board) ?? BOARD_META[0];

  const posts = await prisma.boardPost.findMany({
    where: { board: active.key },
    orderBy: { createdAt: "desc" },
    include: { attachment: true },
  });

  return (
    <BoardsAdminPanel
      boards={BOARD_META}
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
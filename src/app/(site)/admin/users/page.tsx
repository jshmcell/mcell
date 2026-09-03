import { prisma } from "@/lib/prisma";
import { getActor, isSuperuserEmail } from "@/lib/roles";
import UsersRoleControls from "@/components/admin/UsersRoleControls";

/** /admin/users — 회원 목록 + 권한 관리 */
export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const actor = await getActor();
  if (!actor) return null;

  const users = await prisma.user.findMany({
    where: q
      ? {
          OR: [
            { email: { contains: q, mode: "insensitive" } },
            { name: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <form className="flex gap-2" action="/admin/users">
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="이메일 또는 이름 검색"
          className="h-[40px] w-[280px] rounded-[3px] border border-black/10 bg-white px-3 text-[14px] outline-none focus:border-navy-700"
        />
        <button
          type="submit"
          className="h-[40px] rounded-[3px] bg-navy-900 px-4 text-[13px] text-white"
        >
          검색
        </button>
      </form>

      <div className="mt-4 overflow-x-auto rounded-[4px] border border-black/10 bg-white">
        <table className="w-full min-w-[720px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-black/10 bg-black/[0.02] text-ink/60">
              <th className="px-4 py-3 font-medium">이메일</th>
              <th className="px-4 py-3 font-medium">이름</th>
              <th className="px-4 py-3 font-medium">권한</th>
              <th className="px-4 py-3 font-medium">가입일</th>
              <th className="px-4 py-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const su = isSuperuserEmail(u.email);
              return (
                <tr key={u.id} className="border-b border-black/5 last:border-0">
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        su
                          ? "rounded-[3px] bg-[#7c3aed]/10 px-2 py-0.5 text-[12px] text-[#7c3aed]"
                          : u.role === "ADMIN"
                            ? "rounded-[3px] bg-navy-900/10 px-2 py-0.5 text-[12px] text-navy-900"
                            : "rounded-[3px] bg-black/5 px-2 py-0.5 text-[12px] text-ink/70"
                      }
                    >
                      {su ? "슈퍼관리자" : u.role === "ADMIN" ? "관리자" : "일반회원"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink/60">
                    {u.createdAt.toISOString().slice(0, 10)}
                  </td>
                  <td className="px-4 py-3">
                    {su ? (
                      <span className="text-[12px] text-ink/40">변경 불가</span>
                    ) : (
                      <UsersRoleControls
                        email={u.email}
                        role={u.role}
                        isSuperuserActor={actor.isSuperuser}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink/50">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
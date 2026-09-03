"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setUserRole } from "@/lib/actions/admin-users";

/**
 * 권한 관리 컨트롤:
 * - 관리자 배우자: 승격 버튼만 (강등 불가)
 * - 슈퍼관리자 배우자: 승격/강등 모두 (자기 자신 제외 — 서버에서도 차단)
 */
export default function UsersRoleControls({
  email,
  role,
  isSuperuserActor,
}: {
  email: string;
  role: "NORMAL" | "ADMIN";
  isSuperuserActor: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  function change(next: "NORMAL" | "ADMIN") {
    setMessage(null);
    startTransition(async () => {
      const res = await setUserRole(email, next);
      if (!res.ok) setMessage(res.message ?? "실패");
      else router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      {role === "NORMAL" ? (
        <button
          type="button"
          disabled={pending}
          onClick={() => change("ADMIN")}
          className="h-[28px] rounded-[3px] border border-navy-900/30 px-2 text-[12px] text-navy-900 transition-colors hover:bg-navy-900 hover:text-white disabled:opacity-50"
        >
          {pending ? "처리 중..." : "관리자로 승격"}
        </button>
      ) : (
        <>
          <span className="text-[12px] text-ink/40">관리자</span>
          {isSuperuserActor && (
            <button
              type="button"
              disabled={pending}
              onClick={() => change("NORMAL")}
              className="h-[28px] rounded-[3px] border border-black/15 px-2 text-[12px] text-ink/70 transition-colors hover:border-[#ff4d4d] hover:text-[#ff4d4d] disabled:opacity-50"
            >
              {pending ? "처리 중..." : "강등"}
            </button>
          )}
        </>
      )}
      {message && <span className="text-[12px] text-[#ff4d4d]">{message}</span>}
    </div>
  );
}
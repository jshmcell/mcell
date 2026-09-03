"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createBoardPost,
  updateBoardPost,
  deleteBoardPost,
  toggleBoardPostPublished,
} from "@/lib/actions/admin-boards";

type Attachment = { name: string; size: string; href: string };
export type AdminPost = {
  id: string;
  category: string;
  title: string;
  body: string;
  author: string;
  views: number;
  published: boolean;
  createdAt: string;
  attachment: Attachment | null;
};

type BoardMeta = { key: string; label: string; base: string };

const inputCls =
  "h-[40px] w-full rounded-[3px] border border-black/10 bg-white px-3 text-[14px] outline-none focus:border-navy-700";

const BOARD_DEFAULT_CATEGORY: Record<string, string> = {
  notices: "공지사항",
  updates: "소식",
  catalog: "카달로그",
  portfolio: "포트폴리오",
};

export default function BoardsAdminPanel({
  boards,
  activeKey,
  posts,
}: {
  boards: BoardMeta[];
  activeKey: string;
  posts: AdminPost[];
}) {
  const [editing, setEditing] = useState<AdminPost | "new" | null>(null);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const active = boards.find((b) => b.key === activeKey)!;

  function run(fn: () => Promise<{ ok: boolean; message?: string }>) {
    setMessage(null);
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) setMessage(res.message ?? "실패");
      else {
        setEditing(null);
        router.refresh();
      }
    });
  }

  return (
    <div>
      {/* 보드 탭 */}
      <div className="flex flex-wrap gap-2">
        {boards.map((b) => (
          <a
            key={b.key}
            href={`/admin/boards?board=${b.key}`}
            className={
              b.key === activeKey
                ? "rounded-[3px] bg-navy-900 px-4 py-2 text-[13px] text-white"
                : "rounded-[3px] border border-black/10 bg-white px-4 py-2 text-[13px] text-ink hover:border-navy-700"
            }
          >
            {b.label}
          </a>
        ))}
      </div>

      {message && (
        <p className="mt-4 rounded-[3px] bg-[#fff4f4] px-3 py-2 text-[13px] text-[#ff4d4d]">
          {message}
        </p>
      )}

      {/* 편집 폼 */}
      {editing && (
        <PostForm
          boardLabel={active.label}
          initial={
            editing === "new"
              ? {
                  category: BOARD_DEFAULT_CATEGORY[activeKey] ?? active.label,
                  title: "",
                  body: "",
                  published: true,
                  attachmentName: "",
                  attachmentSize: "",
                  attachmentHref: "",
                }
              : {
                  category: editing.category,
                  title: editing.title,
                  body: editing.body,
                  published: editing.published,
                  attachmentName: editing.attachment?.name ?? "",
                  attachmentSize: editing.attachment?.size ?? "",
                  attachmentHref: editing.attachment?.href ?? "",
                }
          }
          pending={pending}
          onCancel={() => setEditing(null)}
          onSave={(data) =>
            editing === "new"
              ? run(() => createBoardPost({ ...data, board: activeKey as never }))
              : run(() => updateBoardPost(editing.id, { ...data, board: activeKey as never }))
          }
        />
      )}

      {/* 목록 */}
      {!editing && (
        <>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setEditing("new")}
              className="h-[38px] rounded-[3px] bg-navy-900 px-4 text-[13px] text-white"
            >
              새 게시물
            </button>
          </div>

          <div className="mt-3 overflow-x-auto rounded-[4px] border border-black/10 bg-white">
            <table className="w-full min-w-[760px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-black/10 bg-black/[0.02] text-ink/60">
                  <th className="px-4 py-3 font-medium">제목</th>
                  <th className="px-4 py-3 font-medium">상태</th>
                  <th className="px-4 py-3 font-medium">작성일</th>
                  <th className="px-4 py-3 font-medium">조회</th>
                  <th className="px-4 py-3 font-medium">관리</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-b border-black/5 last:border-0">
                    <td className="max-w-[320px] truncate px-4 py-3">
                      {p.title}
                      {p.attachment && (
                        <span className="ml-1 text-[11px] text-ink/40">📎</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() =>
                          startTransition(async () => {
                            const res = await toggleBoardPostPublished(p.id, !p.published);
                            if (!res.ok) setMessage(res.message ?? "실패");
                            else router.refresh();
                          })
                        }
                        className={
                          p.published
                            ? "rounded-[3px] bg-[#1a9c46]/10 px-2 py-0.5 text-[12px] text-[#1a9c46]"
                            : "rounded-[3px] bg-black/5 px-2 py-0.5 text-[12px] text-ink/50"
                        }
                      >
                        {p.published ? "공개" : "숨김"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-ink/60">{p.createdAt}</td>
                    <td className="px-4 py-3 text-ink/60">{p.views}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditing(p)}
                          className="h-[28px] rounded-[3px] border border-black/15 px-2 text-[12px] text-ink hover:border-navy-700 hover:text-navy-900"
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() => {
                            if (!confirm("이 게시물을 삭제할까요?")) return;
                            startTransition(async () => {
                              const res = await deleteBoardPost(p.id);
                              if (!res.ok) setMessage(res.message ?? "실패");
                              else router.refresh();
                            });
                          }}
                          className="h-[28px] rounded-[3px] border border-black/15 px-2 text-[12px] text-ink/70 hover:border-[#ff4d4d] hover:text-[#ff4d4d]"
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-ink/50">
                      게시물이 없습니다. [새 게시물]로 추가하세요.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function PostForm({
  boardLabel,
  initial,
  pending,
  onSave,
  onCancel,
}: {
  boardLabel: string;
  initial: {
    category: string;
    title: string;
    body: string;
    published: boolean;
    attachmentName: string;
    attachmentSize: string;
    attachmentHref: string;
  };
  pending: boolean;
  onSave: (data: {
    category: string;
    title: string;
    body: string;
    published: boolean;
    attachmentName: string | null;
    attachmentSize: string | null;
    attachmentHref: string | null;
  }) => void;
  onCancel: () => void;
}) {
  const [category, setCategory] = useState(initial.category);
  const [title, setTitle] = useState(initial.title);
  const [body, setBody] = useState(initial.body);
  const [published, setPublished] = useState(initial.published);
  const [attName, setAttName] = useState(initial.attachmentName);
  const [attSize, setAttSize] = useState(initial.attachmentSize);
  const [attHref, setAttHref] = useState(initial.attachmentHref);

  return (
    <form
      className="mt-4 space-y-3 rounded-[4px] border border-black/10 bg-white p-5"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          category,
          title,
          body,
          published,
          attachmentName: attName.trim() || null,
          attachmentSize: attSize.trim() || null,
          attachmentHref: attHref.trim() || null,
        });
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-ink">
          {boardLabel} — 게시물 {initial.title ? "수정" : "작성"}
        </h2>
        <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-[15px] w-[15px] accent-navy-900"
          />
          공개
        </label>
      </div>

      <input
        className={inputCls}
        placeholder="카테고리 (예: 공지사항)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        className={inputCls}
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        rows={10}
        className="w-full rounded-[3px] border border-black/10 bg-white p-3 text-[14px] leading-6 outline-none focus:border-navy-700"
        placeholder="본문 (HTML 허용)"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <input
          className={inputCls}
          placeholder="첨부파일 이름"
          value={attName}
          onChange={(e) => setAttName(e.target.value)}
        />
        <input
          className={inputCls}
          placeholder="크기 표시 (예: 14295KB)"
          value={attSize}
          onChange={(e) => setAttSize(e.target.value)}
        />
        <input
          className={inputCls}
          placeholder="파일 경로 (예: /assets/pdf/mcell-catalog.pdf)"
          value={attHref}
          onChange={(e) => setAttHref(e.target.value)}
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={pending}
          className="h-[40px] rounded-[3px] bg-navy-900 px-6 text-[13px] text-white disabled:opacity-50"
        >
          {pending ? "처리 중..." : "저장"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-[40px] rounded-[3px] border border-black/15 px-6 text-[13px] text-ink hover:bg-black/5"
        >
          취소
        </button>
      </div>
    </form>
  );
}
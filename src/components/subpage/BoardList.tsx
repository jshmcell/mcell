import Link from "next/link";
import SubHero from "@/components/subpage/SubHero";
import Reveal from "@/components/ui/Reveal";
import { boards, type BoardPost } from "@/data/boards";
import type { NavChild } from "@/data/site";

interface BoardListProps {
  boardKey: keyof typeof boards;
  groupLabel: string;
  title: string;
  currentHref: string;
  nav: NavChild[];
}

export default function BoardList({
  boardKey,
  groupLabel,
  title,
  currentHref,
  nav,
}: BoardListProps) {
  const board = boards[boardKey];

  return (
    <>
      <SubHero groupLabel={groupLabel} title={title} currentHref={currentHref}>
        {nav}
      </SubHero>
      <section className="bg-white">
        <div className="container-site py-16">
          <div className="flex items-center justify-between border-b-2 border-navy-900 pb-4">
            <p className="text-[18px] font-bold text-navy-900">
              {board.label}
              <em className="ml-2 text-[14px] not-italic text-ink/50">
                {board.posts.length}
              </em>
            </p>
            <div className="flex h-[38px] w-[220px] items-center border border-black/15 px-3">
              <input
                type="search"
                placeholder="Search"
                className="w-full bg-transparent text-[14px] outline-none placeholder:text-ink/40"
              />
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-ink/50"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>

          {board.posts.length === 0 ? (
            <p className="py-24 text-center text-[15px] text-ink/50">
              등록된 게시물이 없습니다.
            </p>
          ) : (
            <ul>
              {board.posts.map((post: BoardPost) => (
                <li key={post.id}>
                  <Reveal>
                    <Link
                      href="#"
                      className="flex items-center gap-4 border-b border-black/10 py-5 transition-colors hover:bg-black/[0.02]"
                    >
                      <span className="rounded-sm bg-sky-hover/30 px-2 py-0.5 text-[12px] text-navy-900">
                        {post.category}
                      </span>
                      <span className="flex-1 truncate text-[16px] font-medium text-ink">
                        {post.title}
                      </span>
                      <span className="hidden text-[13px] text-ink/60 sm:block">
                        {post.author}
                      </span>
                      <span className="text-[13px] text-ink/60">
                        {post.date}
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

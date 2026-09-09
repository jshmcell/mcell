/** 보드 key — DB boardPost.board 값과 관리자 보드 메타 키를 공유. */
export type BoardKey = "notices" | "updates" | "catalog" | "portfolio";

/** 공개 게시물 (뷰/목록) */
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

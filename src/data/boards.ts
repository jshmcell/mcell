export interface BoardPost {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
  /** 게시물 본문 (카달로그 등 뷰 페이지가 있는 게시물) */
  body?: string;
  attachment?: { name: string; size: string; href: string };
  thumb?: string;
}

export const boards: Record<string, { label: string; posts: BoardPost[] }> = {
  portfolio: { label: "포트폴리오", posts: [] },
  catalog: {
    label: "카달로그",
    posts: [
      {
        id: 165574527,
        category: "카달로그",
        title: "엠셀 카달로그",
        author: "관리자",
        date: "2025-06-17",
        body: "엠셀 카달로그입니다.",
        attachment: {
          name: "250513 엠셀_카달로그_수정안_최종.pdf",
          size: "14295KB",
          href: "/assets/pdf/mcell-catalog.pdf",
        },
      },
    ],
  },
  notices: { label: "공지사항", posts: [] },
  updates: { label: "소식", posts: [] },
};